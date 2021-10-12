import { template } from "@/global";

export const API_POSTS = `/posts`;
export const API_POST = template`/posts/${'postSlug'}/`;
export const API_USER_POSTS = template`/posts/user/${'username'}/`;
export const API_COMMENTS = template`/comments/${'postSlug'}/`;
export const API_CHILD_COMMENTS = template`/comments/${'postSlug'}/${'parentCommentId'}/`;

export const API_LOGIN = `/auth/login`;
export const API_REGISTRATION = `/auth/registration`;