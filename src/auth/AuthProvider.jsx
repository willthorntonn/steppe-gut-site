"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { api, currentUser } from "../api/client";
import { supabaseBrowser } from "../lib/supabase/client";

// Account/session state, backed by Supabase Auth.
//
// What is true here:
//
//   - An account is a row in Supabase Auth. Someone can arrive with an email
//     address and a password, or with Google - both end up at the same
//     account record and the same profile row, so the rest of the app never
//     has to care which way they came in.
//   - The session is a cookie Supabase manages and refreshes. This file never
//     handles a token, which is why `signedIn` is decided by asking rather
//     than by reading a flag out of storage.
//   - `onAuthStateChange` is what keeps this in step. Signing in on another
//     tab, a token refresh, or coming back from Google all arrive through it,
//     so no screen is left showing a session that has ended.
//   - Every mutator below can fail. Each one either returns the updated
//     account or throws an ApiError with a message (and sometimes a `field`)
//     meant to be shown on the form.
//
// The email address is the account's public identity, but it is not the key to
// anything: orders and addresses hang off the account's id, so changing an
// email keeps the history attached.

const AuthContext = createContext(null);

// The keys the old browser-only version wrote. Nothing reads them now, and one
// of them holds a name, an email address and a home address, so they are
// cleared once on boot rather than left behind in everyone's browser.
const LEGACY_KEYS = ["steppe-gut.account.v1", "steppe-gut.orders.v1"];

function forgetLegacyStorage() {
  try {
    for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
  } catch {
    // Blocked storage is not a reason to fail the boot.
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // "loading" until the boot session check answers. Account pages wait on this
  // rather than flashing their signed-out state at someone who is in.
  const [status, setStatus] = useState("loading");
  // The backend could not be reached at all. Distinct from being signed out:
  // it means "we don't know", and it is worth saying so on screen.
  const [offline, setOffline] = useState(false);

  // Onboarding / sign-in is a centred modal any control can open - the home
  // page's "Become a Steppe Soldier" button, the header's "Sign in", the
  // signed-out account pages. `null` = closed.
  const [authModal, setAuthModal] = useState(null);
  // A failure that happened away from the form: coming back from Google
  // refused, mostly. Shown above the button when the modal opens.
  const [authModalError, setAuthModalError] = useState("");

  const openAuthModal = useCallback((mode = "create", message = "") => {
    setAuthModalError(message);
    setAuthModal(mode === "signin" ? "signin" : "create");
  }, []);
  const closeAuthModal = useCallback(() => {
    setAuthModal(null);
    setAuthModalError("");
  }, []);

  const refresh = useCallback(async () => {
    try {
      setUser(await currentUser());
      setOffline(false);
    } catch {
      // Any failure here means the session could not be decided, which is not
      // the same as being signed out. The pages say "can't be reached" rather
      // than "sign in".
      setUser(null);
      setOffline(true);
    } finally {
      setStatus("ready");
    }
  }, []);

  // Guards against a slow refresh landing after a newer one and putting the
  // previous account back on screen.
  const generation = useRef(0);

  useEffect(() => {
    forgetLegacyStorage();
    refresh();

    // Signing in on another tab, a token refresh, and the return from Google
    // all arrive here.
    const { data } = supabaseBrowser().auth.onAuthStateChange((event, session) => {
      const mine = ++generation.current;
      if (!session) {
        setUser(null);
        setStatus("ready");
        return;
      }
      // TOKEN_REFRESHED changes nothing the app displays, so it is not worth
      // a round trip for the profile and the address book.
      if (event === "TOKEN_REFRESHED" && user) return;
      currentUser()
        .then((next) => {
          if (generation.current !== mine) return;
          setUser(next);
          setOffline(false);
        })
        .catch(() => {
          if (generation.current !== mine) return;
          setOffline(true);
        })
        .finally(() => {
          if (generation.current === mine) setStatus("ready");
        });
    });

    return () => data.subscription.unsubscribe();
    // `user` is read inside the listener only to skip needless work on a token
    // refresh; re-subscribing whenever it changes would drop events.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const register = useCallback(async (profile) => {
    const data = await api.register(profile);
    setUser(data.user);
    setOffline(false);
    // `confirmationRequired` is true when Supabase is set to confirm email
    // addresses: the account exists, the link is in the inbox, and nobody is
    // signed in yet. The modal says so rather than pretending otherwise.
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    setUser(data.user);
    setOffline(false);
    return data.user;
  }, []);

  /** Leaves the site for Google and comes back to /auth/callback/. */
  const signInWithGoogle = useCallback((next) => api.signInWithGoogle(next), []);

  const signOut = useCallback(async () => {
    // Cleared here first so the header and the account pages react at once;
    // the request that ends the session follows.
    setUser(null);
    try {
      await api.logout();
    } catch {
      // Nothing to tell the visitor: they asked to be signed out and they are.
    }
  }, []);

  const updateProfile = useCallback(async (patch) => {
    // Name and avatar only. Email has its own path below, because changing it
    // means confirming a link sent to the new address.
    const data = await api.updateProfile({
      ...(patch.name !== undefined ? { name: patch.name } : null),
      ...(patch.avatar !== undefined ? { avatar: patch.avatar } : null),
    });
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Starts an email change. Supabase sends a confirmation link to the new
   * address and the change lands when it is followed - so unlike the old
   * six-digit code, there is nothing for this app to confirm afterwards.
   */
  const requestEmailChange = useCallback((email) => api.requestEmailChange(email), []);

  /** Sends a reset link. Says nothing about whether the address has an
   * account, so this form cannot be used to find out which ones do. */
  const requestPasswordReset = useCallback((email) => api.requestPasswordReset(email), []);

  const setNotification = useCallback(async (key, value) => {
    const data = await api.setNotification(key, value);
    setUser(data.user);
    return data.user;
  }, []);

  const addAddress = useCallback(async (address) => {
    const data = await api.addAddress(address);
    setUser(data.user);
    return data.addresses;
  }, []);

  const updateAddress = useCallback(async (id, patch) => {
    const data = await api.updateAddress(id, patch);
    setUser(data.user);
    return data.addresses;
  }, []);

  const removeAddress = useCallback(async (id) => {
    const data = await api.removeAddress(id);
    setUser(data.user);
    return data.addresses;
  }, []);

  const setDefaultAddress = useCallback(async (id) => {
    const data = await api.setDefaultAddress(id);
    setUser(data.user);
    return data.addresses;
  }, []);

  /**
   * Changes the password. The current one is checked first and a wrong one is
   * refused - Supabase on its own would not ask for it, which would let anyone
   * who found an unlocked laptop take the account.
   */
  const changePassword = useCallback(
    (current, next) => api.changePassword(current, next),
    []
  );

  const value = useMemo(
    () => ({
      user,
      status,
      loading: status === "loading",
      offline,
      signedIn: Boolean(user),
      authModalOpen: authModal !== null,
      authModalMode: authModal,
      authModalError,
      openAuthModal,
      closeAuthModal,
      refresh,
      register,
      signIn,
      signInWithGoogle,
      signOut,
      updateProfile,
      requestEmailChange,
      requestPasswordReset,
      setNotification,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress,
      changePassword,
    }),
    [
      user,
      status,
      offline,
      authModal,
      authModalError,
      openAuthModal,
      closeAuthModal,
      refresh,
      register,
      signIn,
      signInWithGoogle,
      signOut,
      updateProfile,
      requestEmailChange,
      requestPasswordReset,
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
