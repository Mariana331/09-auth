'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api/clientApi';
import { Note } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';
import css from './notesPage.module.css';

interface NotesProps {
  initialData: { notes: Note[]; totalPages: number };
  tag: string | undefined;
}

export default function NotesClient({ initialData, tag }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    updateSearchQuery(value);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: searchQuery.trim() || undefined,
        tag: tag === 'All' ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
    initialData,
  });

  const totalPagesFromData = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        {isSuccess && totalPagesFromData > 1 && (
          <Pagination
            page={currentPage}
            total={totalPagesFromData}
            onChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isSuccess && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        isSuccess && <p className={css.nothing}>No notes found.</p>
      )}
    </div>
  );
}
