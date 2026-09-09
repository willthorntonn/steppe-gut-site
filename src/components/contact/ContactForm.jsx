"use client";

import { useId, useState } from "react";

// The "Contact us" form that sits on /buy/ and is the whole of /contact/.
//
// It is the checkout FloatField pattern (label rides inside the box, floats to
// the top-left on focus/value) but every dimension - box height, radius,
// padding, and crucially the input and label *text* - is scaled up ~55% from
// the checkout original. That size lift is the point of the component, so the
// field is inlined here rather than reusing checkout/brick/FloatField (which
// must stay at its own, smaller checkout size).
//
// Base -> x1.55 reference (checkout FloatField values in brackets):
//   height 50 -> 78 | text 14 -> 22 | radius 12 -> 19 | pad-x 11 -> 17
//   label floated 11/top-7 -> 17/top-11 | label resting 14/top-15 -> 22/top-23

// The danger red used for errors and required marks across the site
// (ui/Field.jsx, brick/FloatField.jsx).
const REQUIRED_RED = "#8C3A2B";

function RequiredLabel({ children }) {
  return (
    <>
      {children} <span style={{ color: REQUIRED_RED }}>*</span>
    </>
  );
}

const BOX =
  "peer w-full rounded-[19px] border border-forest/20 bg-[#FFFDF9] px-[17px] text-[22px] text-forest outline-none transition-colors focus:border-forest";

const LABEL =
  "pointer-events-none absolute left-[17px] text-forest/55 transition-all duration-150";

function BigField({ label, as = "input", rows = 6, className = "", ...props }) {
  const id = useId();
  const shared = { id, ...props };

  return (
    <div className={className}>
      <div className="relative">
        {as === "textarea" ? (
          <>
            <textarea
              {...shared}
              placeholder=" "
              rows={rows}
              className={`${BOX} resize-y pb-[12px] pt-[34px] placeholder-shown:pt-[20px]`}
            />
            <label
              htmlFor={id}
              className={`${LABEL} top-[11px] text-[17px] peer-placeholder-shown:top-[20px] peer-placeholder-shown:text-[22px] peer-focus:top-[11px] peer-focus:text-[17px]`}
            >
              {label}
            </label>
          </>
        ) : (
          <>
            <input
              {...shared}
              placeholder=" "
              className={`${BOX} h-[78px] pb-[9px] pt-[30px] placeholder-shown:pb-0 placeholder-shown:pt-0`}
            />
            <label
              htmlFor={id}
              className={`${LABEL} top-[11px] text-[17px] peer-placeholder-shown:top-[23px] peer-placeholder-shown:text-[22px] peer-focus:top-[11px] peer-focus:text-[17px]`}
            >
              {label}
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    order: "",
    message: "",
  });

  const update = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    setSent(true);
  };

  if (sent) {
    return (
      <p
        role="status"
        className="mx-auto mt-16 max-w-[1180px] rounded-[19px] bg-[#E8EDE4] p-11 text-center font-sans text-[1.7rem] leading-[1.65] text-forest"
      >
        Thanks, your message is on its way. We reply within two working days
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto mt-16 max-w-[1180px] space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <BigField
          label={<RequiredLabel>Name</RequiredLabel>}
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={update("name")}
        />
        <BigField
          label={<RequiredLabel>Email</RequiredLabel>}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={update("email")}
        />
      </div>

      <BigField
        label="Order number (optional)"
        name="order"
        value={values.order}
        onChange={update("order")}
      />

      <BigField
        as="textarea"
        rows={6}
        label={<RequiredLabel>Write your message</RequiredLabel>}
        name="message"
        required
        value={values.message}
        onChange={update("message")}
      />

      <button
        type="submit"
        className="mt-3 h-[81px] w-full rounded-[19px] bg-forest font-sans text-[23px] font-bold tracking-[0.06em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Send
      </button>
    </form>
  );
}
