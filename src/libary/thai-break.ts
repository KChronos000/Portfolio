// // lib/thai-break.ts
// import { Wordcut } from "wordcut";

// let initialized = false;

// function ensureInit() {
//   if (!initialized) {
//     Wordcut.init(); 
//     initialized = true;
//   }
// }

// export function softBreak(text: string, lang: string): string {
//   if (lang !== "th" || !text) return text;

//   ensureInit();

//   try {
//     const cut = Wordcut.cut(text);
//     return cut.split("|").join("\u200B");
//   } catch {
//     return text;
//   }
// }