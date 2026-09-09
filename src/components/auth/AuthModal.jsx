"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import Modal from "../ui/Modal";
import Field from "../ui/Field";
import PasswordField from "../account/PasswordField";
import { useAuth } from "../../auth/AuthProvider";
import { ApiError } from "../../api/client";
import { fileToAvatarDataUrl, MAX_AVATAR_BYTES } from "../../auth/avatar";
import defaultAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Onboarding / sign-in, as a centred modal. This is the old pages/SignIn
// screen moved into the shared Modal shell (components/ui/Modal) so it can be
// opened from anywhere - the home page's "Become a Steppe Soldier" button, the
// header's "Sign in", the signed-out account pages - without leaving the page
// the visitor is on. Open state lives in AuthProvider (authModalOpen /
// authModalMode); this component is mounted once, by Layout.
//
// Both tabs are real requests to Supabase Auth. "create" registers an account
// and is refused when the email is already taken; "signin" is checked against
// the stored password and is refused when it is wrong. There is no sample
// account to fall into any more.
//
// Either tab can also hand off to Google instead, which leaves the site and
// comes back to /auth/callback/ - so nothing after that call runs, and the
// button stays in its busy state until the page navigates away.
//
// A successful "create" doesn't navigate away - it swaps this modal to a
// confirmation view (the animated forest checkmark, formerly its own
// pages/Welcome route) right where the visitor already is. What that view says
// depends on whether Supabase is set to confirm email addresses: with
// confirmation on, nobody is signed in yet and it says to check the inbox. The
// checkmark
// animation lives in index.css (.check-ring / .check-tick / .check-halo) and
// collapses to a static drawn tick under prefers-reduced-motion.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where to land once a sign-in finishes. The modal opens over whatever page
// the visitor was reading, so the honest destination is that same page - not a
// fixed jump to the order history. `/sign-in/` and `/auth/*` only exist to
// bounce people onward, so returning to one of them would loop; those fall
// back to the account area instead.
function returnDestination() {
  if (typeof window === "undefined") return "/account/orders/";
  const { pathname, search } = window.location;
  if (pathname === "/sign-in/" || pathname.startsWith("/auth/")) {
    return "/account/orders/";
  }
  return pathname + search;
}

const PRIMARY_BTN =
  "inline-flex h-[52px] w-full items-center justify-center rounded-[12px] bg-forest px-7 font-sans text-[15px] font-bold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const OUTLINE_BTN =
  "inline-flex h-11 items-center gap-2 rounded-full border border-forest px-4 font-sans text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50";
const GOOGLE_BTN =
  "inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-[12px] border border-forest/25 bg-white px-7 font-sans text-[15px] font-semibold text-forest transition-colors hover:bg-forest/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60";
const LINK_BTN =
  "font-semibold text-forest underline underline-offset-2 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/** Google's mark, at the size their brand terms ask for beside a label. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

// ── Photo picker ───────────────────────────────────────────────────────
// Canvas-downscaled to a small square data URL before it is held in state,
// same as Edit Profile's avatar row.
function PhotoPicker({ avatar, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file (JPG, PNG or WebP)");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError("That image is over 6 MB. Choose a smaller one");
      return;
    }
    setError("");
    setBusy(true);
    try {
      onChange(await fileToAvatarDataUrl(file));
    } catch (err) {
      setError(err.message ?? "Could not use that image");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <img
        src={avatar || defaultAvatar}
        alt=""
        className="h-16 w-16 shrink-0 rounded-full border border-forest/15 object-cover"
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className={OUTLINE_BTN}
          >
            {busy ? (
              <Loader2 size={16} strokeWidth={2} className="animate-spin" aria-hidden="true" />
            ) : (
              <Upload size={16} strokeWidth={1.75} aria-hidden="true" />
            )}
            {busy ? "Processing" : avatar ? "Replace photo" : "Upload photo"}
          </button>
          {avatar && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex h-11 items-center rounded-full px-3 font-sans text-sm font-semibold text-forest/60 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Remove
            </button>
          )}
        </div>
        {error ? (
          <p role="alert" className="mt-2 font-sans text-[13px] text-[#8C3A2B]">
            {error}
          </p>
        ) : (
          <p className="mt-2 font-sans text-[13px] text-forest/55">
            Optional. JPG, PNG or WebP, resized automatically
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    authModalError,
    closeAuthModal,
    user,
    register,
    signIn,
    signInWithGoogle,
    requestPasswordReset,
  } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState("create"); // "create" | "signin"
  // Set by handleCreate() on a successful register(); flips this modal from
  // the sign-up form to the welcome confirmation view. "confirm" means the
  // account exists but its email address has to be confirmed first, so nobody
  // is signed in yet.
  const [justRegistered, setJustRegistered] = useState(null); // null|"in"|"confirm"
  // Set once a reset link has been sent, so the sign-in tab can say so rather
  // than leaving the visitor wondering whether it went.
  const [resetSent, setResetSent] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [promotions, setPromotions] = useState(false);
  const [errors, setErrors] = useState({});
  // Set while a request is in flight, so the submit button cannot be pressed
  // twice and says what it is doing.
  const [busy, setBusy] = useState(false);
  // Whatever the server refused with, when it does not belong to one field.
  const [formError, setFormError] = useState("");

  // Reset the form every time the modal opens, seeding the tab from whichever
  // control opened it ("Become a Steppe Soldier" -> create, "Sign in" ->
  // signin).
  useEffect(() => {
    if (!authModalOpen) return;
    setMode(authModalMode === "signin" ? "signin" : "create");
    setJustRegistered(null);
    setResetSent(false);
    setAvatar(null);
    setValues({ name: "", email: "", password: "", confirm: "" });
    setPromotions(false);
    setErrors({});
    setBusy(false);
    // A refusal that happened away from this form - a Google sign-in the
    // visitor cancelled, an expired email link - arrives on the provider and
    // is shown above the button like any other.
    setFormError(authModalError ?? "");
  }, [authModalOpen, authModalMode, authModalError]);

  const set = (key) => (event) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormError("");
  };

  // A refusal from the server either names a field, and belongs under it, or
  // does not, and belongs above the button.
  const showFailure = (error) => {
    if (error instanceof ApiError && error.field) {
      setErrors((e) => ({ ...e, [error.field]: error.message }));
      return;
    }
    setFormError(error.message ?? "Something went wrong, try again");
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name";
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Enter a valid email address";
    if (values.password.length < 8) next.password = "Use at least 8 characters";
    if (values.confirm !== values.password)
      next.confirm = "The two passwords don't match";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    // The checks above are courtesy, not authority. The server runs its own,
    // and it is the one that knows whether the email is already taken.
    setBusy(true);
    setFormError("");
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        avatar,
        promotions,
      });
      setJustRegistered(result?.confirmationRequired ? "confirm" : "in");
    } catch (error) {
      showFailure(error);
    } finally {
      setBusy(false);
    }
  };

  // Welcome view actions. Closing (X / Escape / scrim) just dismisses it -
  // the visitor is already signed in and stays on the page behind. "Start
  // Shopping" also sends them to the catalogue.
  const closeWelcome = () => {
    setJustRegistered(null);
    closeAuthModal();
  };
  const startShopping = () => {
    closeWelcome();
    router.push("/products/");
  };

  // Hands off to Google. The page navigates away, so `busy` is never cleared
  // on success - the button stays busy until the browser leaves, which is the
  // honest thing for it to show.
  const handleGoogle = async () => {
    setBusy(true);
    setFormError("");
    try {
      await signInWithGoogle(returnDestination());
    } catch (error) {
      showFailure(error);
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!EMAIL_RE.test(values.email.trim())) {
      setErrors((e) => ({
        ...e,
        email: "Enter your email address first, and we'll send a reset link",
      }));
      return;
    }
    setBusy(true);
    setFormError("");
    try {
      await requestPasswordReset(values.email);
      // Said the same way whether or not that address has an account, so this
      // cannot be used to find out which addresses do.
      setResetSent(true);
    } catch (error) {
      showFailure(error);
    } finally {
      setBusy(false);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Enter a valid email address";
    if (!values.password) next.password = "Enter your password";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    // A real check against a stored hash. Wrong password, unknown email and
    // too many attempts all come back as refusals, and one of them is shown.
    setBusy(true);
    setFormError("");
    try {
      await signIn(values.email, values.password);
      router.push(returnDestination());
      closeAuthModal();
    } catch (error) {
      showFailure(error);
    } finally {
      setBusy(false);
    }
  };

  const alreadyIn = Boolean(user);
  const creating = mode === "create";

  // Post-signup confirmation, in place of the form. One animated mark, one
  // line, one way forward - the old pages/Welcome screen, now a modal state.
  if (justRegistered) {
    return (
      <Modal
        open={authModalOpen}
        onClose={closeWelcome}
        title={
          justRegistered === "confirm"
            ? "Confirm your email address"
            : "Welcome to Steppe Gut"
        }
        description={
          justRegistered === "confirm"
            ? `We've sent a link to ${values.email.trim()}. Follow it and you're a Steppe Soldier, with your orders, addresses and email preferences all in one account`
            : user
              ? `You're a Steppe Soldier now, ${user.name.split(" ")[0]}. Your orders, addresses and email preferences all live in one account`
              : "You're a Steppe Soldier now. Your orders, addresses and email preferences all live in one account"
        }
        maxWidth="max-w-[560px]"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span
              className="check-halo absolute inset-0 rounded-full bg-forest/30"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 96 96"
              className="check-ring relative h-24 w-24"
              role="img"
              aria-label={
                justRegistered === "confirm"
                  ? "Confirmation email sent"
                  : "Account created"
              }
            >
              <circle cx="48" cy="48" r="44" className="fill-forest" />
              <path
                d="M29 49.5 L43 63 L68 34"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-tick stroke-cream"
              />
            </svg>
          </div>

          {justRegistered === "confirm" ? (
            <button type="button" onClick={closeWelcome} className={`${PRIMARY_BTN} mt-8`}>
              Got it
            </button>
          ) : (
            <button
              type="button"
              onClick={startShopping}
              className={`${PRIMARY_BTN} mt-8`}
            >
              Start Shopping
            </button>
          )}
        </div>
      </Modal>
    );
  }

  const title = alreadyIn
    ? "You're already a Steppe Soldier"
    : creating
      ? "Become a Steppe Soldier"
      : "Sign in";
  const description = alreadyIn
    ? `You're signed in, ${user.name.split(" ")[0]}. There's nothing to set up here`
    : creating
      ? "A name, an email and a password. It keeps your orders, addresses and email preferences in one place"
      : "Welcome back. Your orders and saved addresses are where you left them";

  return (
    <Modal
      open={authModalOpen}
      onClose={closeAuthModal}
      title={title}
      description={description}
      maxWidth="max-w-[560px]"
    >
      {alreadyIn ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              closeAuthModal();
              router.push("/account/settings/");
            }}
            className={PRIMARY_BTN}
          >
            Account settings
          </button>
        </div>
      ) : creating ? (
        <>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className={GOOGLE_BTN}
          >
            <GoogleMark />
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-forest/15" />
            <span className="font-sans text-[13px] text-forest/50">or</span>
            <span className="h-px flex-1 bg-forest/15" />
          </div>
          <form noValidate onSubmit={handleCreate} className="space-y-6">
          <PhotoPicker avatar={avatar} onChange={setAvatar} />

          <Field
            label="Name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            required
            error={errors.name}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            required
            error={errors.email}
            help="This is the address on your account, and where the weekly dispatch will go once it starts. Turn it off anytime in settings"
          />
          <PasswordField
            label="Password"
            value={values.password}
            onChange={set("password")}
            autoComplete="new-password"
            error={errors.password}
            help="At least 8 characters"
          />
          <PasswordField
            label="Confirm password"
            value={values.confirm}
            onChange={set("confirm")}
            autoComplete="new-password"
            error={errors.confirm}
          />

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={promotions}
              onChange={(event) => setPromotions(event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-forest/30 accent-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            />
            <span className="font-sans text-[14px] leading-relaxed text-forest">
              Email me about promotions and launch offers
              <span className="mt-1 block font-sans text-[13px] text-forest/55">
                Discounts and offers only. Your weekly dispatch isn&rsquo;t
                affected by this
              </span>
            </span>
          </label>

          <div>
            {formError && (
              <p
                role="alert"
                className="mb-4 font-sans text-[14px] text-[#8C3A2B]"
              >
                {formError}
              </p>
            )}
            <button type="submit" disabled={busy} className={`${PRIMARY_BTN} disabled:opacity-60`}>
              {busy ? "Creating your account" : "Become a Steppe Soldier"}
            </button>
            <p className="mt-4 font-sans text-[14px] text-forest/70">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setErrors({});
                }}
                className={LINK_BTN}
              >
                Sign in
              </button>
            </p>
          </div>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className={GOOGLE_BTN}
          >
            <GoogleMark />
            Continue with Google
          </button>
          <div className="my-6 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-forest/15" />
            <span className="font-sans text-[13px] text-forest/50">or</span>
            <span className="h-px flex-1 bg-forest/15" />
          </div>
          <form noValidate onSubmit={handleSignIn} className="space-y-6">
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            required
            error={errors.email}
          />
          <PasswordField
            label="Password"
            value={values.password}
            onChange={set("password")}
            autoComplete="current-password"
            error={errors.password}
          />

          <div>
            {formError && (
              <p
                role="alert"
                className="mb-4 font-sans text-[14px] text-[#8C3A2B]"
              >
                {formError}
              </p>
            )}
            <button type="submit" disabled={busy} className={`${PRIMARY_BTN} disabled:opacity-60`}>
              {busy ? "Signing you in" : "Sign in"}
            </button>
            {resetSent ? (
              <p role="status" className="mt-4 font-sans text-[14px] text-forest/70">
                If that address has an account, a reset link is on its way to it
              </p>
            ) : (
              <p className="mt-4 font-sans text-[14px] text-forest/70">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={busy}
                  className={LINK_BTN}
                >
                  Forgotten your password?
                </button>
              </p>
            )}
            <p className="mt-4 font-sans text-[14px] text-forest/70">
              New here?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("create");
                  setErrors({});
                }}
                className={LINK_BTN}
              >
                Create an account
              </button>
            </p>
          </div>
          </form>
        </>
      )}
    </Modal>
  );
}
