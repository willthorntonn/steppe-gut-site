"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Password input with a show/hide toggle. Shared by Account Settings (change
// password) and the onboarding modal (components/auth/AuthModal, which is
// where sign-up lives now that pages/SignIn is gone). Inlined rather than
// built on ui/Field because it needs a trailing button; the box classes are
// kept in step with Field.jsx by hand.
//
// Worth knowing before trusting this field: neither caller does anything with
// what you type. No password is stored, checked or transmitted anywhere in
// the app - AuthProvider.changePassword is a no-op and register() drops the
// password on the floor. This is a real, accessible input in front of nothing,
// so treat any value that reaches it as discarded rather than held.
export default function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  error,
  help,
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="font-sans text-sm font-semibold text-forest">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`h-12 w-full rounded-lg border bg-[#FFFDF9] pl-4 pr-12 font-sans text-base text-forest placeholder:text-forest/35 focus:outline-none focus:ring-2 focus:ring-gold/40 ${
            error ? "border-[#8C3A2B]" : "border-forest/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-forest/55 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {show ? (
            <EyeOff size={18} strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <Eye size={18} strokeWidth={1.6} aria-hidden="true" />
          )}
        </button>
      </div>
      {help && (
        <p id={helpId} className="mt-2 font-sans text-[13px] text-forest/55">
          {help}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 font-sans text-[13px] text-[#8C3A2B]">
          {error}
        </p>
      )}
    </div>
  );
}
