import baseApi from "@/baseApi"

import router from "@/router";

import {
    API_POSTS, API_POST, API_USER_POSTS, API_COMMENTS, API_CHILD_COMMENTS
} from "../endpoints";

import { GT_ALL_POSTS, GT_USER_ALL_POSTS, GT_POST_DETAILS, } from "../getters.names";
import {
    AC_CREATE_POST, AC_FETCH_POSTS, AC_FETCH_POST, AC_FETCH_USER_POST,
    AC_UPDATE_POST, AC_DELETE_POST, AC_ADD_COMMENT, AC_ADD_CHILD_COMMENT,
} from "../actions.names";
import {
    CREATE_POST, SET_POSTS, SET_POST, SET_USER_POST, UPDATE_POST,
    DELETE_POST, ADD_COMMENT, ADD_CHILD_COMMENT
} from "../mutations.name";
import { MULTIPART } from "../store.type";

const state = {
    posts: [],
    userPosts: [],
    details: {}
}
const getters = {
    [GT_ALL_POSTS]: (state: any): any => state.posts,
    [GT_USER_ALL_POSTS]: (state: any): any => state.userPosts,
    [GT_POST_DETAILS]: (state: any): any => state.details,
}
const actions = {
    [AC_CREATE_POST]({ commit }: any, payload: any) {
        baseApi.post(API_POSTS, payload, MULTIPART).then(() => {
            commit(CREATE_POST);
            alert("Created");
        }).catch(error => {
            alert(error);
        });
    },
    [AC_FETCH_POSTS]({ commit }: any) {
        baseApi.get(API_POSTS).then(response => {
            commit(SET_POSTS, response.data);
        }).catch(error => {
            alert(error);
        });
    },
    [AC_FETCH_POST]({ commit }: any, postSlug: string) {
        baseApi.get(API_POST({ postSlug })).then(response => {
            commit(SET_POST, response.data);
        }).catch(error => {
            alert(error);
        });
    },
    [AC_FETCH_USER_POST]({ commit }: any, username: string) {
        baseApi.get(API_USER_POSTS({ username })).then(response => {
            commit(SET_USER_POST, response.data);
        }).catch(error => {
            alert(error);
        });
    },
    [AC_UPDATE_POST]({ commit }: any, { postSlug, payload }: any) {
        baseApi.patch(API_POST({ postSlug }), payload).then(() => {
            commit(UPDATE_POST);
            alert("Updated");
        }).catch(error => {
            alert(error);
        });
    },
    [AC_DELETE_POST]({ commit }: any, postSlug: any) {
        baseApi.delete(API_POST({ postSlug })).then(() => {
            commit(DELETE_POST);
            router.push("/");
        }).catch(error => {
            alert(error);
        });
    },
    [AC_ADD_COMMENT]({ commit }: any, { postSlug, payload }: any) {
        baseApi.post(API_COMMENTS({ postSlug }), payload).then(response => {
            commit(ADD_COMMENT, response.data);
        }).catch(error => {
            alert(error);
        });
    },
    [AC_ADD_CHILD_COMMENT]({ commit }: any, { postSlug, parentCommentId, payload }: any) {
        baseApi.post(API_CHILD_COMMENTS({ postSlug, parentCommentId }), payload).then(response => {
            commit(ADD_CHILD_COMMENT, response.data);
        }).catch(error => {
            alert(error);
        });
    },
}
const mutations = {
    [CREATE_POST]: (state: any) => {
        state.details = {};
        return state;
    },
    [SET_POSTS]: (state: any, posts: any) => (state.posts = posts.results),
    [SET_USER_POST]: (state: any, posts: any) => (state.userPosts = posts.results),
    [SET_POST]: (state: any, post: any) => {
        post.comments = Object.values(
            post.comments.reduce((value: any, comment: any) => {
                if (!comment.parent) {
                    comment.child = [];
                    value[comment._id] = comment;
                } else value[comment.parent].child.push(comment);
                return value;
            }, {})
        );
        state.details = post;
        return state
    },
    [UPDATE_POST]: (state: any) => {
        state.details = {};
        return state;
    },
    [DELETE_POST]: (state: any) => {
        state.details = {};
        return state;
    },
    [ADD_COMMENT]: (state: any, comment: any) => {
        console.log(comment);
        return state;
    },
    [ADD_CHILD_COMMENT]: (state: any, comment: any) => {
        console.log(comment);
        return state;
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}