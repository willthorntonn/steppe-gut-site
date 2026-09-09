"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import Modal from "../ui/Modal";
import Field from "../ui/Field";
import { useAuth } from "../../auth/AuthProvider";
import { fileToAvatarDataUrl, MAX_AVATAR_BYTES } from "../../auth/avatar";
import defaultAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Edit Profile, opened from the header account menu. Name, photo and email are
// saved against the account, so a change made here is the same change on any
// device that signs in.
//
// The email change is confirmed by Supabase now, which means a link to the new
// address rather than the six-digit code this dialog used to show on screen -
// that existed only because nothing in the old build could send mail. The name
// and the photo need no confirming and are saved either way; the address
// changes when the link is followed, and until then the account keeps the one
// it has.
const MAX_FILE_BYTES = MAX_AVATAR_BYTES;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CANCEL_BTN =
  "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[15px] font-semibold text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const PRIMARY_BTN =
  "inline-flex h-12 items-center justify-center rounded-full bg-forest px-7 font-sans text-[15px] font-semibold text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50";

export default function EditProfileModal({ open, onClose }) {
  const { user, updateProfile, requestEmailChange } = useAuth();
  const fileInputRef = useRef(null);
  const nameFieldRef = useRef(null);
  const emailFieldRef = useRef(null);

  const [step, setStep] = useState("profile"); // "profile" | "sent"
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? null);
  // Set when the confirmation link has been sent again, so the step can say
  // so rather than looking like the button did nothing.
  const [resent, setResent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Seed the local draft once, when the dialog opens. Keyed on `open` only:
  // moving to the verify step saves the name/avatar (updateProfile), which
  // changes `user` - a `user` dependency here would then snap the wizard back
  // to step one and wipe the pending email.
  useEffect(() => {
    if (!open) return;
    setStep("profile");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setAvatar(user?.avatar ?? null);
    setResent(false);
    setError("");
    setBusy(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Drop focus onto the code box when the verify step appears - the Modal's
  // own focus pass only fires once, on open. setTimeout(0), not rAF: rAF is
  // frozen in a backgrounded tab (same reasoning as RouteChange.jsx).
  useEffect(() => {
    if (!open || step !== "verify") return;
    const timer = setTimeout(() => {
      codeFieldRef.current?.querySelector("input")?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [open, step]);

  if (!user) return null;

  const currentEmail = user.email.trim().toLowerCase();
  const emailChanged = email.trim().toLowerCase() !== currentEmail;

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file (JPG, PNG or WebP)");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError("That image is over 6 MB. Choose a smaller one");
      return;
    }
    setError("");
    setBusy(true);
    try {
      setAvatar(await fileToAvatarDataUrl(file));
    } catch (err) {
      setError(err.message ?? "Could not use that image");
    } finally {
      setBusy(false);
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Enter your name");
      nameFieldRef.current?.querySelector("input")?.focus();
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address");
      emailFieldRef.current?.querySelector("input")?.focus();
      return;
    }

    setBusy(true);
    setError("");
    try {
      // The name and the photo need no confirming, so they are saved either
      // way. Both calls are requests now, and both can be refused.
      await updateProfile({ name: trimmedName, avatar });
      if (!emailChanged) {
        onClose();
        return;
      }
      // The email is changing, so Supabase sends a confirmation link to the
      // new address. Following it is what completes the change - there is
      // nothing left for this dialog to check, which is why the step below
      // says what happens next rather than asking for a code.
      await requestEmailChange(email.trim());
      setResent(false);
      setStep("sent");
    } catch (failure) {
      setError(failure.message ?? "That could not be saved, try again");
    } finally {
      setBusy(false);
    }
  };

  const resendLink = async () => {
    setBusy(true);
    setError("");
    try {
      await requestEmailChange(email.trim());
      setResent(true);
    } catch (failure) {
      setError(failure.message ?? "That link could not be sent again");
    } finally {
      setBusy(false);
    }
  };

  const backToProfile = () => {
    setStep("profile");
    setError("");
    setResent(false);
  };

  const title = step === "sent" ? "Confirm your email" : "Edit profile";
  const description =
    step === "sent"
      ? `Your name and photo are saved. The address itself changes once you follow the link sent to ${email.trim()}`
      : "Update the name, photo and email shown on your account";

  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      {step === "profile" ? (
        <form noValidate onSubmit={handleProfileSubmit}>
          <div className="flex items-center gap-5">
            <img
              src={avatar || defaultAvatar}
              alt=""
              className="h-20 w-20 shrink-0 rounded-full border border-forest/15 object-cover"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-forest px-4 font-sans text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
                >
                  {busy ? (
                    <Loader2 size={16} strokeWidth={2} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Upload size={16} strokeWidth={1.75} aria-hidden="true" />
                  )}
                  {busy ? "Processing" : "Upload photo"}
                </button>
                {avatar && (
                  <button
                    type="button"
                    onClick={() => setAvatar(null)}
                    className="inline-flex h-11 items-center rounded-full px-3 font-sans text-sm font-semibold text-forest/60 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="mt-2 font-sans text-[13px] text-forest/55">
                JPG, PNG or WebP. Squared and resized automatically.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>
          </div>

          <div ref={nameFieldRef} className="mt-6">
            <Field
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={error && !name.trim() ? error : undefined}
            />
          </div>

          <div ref={emailFieldRef} className="mt-4">
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              help={
                emailChanged
                  ? "A link sent to this address confirms it before it changes"
                  : undefined
              }
            />
          </div>

          {error && name.trim() && (
            <p role="alert" className="mt-4 font-sans text-[13px] text-[#8C3A2B]">
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className={CANCEL_BTN}>
              Cancel
            </button>
            <button type="submit" disabled={busy} className={PRIMARY_BTN}>
              {emailChanged ? "Continue" : "Save changes"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="font-sans text-[15px] leading-relaxed text-forest/75">
            Until the link is followed, your account keeps its current address,
            so nothing is lost if the message goes astray
          </p>

          {error && (
            <p role="alert" className="mt-4 font-sans text-[13px] text-[#8C3A2B]">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={resendLink}
            disabled={busy}
            className="mt-4 font-sans text-[13px] font-semibold text-forest underline underline-offset-2 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
          >
            Send the link again
          </button>
          {resent && (
            <p role="status" className="mt-2 font-sans text-[13px] text-forest/55">
              Sent again, the newest link is the one that works
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={backToProfile} className={CANCEL_BTN}>
              Back
            </button>
            <button type="button" onClick={onClose} className={PRIMARY_BTN}>
              Done
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
