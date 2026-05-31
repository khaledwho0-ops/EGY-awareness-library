import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Dev scripts (gitignored, on-disk only)
    "test-*.ts",
    "generate-*.js",
    "rebuild-*.js",
    "translate-*.js",
    "git-log.js",
    "scratch/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
