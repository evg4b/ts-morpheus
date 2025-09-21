import { beforeAll, describe, expect, test } from '@rstest/core';
import { type ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  getAngularPipeDecorator,
  getAngularPipeDecoratorOrThrow,
  isAngularPipe,
} from './pipe.ts';

describe('isAngularPipe', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let pipeDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-pipe.ts',
      `
        import { Pipe, PipeTransform } from '@angular/core';

        @Pipe({
          name: 'test'
        })
        export class TestPipe implements PipeTransform {
          transform(value: any): any {
            return value;
          }
        }

        export class TestClass {}
      `,
    );

    pipeDeclaration = sourceFile.getClassOrThrow('TestPipe');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('pipeDeclaration should be recognized as Angular pipe', () => {
    expect(isAngularPipe(pipeDeclaration)).toBe(true);
  });

  test('testClassDeclaration should not be recognized as Angular pipe', () => {
    expect(isAngularPipe(testClassDeclaration)).toBe(false);
  });
});

describe('getAngularPipeDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let pipeDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-pipe.ts',
      `
        import { Pipe, PipeTransform } from '@angular/core';

        @Pipe({
          name: 'test'
        })
        export class TestPipe implements PipeTransform {
          transform(value: any): any {
            return value;
          }
        }

        export class TestClass {}
      `,
    );

    pipeDeclaration = sourceFile.getClassOrThrow('TestPipe');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Pipe decorator for pipe class', () => {
    const decorator = getAngularPipeDecorator(pipeDeclaration);
    expect(decorator).not.toBeNull();
    expect(decorator?.getName()).toBe('Pipe');
  });

  test('should return null for non-pipe class', () => {
    expect(getAngularPipeDecorator(testClassDeclaration)).toBeNull();
  });
});

describe('getAngularPipeDecoratorOrThrow', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let pipeDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile(
      'test-pipe.ts',
      `
        import { Pipe, PipeTransform } from '@angular/core';

        @Pipe({
          name: 'test'
        })
        export class TestPipe implements PipeTransform {
          transform(value: any): any {
            return value;
          }
        }

        export class TestClass {}
      `,
    );

    pipeDeclaration = sourceFile.getClassOrThrow('TestPipe');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Pipe decorator for pipe class', () => {
    const decorator = getAngularPipeDecoratorOrThrow(pipeDeclaration);
    expect(decorator.getName()).toBe('Pipe');
  });

  test('should throw error for non-pipe class', () => {
    expect(() =>
      getAngularPipeDecoratorOrThrow(testClassDeclaration),
    ).toThrow();
  });
});
