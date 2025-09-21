import { type Identifier, StringLiteral } from 'ts-morph';

/**
 * Converts a StringLiteral or Identifier to a string.
 * @see StringLiteral
 * @see Identifier
 */
export const asString = (value: StringLiteral | Identifier): string => {
  if (value instanceof StringLiteral) {
    return value.getLiteralText();
  }

  return value.getText();
};

export const throws = (message: string): never => {
  throw new Error(message);
};
