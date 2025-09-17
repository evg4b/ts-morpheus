import { type ImportDeclaration, type SourceFile } from 'ts-morph';

/**
 * Find import declaration by module name in source file
 * @param sourceFile - the source file to search in
 * @param moduleName - the module name to search for
 */
export const getImportDeclaration = (sourceFile: SourceFile, moduleName: string): ImportDeclaration | null => {
  return sourceFile.getImportDeclarations()
      .find(declaration => declaration.getModuleSpecifier().getLiteralValue() === moduleName)
    ?? null;
};

/**
 * Get import declaration or throw error if not found
 * @param sourceFile {SourceFile}
 * @param moduleName {string}
 * @throws {Error} if declaration not found
 */
export const getImportDeclarationOrThrow = (sourceFile: SourceFile, moduleName: string): ImportDeclaration => {
  const declaration = getImportDeclaration(sourceFile, moduleName);
  if (!declaration) {
    throw new Error(`Module ${ moduleName } not found`);
  }

  return declaration;
};

