import { beforeAll, describe, expect, test } from '@rstest/core';
import { ImportDeclaration, Project, type SourceFile } from 'ts-morph';
import { getImportDeclaration } from './imports';

describe('getImportDeclaration', () => {
  let project: Project;
  let sourceFile: SourceFile;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
      import { something } from 'some-module';
      import { anotherThing } from 'another-module';
    `);
  });

  describe('import exists', () => {
    let declaration: ImportDeclaration | null;

    beforeAll(() => {
      declaration = getImportDeclaration(sourceFile, 'some-module');
    });

    test('declaration should ne defined', () => {
      expect(declaration).toBeDefined();
    });

    test('declaration should be instance of ImportDeclaration', () => {
      expect(declaration).toBeInstanceOf(ImportDeclaration);
    });

    test('declaration should have correct module specifier', () => {
      expect(declaration?.getModuleSpecifier().getLiteralValue()).toBe('some-module');
    });
  });

  test('import does not exist declaration should be null', () => {
    expect(getImportDeclaration(sourceFile, 'non-existent-module')).toBeNull();
  });
});
