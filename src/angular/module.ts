import type { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular module decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularModuleDecorator = (
  classDeclaration: ClassDeclaration,
): Decorator | null => {
  return classDeclaration.getDecorator('NgModule') ?? null;
};

/**
 * Get the Angular module decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularModuleDecoratorOrThrow = (
  classDeclaration: ClassDeclaration,
): Decorator => {
  return classDeclaration.getDecoratorOrThrow('NgModule');
};

/**
 * Get the Angular module decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const isAngularModule = (
  classDeclaration: ClassDeclaration,
): boolean => {
  return getAngularModuleDecorator(classDeclaration) !== null;
};
