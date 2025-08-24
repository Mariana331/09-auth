import { nextServer } from './api';
import { User } from '@/types/user';
import { FetchNotesParams, NotesResponse } from './clientApi';
import { cookies } from 'next/headers';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async ({
  search,
  tag,
  page,
  perPage,
  sortBy,
}: FetchNotesParams): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesResponse>(`/notes`, {
    params: {
      search,
      tag,
      page,
      perPage,
      sortBy,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
