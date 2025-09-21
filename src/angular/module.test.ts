import { beforeAll, describe, expect, test } from '@rstest/core';
import { type ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  getAngularModuleDecorator,
  getAngularModuleDecoratorOrThrow,
  isAngularModule,
} from './module';

describe('isAngularModule', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let ngModuleDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test.ts',
      `
        import { NgModule } from '@angular/core';
        
        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}
        
        export class TestClass {}
      `,
    );

    ngModuleDeclaration = sourceFile.getClassOrThrow('NgTestModule');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('ngModuleDeclaration should be recognized as Angular module', () => {
    expect(isAngularModule(ngModuleDeclaration)).toBe(true);
  });

  test('testClassDeclaration should not be recognized as Angular module', () => {
    expect(isAngularModule(testClassDeclaration)).toBe(false);
  });
});

describe('getAngularModuleDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let ngModuleDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test.ts',
      `
        import { NgModule } from '@angular/core';

        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}

        export class TestClass {}
      `,
    );

    ngModuleDeclaration = sourceFile.getClassOrThrow('NgTestModule');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return NgModule decorator for module class', () => {
    const decorator = getAngularModuleDecorator(ngModuleDeclaration);
    expect(decorator).not.toBeNull();
    expect(decorator?.getName()).toBe('NgModule');
  });

  test('should return null for non-module class', () => {
    expect(getAngularModuleDecorator(testClassDeclaration)).toBeNull();
  });
});

describe('getAngularModuleDecoratorOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let ngModuleDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test.ts',
      `
        import { NgModule } from '@angular/core';

        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}

        export class TestClass {}
      `,
    );

    ngModuleDeclaration = sourceFile.getClassOrThrow('NgTestModule');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return NgModule decorator for module class', () => {
    const decorator = getAngularModuleDecoratorOrThrow(ngModuleDeclaration);
    expect(decorator.getName()).toBe('NgModule');
  });

  test('should throw error for non-module class', () => {
    expect(() =>
      getAngularModuleDecoratorOrThrow(testClassDeclaration),
    ).toThrow();
  });
});
