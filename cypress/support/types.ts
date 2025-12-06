export type CypressResponse<T extends object> = { data: T[] };

export const SummaryTypes = {
  SERVICE: "service",
  ROUTE: "route",
  ALL: "all",
} as const;

export type SummaryTypes = "service" | "route" | "all";
