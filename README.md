# ts-morpheus

[![Node.js CI](https://github.com/evg4b/ts-morpheus/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/evg4b/ts-morpheus/actions/workflows/node.js.yml)

A TypeScript library that provides utilities for working with Angular code
using [ts-morph](https://github.com/dsherret/ts-morph). This library offers a collection of helper functions to analyze,
manipulate, and transform Angular TypeScript code programmatically.

## Features

- **Angular Component Analysis**: Detect and work with Angular components, directives, pipes, modules, and services
- **Import Management**: Add, remove, and modify TypeScript imports declaratively
- **Type-Safe**: Built with TypeScript for full type safety
- **ts-morph Integration**: Seamlessly works with ts-morph AST manipulation

## Installation

```bash
npm install ts-morpheus
# or
yarn add ts-morpheus
```

**Peer Dependencies:**

- `ts-morph`: ^27.0.0

## Usage

### Angular Components

```typescript
import { isAngularComponent, getAngularComponentDecorator } from 'ts-morpheus';
import { Project } from 'ts-morph';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('path/to/component.ts');
const classDeclaration = sourceFile.getClasses()[0];

// Check if class is an Angular component
if (isAngularComponent(classDeclaration)) {
  console.log('This is an Angular component!');
}

// Get the @Component decorator
const decorator = getAngularComponentDecorator(classDeclaration);
```

### Import Management

```typescript
import { addImportDeclaration, removeNamedImports } from 'ts-morpheus';
import { Project } from 'ts-morph';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('path/to/file.ts');

// Add named imports
addImportDeclaration(sourceFile, {
  namedImports: ['Component', 'OnInit'],
  module: '@angular/core'
});

// Remove specific named imports
removeNamedImports(sourceFile, '@angular/core', ['OnInit']);
```

## Development

### Scripts

```bash
# Build the project
yarn build

# Run tests
yarn test

# Run linting
yarn lint

# Format code
yarn format

# Type checking
yarn check

# Generate documentation
yarn docs

# Development mode (watch)
yarn dev
```

### Testing

The project uses [rstest](https://github.com/rsuite/rstest) for testing. Run tests with:

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [ts-morph](https://github.com/dsherret/ts-morph) - TypeScript Compiler API wrapper
- [Angular](https://angular.io/) - The web framework this library is designed to work with
