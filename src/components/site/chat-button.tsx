"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";

import { MessageIcon } from "@/components/Icons";

declare global {
  interface Window {
    /** The Zendesk widget's API, once its script has loaded. */
    zE?: (...args: unknown[]) => void;
  }
}

/** Opens the Zendesk chat; if it hasn't loaded, goes to the contact page. */
export function ChatButton({ variant = "primary" }: { variant?: "primary" | "outline" }) {
  const router = useRouter();

  const openChat = () => {
    const zE = window.zE;
    if (zE) {
      try {
        zE("messenger", "open");
        return;
      } catch {
        try {
          zE("webWidget", "open");
          return;
        } catch {
          // fall through to the contact page
        }
      }
    }
    router.push("/contact");
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className={clsx(
        "inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl px-5 text-[14.5px] font-semibold transition-colors",
        variant === "primary"
          ? "bg-primary text-white shadow-[0_6px_16px_rgba(0,98,111,0.18)] hover:bg-primary-hover"
          : "border-[1.5px] border-line bg-white text-ink hover:bg-tint",
      )}
    >
      <MessageIcon size={18} />
      Chat with us
    </button>
  );
}
