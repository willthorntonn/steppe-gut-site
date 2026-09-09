"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../auth/AuthProvider";

// /sign-in/ is not a page: it pops the sign-in modal and drops the visitor on
// the home page behind it. Two things arrive here - a bookmark of the old URL,
// and a refused return from Google or from an email link, which carries the
// reason on `?error=` so the modal can say what went wrong.
export default function SignInRedirect() {
  const { openAuthModal } = useAuth();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const failure = params.get("error");
    openAuthModal("signin", failure ?? "");
    router.replace("/");
  }, [openAuthModal, params, router]);

  return null;
}
