const fs = require('fs');
const path = require('path');

const dict = [
  // Common pronouns and question words
  [/ماذا/g, "إيه"],
  [/كيف/g, "إزاي"],
  [/لماذا/g, "ليه"],
  [/هل /g, ""],
  [/هذا/g, "ده"],
  [/هذه/g, "دي"],
  [/هؤلاء/g, "دول"],
  [/الذي/g, "اللي"],
  [/التي/g, "اللي"],
  [/الذين/g, "اللي"],
  [/نحن /g, "إحنا "],
  [/الآن/g, "دلوقتي"],
  [/أين/g, "فين"],
  [/متى/g, "إمتى"],

  // Verbs and particles
  [/سوف /g, "هـ"],
  [/يجب أن/g, "لازم"],
  [/يجب/g, "لازم"],
  [/أريد/g, "عايز"],
  [/تريد/g, "عايز"],
  [/ليس/g, "مش"],
  [/ليست/g, "مش"],
  [/لم /g, "ما"],
  [/لن /g, "مش هـ"],
  [/هناك/g, "فيه"],

  // Modifiers
  [/كثيرا/g, "كتير"],
  [/جدا/g, "قوي"],
  [/فقط/g, "بس"],
  [/أيضا/g, "برضو"],

  // Connectors
  [/لأن/g, "عشان"],
  [/عندما/g, "لما"],
  [/لكن/g, "بس"],
  [/بدلا من/g, "بدل ما"],

  // Common phrases
  [/ما هو/g, "إيه هو"],
  [/ما هي/g, "إيه هي"],
  [/لا تفعل/g, "ماتعملش"],
  [/لا يمكن/g, "ماينفعش"],
  [/يمكنك/g, "ممكن"],
];

function translateToEg(fusha) {
  let eg = fusha;
  dict.forEach(([regex, replacement]) => {
    eg = eg.replace(regex, replacement);
  });
  return eg;
}

const filesToProcess = [
  'src/data/research/cognitive-knowledge.ts',
  'src/data/research/authority-references.ts'
];

for (const file of filesToProcess) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match t("EN", "AR") and generate t("EN", "AR", "EG")
  // It looks for t( followed by a string, then a comma, then another string, followed by )
  content = content.replace(/t\(\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*,\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*\)/g, (match, en, ar) => {
    // Extract the actual string from the quotes
    const arStr = ar.substring(1, ar.length - 1);
    const quoteChar = ar[0];
    
    const egStr = translateToEg(arStr);
    
    // Only inject if it's actually different or if we want to force it
    return `t(${en}, ${ar}, ${quoteChar}${egStr}${quoteChar})`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}

console.log("Translation injection complete.");
