import { Component, input } from "@angular/core";

@Component({
  selector: "niko-icon",
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path [attr.d]="paths[name()] || paths['arrow']" />
  </svg>`,
  styles: [
    ":host{display:inline-flex;width:20px;height:20px;flex-shrink:0}svg{width:100%;height:100%}",
  ],
})
export class IconComponent {
  readonly name = input("arrow");
  readonly paths: Record<string, string> = {
    image: "M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M8 7h.01",
    sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z",
    moon: "M20 15a8.5 8.5 0 0 1-11-11A9 9 0 1 0 20 15Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    external: "M14 4h6v6m-10 4L20 4M20 14v6H4V4h6",
    chevron: "m9 5 7 7-7 7",
    pc: "M3 4h18v13H3zM8 21h8m-4-4v4",
    phone: "M7 2h10v20H7zM10 5h4m-3 14h2",
    console: "M6 7h12l4 12h-5l-3-4h-4l-3 4H2L6 7Zm0 4h6m-3-3v6m7-3h.01m3 2h.01",
    home: "m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7",
    rules: "M6 3h12v18H6zM9 7h6m-6 5h6m-6 5h4",
    chat: "M21 4H3v13h4v4l5-4h9V4Z",
    download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
    copy: "M9 9h12v12H9zM15 9V3H3v12h6",
    refresh:
      "M20 7v5h-5M4 17v-5h5m-4-4a8 8 0 0 1 13-3l2 2M4 17l2 2a8 8 0 0 0 13-3",
    globe:
      "M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M6 18 18 6",
    check: "m5 12 4 4L19 6",
    mail: "M3 5h18v14H3zM3 5l9 8 9-8",
    info: "M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0ZM12 11v6m0-10h.01",
  };
}
