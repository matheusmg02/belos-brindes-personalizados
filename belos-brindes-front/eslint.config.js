import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      "prefer-const": "error", // Exige o uso de 'const' para variáveis que não são reatribuídas
      "no-console": "warn",    // Aviso ao usar 'console.log()' no código
      "no-unused-vars": "error", // Impede o uso de variáveis não utilizadas
      "no-undef": "error", // Impede o uso de variáveis não declaradas
      "react/jsx-uses-react": "off",     // Não é necessário usar 'React' diretamente no JSX a partir do React 17+
      "react/jsx-uses-vars": "error",    // Garante que as variáveis usadas em JSX sejam tratadas corretamente
      "react/jsx-indent": ["error", 2],  // Exige 2 espaços de indentação para JSX
      "react/jsx-no-duplicate-props": "error", // Proíbe propriedades duplicadas em JSX
      "react/jsx-wrap-multilines": ['error', { declaration: 'parens', assignment: 'parens' }], // Garante quebra de linha adequada no JSX
    }
  }
];