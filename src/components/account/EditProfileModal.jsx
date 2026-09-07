import { useEffect, useId, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import Modal from "../ui/Modal";
import Field from "../ui/Field";
import { useAuth } from "../../auth/AuthProvider";
import { fileToAvatarDataUrl, MAX_AVATAR_BYTES } from "../../auth/avatar";
import defaultAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Edit Profile, opened from the header account menu. Name, photo and email
// are saved to the account on the server (src/api/client -> server/), so a
// change made here is the same change on any device that signs in.
//
// The email change is a real verification now. Changing the address asks the
// server for a code; it issues one, holds its hash with an expiry and an
// attempt count, and refuses anything else. The one thing still missing is a
// way to deliver it, because transactional email is a separate piece of work
// - so the code is displayed in the dialog rather than mailed, and says so.
// When a mailer exists, stop returning the code (SG_ECHO_EMAIL_CODES in
// server/routes/auth.js) and delete the panel that shows it.
const MAX_FILE_BYTES = MAX_AVATAR_BYTES;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Segmented 6-digit entry: one real (invisible) input sitting on top of six
// display boxes. A filled box shows its digit; an empty box shows a grey 0;
// the box the cursor is in shows a blinking caret while the input has focus.
function CodeInput({ id, value, onChange, error, describedById }) {
  const [focused, setFocused] = useState(false);
  const activeIndex = Math.min(value.length, 5);

  return (
    <div className="relative">
      <input
        id={id}
        name="code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedById}
        className="absolute inset-0 h-full w-full cursor-text opacity-0"
      />
      <div className="flex gap-2 sm:gap-3" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => {
          const char = value[i];
          const isActive = focused && i === activeIndex && value.length < 6;
          return (
            <div
              key={i}
              className={[
                "flex h-16 flex-1 items-center justify-center rounded-xl border bg-[#FFFDF9] font-sans text-[26px] font-semibold transition-colors",
                error
                  ? "border-[#8C3A2B]"
                  : isActive
                    ? "border-forest ring-2 ring-gold/40"
                    : "border-forest/20",
                char ? "text-forest" : "text-forest/25",
              ].join(" ")}
            >
              {isActive ? (
                <span className="h-6 w-px animate-pulse bg-forest" />
              ) : char ? (
                char
              ) : (
                "0"
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CANCEL_BTN =
  "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[15px] font-semibold text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const PRIMARY_BTN =
  "inline-flex h-12 items-center justify-center rounded-full bg-forest px-7 font-sans text-[15px] font-semibold text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50";

export default function EditProfileModal({ open, onClose }) {
  const { user, updateProfile, requestEmailChange, confirmEmailChange } = useAuth();
  const fileInputRef = useRef(null);
  const nameFieldRef = useRef(null);
  const emailFieldRef = useRef(null);
  const codeFieldRef = useRef(null);

  const codeId = useId();

  const [step, setStep] = useState("profile"); // "profile" | "verify"
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? null);
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);
  // The code the server issued. It is on screen because there is no mail
  // transport in this build to carry it to an inbox - see the note beside it
  // in the verify step, and SG_ECHO_EMAIL_CODES in server/routes/auth.js.
  const [issuedCode, setIssuedCode] = useState("");
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
    setCode("");
    setResent(false);
    setIssuedCode("");
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
      // The email is changing, so the server issues a code and holds it.
      const started = await requestEmailChange(email.trim());
      setIssuedCode(started?.code ?? "");
      setCode("");
      setResent(false);
      setStep("verify");
    } catch (failure) {
      setError(failure.message ?? "That could not be saved, try again");
    } finally {
      setBusy(false);
    }
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      codeFieldRef.current?.querySelector("input")?.focus();
      return;
    }
    // Checked against the code the server issued, which expires and counts
    // wrong attempts. A wrong code is now a real error path.
    setBusy(true);
    try {
      await confirmEmailChange(code);
      onClose();
    } catch (failure) {
      setError(failure.message ?? "That code could not be checked");
      codeFieldRef.current?.querySelector("input")?.focus();
    } finally {
      setBusy(false);
    }
  };

  const resendCode = async () => {
    setBusy(true);
    setError("");
    try {
      const started = await requestEmailChange(email.trim());
      setIssuedCode(started?.code ?? "");
      setResent(true);
    } catch (failure) {
      setError(failure.message ?? "That code could not be sent again");
    } finally {
      setBusy(false);
    }
  };

  const backToProfile = () => {
    setStep("profile");
    setCode("");
    setIssuedCode("");
    setError("");
    setResent(false);
  };

  const title = step === "verify" ? "Confirm your email" : "Edit profile";
  const description =
    step === "verify"
      ? `Confirm ${email.trim()} with the 6-digit code below`
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
                  ? "A 6-digit code confirms this address before it changes"
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
        <form noValidate onSubmit={handleVerifySubmit}>
          <div ref={codeFieldRef}>
            <label
              htmlFor={codeId}
              className="font-sans text-sm font-semibold text-forest"
            >
              6-digit code
            </label>
            <div className="mt-2">
              <CodeInput
                id={codeId}
                value={code}
                onChange={(event) => {
                  setResent(false);
                  setError("");
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                }}
                error={error}
                describedById={error ? `${codeId}-error` : undefined}
              />
            </div>
            {error && (
              <p
                id={`${codeId}-error`}
                className="mt-2 font-sans text-[13px] text-[#8C3A2B]"
              >
                {error}
              </p>
            )}
          </div>

          {/* The code is real and the server checks it. What does not exist
              yet is anything to carry it to an inbox, so it is shown here
              instead of being emailed - the one honest way to run a genuine
              verification step without a mail service. */}
          {issuedCode && (
            <div className="mt-4 rounded-[10px] border border-forest/15 bg-[#FFFDF9] p-4">
              <p className="font-sans text-[13px] leading-relaxed text-forest/70">
                No email is sent yet, so your code is shown here
              </p>
              <p className="mt-1 font-mono text-[18px] tracking-[0.3em] text-forest">
                {issuedCode}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={resendCode}
            disabled={busy}
            className="mt-3 font-sans text-[13px] font-semibold text-forest underline underline-offset-2 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
          >
            Get a new code
          </button>
          {resent && (
            <p className="mt-2 font-sans text-[13px] text-forest/55">
              A new code was issued, the one above is the one that works
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={backToProfile} className={CANCEL_BTN}>
              Back
            </button>
            <button type="submit" disabled={busy} className={PRIMARY_BTN}>
              {busy ? "Checking" : "Verify & save"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
