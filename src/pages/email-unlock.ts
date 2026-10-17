// Intentionally no email is embedded in source. The optional reveal component
// can be configured with EMAIL_ADDRESS at build time; see README security notes.
export function emailPayload(address: string): string {
  // Lightweight ROT-style obfuscation is scrape friction, not encryption.
  return [...address].map((char, index) =>
    String.fromCharCode(char.charCodeAt(0) ^ ((index * 17 + 41) % 127)),
  ).map((char) => char.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}
