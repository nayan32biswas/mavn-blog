import baseApi from "@/baseApi";
import router from "@/router";
import { setToken, getToken, setUsername, getUsername, removeLocalData, checkTokenValidity } from "@/auth";
import { API_REGISTRATION, API_LOGIN } from "../endpoints";

import { GT_GET_IS_AUTHENTICATED, GT_GET_THIS_USERNAME } from "../getters.names";
import { AC_LOGIN, AC_REGISTRATION, AC_LOGOUT, } from "../actions.names";
import { SET_AUTH, LOGOUT, SET_REGISTRATION } from "../mutations.name";


const state = {
    isAuthenticated: false,
    username: "",
    registrationSuccess: false,
}

export const setAuth = (): void => {
    const token = getToken();
    state.isAuthenticated = checkTokenValidity(token);
    state.username = getUsername();
}
const getters = {
    [GT_GET_IS_AUTHENTICATED]: (state: any) => state.isAuthenticated,
    [GT_GET_THIS_USERNAME]: (state: any) => state.username
}
const actions = {
    [AC_LOGIN]({ commit }: any, payload: any) {
        baseApi.post(API_LOGIN, payload).then(response => {
            commit(SET_AUTH, response.data);
            router.push(`${router.currentRoute.query.afterAuth}`);
        }).catch(error => {
            alert(error);
        })
    },
    [AC_REGISTRATION]({ commit }: any, payload: any) {
        baseApi.post(API_REGISTRATION, payload).then(response => {
            commit(SET_REGISTRATION);
            if (router.currentRoute.query.afterAuth) {
                router.push(`/login?afterAuth=${router.currentRoute.query.afterAuth}`);
            } else {
                router.push('/login');
            }
        }).catch(error => {
            alert(error);
        });
    },
    [AC_LOGOUT]({ commit }: any) {
        commit(LOGOUT);
    }
}
const mutations = {
    [SET_AUTH]: (state: any, auth: any) => {
        const { access, username } = auth;
        setToken(access);
        setUsername(username);
        setAuth();
        return state
    },
    [LOGOUT]: (state: any) => {
        removeLocalData();
        state.isAuthenticated = false;
        state.username = "";
        return state;
    },
    [SET_REGISTRATION]: (state: any) => state.registrationSuccess = true
}

export default {
    state,
    getters,
    actions,
    mutations,
}