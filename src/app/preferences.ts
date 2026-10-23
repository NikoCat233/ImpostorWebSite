export type Language = "en" | "zh";
export type Theme = "light" | "dark";
export type InstallPlatform = "pc" | "phone";

export function detectInstallPlatform(browser: {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
}): InstallPlatform {
  const mobile = /Android|iPhone|iPad|iPod/i.test(browser.userAgent || "");
  // iPadOS can identify as a Mac when requesting the desktop version of a site.
  const desktopIPad =
    /Mac/i.test(browser.platform || "") && (browser.maxTouchPoints || 0) > 1;
  return mobile || desktopIPad ? "phone" : "pc";
}

export function detectTheme(
  storage: Pick<Storage, "getItem"> | undefined,
  prefersDark: boolean,
): Theme {
  try {
    const saved = storage?.getItem("impostor-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* System preference remains available without storage. */
  }
  return prefersDark ? "dark" : "light";
}

export function detectLanguage(
  storage: Pick<Storage, "getItem"> | undefined,
  languages: readonly string[],
): Language {
  try {
    const saved = storage?.getItem("impostor-language");
    if (saved === "en" || saved === "zh") return saved;
  } catch {
    /* Language detection also works when storage is unavailable. */
  }
  return languages[0]?.toLowerCase().startsWith("zh") ? "zh" : "en";
}
