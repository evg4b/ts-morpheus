import { beforeAll, describe, expect, test } from '@rstest/core';
import { type ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  getAngularDirectiveDecorator,
  getAngularDirectiveDecoratorOrThrow,
  isAngularDirective,
} from './directive';

describe('isAngularDirective', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let directiveDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-directive.ts',
      `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `,
    );

    directiveDeclaration = sourceFile.getClassOrThrow('TestDirective');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('directiveDeclaration should be recognized as Angular directive', () => {
    expect(isAngularDirective(directiveDeclaration)).toBe(true);
  });

  test('testClassDeclaration should not be recognized as Angular directive', () => {
    expect(isAngularDirective(testClassDeclaration)).toBe(false);
  });
});

describe('getAngularDirectiveDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let directiveDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-directive.ts',
      `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `,
    );

    directiveDeclaration = sourceFile.getClassOrThrow('TestDirective');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Directive decorator for directive class', () => {
    const decorator = getAngularDirectiveDecorator(directiveDeclaration);
    expect(decorator).not.toBeNull();
    expect(decorator?.getName()).toBe('Directive');
  });

  test('should return null for non-directive class', () => {
    expect(getAngularDirectiveDecorator(testClassDeclaration)).toBeNull();
  });
});

describe('getAngularDirectiveDecoratorOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let directiveDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-directive.ts',
      `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `,
    );

    directiveDeclaration = sourceFile.getClassOrThrow('TestDirective');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Directive decorator for directive class', () => {
    const decorator = getAngularDirectiveDecoratorOrThrow(directiveDeclaration);
    expect(decorator.getName()).toBe('Directive');
  });

  test('should throw error for non-directive class', () => {
    expect(() =>
      getAngularDirectiveDecoratorOrThrow(testClassDeclaration),
    ).toThrow();
  });
});
