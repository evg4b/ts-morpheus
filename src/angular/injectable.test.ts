import { beforeAll, describe, expect, test } from '@rstest/core';
import { type ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  getAngularInjectableDecorator,
  getAngularInjectableDecoratorOrThrow,
  isAngularInjectable,
} from './injectable';

describe('isAngularInjectable', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let injectableDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-injectable.ts',
      `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `,
    );

    injectableDeclaration = sourceFile.getClassOrThrow('TestService');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('injectableDeclaration should be recognized as Angular injectable', () => {
    expect(isAngularInjectable(injectableDeclaration)).toBe(true);
  });

  test('testClassDeclaration should not be recognized as Angular injectable', () => {
    expect(isAngularInjectable(testClassDeclaration)).toBe(false);
  });
});

describe('getAngularInjectableDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let injectableDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-injectable.ts',
      `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `,
    );

    injectableDeclaration = sourceFile.getClassOrThrow('TestService');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Injectable decorator for injectable class', () => {
    const decorator = getAngularInjectableDecorator(injectableDeclaration);
    expect(decorator).not.toBeNull();
    expect(decorator?.getName()).toBe('Injectable');
  });

  test('should return null for non-injectable class', () => {
    expect(getAngularInjectableDecorator(testClassDeclaration)).toBeNull();
  });
});

describe('getAngularInjectableDecoratorOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let injectableDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-injectable.ts',
      `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `,
    );

    injectableDeclaration = sourceFile.getClassOrThrow('TestService');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Injectable decorator for injectable class', () => {
    const decorator = getAngularInjectableDecoratorOrThrow(
      injectableDeclaration,
    );
    expect(decorator.getName()).toBe('Injectable');
  });

  test('should throw error for non-injectable class', () => {
    expect(() =>
      getAngularInjectableDecoratorOrThrow(testClassDeclaration),
    ).toThrow();
  });
});
