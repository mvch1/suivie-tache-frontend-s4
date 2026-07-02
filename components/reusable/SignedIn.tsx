"use client";

import { useSession } from "@/app/session.context";
import { ReactNode } from "react";

type SignedInProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function SignedIn({ children, fallback = null }: SignedInProps) {
  const session = useSession();
  return session ? <>{children}</> : <>not loged in</>;
}
