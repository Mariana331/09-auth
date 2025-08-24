import { fetchNoteById } from '@/lib/api/serverApi';
import NotePreviewClient from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient>Close</NotePreviewClient>
    </HydrationBoundary>
  );
};

export default NotePreview;
