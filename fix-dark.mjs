import fs from "fs";
import path from "path";

const rules = [
  [/\bbg-black\b/g, "bg-white dark:bg-black"],
  [/\btext-white\b/g, "text-gray-900 dark:text-white"],
  [/bg-\[#0a0a0a\]/g, "bg-white dark:bg-[#0a0a0a]"],
  [/\bborder-white\/10\b/g, "border-black/10 dark:border-white/10"],
  [/\bbg-white\/5\b/g, "bg-black/5 dark:bg-white/5"],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.name.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      let changed = false;
      for (const [pattern, replacement] of rules) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, "utf8");
        console.log("Updated:", fullPath);
      }
    }
  }
}

walk("src");
console.log("Done.");