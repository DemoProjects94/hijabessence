"use client";

import { useAuth, useSearch } from "@/app/providers";
import { AuthModal } from "./AuthModal";
import { AccountPanel } from "./AccountPanel";
import { SearchModal } from "./SearchModal";

export function GlobalModals() {
  const { isAuthOpen, setIsAuthOpen, user } = useAuth();
  const { isSearchOpen, setIsSearchOpen } = useSearch();

  return (
    <>
      {!user && <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />}
      {user && <AccountPanel isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
