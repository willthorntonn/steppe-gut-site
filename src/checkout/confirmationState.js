// What the checkout leaves for the confirmation page to read.
//
// Under React Router this rode across as navigation state
// (`navigate("/checkout/confirmation/", { state })`). Next's router carries
// no state with a push, so the same object goes through sessionStorage:
// written just before the push, read and cleared as the confirmation mounts.
// sessionStorage rather than localStorage because it is a one-shot handoff
// within one tab, not something to keep.

const KEY = "steppe-gut.checkout.confirmation";

export function writeConfirmation(state) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Blocked storage: the confirmation will redirect home, which is what a
    // direct visit does too.
  }
}

/** Reads and clears the handoff. Returns null when there is none. */
export function takeConfirmation() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw === null) return null;
    window.sessionStorage.removeItem(KEY);
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
