import { Component, inject, signal } from "@angular/core";
import { LanguageService } from "./language";
import policy from "./policy-data.json";

@Component({
  selector: "niko-policy",
  template: `
    <div class="policy-toolbar">
      <span>{{ i18n.text().updated }}</span>
      <button class="text-button" type="button" (click)="toggleAll()">
        {{ allOpen() ? i18n.text().collapseAll : i18n.text().expandAll }}
      </button>
    </div>
    <div class="policy-list">
      @for (section of policy[i18n.language()]; track section.number) {
        <details
          [open]="opened().has(section.number)"
          (toggle)="onToggle(section.number, $event)"
        >
          <summary>
            {{ section.title
            }}<span class="detail-plus" aria-hidden="true">+</span>
          </summary>
          <div class="policy-body" [innerHTML]="section.html"></div>
        </details>
      }
    </div>
  `,
})
export class PolicyComponent {
  readonly i18n = inject(LanguageService);
  readonly policy = policy;
  readonly opened = signal(new Set<number>());
  allOpen() {
    return this.opened().size === 15;
  }
  toggleAll() {
    this.opened.set(
      this.allOpen()
        ? new Set()
        : new Set(Array.from({ length: 15 }, (_, i) => i + 1)),
    );
  }
  onToggle(number: number, event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    this.opened.update((current) => {
      const next = new Set(current);
      if (open) next.add(number);
      else next.delete(number);
      return next;
    });
  }
}
