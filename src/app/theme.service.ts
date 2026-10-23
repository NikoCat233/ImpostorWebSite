import { DestroyRef, Injectable, inject, signal } from "@angular/core";
import { detectTheme, Theme } from "./preferences";

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly system = matchMedia("(prefers-color-scheme: dark)");
  private manuallySelected = false;
  readonly theme = signal<Theme>(this.detect());

  constructor() {
    this.apply();
    const onChange = () => {
      if (!this.manuallySelected) {
        this.theme.set(this.system.matches ? "dark" : "light");
        this.apply();
      }
    };
    this.system.addEventListener("change", onChange);
    inject(DestroyRef).onDestroy(() =>
      this.system.removeEventListener("change", onChange),
    );
  }

  toggle() {
    this.manuallySelected = true;
    this.theme.update((current) => (current === "dark" ? "light" : "dark"));
    try {
      localStorage.setItem("impostor-theme", this.theme());
    } catch {
      /* Session switching still works. */
    }
    this.apply();
  }

  private detect(): Theme {
    let storage: Storage | undefined;
    try {
      storage = localStorage;
      const saved = storage.getItem("impostor-theme");
      this.manuallySelected = saved === "dark" || saved === "light";
    } catch {
      /* Fall back to the system preference. */
    }
    return detectTheme(storage, this.system.matches);
  }

  private apply() {
    document.documentElement.dataset["theme"] = this.theme();
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        this.theme() === "dark" ? "#101114" : "#f7f7fa",
      );
  }
}
