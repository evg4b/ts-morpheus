import { type SourceConfig } from '@rsbuild/core';
import { defineConfig, type Format, type LibConfig } from '@rslib/core';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const source: SourceConfig = {
  entry: readdirSync(join(import.meta.dirname, 'src'), { withFileTypes: false, encoding: 'utf-8' })
    .reduce((entries, name) => ({
      ...entries,
      [name]: join('./src', name, 'index.ts'),
    }), {}),
};

export default defineConfig({
  lib: (['esm', 'cjs'] satisfies Format[])
    .map<LibConfig>(format => ({
      format,
      source,
      syntax: ['node 20'],
      dts: {
        bundle: true,
      },
    })),
});
