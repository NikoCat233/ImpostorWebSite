// Keep canonical names and endpoints aligned with the downloadable region configuration.
export const regions = [
  {
    code: "AS",
    name: "NikoAS",
    area: "asia" as const,
    host: "au-as.niko233.top",
    serverName: "Niko233(AS)",
  },
  {
    code: "NA",
    name: "NikoNA",
    area: "northAmerica" as const,
    host: "au-us.niko233.top",
    serverName: "Niko233(NA)",
  },
  {
    code: "EU3",
    name: "NikoEU3",
    area: "europe" as const,
    host: "au-eu.niko233.top",
    serverName: "Niko233(EU3)",
  },
];

export const moddedRegions = [
  {
    code: "MEU",
    name: "Modded EU",
    host: "au-eu.duikbo.at",
    serverName: "Modded_EU",
  },
  {
    code: "MNA",
    name: "Modded NA",
    host: "aumods.org",
    serverName: "Modded_NA",
  },
  {
    code: "MAS",
    name: "Modded AS",
    host: "au-as.duikbo.at",
    serverName: "Modded_AS",
  },
];

export function regionUrl(region: {
  serverName: string;
  host: string;
}): string {
  return `amongus://init?servername=${region.serverName}&serverport=443&serverip=${encodeURIComponent(`https://${region.host}`)}&usedtls=false`;
}

export interface Counts {
  players: number;
  games: number;
}

export function parseCounts(value: unknown): Counts {
  if (!value || typeof value !== "object")
    throw new Error("Invalid server status");
  const { players, games } = value as Counts;
  if (
    ![players, games].every(
      (n) => typeof n === "number" && Number.isSafeInteger(n) && n >= 0,
    )
  ) {
    throw new Error("Invalid server counts");
  }
  return { players, games };
}
