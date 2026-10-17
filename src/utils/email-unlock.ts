/**
 * Scrape-friction encoding for the opt-in email reveal.
 * Not encryption: the public decoder can recover any published address.
 */
export function emailPayload(address: string): string {
  return [...address].map((char, index) =>
    (char.charCodeAt(0) ^ ((index * 17 + 41) % 127)).toString(16).padStart(2, "0"),
  ).join("");
}
