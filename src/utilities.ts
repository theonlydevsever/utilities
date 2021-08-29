export type PrimitiveType =
    | "bigint"
    | "boolean"
    | "null"
    | "number"
    | "string"
    | "symbol"
    | "undefined";
export type ExtendedPrimitiveType = PrimitiveType | "array" | "function" | "object";

/**
 * Capitalizes a passed string
 *
 * @param value The value to capitalize
 * @returns A capitalized, trimmed copy of the passed value
 */
export const capitalize: (value?: string) => string = (value = "") => {
    const trimmedValue = value.trim();

    return `${trimmedValue.slice(0, 1).toUpperCase()}${trimmedValue.slice(1)}`;
};

/**
 * Forces a value to become nested inside of an array
 *
 * @param data The data to be converted to an array
 * @returns An array of values
 */
export const forceArray: <T>(data: T | T[]) => T[] = <T>(data) => {
    let arrayData: T[] = [];

    if (!Array.isArray(data)) {
        arrayData = [data];
    } else {
        arrayData = data;
    }

    return arrayData;
};

/**
 * Returns whether or not the passed value is of the expected type
 *
 * @param value Any value
 * @param type The type that the value will be evaluated against
 * @returns `true` if the value is of the passed type and `false` if it is not
 */
export const isValueOfType: (value: unknown, type: ExtendedPrimitiveType) => boolean = (
    value,
    type
) => {
    if (type && type !== "null" && type !== "undefined" && !value) return false;

    switch (type) {
        case "array":
            return Array.isArray(value);
        case "bigint":
            return typeof value === "bigint";
        case "boolean":
            return typeof value === "boolean";
        case "function":
            return typeof value === "function";
        case "null":
            return value === null && typeof value === "object";
        case "number":
            return typeof value === "number";
        case "object":
            return typeof value === "object" && value !== null && !Array.isArray(value);
        case "string":
            return typeof value === "string";
        case "symbol":
            return typeof value === "symbol";
        case "undefined":
            return !value && typeof value === "undefined";
        default:
            return false;
    }
};
