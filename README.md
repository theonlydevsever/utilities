# @theonlydevsever/utilities

![test](https://github.com/theonlydevsever/utilities/actions/workflows/test.yml/badge.svg)
![publish](https://github.com/theonlydevsever/utilities/actions/workflows/publish.yml/badge.svg)
![tag](https://github.com/theonlydevsever/utilities/actions/workflows/tag.yml/badge.svg)

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

| Param | Type | Details | Required |
| --- | --- | --- | ---
| data | `Generic \| Generic[]` | A single value or an array of values | `true`

```js
import { forceArray } from "@theonlydevsever/utilities";

const apiResponse1 = "Volition";
const arr1 = forceArray<string>(apiResponse1); // => ["Volition"]

const apiResponse2 = ["Kezia", "Fortress"];
const arr2 = forceArray<string>(apiResponse2); // => ["Kezia", "Fortress"]
```

## isValueOfType

This function will return whether or not the value passed is of the passed type.

This is useful for standardizing input going in and coming out of a system, as well as ensuring type validity before performing any type specific operations.

| Param | Type | Details | Required |
| --- | --- | --- | ---
| value | `unknown` | This value can be anything | `true`
| type | `ExtendedPrimitiveType` | Can be one of:<ul><li><code>array</code></li><li><code>bigint</code></li><li><code>boolean</code></li><li><code>function</code></li><li><code>null</code></li><li><code>number</code></li><li><code>object</code></li><li><code>string</code></li><li><code>symbol</code></li><li><code>undefined</code></li></ul> | `true`

```js
import { isValueOfType } from "@theonlydevsever/utilities";

const func = () => console.log("Red Stapler");

if (isValueOfType(func, "function")) {
    func();
} else {
    // The value of `func` was not what was expected -- handle this scenario accordingly...
}

// Other Examples
isValueOfType("Pong", "string"); // => true
isValueOfType(42, "array"); // => false
isValueOfType(BigInt(23456), "bigint"); // => true
isValueOfType([1, 2, 3], "array"); // => false
```
