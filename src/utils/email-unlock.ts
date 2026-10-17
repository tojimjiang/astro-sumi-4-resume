/**
 * Scrape-friction encoding for the opt-in email reveal.
 * Address segments are encoded independently so the payload is not one
 * continuous encoded string. This is not encryption: the public decoder can
 * recover any published address.
 */
export function emailPayload(address: string): string {
  return address
    .split(/([@.])/)
    .filter(Boolean)
    .map((chunk) =>
      [...chunk].map((char, index) =>
        (char.charCodeAt(0) ^ ((index * 17 + 41) % 127)).toString(16).padStart(2, "0"),
      ).join(""),
    )
    .join(".");
}
