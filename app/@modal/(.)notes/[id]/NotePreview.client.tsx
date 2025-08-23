'use client';

import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleBack}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleBack}>
          {children}
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <span className={css.tag}>{note.tag}</span>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
