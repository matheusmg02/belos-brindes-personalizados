import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'warn',  // Emite um aviso quando 'console.log' é usado
      'no-unused-vars': 'warn',  // Emite um aviso sobre variáveis não utilizadas
      'semi': ['error', 'always'],  // Exige ponto e vírgula no final das instruções
      'eqeqeq': 'error',  // Exige o uso de '===' ao invés de '=='
    }
  }
];