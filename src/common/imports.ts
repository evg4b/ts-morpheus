import type { ImportDeclaration, SourceFile } from 'ts-morph';
import { asString } from './helpres';

/**
 * Find import declaration by module name in source file
 * @param sourceFile - the source file to search in
 * @param moduleName - the module name to search for
 */
export const getImportDeclaration = (
  sourceFile: SourceFile,
  moduleName: string,
): ImportDeclaration | null => {
  return (
    sourceFile
      .getImportDeclarations()
      .find(
        (declaration) =>
          declaration.getModuleSpecifier().getLiteralValue() === moduleName,
      ) ?? null
  );
};

/**
 * Get import declaration or throw error if not found
 * @param sourceFile {SourceFile}
 * @param moduleName {string}
 * @throws {Error} if declaration not found
 */
export const getImportDeclarationOrThrow = (
  sourceFile: SourceFile,
  moduleName: string,
): ImportDeclaration => {
  const declaration = getImportDeclaration(sourceFile, moduleName);
  if (!declaration) {
    throw new Error(`Module ${ moduleName } not found`);
  }

  return declaration;
};

/**
 * Descriptor for an import statement
 * @example
 * {
 *    namedImports: ['Component', 'OnInit'],
 *    module: '@angular/core'
 * }
 *
 */
export interface ImportDescriptor {
  namedImports: string[];
  module: string;
}

export const addImportDeclaration = (
  sourceFile: SourceFile,
  newImport: ImportDescriptor,
): ImportDeclaration => {
  const { namedImports, module: moduleName } = newImport;
  const existingDeclaration = getImportDeclaration(sourceFile, moduleName);

  if (!existingDeclaration) {
    return sourceFile.addImportDeclaration({
      namedImports: namedImports,
      moduleSpecifier: moduleName,
    });
  }

  const existing = existingDeclaration
    .getNamedImports()
    .map((namedImportDeclaration) =>
      asString(namedImportDeclaration.getNameNode()),
    );

  for (const name of namedImports) {
    if (!existing.includes(name)) {
      existingDeclaration.addNamedImport(name);
    }
  }

  return existingDeclaration;
};

/**
 * Remove named imports from a module in a source file, if no named imports remain, remove the entire import declaration
 * @param sourceFile
 * @param moduleName
 * @param namedImports
 */
export const removeNamedImports = (
  sourceFile: SourceFile,
  moduleName: string,
  namedImports: string[],
): void => {
  const declaration = getImportDeclaration(sourceFile, moduleName);
  if (!declaration) {
    return;
  }

  declaration.getNamedImports().forEach((namedImportDeclaration) => {
    if (namedImports.includes(asString(namedImportDeclaration.getNameNode()))) {
      namedImportDeclaration.remove();
    }
  });

  if (declaration.getNamedImports().length === 0) {
    declaration.remove();
  }
};
