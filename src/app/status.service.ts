import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from "@angular/core";
import { Counts, parseCounts, regions } from "./regions";

@Injectable({ providedIn: "root" })
export class StatusService {
  readonly counts = signal<Record<string, Counts>>({});
  readonly loading = signal(false);
  readonly available = computed(() => Object.keys(this.counts()).length);
  private controller?: AbortController;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.controller?.abort());
    void this.refresh();
  }

  async refresh() {
    if (this.loading()) return;
    const controller = (this.controller = new AbortController());
    this.loading.set(true);
    this.counts.set({});
    const timeout = setTimeout(() => controller.abort(), 8000);
    await Promise.allSettled(
      regions.map(async (region) => {
        const response = await fetch(`https://${region.host}/api/counts`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Status unavailable");
        const counts = parseCounts(await response.json());
        this.counts.update((current) => ({
          ...current,
          [region.code]: counts,
        }));
      }),
    );
    clearTimeout(timeout);
    this.loading.set(false);
  }
}
