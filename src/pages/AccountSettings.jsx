import { useState } from "react";
import { Check, Copy, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import Field from "../components/ui/Field";
import Toggle from "../components/account/Toggle";
import PasswordField from "../components/account/PasswordField";
import { useAuth } from "../auth/AuthProvider";

// Account Settings. Every section on this page now talks to the account API
// in `server/`, so what is real and what is not has changed:
//
//   Password       A real change. The current password is verified against a
//                  stored scrypt hash and the request is refused when it is
//                  wrong, so the success message waits on the server rather
//                  than being shown unconditionally. Succeeding also ends
//                  every other session on the account.
//   Notifications  Saved against the account, and returned to any device that
//                  signs in. Still nothing on the other end that sends email:
//                  a preference is recorded, not acted on.
//   Addresses      Saved against the account, and read back by the checkout
//                  (pages/Checkout) as the "deliver to a saved address"
//                  picker. Exactly one is the default, enforced server-side.
//   Recruit        Still local. The referral code is derived from the account
//                  in this file and registered with nothing, so the link
//                  tracks no one and redeems nowhere.
//
// Every handler below is async and every one can fail, which is why each
// section carries an error line rather than assuming success.
//
// Account Settings, re-skinned to sit in the same visual family as the
// individual product page (components/product/FybelleLayout) and the checkout
// (pages/Checkout): a cream page, a left-hand column of stacked sections
// separated by hairline rules with EB Garamond section titles, a sticky
// right-hand summary card on the same #FFFDF9 / border-forest/15 panel
// treatment the checkout order summary uses, and full-width forest submit
// buttons in the product page's uppercase-tracked style.

// ── Shared primary / secondary button classes ────────────────────────────
// Same shape as the product page's "Add to Cart" and the checkout's "Pay now":
// rounded-[12px], forest, uppercase, letter-spaced.
const PRIMARY_BTN =
  "inline-flex h-[52px] items-center justify-center rounded-[12px] bg-forest px-7 font-sans text-[15px] font-bold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const OUTLINE_BTN =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] border border-forest px-6 font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/** Small uppercase eyebrow, matching FybelleLayout's `.sg-fyb__label`. */
function FieldLabel({ children }) {
  return (
    <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-forest/55">
      {children}
    </p>
  );
}

// ── Section shell ───────────────────────────────────────────────────────
// Borderless, like a checkout form section: a serif title with a hairline
// under it (echoing the product page's price/accordion rules), then the body.
function SettingsSection({ title, description, children }) {
  return (
    <section>
      <div className="border-b border-forest/15 pb-4">
        <h2 className="font-serif text-[26px] font-semibold tracking-[-0.01em] text-forest sm:text-[28px]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-[60ch] font-sans text-[15px] leading-relaxed text-forest/65">
            {description}
          </p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

// ── Password change ──────────────────────────────────────────────────────
function PasswordSection() {
  const { changePassword } = useAuth();
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (key) => (event) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    setError("");
    setDone(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.current || !values.next || !values.confirm) {
      setError("Fill in all three fields");
      return;
    }
    if (values.next.length < 8) {
      setError("Your new password must be at least 8 characters");
      return;
    }
    if (values.next !== values.confirm) {
      setError("The new password and confirmation don't match");
      return;
    }
    // The checks above are the form's own. The one that matters happens on
    // the server: the current password is verified, and a wrong one comes
    // back as a refusal rather than a success message.
    setBusy(true);
    setError("");
    try {
      await changePassword(values.current, values.next);
      setValues({ current: "", next: "", confirm: "" });
      setDone(true);
    } catch (failure) {
      setError(failure.message ?? "That password could not be changed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SettingsSection
      title="Password"
      description="Choose something at least 8 characters long that you don't use anywhere else"
    >
      <form noValidate onSubmit={handleSubmit} className="max-w-[440px] space-y-4">
        <PasswordField
          label="Current password"
          value={values.current}
          onChange={set("current")}
          autoComplete="current-password"
        />
        <PasswordField
          label="New password"
          value={values.next}
          onChange={set("next")}
          autoComplete="new-password"
        />
        <PasswordField
          label="Confirm new password"
          value={values.confirm}
          onChange={set("confirm")}
          autoComplete="new-password"
          error={error || undefined}
        />
        {done && (
          <p role="status" className="font-sans text-[14px] font-medium text-forest">
            Password updated, and any other device you were signed in on has
            been signed out
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className={`${PRIMARY_BTN} w-full disabled:opacity-60`}
        >
          {busy ? "Updating" : "Update password"}
        </button>
      </form>
    </SettingsSection>
  );
}

// ── Notification toggles ─────────────────────────────────────────────────
const NOTIFICATION_ROWS = [
  {
    key: "weeklyDispatch",
    label: "The Steppe Gut dispatch",
    description: "One email a week: the steppe, gut science and how the milk is made",
  },
  {
    key: "orderUpdates",
    label: "Order confirmations",
    description: "A receipt and summary each time you place an order",
  },
  {
    key: "dispatchAndDelivery",
    label: "Dispatch & delivery",
    description: "When your order leaves the warehouse and when it arrives",
  },
  {
    key: "productNews",
    label: "Promotions & launch offers",
    description: "Occasional emails about discounts, new formats and launch offers",
  },
  {
    key: "backInStock",
    label: "Back-in-stock alerts",
    description: "A one-off email when something you wanted is available again",
  },
];

// Saved against the account, so the same preferences follow you to another
// device. What is still missing is the other end: nothing sends these emails
// yet, so a row records an intention rather than subscribing you to anything.
function NotificationsSection() {
  const { user, setNotification } = useAuth();
  const [error, setError] = useState("");

  const change = async (key, value) => {
    setError("");
    try {
      await setNotification(key, value);
    } catch (failure) {
      setError(failure.message ?? "That preference could not be saved");
    }
  };

  return (
    <SettingsSection
      title="Notifications"
      description="Choose which emails Steppe Gut sends you. Order confirmations and delivery updates are recommended"
    >
      <div className="divide-y divide-forest/10">
        {NOTIFICATION_ROWS.map((row) => (
          <Toggle
            key={row.key}
            label={row.label}
            description={row.description}
            checked={Boolean(user.notifications?.[row.key])}
            onChange={(value) => change(row.key, value)}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-4 font-sans text-[14px] text-[#8C3A2B]">
          {error}
        </p>
      )}
    </SettingsSection>
  );
}

// ── Address form (add + edit) ────────────────────────────────────────────
const EMPTY_ADDRESS = {
  label: "",
  name: "",
  line1: "",
  line2: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
};

function AddressForm({ initial, onCancel, onSave }) {
  const [values, setValues] = useState({ ...EMPTY_ADDRESS, ...initial });
  const [error, setError] = useState("");
  const set = (key) => (event) =>
    setValues((v) => ({ ...v, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.name.trim() || !values.line1.trim() || !values.city.trim()) {
      setError("Name, address line 1 and city are required");
      return;
    }
    onSave({
      ...values,
      label: values.label.trim() || "Address",
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[12px] border border-forest/20 bg-cream p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Label" name="label" placeholder="Home, Office…" value={values.label} onChange={set("label")} />
        <Field label="Full name" name="name" autoComplete="name" value={values.name} onChange={set("name")} required />
        <Field label="Address line 1" name="line1" autoComplete="address-line1" value={values.line1} onChange={set("line1")} required className="sm:col-span-2" />
        <Field label="Address line 2" name="line2" autoComplete="address-line2" value={values.line2} onChange={set("line2")} className="sm:col-span-2" />
        <Field label="City / district" name="city" autoComplete="address-level2" value={values.city} onChange={set("city")} required />
        <Field label="Postal code" name="postalCode" autoComplete="postal-code" value={values.postalCode} onChange={set("postalCode")} />
        <Field label="Country" name="country" autoComplete="country-name" value={values.country} onChange={set("country")} />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} />
      </div>
      {error && (
        <p role="alert" className="mt-3 font-sans text-[13px] text-[#8C3A2B]">
          {error}
        </p>
      )}
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-[52px] items-center justify-center rounded-[12px] px-5 font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Cancel
        </button>
        <button type="submit" className={PRIMARY_BTN}>
          Save address
        </button>
      </div>
    </form>
  );
}

// Saved against the account on the server, and read back by the checkout:
// the description below ("addresses you can pick from at checkout") is now a
// description of the behaviour rather than of the intent. The default is the
// one the checkout offers first.
function AddressesSection() {
  const { user, addAddress, updateAddress, removeAddress, setDefaultAddress } =
    useAuth();
  const [mode, setMode] = useState(null); // null | "add" | address id being edited
  const [error, setError] = useState("");
  // The id of whichever row is mid-request, so its buttons can be disabled.
  const [pending, setPending] = useState(null);
  const addresses = user.addresses ?? [];

  // One wrapper for every address call: clear the last error, run it, and
  // show the message if the server refuses.
  const run = async (id, work) => {
    setError("");
    setPending(id);
    try {
      await work();
      return true;
    } catch (failure) {
      setError(failure.message ?? "That address could not be saved");
      return false;
    } finally {
      setPending(null);
    }
  };

  return (
    <SettingsSection
      title="Saved addresses"
      description="Addresses you can pick from at checkout. Your default is used first"
    >
      <ul className="space-y-4">
        {addresses.map((address) => (
          <li key={address.id}>
            {mode === address.id ? (
              <AddressForm
                initial={address}
                onCancel={() => setMode(null)}
                onSave={async (next) => {
                  const ok = await run(address.id, () =>
                    updateAddress(address.id, next)
                  );
                  if (ok) setMode(null);
                }}
              />
            ) : (
              <div className="flex flex-wrap items-start justify-between gap-4 rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-5">
                <div className="flex gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-forest/50"
                  />
                  <div>
                    <p className="flex items-center gap-2 font-sans text-[15px] font-semibold text-forest">
                      {address.label}
                      {address.isDefault && (
                        <span className="rounded-full bg-[#E8EDE4] px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-forest">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="mt-1 font-sans text-[14px] leading-relaxed text-forest/70">
                      {address.name}
                      <br />
                      {address.line1}
                      {address.line2 ? (
                        <>
                          <br />
                          {address.line2}
                        </>
                      ) : null}
                      <br />
                      {[address.city, address.postalCode]
                        .filter(Boolean)
                        .join(" ")}
                      {address.country ? (
                        <>
                          <br />
                          {address.country}
                        </>
                      ) : null}
                      {address.phone ? (
                        <>
                          <br />
                          {address.phone}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        run(address.id, () => setDefaultAddress(address.id))
                      }
                      disabled={pending === address.id}
                      className="inline-flex h-10 items-center rounded-full px-3 font-sans text-[13px] font-semibold text-forest/70 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMode(address.id)}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 font-sans text-[13px] font-semibold text-forest/70 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Pencil size={14} strokeWidth={1.75} aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => run(address.id, () => removeAddress(address.id))}
                    disabled={pending === address.id}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 font-sans text-[13px] font-semibold text-[#8C3A2B] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
                  >
                    <Trash2 size={14} strokeWidth={1.75} aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {addresses.length === 0 && mode !== "add" && (
        <p className="font-sans text-[15px] text-forest/60">
          You have no saved addresses yet
        </p>
      )}

      {error && (
        <p role="alert" className="mt-4 font-sans text-[14px] text-[#8C3A2B]">
          {error}
        </p>
      )}

      {mode === "add" ? (
        <div className="mt-4">
          <AddressForm
            onCancel={() => setMode(null)}
            onSave={async (next) => {
              const ok = await run("add", () => addAddress(next));
              if (ok) setMode(null);
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setMode("add")}
          className={`mt-5 ${OUTLINE_BTN}`}
        >
          <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
          Add address
        </button>
      )}
    </SettingsSection>
  );
}

// ── Recruit friends ─────────────────────────────────────────────────────
// The counterpart to the home page's "Become a Steppe Soldier" button: once
// you're signed in, that button changes to "Recruit a friend" and lands here.
// A referral code derived from the account (no backend), plus a one-click
// copy of the invite link.
function referralCode(user) {
  const first = user.name.trim().split(/\s+/)[0] || "STEPPE";
  // A short, stable suffix so two people called "Sara" don't collide.
  let hash = 0;
  for (const ch of user.email) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `${first.toUpperCase().replace(/[^A-Z0-9]/g, "")}-${hash.toString(36).toUpperCase().slice(0, 4)}`;
}

function RecruitSection() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const code = referralCode(user);
  const link = `https://steppegut.com/?ref=${code}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission) - the code
      // is on screen to copy by hand, so this needs no error state.
    }
  };

  return (
    <section id="recruit" className="scroll-mt-28">
      <div className="border-b border-forest/15 pb-4">
        <h2 className="font-serif text-[26px] font-semibold tracking-[-0.01em] text-forest sm:text-[28px]">
          Recruit a friend
        </h2>
        <p className="mt-2 max-w-[60ch] font-sans text-[15px] leading-relaxed text-forest/65">
          Send someone your link. They get 15% off their first order; you get
          15% off your next one once they&rsquo;ve tried it
        </p>
      </div>
      <div className="mt-6 max-w-[440px]">
        <FieldLabel>Your referral code</FieldLabel>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <span className="inline-flex h-12 flex-1 items-center rounded-lg border border-forest/20 bg-[#FFFDF9] px-4 font-mono text-[15px] tracking-[0.04em] text-forest">
            {code}
          </span>
          <button type="button" onClick={copy} className={OUTLINE_BTN}>
            {copied ? (
              <Check size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Sticky summary card (right column) ───────────────────────────────────
// Same role and panel treatment as the checkout's order-summary column: a
// #FFFDF9 card that stays in view while you work down the form, with a
// left hairline on large screens.
function AccountSummary() {
  const { user, signOut } = useAuth();
  const addresses = user.addresses ?? [];
  const primary = addresses.find((a) => a.isDefault) ?? addresses[0];
  const emailsOn = NOTIFICATION_ROWS.filter((row) =>
    Boolean(user.notifications?.[row.key])
  ).length;
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-6 sm:p-7">
      <h2 className="font-serif text-[22px] font-semibold tracking-[-0.01em] text-forest">
        Your account
      </h2>

      <div className="mt-5 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest font-sans text-[15px] font-semibold text-cream">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-sans text-[15px] font-semibold text-forest">
            {user.name}
          </p>
          <p className="truncate font-sans text-[13px] text-forest/60">
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-forest/15 pt-5">
        <FieldLabel>Default delivery address</FieldLabel>
        {primary ? (
          <p className="mt-2 font-sans text-[14px] leading-relaxed text-forest/70">
            {primary.name}
            <br />
            {primary.line1}
            <br />
            {[primary.city, primary.postalCode].filter(Boolean).join(" ")}
            {primary.country ? (
              <>
                <br />
                {primary.country}
              </>
            ) : null}
          </p>
        ) : (
          <p className="mt-2 font-sans text-[14px] text-forest/55">
            No address saved yet
          </p>
        )}
      </div>

      <div className="mt-5 border-t border-forest/15 pt-5">
        <FieldLabel>Email preferences</FieldLabel>
        <p className="mt-2 font-sans text-[14px] text-forest/70">
          {emailsOn} of {NOTIFICATION_ROWS.length} turned on
        </p>
      </div>

      <button
        type="button"
        onClick={signOut}
        className={`mt-6 w-full ${OUTLINE_BTN}`}
      >
        Sign out
      </button>
    </div>
  );
}

export default function AccountSettings() {
  const { user, loading, offline, openAuthModal } = useAuth();

  return (
    <>
      <PageMeta title="Account Settings · Steppe Gut" noindex />

      {/* Same cream page + nav-clearing top padding as the product page. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[100px] sm:pt-[116px] lg:pt-[150px]"
      >
        <Container width="wide">
          <div className="max-w-[46ch]">
            <h1
              id="page-title"
              tabIndex={-1}
              className="font-serif text-[clamp(2rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-forest outline-none"
            >
              Account settings
            </h1>
            <p className="mt-4 font-sans text-[16px] leading-relaxed text-forest/70">
              Your password, the emails we send you, and the addresses you check
              out with
            </p>
          </div>
        </Container>

        <Container width="wide" className="pb-24 pt-12 sm:pb-32 lg:pb-40">
          {loading ? (
            /* The session is decided by the server, so there is a moment on
               boot where neither state is true yet. Showing the signed-out
               card in that gap would tell a signed-in visitor something
               false, so the page waits instead. */
            <p className="py-16 text-center font-sans text-[15px] text-forest/55">
              Loading your account
            </p>
          ) : offline ? (
            /* Not the same thing as being signed out: the session could not
               be checked at all, so offering the sign-in form would offer
               something that cannot work either. */
            <Reveal>
              <div className="mx-auto max-w-[520px] rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-8 text-center sm:p-12">
                <p className="font-serif text-[24px] font-semibold text-forest">
                  Your account can&rsquo;t be reached
                </p>
                <p className="mx-auto mt-3 max-w-[46ch] font-sans text-[15px] leading-relaxed text-forest/65">
                  Check your connection and reload the page
                </p>
              </div>
            </Reveal>
          ) : !user ? (
            <Reveal>
              <div className="mx-auto max-w-[520px] rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-8 text-center sm:p-12">
                <p className="font-serif text-[24px] font-semibold text-forest">
                  You&rsquo;re signed out
                </p>
                <p className="mx-auto mt-3 max-w-[46ch] font-sans text-[15px] leading-relaxed text-forest/65">
                  Sign in to manage your password, notifications and saved
                  addresses
                </p>
                <button
                  type="button"
                  onClick={() => openAuthModal("signin")}
                  className={`mt-6 w-full ${PRIMARY_BTN}`}
                >
                  Sign in
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[55fr_45fr]">
              {/* LEFT: stacked settings sections, checkout-style rhythm. */}
              <div className="order-2 space-y-12 lg:order-1 lg:pr-14">
                <Reveal>
                  <PasswordSection />
                </Reveal>
                <Reveal>
                  <NotificationsSection />
                </Reveal>
                <Reveal>
                  <AddressesSection />
                </Reveal>
                <Reveal>
                  <RecruitSection />
                </Reveal>
              </div>

              {/* RIGHT: sticky account summary, checkout order-summary style. */}
              <aside className="order-1 lg:sticky lg:top-[110px] lg:order-2 lg:self-start lg:border-l lg:border-forest/15 lg:pl-14">
                <Reveal>
                  <AccountSummary />
                </Reveal>
              </aside>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
