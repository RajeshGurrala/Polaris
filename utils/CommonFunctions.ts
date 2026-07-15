import { readFileSync } from "fs";

export class CommonFunctions {
  async generateStreetName(length: number) {
    return Math.random().toString(20).substring(2, length);
  }

  getAuthToken(stateFilePath: string): string {
  const state = JSON.parse(readFileSync(stateFilePath, "utf-8"));
  const items = state.origins?.flatMap((o: any) => o.localStorage) ?? [];
  return items.find((i: any) => i.name === "auth-token")?.value ?? "";
}}