const fs = require('fs');
const path = require('path');

const dict = [
  [/ماذا/g, "إيه"], [/كيف/g, "إزاي"], [/لماذا/g, "ليه"], [/هل /g, ""],
  [/هذا/g, "ده"], [/هذه/g, "دي"], [/هؤلاء/g, "دول"], [/الذي/g, "اللي"],
  [/التي/g, "اللي"], [/الذين/g, "اللي"], [/نحن /g, "إحنا "], [/الآن/g, "دلوقتي"],
  [/أين/g, "فين"], [/متى/g, "إمتى"], [/سوف /g, "هـ"], [/يجب أن/g, "لازم"],
  [/يجب/g, "لازم"], [/أريد/g, "عايز"], [/تريد/g, "عايز"], [/ليس/g, "مش"],
  [/ليست/g, "مش"], [/لم /g, "ما"], [/لن /g, "مش هـ"], [/هناك/g, "فيه"],
  [/كثيرا/g, "كتير"], [/جدا/g, "قوي"], [/فقط/g, "بس"], [/أيضا/g, "برضو"],
  [/لأن/g, "عشان"], [/عندما/g, "لما"], [/لكن/g, "بس"], [/بدلا من/g, "بدل ما"],
  [/ما هو/g, "إيه هو"], [/ما هي/g, "إيه هي"], [/لا تفعل/g, "ماتعملش"],
  [/لا يمكن/g, "ماينفعش"], [/يمكنك/g, "ممكن"]
];

function translateToEg(fusha) {
  let eg = fusha;
  dict.forEach(([regex, replacement]) => { eg = eg.replace(regex, replacement); });
  return eg;
}

const file = path.join(__dirname, 'src/data/i18n/site-strings.ts');
let content = fs.readFileSync(file, 'utf8');

// For site-strings.ts, we find `{ en: "...", ar: "..." }` and add `arEG: "..."`
content = content.replace(/\{\s*en:\s*(`[^`]*`|"[^"]*"|'[^']*')\s*,\s*ar:\s*(`[^`]*`|"[^"]*"|'[^']*')\s*\}/g, (match, en, ar) => {
  const arStr = ar.substring(1, ar.length - 1);
  const quoteChar = ar[0];
  const egStr = translateToEg(arStr);
  return `{ en: ${en}, ar: ${ar}, arEG: ${quoteChar}${egStr}${quoteChar} }`;
});

fs.writeFileSync(file, content, 'utf8');
console.log("Updated site-strings.ts");
