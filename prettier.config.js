/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  proseWrap: "always",
  semi: false,
  singleQuote: true,
  useTabs: true,
  overrides: [
    // formatting the package.json with anything other than spaces will cause
    // issues when running install...
    {
      files: ["**/package.json"],
      options: {
        useTabs: false,
      },
    },
  ],
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["class", "className", "ngClass", ".*[cC]lassName"],
  tailwindFunctions: ["clsx", "cn", "cva"],
};

export default config;
