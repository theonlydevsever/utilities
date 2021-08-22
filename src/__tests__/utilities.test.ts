import { forceArray } from "../utilities";

describe("Utilities Testing", () => {
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
}); // close describe("Utilities Testing")
