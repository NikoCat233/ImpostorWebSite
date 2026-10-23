import { computed, Injectable, signal } from "@angular/core";
import { copy } from "./translations";
import { detectLanguage, Language } from "./preferences";

@Injectable({ providedIn: "root" })
export class LanguageService {
  readonly language = signal<Language>(this.detect());
  readonly text = computed(() => copy[this.language()]);

  constructor() {
    this.updateDocument();
  }

  set(language: Language) {
    this.language.set(language);
    try {
      localStorage.setItem("impostor-language", language);
    } catch {
      /* Optional persistence. */
    }
    this.updateDocument();
  }

  private detect(): Language {
    let storage: Storage | undefined;
    try {
      storage = window.localStorage;
    } catch {
      /* Storage can be blocked. */
    }
    return detectLanguage(
      storage,
      navigator.languages?.length ? navigator.languages : [navigator.language],
    );
  }

  private updateDocument() {
    document.documentElement.lang = this.language() === "zh" ? "zh-CN" : "en";
    document.title = this.text().pageTitle;
  }
}
