import type { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular directive decorator from a class declaration or null if not found.
 * @param classDeclaration
 */
export const getAngularDirectiveDecorator = (
  classDeclaration: ClassDeclaration,
): Decorator | null => {
  return classDeclaration.getDecorator('Directive') ?? null;
};

/**
 * Get the Angular directive decorator from a class declaration or throw if not found.
 * @param classDeclaration
 */
export const getAngularDirectiveDecoratorOrThrow = (
  classDeclaration: ClassDeclaration,
): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Directive');
};

/**
 * Check if the class is an Angular directive
 * @param classDeclaration
 */
export const isAngularDirective = (
  classDeclaration: ClassDeclaration,
): boolean => {
  return getAngularDirectiveDecorator(classDeclaration) !== null;
};
