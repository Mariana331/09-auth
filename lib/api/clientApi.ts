import { nextServer } from './api';
import { Note, NewNoteData } from '@/types/note';
import { User } from '@/types/user';

export type CheckSessionResponse = {
  success: boolean;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
}

export const fetchNotes = async ({
  search,
  tag,
  page,
  perPage,
  sortBy,
}: FetchNotesParams): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      search,
      tag,
      page,
      perPage,
      sortBy,
    },
  });
  return response.data;
};

export const createNote = async (data: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, data);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/register`, data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/login`, data);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionResponse>(`/auth/session`);
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get<User>('users/me');
  return response.data;
};

export const logOut = async () => {
  const response = await nextServer.post(`/auth/logout`);
  return response.data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
