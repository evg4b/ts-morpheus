import { beforeAll, describe, expect, test } from '@rstest/core';
import { ClassDeclaration, Project, type SourceFile } from 'ts-morph';
import {
  isAngularModule,
  isAngularComponent,
  isAngularDirective,
  isAngularPipe,
  isAngularInjectable,
  getAngularComponentDecorator,
  getAngularComponentDecoratorOrThrow,
  getAngularModuleDecorator,
  getAngularModuleDecoratorOrThrow,
  getAngularDirectiveDecorator,
  getAngularDirectiveDecoratorOrThrow,
  getAngularPipeDecorator,
  getAngularPipeDecoratorOrThrow,
  getAngularInjectableDecorator,
  getAngularInjectableDecoratorOrThrow
} from './angular.ts';

describe('isAngularModule', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let ngModuleDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
        import { NgModule } from '@angular/core';
        
        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}
        
        export class TestClass {}
      `);

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

describe('isAngularComponent', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let componentDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-component.ts', `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `);

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

describe('isAngularDirective', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let directiveDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-directive.ts', `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `);

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

describe('isAngularPipe', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let pipeDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-pipe.ts', `
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
      `);

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

describe('isAngularInjectable', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let injectableDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-injectable.ts', `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `);

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

describe('getAngularComponentDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let componentDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-component.ts', `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `);

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
    sourceFile = project.createSourceFile('test-component.ts', `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-test',
          template: '<div>test</div>'
        })
        export class TestComponent {}

        export class TestClass {}
      `);

    componentDeclaration = sourceFile.getClassOrThrow('TestComponent');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Component decorator for component class', () => {
    const decorator = getAngularComponentDecoratorOrThrow(componentDeclaration);
    expect(decorator.getName()).toBe('Component');
  });

  test('should throw error for non-component class', () => {
    expect(() => getAngularComponentDecoratorOrThrow(testClassDeclaration)).toThrow();
  });
});

describe('getAngularModuleDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let ngModuleDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test.ts', `
        import { NgModule } from '@angular/core';

        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}

        export class TestClass {}
      `);

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
    sourceFile = project.createSourceFile('test.ts', `
        import { NgModule } from '@angular/core';

        @NgModule({
          imports: [],
          exports: []
        })
        export class NgTestModule {}

        export class TestClass {}
      `);

    ngModuleDeclaration = sourceFile.getClassOrThrow('NgTestModule');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return NgModule decorator for module class', () => {
    const decorator = getAngularModuleDecoratorOrThrow(ngModuleDeclaration);
    expect(decorator.getName()).toBe('NgModule');
  });

  test('should throw error for non-module class', () => {
    expect(() => getAngularModuleDecoratorOrThrow(testClassDeclaration)).toThrow();
  });
});

describe('getAngularDirectiveDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let directiveDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-directive.ts', `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `);

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
    sourceFile = project.createSourceFile('test-directive.ts', `
        import { Directive } from '@angular/core';

        @Directive({
          selector: '[appTest]'
        })
        export class TestDirective {}

        export class TestClass {}
      `);

    directiveDeclaration = sourceFile.getClassOrThrow('TestDirective');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Directive decorator for directive class', () => {
    const decorator = getAngularDirectiveDecoratorOrThrow(directiveDeclaration);
    expect(decorator.getName()).toBe('Directive');
  });

  test('should throw error for non-directive class', () => {
    expect(() => getAngularDirectiveDecoratorOrThrow(testClassDeclaration)).toThrow();
  });
});

describe('getAngularPipeDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let pipeDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-pipe.ts', `
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
      `);

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
    sourceFile = project.createSourceFile('test-pipe.ts', `
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
      `);

    pipeDeclaration = sourceFile.getClassOrThrow('TestPipe');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Pipe decorator for pipe class', () => {
    const decorator = getAngularPipeDecoratorOrThrow(pipeDeclaration);
    expect(decorator.getName()).toBe('Pipe');
  });

  test('should throw error for non-pipe class', () => {
    expect(() => getAngularPipeDecoratorOrThrow(testClassDeclaration)).toThrow();
  });
});

describe('getAngularInjectableDecorator', () => {
  let project: Project;
  let sourceFile: SourceFile;

  let injectableDeclaration: ClassDeclaration;
  let testClassDeclaration: ClassDeclaration;

  beforeAll(() => {
    project = new Project({ useInMemoryFileSystem: true });
    sourceFile = project.createSourceFile('test-injectable.ts', `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `);

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
    sourceFile = project.createSourceFile('test-injectable.ts', `
        import { Injectable } from '@angular/core';

        @Injectable({
          providedIn: 'root'
        })
        export class TestService {}

        export class TestClass {}
      `);

    injectableDeclaration = sourceFile.getClassOrThrow('TestService');
    testClassDeclaration = sourceFile.getClassOrThrow('TestClass');
  });

  test('should return Injectable decorator for injectable class', () => {
    const decorator = getAngularInjectableDecoratorOrThrow(injectableDeclaration);
    expect(decorator.getName()).toBe('Injectable');
  });

  test('should throw error for non-injectable class', () => {
    expect(() => getAngularInjectableDecoratorOrThrow(testClassDeclaration)).toThrow();
  });
});
