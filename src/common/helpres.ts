import { Identifier, StringLiteral } from 'ts-morph';

export const toString = (value: StringLiteral | Identifier): string => {
  if (value instanceof StringLiteral) {
    return value.getLiteralText();
  }

  return value.getText();
};

export const throws = (message: string): never => {
  throw new Error(message);
};
