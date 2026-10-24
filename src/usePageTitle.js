import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — FIELD` : "FIELD — Everyday clothing";
  }, [title]);
}
