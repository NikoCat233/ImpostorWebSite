import {
  AfterViewInit,
  Component,
  DestroyRef,
  HostListener,
  inject,
  signal,
} from "@angular/core";
import { IconComponent } from "./icon.component";
import { LanguageService } from "./language";
import { PolicyComponent } from "./policy.component";
import { moddedRegions, regions, regionUrl } from "./regions";
import { StatusService } from "./status.service";
import { ThemeService } from "./theme.service";

@Component({
  selector: "niko-app",
  imports: [IconComponent, PolicyComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements AfterViewInit {
  readonly i18n = inject(LanguageService);
  readonly status = inject(StatusService);
  readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  readonly t = this.i18n.text;
  readonly regions = regions;
  readonly moddedRegions = moddedRegions;
  readonly regionUrl = regionUrl;
  readonly active = signal("overview");
  readonly expanded = signal(new Set<string>());
  readonly mobileMenu = signal(false);
  readonly copied = signal("");
  readonly toast = signal("");
  readonly gamePath = "%userprofile%\\AppData\\LocalLow\\Innersloth\\Among Us";
  readonly storePath =
    "%userprofile%\\AppData\\Local\\Packages\\Innersloth.AmongUs_fw5x688tam7rm\\SystemAppData\\wgs";
  readonly pluginPath = "Among Us\\BepInEx\\config";
  readonly storeImages = [
    "microsoft-data-folder.png",
    "microsoft-data-folder-2.png",
    "microsoft-data-folder-3.png",
    "microsoft-data-folder-4.png",
  ];
  private toastTimer?: ReturnType<typeof setTimeout>;
  private observer?: IntersectionObserver;
  private firstFrame?: number;

  ngAfterViewInit() {
    this.firstFrame = requestAnimationFrame(() => this.readHash());
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((section) => this.observer!.observe(section));
    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
      if (this.firstFrame) cancelAnimationFrame(this.firstFrame);
      clearTimeout(this.toastTimer);
    });
  }

  @HostListener("window:hashchange") readHash() {
    const aliases: Record<string, string> = {
      install: "pc",
      mobile: "phone",
      rules: "policy",
      support: "contact",
    };
    const hash = location.hash.slice(1);
    const id = aliases[hash] || hash;
    if (id && document.getElementById(id)) this.reveal(id, false);
  }

  @HostListener("document:keydown.escape") closeMenu() {
    this.mobileMenu.set(false);
  }

  navigate(event: MouseEvent, id: string) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    history.pushState(null, "", `#${id}`);
    this.reveal(id, true);
  }

  private reveal(id: string, focus: boolean) {
    const section = id.split("-")[0];
    if (section === "pc" || section === "phone")
      this.expanded.update((current) => new Set([...current, section]));
    const target = document.getElementById(id);
    if (target instanceof HTMLDetailsElement) target.open = true;
    if (id === "pc")
      (document.getElementById("pc-1") as HTMLDetailsElement).open = true;
    this.active.set(section);
    this.mobileMenu.set(false);
    target?.scrollIntoView({ behavior: "instant", block: "start" });
    if (focus) target?.focus({ preventScroll: true });
  }

  toggleGroup(group: string) {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  async copyPath(path: string) {
    try {
      await navigator.clipboard.writeText(path);
      this.copied.set(path);
      this.toast.set(this.t().copied);
    } catch {
      this.toast.set(this.t().copyFailed);
    }
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toast.set("");
      this.copied.set("");
    }, 3500);
  }

  primaryCommunity() {
    return this.i18n.language() === "zh" ? "/qq" : "/discord";
  }
  communityLinks() {
    const discord = {
      name: "Discord",
      detail: "discord.gg/guf9ca4YSA",
      url: "/discord",
      icon: "/assets/icons/discord.svg",
    };
    const qq = {
      name: this.t().qq,
      detail: "975714136",
      url: "/qq",
      icon: "/assets/icons/qq.svg",
    };
    return this.i18n.language() === "zh" ? [qq, discord] : [discord, qq];
  }
}
