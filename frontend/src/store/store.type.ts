export interface PostDetails {
  id: number;
  title: string | null;
}

export const MULTIPART = { headers: { 'content-type': 'multipart/form-data' } };
