import { ClassDeclaration } from 'ts-morph';

export const isAngularModule = (classDeclaration: ClassDeclaration): boolean => {
  return classDeclaration.getDecorators()
    .some(decorator => decorator.getName() === 'NgModule');
};

export const isAngularComponent = (classDeclaration: ClassDeclaration): boolean => {
  return classDeclaration.getDecorators()
    .some(decorator => decorator.getName() === 'Component');
};

export const isAngularDirective = (classDeclaration: ClassDeclaration): boolean => {
  return classDeclaration.getDecorators()
    .some(decorator => decorator.getName() === 'Directive');
};

export const isAngularPipe = (classDeclaration: ClassDeclaration): boolean => {
  return classDeclaration.getDecorators()
    .some(decorator => decorator.getName() === 'Pipe');
};

export const isAngularInjectable = (classDeclaration: ClassDeclaration): boolean => {
  return classDeclaration.getDecorators()
    .some(decorator => decorator.getName() === 'Injectable');
};

