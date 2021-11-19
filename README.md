# About

This repo goes step-by-step in the creation of a server using Node + Express and configuring it to use ES6+ syntax with Babel, type checking with TypeScript, style enforcement with TSLint, testing with Jest, and hot reloading with Nodemon.

*Created on November 19, 2021 by DigitalNaut*

*No rights reserved. Clone and use freely, although credits are much appreciated.*

# Resources

The links below were all used in the creation of this project.

## Base tutorials

- [Setting up ES6+ syntax using Babel](https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/)

- [Setting up a Node project with TypeScript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)

- [How to use TypeScript with Node](https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/)

## Additional info

- [Babel with TypesScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)

- [Babel with Typescript Presets](https://babeljs.io/docs/en/babel-preset-typescript)

# Bare Bones Instructions - How to Setup a Node.js + Express Server with Typescript and ES6

## Initialize the Repo

`npx express-generator project-name --no-view`

`cd your-project-name`

## Adjust the file structure

1. Create `/server` folder
2. Include `/bin`, `app.js` and `/routes` in the `/server` folder
3. Rename `www` file in `/bin` to `www.ts`
4. Leave `/public` in root folder

## Install dependencies

`npm install -D npm-run-all typescript tslint nodemon rimraf jest @babel/core @babel/cli @babel/preset-env @babel/preset-typescript`

- **[npm-run-all](https://www.npmjs.com/package/npm-run-all)**: Runs multiple scripts at once

- **[TypeScript](https://www.typescriptlang.org/)**: Type checking during development

- **[TSLint](https://palantir.github.io/tslint/)**: Enforces code formatting rules

- **[Babel](https://babeljs.io/)**: Conversion from JavaScript ES2016+ to ES2015 for compatibility with Node.js

- **[Babel/presets](https://babeljs.io/docs/en/presets/)**: Act as sharable set of Babel plugins and/or config

- **[Jest](https://jestjs.io/)**: Bonus JavaScript testing framework

- **[Nodemon](https://www.npmjs.com/package/nodemon)**: Allows hot reloading on file save

- **[rimraf](https://www.npmjs.com/package/rimraf)**: Removes files, used before applying a new transpilation

## Adding TypeScript types

These are all the required types for the project to work:

`npm install -D @types/express @types/cookie-parser @types/debug @types/express @types/http-server @types/morgan`

## Configure Babel for transpilation

```js
// package.json
{  
  //...
  "babel": {
    "presets": [
      "@babel/preset-typescript",
      "@babel/preset-env"
    ]
  },
  //...
}
```

## Configure TypeScript

`tsc --init`

Reference configuration: 
```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "noEmit": true
  },
  "lib": ["es2015"]
}
```

## Configure TSLint

`./node_modules/.bin/tslint --init`

Reference configuration: 
```json
// tslint.json
{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {},
  "rules": {
    "no-console": false
  },
  "rulesDirectory": []
}
```

### Configure Nodemon

```json
// package.json
//...
"nodemonConfig": {
  "exec": "npm run dev",
  "watch": [ "server/*", "public/*" ],
  "ignore": [ "**/__tests__/**", "*.test.js", "*.spec.js" ] 
}
//...
```

## Configure Jest

```json
// package.json
//...
"jest": {
  "testEnvironment": "node"
}
//...
```

## Convert generated code to ES6+ syntax and TypeScript

These code snippets are meant to replace sections of the generated code by the `express-generator` tool and fix the relative paths after the restructuring of the project above.

You can literally copy and paste the code below into the respective files and not miss anything important:

```js
// bin/www.js -> bin/www.ts
import app from '../app';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('your-project-name:server');
//...
```

```js
// /routes/index.js & /routes/users.js -> to index.ts & users.ts respectively
import express from 'express';
var router = express.Router();
// ...
export default router;
```

```js
// app.js -> app.ts
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
```

*Some files may need to specify TypeScript types in-line to work*


## Configure package.json Scripts

Reference: 
```json
// package.json
  "scripts": {
    "start": "npm run production",
    "dev": "set NODE_ENV=development && npm-run-all build serve",
    "watch": "nodemon",
    "build": "npm-run-all clean transpile",
    "clean": "rimraf dist",
    "transpile": "babel server --out-dir dist --extensions .ts,.tsx",
    "serve": "node ./dist/bin/www",
    "production": "set NODE_ENV=production && npm-run-all build serve",
    "test": "jest",
    "tsc": "tsc"
  },
```

### Base scripts
- **"tsc"**: Configures npm to run the TypeScript Compiler, used internally by Babel

- **"clean"**: Removes the /dist folder to avoid conflicts

- **"serve"**: Runs the Node server with the compiled code

- **"transpile"**: Instructs Babel to transpile to a /dist folder, taking into account TypeScript files. *Unix users may need to add quotes around file extensions: '.ts,.tsx'*

- **"test"**: Runs files marked for testing, usually in the \_\_tests\_\_ directory or files named `*.test.ts`

### Composite scripts
- **"build"**: Removes previous transpilations and creates a new one using Rimraf and then Babel

- **"dev"**: Main script to run and build the server from a compiled and transpiled source by Babel

- **"watch"**: Recommended - Restarts the server and runs the above *dev* script on each file save

- **"production"**: Almost identical to *dev*, but sets a production flag

- **"start"**: Used by web hosting services

# Conclusions

Setting up a Node+Express server can be a long and tedious process, but the results are worth the effort. You should be able to get up and running with this project.

Questions, comments, and suggestions are welcome. 😋
