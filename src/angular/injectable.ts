import type { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular injectable decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularInjectableDecorator = (
  classDeclaration: ClassDeclaration,
): Decorator | null => {
  return classDeclaration.getDecorator('Injectable') ?? null;
};

/**
 * Get the Angular injectable decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularInjectableDecoratorOrThrow = (
  classDeclaration: ClassDeclaration,
): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Injectable');
};

/**
 * Check if the class is an Angular injectable
 * @param classDeclaration
 */
export const isAngularInjectable = (
  classDeclaration: ClassDeclaration,
): boolean => {
  return getAngularInjectableDecorator(classDeclaration) !== null;
};
