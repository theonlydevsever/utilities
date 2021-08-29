import { capitalize, ExtendedPrimitiveType, forceArray, isValueOfType } from "../utilities";

describe("Utilities Testing", () => {
    describe("capitalize", () => {
        test("returns an empty string if nothing is passed", () => {
            expect(capitalize()).toEqual("");
        });

        test("returns the expected value when an untrimmed string is passed", () => {
            const arg = "  hello   ";
            const expected = "Hello";

            expect(capitalize(arg)).toEqual(expected);
        });

        [
            { arg: "123", expected: "123" },
            { arg: "__Yarp", expected: "__Yarp" },
            { arg: "cereal", expected: "Cereal" },
            { arg: "sOuTh PaRk", expected: "SOuTh PaRk" },
            { arg: "roxy", expected: "Roxy" },
            { arg: "   it's really spacious in here   ", expected: "It's really spacious in here" }
        ].forEach(({ arg, expected }) => {
            test(`returns '${expected}' when '${arg}' is passed`, () => {
                expect(capitalize(arg)).toEqual(expected);
            });
        });
    }); // close describe("capitalize")

    describe("forceArray", () => {
        test("returns an array if an array of values is passed", () => {
            const expected = [1, "Two", true];
            const actual = forceArray(expected);

            expect(actual).toHaveLength(expected.length).toEqual(expected);
        });

        test("returns an array if a single value is passed", () => {
            const value = "Colors 2";
            const expected = [value];
            const actual = forceArray(value);

            expect(actual).toHaveLength(expected.length).toEqual(expected);
        });
    }); // close describe("forceArray")

    describe("isValueOfType", () => {
        const allTypes: ExtendedPrimitiveType[] = [
            "array",
            "bigint",
            "boolean",
            "function",
            "null",
            "number",
            "object",
            "string",
            "symbol",
            "undefined"
        ];

        test("returns 'false' if a type other than 'null' or 'undefined' is expected and undefined is passed", () => {
            const types = allTypes.filter((type) => type !== "null" && type !== "undefined");

            expect(
                isValueOfType(undefined, types[Math.floor(Math.random() * types.length)])
            ).toEqual(false);
        });

        test("returns 'false' if a type other than 'null' or 'undefined' is expected and null is passed", () => {
            const types = allTypes.filter((type) => type !== "null" && type !== "undefined");

            expect(isValueOfType(null, types[Math.floor(Math.random() * types.length)])).toEqual(
                false
            );
        });

        test("returns 'false' if no type is passed", () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - Not passing a type
            expect(isValueOfType(null)).toEqual(false);
        });

        describe("array", () => {
            test("returns 'false' when an array is expected, but the value is not an array", () => {
                const values = [BigInt(12), true, () => ({ id: 1 }), 12, {}, "Hello", Symbol(123)];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "array")
                ).toEqual(false);
            });

            test("returns 'true' when an array is expected and the value is an array", () => {
                expect(isValueOfType(["Dirty", "Nil"], "array")).toEqual(true);
            });
        }); // close describe("array")

        describe("bigint", () => {
            test("returns 'false' when a bigint is expected, but the value is not a bigint", () => {
                const values = [[1, 2, 3], true, () => ({ id: 1 }), 12, {}, "Hello", Symbol(123)];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "bigint")
                ).toEqual(false);
            });

            test("returns 'true' when a bigint is expected and the value is a bigint", () => {
                expect(isValueOfType(BigInt(9007199254740991), "bigint")).toEqual(true);
                expect(isValueOfType(BigInt("9007199254740991"), "bigint")).toEqual(true);
                expect(isValueOfType(BigInt("0x1fffffffffffff"), "bigint")).toEqual(true);
                expect(isValueOfType(BigInt("0o377777777777777777"), "bigint")).toEqual(true);
                expect(
                    isValueOfType(
                        BigInt("0b11111111111111111111111111111111111111111111111111111"),
                        "bigint"
                    )
                ).toEqual(true);
            });
        }); // close describe("bigint")

        describe("boolean", () => {
            test("returns 'false' when a boolean is expected, but the value is not a boolean", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    () => ({ id: 1 }),
                    12,
                    {},
                    "Hello",
                    Symbol(123)
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "boolean")
                ).toEqual(false);
            });

            test("returns 'true' when a boolean is expected and the value is a boolean", () => {
                expect(isValueOfType(true, "boolean")).toEqual(true);
            });
        }); // close describe("boolean")

        describe("function", () => {
            test("return 'false' when a function is expected, but the value is not a function", () => {
                const values = [[1, 2, 3], BigInt(12), true, 12, {}, "Hello", Symbol(123)];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "function")
                ).toEqual(false);
            });

            test("returns 'true' when a function is expected and the value is a function", () => {
                expect(isValueOfType(() => true, "function")).toEqual(true);
                expect(
                    isValueOfType(function () {
                        return true;
                    }, "function")
                ).toEqual(true);
                expect(
                    isValueOfType(function myFavNumber() {
                        return 9;
                    }, "function")
                ).toEqual(true);
            });
        }); // close describe("function")

        describe("null", () => {
            test("returns 'false' when null is expected, but the value is not null", () => {
                const values = [[1, 2, 3], BigInt(12), true, 12, {}, "Hello", Symbol(123)];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "null")
                ).toEqual(false);
            });

            test("returns 'true' when null is expected and the value is null", () => {
                expect(isValueOfType(null, "null")).toEqual(true);
            });
        }); // close describe("null")

        describe("number", () => {
            test("returns 'false' when a number is expected, but the value is not a number", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    true,
                    () => ({ id: 1 }),
                    {},
                    "Hello",
                    Symbol(123)
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "number")
                ).toEqual(false);
            });

            test("returns 'true' when a number is expected and the value is a number", () => {
                expect(isValueOfType(Math.random() * 100, "number")).toEqual(true);
                expect(isValueOfType(Math.random() * 100 * -1, "number")).toEqual(true);
                expect(isValueOfType(Infinity, "number")).toEqual(true);
            });
        }); // close describe("number")

        describe("object", () => {
            test("returns 'false' when an object is expected, but the value is not an object", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    true,
                    () => ({ id: 1 }),
                    1234,
                    "Hello",
                    Symbol(123)
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "object")
                ).toEqual(false);
            });

            test("return 'true' when an object is expected and the value is an object", () => {
                expect(isValueOfType({}, "object")).toEqual(true);
                expect(isValueOfType({ id: 1 }, "object")).toEqual(true);
                expect(isValueOfType(Object(), "object")).toEqual(true);
            });
        }); // close describe("object")

        describe("string", () => {
            test("returns 'false' when a string is expected, but the value is not a string", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    true,
                    () => ({ id: 1 }),
                    1234,
                    { id: 1 },
                    Symbol(123)
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "string")
                ).toEqual(false);
            });

            test("returns 'true' when a string is expected and the value is a string", () => {
                expect(isValueOfType("GOB", "string")).toEqual(true);
                expect(isValueOfType(String(1984), "string")).toEqual(true);
            });
        }); // close describe("string")

        describe("symbol", () => {
            test("returns 'false' when a symbol is expected, but the value is not a symbol", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    true,
                    () => ({ id: 1 }),
                    1234,
                    { id: 1 },
                    "Between The Buried And Me"
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "symbol")
                ).toEqual(false);
            });

            test("returns 'true' when a symbol is expected and the value is a symbol", () => {
                expect(isValueOfType(Symbol(1984), "symbol")).toEqual(true);
            });
        }); // close describe("symbol")

        describe("undefined", () => {
            test("returns 'false' when undefined is expected, but the value is not undefined", () => {
                const values = [
                    [1, 2, 3],
                    BigInt(12),
                    true,
                    () => ({ id: 1 }),
                    1234,
                    { id: 1 },
                    "Between The Buried And Me",
                    Symbol("Dogs Are The Best"),
                    null
                ];

                expect(
                    isValueOfType(values[Math.floor(Math.random() * values.length)], "undefined")
                ).toEqual(false);
            });

            test("returns 'true' when undefined is expected and the value is undefined", () => {
                expect(isValueOfType(undefined, "undefined")).toEqual(true);
            });
        }); // close describe("undefined")
    }); // close describe("isValueOfType")
}); // close describe("Utilities Testing")
