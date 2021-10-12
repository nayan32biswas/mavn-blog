export const API_HOST = process.env.VUE_APP_API_HOST;

import voidImage from "./assets/void.jpg";

export const isValidData = (data: any): boolean => (data || data === 0 || data === false);
export const getImageURL = (image: string | null): string => image ? `${API_HOST}/${image}` : voidImage;

export function template(strings: ReadonlyArray<string>, ...keys: ReadonlyArray<any>) {
    return (function (...values: any): string {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach(function (key: any, i: any) {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}