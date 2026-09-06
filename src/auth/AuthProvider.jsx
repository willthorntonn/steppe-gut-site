import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Account/session state. Frontend only - there is no backend and nothing here
// talks to a server, exactly like CartProvider. It exists so the header
// account menu, the Edit Profile modal, My Orders and Account Settings have a
// single source of truth for "who is signed in" and can persist edits across
// reloads.
//
// A demo account is seeded on first load so the menu has something to show.
// `signOut()` clears the stored session and the menu falls back to a single
// "Sign in" action that re-seeds the demo account - there is no real login
// screen to send anyone to.
const STORAGE_KEY = "steppe-gut.account.v1";

// The seeded demo account. `avatar: null` means "use the default grey icon"
// (the nav supplies the fallback image); once a picture is uploaded it is
// stored here as a data URL.
const DEMO_ACCOUNT = {
  signedIn: true,
  name: "Anzhelika Batbayar",
  // Seed email. Editable from Edit Profile, but only after a mock 6-digit
  // verification step (updateEmail, below) - no code is really sent.
  email: "anzhelika@steppegut.com",
  avatar: null,
  notifications: {
    // The weekly dispatch comes with an account (you gave us an email);
    // productNews is the promotions opt-in, off unless explicitly ticked.
    weeklyDispatch: true,
    orderUpdates: true,
    dispatchAndDelivery: true,
    productNews: false,
    backInStock: false,
  },
  addresses: [
    {
      id: "addr-home",
      label: "Home",
      name: "Anzhelika Batbayar",
      line1: "45/1 Silom Road, Soi 19",
      line2: "Room 415, 4th Floor",
      city: "Bang Rak, Bangkok",
      postalCode: "10500",
      country: "Thailand",
      phone: "+66 97 251 5911",
      isDefault: true,
    },
  ],
};

const AuthContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEMO_ACCOUNT;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEMO_ACCOUNT;
    // A signed-out session is a real, valid state - don't overwrite it with
    // the demo account on the next boot.
    if (parsed.signedIn === false) return { signedIn: false };
    // Defensive merge: a hand-edited or half-written value must not crash the
    // app, and a new field added to DEMO_ACCOUNT later still gets a default.
    return {
      ...DEMO_ACCOUNT,
      ...parsed,
      signedIn: true,
      notifications: { ...DEMO_ACCOUNT.notifications, ...(parsed.notifications ?? {}) },
      addresses: Array.isArray(parsed.addresses)
        ? parsed.addresses
        : DEMO_ACCOUNT.addresses,
    };
  } catch {
    return DEMO_ACCOUNT;
  }
}

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(readStored);

  // Onboarding / sign-in used to be its own route (pages/SignIn). It is now a
  // centred modal that any control can open - the home page's "Become a Steppe
  // Soldier" button, the header's "Sign in", the signed-out account pages.
  // `null` = closed; "create" / "signin" = open on that tab. The modal itself
  // (components/auth/AuthModal) is rendered once, from Layout.
  const [authModal, setAuthModal] = useState(null);
  const openAuthModal = useCallback(
    (mode = "create") => setAuthModal(mode === "signin" ? "signin" : "create"),
    []
  );
  const closeAuthModal = useCallback(() => setAuthModal(null), []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } catch {
      // A full or blocked storage quota is not a reason to break the menu.
    }
  }, [account]);

  // Sign-in restores a fresh demo account rather than whatever half-state was
  // last stored (a signed-out marker has no profile fields to restore).
  const signIn = useCallback(() => setAccount({ ...DEMO_ACCOUNT }), []);
  const signOut = useCallback(() => setAccount({ signedIn: false }), []);

  // Create an account from the onboarding modal (components/auth/AuthModal).
  // Frontend only -
  // nothing is sent anywhere and no password is kept (see changePassword
  // below); the point is that the header menu, My Orders and Account Settings
  // then have a real name / email / photo to show instead of the demo seed.
  // `promotions` is the form's single opt-in tickbox -> the productNews
  // email; the weekly dispatch is on by default because an email was given.
  const register = useCallback((profile) => {
    setAccount({
      signedIn: true,
      name: (profile.name ?? "").trim(),
      email: (profile.email ?? "").trim(),
      avatar: profile.avatar ?? null,
      notifications: {
        weeklyDispatch: true,
        orderUpdates: true,
        dispatchAndDelivery: true,
        productNews: Boolean(profile.promotions),
        backInStock: false,
      },
      addresses: [],
    });
  }, []);

  const updateProfile = useCallback((patch) => {
    // Name and avatar only. Email has its own path (updateEmail) because the
    // UI puts it behind a verification step first.
    setAccount((current) => ({
      ...current,
      ...(patch.name !== undefined ? { name: patch.name } : null),
      ...(patch.avatar !== undefined ? { avatar: patch.avatar } : null),
    }));
  }, []);

  // Called by Edit Profile only after the (mock) 6-digit code is accepted.
  const updateEmail = useCallback((email) => {
    setAccount((current) => ({ ...current, email }));
  }, []);

  const setNotification = useCallback((key, value) => {
    setAccount((current) => ({
      ...current,
      notifications: { ...current.notifications, [key]: value },
    }));
  }, []);

  const addAddress = useCallback((address) => {
    setAccount((current) => {
      const id = `addr-${Date.now().toString(36)}`;
      const first = (current.addresses?.length ?? 0) === 0;
      return {
        ...current,
        addresses: [
          ...(current.addresses ?? []),
          { ...address, id, isDefault: first || Boolean(address.isDefault) },
        ],
      };
    });
  }, []);

  const updateAddress = useCallback((id, patch) => {
    setAccount((current) => ({
      ...current,
      addresses: (current.addresses ?? []).map((address) =>
        address.id === id ? { ...address, ...patch } : address
      ),
    }));
  }, []);

  const removeAddress = useCallback((id) => {
    setAccount((current) => {
      const remaining = (current.addresses ?? []).filter((a) => a.id !== id);
      // If the default was removed, promote the first remaining address so
      // there is always exactly one default when any address exists.
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return { ...current, addresses: remaining };
    });
  }, []);

  const setDefaultAddress = useCallback((id) => {
    setAccount((current) => ({
      ...current,
      addresses: (current.addresses ?? []).map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    }));
  }, []);

  // No password is stored, so there is nothing to check or change. The call
  // exists so Account Settings can show a realistic success state.
  const changePassword = useCallback(() => true, []);

  const value = useMemo(
    () => ({
      account,
      signedIn: Boolean(account?.signedIn),
      user: account?.signedIn ? account : null,
      authModalOpen: authModal !== null,
      authModalMode: authModal,
      openAuthModal,
      closeAuthModal,
      signIn,
      signOut,
      register,
      updateProfile,
      updateEmail,
      setNotification,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      changePassword,
    }),
    [
      account,
      authModal,
      openAuthModal,
      closeAuthModal,
      signIn,
      signOut,
      register,
      updateProfile,
      updateEmail,
      setNotification,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      changePassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
