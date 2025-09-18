import { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular component or directive decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularComponentDecorator = (classDeclaration: ClassDeclaration): Decorator | null => {
  return classDeclaration.getDecorator('Component') ?? null;
};

/**
 * Get the Angular component decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularComponentDecoratorOrThrow = (classDeclaration: ClassDeclaration): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Component');
};

/**
 * Check if the class is an Angular component
 * @param classDeclaration
 */
export const isAngularComponent = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularComponentDecorator(classDeclaration) !== null;
};

/**
 * Get the Angular module decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularModuleDecorator = (classDeclaration: ClassDeclaration): Decorator | null => {
  return classDeclaration.getDecorator('NgModule') ?? null;
};

/**
 * Get the Angular module decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularModuleDecoratorOrThrow = (classDeclaration: ClassDeclaration): Decorator => {
  return classDeclaration.getDecoratorOrThrow('NgModule');
};

/**
 * Get the Angular module decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const isAngularModule = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularModuleDecorator(classDeclaration) !== null;
};

/**
 * Get the Angular directive decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularDirectiveDecorator = (classDeclaration: ClassDeclaration): Decorator | null => {
  return classDeclaration.getDecorator('Directive') ?? null;
};

/**
 * Get the Angular directive decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularDirectiveDecoratorOrThrow = (classDeclaration: ClassDeclaration): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Directive');
};

/**
 * Check if the class is an Angular directive
 * @param classDeclaration
 */
export const isAngularDirective = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularDirectiveDecorator(classDeclaration) !== null;
};

/**
 * Get the Angular pipe decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularPipeDecorator = (classDeclaration: ClassDeclaration): Decorator | null => {
  return classDeclaration.getDecorator('Pipe') ?? null;
};

/**
 * Get the Angular pipe decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularPipeDecoratorOrThrow = (classDeclaration: ClassDeclaration): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Pipe');
};

/**
 * Check if the class is an Angular pipe
 * @param classDeclaration
 */
export const isAngularPipe = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularPipeDecorator(classDeclaration) !== null;
};

/**
 * Get the Angular injectable decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularInjectableDecorator = (classDeclaration: ClassDeclaration): Decorator | null => {
  return classDeclaration.getDecorator('Injectable') ?? null;
};

/**
 * Get the Angular injectable decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularInjectableDecoratorOrThrow = (classDeclaration: ClassDeclaration): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Injectable');
};

/**
 * Check if the class is an Angular injectable
 * @param classDeclaration
 */
export const isAngularInjectable = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularInjectableDecorator(classDeclaration) !== null;
};

