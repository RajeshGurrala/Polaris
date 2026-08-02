import { readFileSync } from "fs";

export class CommonFunctions {
  async generateStreetName(length: number) {
    return Math.random().toString(20).substring(2, length);
  }

getAuthToken(storageStateFilePath: string): string {
  const storageState = JSON.parse(readFileSync(storageStateFilePath, "utf-8"));
  return storageState.origins?.[0]?.localStorage?.find((i:any) => i.name === "auth-token").value;
}}