import { beforeAll, describe, expect, test } from '@rstest/core';
import { type ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  getAngularComponentDecorator,
  getAngularComponentDecoratorOrThrow,
  isAngularComponent,
} from './component';

describe('isAngularComponent', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let componentDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-component.ts',
      `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `,
    );

    componentDeclaration = sourceFile.getClassOrThrow('TestComponent');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('componentDeclaration should be recognized as Angular component', () => {
    expect(isAngularComponent(componentDeclaration)).toBe(true);
  });

  test('testClassDeclaration should not be recognized as Angular component', () => {
    expect(isAngularComponent(testClassDeclaration)).toBe(false);
  });
});

describe('getAngularComponentDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let componentDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-component.ts',
      `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `,
    );

    componentDeclaration = sourceFile.getClassOrThrow('TestComponent');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Component decorator for component class', () => {
    const decorator = getAngularComponentDecorator(componentDeclaration);
    expect(decorator).not.toBeNull();
    expect(decorator?.getName()).toBe('Component');
  });

  test('should return null for non-component class', () => {
    expect(getAngularComponentDecorator(testClassDeclaration)).toBeNull();
  });
});

describe('getAngularComponentDecoratorOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let componentDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-component.ts',
      `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `,
    );

    componentDeclaration = sourceFile.getClassOrThrow('TestComponent');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Component decorator for component class', () => {
    const decorator = getAngularComponentDecoratorOrThrow(componentDeclaration);
    expect(decorator.getName()).toBe('Component');
  });

  test('should throw error for non-component class', () => {
    expect(() =>
      getAngularComponentDecoratorOrThrow(testClassDeclaration),
    ).toThrow();
  });
});
