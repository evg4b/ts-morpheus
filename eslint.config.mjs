import js from '@eslint/js';
import { defineConfig } from '@rslib/core';
import globals from 'globals';
import ts from 'typescript-eslint';

export default defineConfig(
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
  { ignores: ['dist/', 'docs/'] },
);
