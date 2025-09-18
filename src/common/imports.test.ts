import { beforeAll, beforeEach, describe, expect, test } from '@rstest/core';
import { ImportDeclaration, Project, type SourceFile } from 'ts-morph';
import { addImportDeclaration, getImportDeclaration, getImportDeclarationOrThrow, removeNamedImports } from './imports';

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

describe('getImportDeclarationOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
      import { something } from 'some-module';
      import { anotherThing } from 'another-module';
    `);
  });

  test('import exists declaration should be defined', () => {
    const declaration = getImportDeclarationOrThrow(sourceFile, 'some-module');
    expect(declaration).toBeDefined();
    expect(declaration).toBeInstanceOf(ImportDeclaration);
    expect(declaration?.getModuleSpecifier().getLiteralValue()).toBe('some-module');
  });

  test('import does not exist should throw error', () => {
    expect(() => getImportDeclarationOrThrow(sourceFile, 'non-existent-module'))
      .toThrow('Module non-existent-module not found');
  });
});

describe.skip('addImportDeclaration', () => {
  let project: Project;
  let sourceFile: SourceFile;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
      import { something } from 'some-module';
      import demoModule from 'demo-module';
    `);
  });

  test('should add new import declaration', () => {
    const newDeclaration = addImportDeclaration(sourceFile, {
      namedImports: ['newThing'],
      module: 'new-module',
    });

    expect(newDeclaration).toBeDefined();
    expect(sourceFile.getText()).toMatchSnapshot();
  });

  test('should add new import declaration s', () => {
    const newDeclaration = addImportDeclaration(sourceFile, {
      namedImports: ['something'],
      module: 'some-module',
    });

    expect(newDeclaration).toBeDefined();
    expect(sourceFile.getText()).toMatchSnapshot();
  });

  test('should add new import declaration s', () => {
    const newDeclaration = addImportDeclaration(sourceFile, {
      namedImports: ['something'],
      module: 'demo-module',
    });

    expect(newDeclaration).toBeDefined();
    expect(sourceFile.getText()).toMatchSnapshot();
  });
});

describe('removeNamedImports', () => {
  let project: Project;
  let sourceFile: SourceFile;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
      import { something, somethingOther } from 'some-module';
      import demoModule from 'demo-module';
    `);
  });

  test('should add new import declaration s', () => {
    removeNamedImports(sourceFile, 'some-module', ['something']);

    const imports = sourceFile.getImportDeclarations()
    expect(imports.length).toBe(2);

    expect(imports[0].getNamedImports().length).toBe(1);
    expect(imports[0].getNamedImports()[0].getName()).toBe('somethingOther');
  });
});
