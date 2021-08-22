# @theonlydevsever/utilities

![test](https://github.com/theonlydevsever/utilities/actions/workflows/test.yml/badge.svg)
![publish](https://github.com/theonlydevsever/utilities/actions/workflows/publish.yml/badge.svg)

Small & helpful utility functions that everyone is tired of writing

## Install

```
// using yarn
yarn add @theonlydevsever/utilities

// using npm
npm install @theonlydevsever/utilities
```

## forceArray

Sometimes, when retrieving a list of records from a third-party API, you will be sent back an array of records or a single record.

To help standardize workflow in your applications, this function forces the return of an array.

```js
import { forceArray } from "@theonlydevsever/utilities";

const apiResponse1 = "Volition";
const arr1 = forceArray(apiResponse1); // => ["Volition"]

const apiResponse2 = ["Kezia", "Fortress"];
const arr2 = forceArray(apiResponse2); // => ["Kezia", "Fortress"]
```
