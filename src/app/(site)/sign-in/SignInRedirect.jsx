"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../auth/AuthProvider";

export default function SignInRedirect() {
  const { openAuthModal } = useAuth();
  const router = useRouter();
  useEffect(() => {
    openAuthModal("signin");
    router.replace("/");
  }, [openAuthModal, router]);
  return null;
}
