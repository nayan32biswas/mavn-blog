import jwtDecode from 'jwt-decode';

type strNull = string | null;

export const setToken = (token: any): void => localStorage.setItem("auth_token", token);
export const getToken = (): strNull => localStorage.getItem("auth_token") || "";
export const setUsername = (username: any): void => localStorage.setItem("username", username);
export const getUsername = (): string => localStorage.getItem("username") || "";

export const getAuthorization = (): strNull => {
    const token = getToken();
    if (token) return `Bearer ${token}`;
    return null;
}
export const removeLocalData = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
}
export const checkTokenValidity = (token: any): boolean => {
    if (token) {
        const decode = jwtDecode(token);
        const date = new Date();
        if (new Date(decode.exp * 1000) < date) {
            removeLocalData();
        }
        else {
            return true;
        }
    } else {
        removeLocalData();
    }
    return false;
}