import type { ClassDeclaration, Decorator } from 'ts-morph';

/**
 * Get the Angular pipe decorator from a class declaration or null if not found.
 * @see classDeclaration
 * @see {Decorator}
 */
export const getAngularPipeDecorator = (
  classDeclaration: ClassDeclaration,
): Decorator | null => {
  return classDeclaration.getDecorator('Pipe') ?? null;
};

/**
 * Get the Angular pipe decorator from a class declaration or throw if not found.
 * @see classDeclaration
 * @see {Decorator}
 */
export const getAngularPipeDecoratorOrThrow = (
  classDeclaration: ClassDeclaration,
): Decorator => {
  return classDeclaration.getDecoratorOrThrow('Pipe');
};

/**
 * Check if the class is an Angular pipe
 * @see classDeclaration
 */
export const isAngularPipe = (classDeclaration: ClassDeclaration): boolean => {
  return getAngularPipeDecorator(classDeclaration) !== null;
};
