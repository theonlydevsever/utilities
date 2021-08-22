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
