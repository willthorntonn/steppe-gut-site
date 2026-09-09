"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../api/client";

// Account/session state, backed by the account API in `server/`.
//
// This used to be a localStorage demo: a seeded account, a sign-in that
// checked nothing, a changePassword that returned true. None of that is true
// any more. What is true now:
//
//   - An account is a row on the server with a scrypt-hashed password. There
//     is nothing to seed and nothing signed in until someone registers.
//   - The session is an HttpOnly cookie. This file never sees a token, which
//     is why `signedIn` is decided by asking the server on boot rather than by
//     reading a flag out of storage.
//   - Every mutator below is a request. They are async and they can fail, so
//     each one either returns the updated account or throws an ApiError with
//     a message (and sometimes a `field`) meant to be shown on the form.
//   - Nothing about the account is cached in localStorage, so the same
//     account looks the same in any browser that signs in.
//
// The email address is still the account's public identity, but it is no
// longer the key to anything: orders and addresses hang off the account's
// server-side id, so changing an email keeps the history attached.

const AuthContext = createContext(null);

// The keys the previous, browser-only version wrote. Nothing reads them now,
// and one of them holds a name, an email address and a home address, so they
// are cleared once on boot rather than left behind in everyone's browser.
// Safe to delete this and its call a few releases after the switch.
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
  // "loading" until the boot session check answers. Account pages wait on
  // this rather than flashing their signed-out state at someone who is in.
  const [status, setStatus] = useState("loading");
  // The API could not be reached at all. Distinct from being signed out: it
  // means "we don't know", and it is worth saying so on screen.
  const [offline, setOffline] = useState(false);

  // Onboarding / sign-in is a centred modal that any control can open - the
  // home page's "Become a Steppe Soldier" button, the header's "Sign in", the
  // signed-out account pages. `null` = closed; "create" / "signin" = open on
  // that tab. The modal itself (components/auth/AuthModal) is rendered once,
  // from Layout.
  const [authModal, setAuthModal] = useState(null);
  const openAuthModal = useCallback(
    (mode = "create") => setAuthModal(mode === "signin" ? "signin" : "create"),
    []
  );
  const closeAuthModal = useCallback(() => setAuthModal(null), []);

  const refresh = useCallback(async () => {
    try {
      const data = await api.session();
      setUser(data?.user ?? null);
      setOffline(false);
    } catch {
      // Any failure here means the session could not be decided, which is not
      // the same as being signed out - a proxy in front of a stopped API
      // answers 500 as readily as the fetch fails outright, so every failure
      // counts. The pages say "can't be reached" rather than "sign in".
      setUser(null);
      setOffline(true);
    } finally {
      setStatus("ready");
    }
  }, []);

  useEffect(() => {
    forgetLegacyStorage();
    refresh();
  }, [refresh]);

  const register = useCallback(async (profile) => {
    const data = await api.register({
      name: profile.name,
      email: profile.email,
      password: profile.password,
      avatar: profile.avatar ?? null,
      promotions: Boolean(profile.promotions),
    });
    setUser(data.user);
    setOffline(false);
    return data.user;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const data = await api.login(email, password);
    setUser(data.user);
    setOffline(false);
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    // Cleared here first so the header and the account pages react at once;
    // the request that ends the session server-side follows. A failure leaves
    // the cookie alive but the screen signed out, and the next boot corrects
    // itself, which is the right way round for a control someone just pressed.
    setUser(null);
    try {
      await api.logout();
    } catch {
      // Nothing to tell the visitor: they asked to be signed out and they are.
    }
  }, []);

  const updateProfile = useCallback(async (patch) => {
    // Name and avatar only. Email has its own path (below) because changing
    // it means confirming a code the server issued.
    const data = await api.updateProfile({
      ...(patch.name !== undefined ? { name: patch.name } : null),
      ...(patch.avatar !== undefined ? { avatar: patch.avatar } : null),
    });
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Starts an email change. The server issues and holds the six-digit code.
   *
   * It also returns it, because nothing can post it to an inbox yet - there is
   * no transactional email in this build. `code` disappears from the response
   * the day that exists (server/routes/auth.js, SG_ECHO_EMAIL_CODES).
   */
  const requestEmailChange = useCallback((email) => api.requestEmailCode(email), []);

  const confirmEmailChange = useCallback(async (code) => {
    const data = await api.confirmEmailCode(code);
    setUser(data.user);
    return data.user;
  }, []);

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
   * Changes the password. The current one is verified server-side, so this
   * throws when it is wrong - the old version returned true unconditionally.
   * Succeeding also ends every other session on the account.
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
      openAuthModal,
      closeAuthModal,
      refresh,
      register,
      signIn,
      signOut,
      updateProfile,
      requestEmailChange,
      confirmEmailChange,
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
      openAuthModal,
      closeAuthModal,
      refresh,
      register,
      signIn,
      signOut,
      updateProfile,
      requestEmailChange,
      confirmEmailChange,
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
