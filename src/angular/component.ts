import type { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular component or directive decorator from a class declaration or null if not found.
 *
 * @see {ClassDeclaration}
 * @see {Decorator}
 */
export const getAngularComponentDecorator = (
  classDeclaration: ClassDeclaration,
): Decorator | null => {
  return classDeclaration.getDecorator('Component') ?? null;
};

/**
 * Get the Angular component decorator from a class declaration or throw if not found.
 *
 * @see {ClassDeclaration}
 * @see {Decorator}
 */
export const getAngularComponentDecoratorOrThrow = (
  classDeclaration: ClassDeclaration,
): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Component');
};

/**
 * Check if the class is an Angular component
 *
 * @see {ClassDeclaration}
 * @see {Decorator}
 */
export const isAngularComponent = (
  classDeclaration: ClassDeclaration,
): boolean => {
  return getAngularComponentDecorator(classDeclaration) !== null;
};
