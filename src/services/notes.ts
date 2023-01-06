import { CreateNote } from '../utils/types';
import { api } from './api';

export async function newNoteRequest({
  authorOfTitle,
  description,
  reaction_EmojiId,
  title,
}: CreateNote) {
  await api
    .post('/note', {
      authorOfTitle,
      description,
      reaction_EmojiId,
      title,
    })
    .then((data) => {
      console.log('data', data);
    });
}

export async function deleteNoteRequest(id: string) {
  await api.delete(`/note/${id}`);
}

export async function uploadNoteRequest(
  { authorOfTitle, description, reaction_EmojiId, title }: CreateNote,
  noteId: string
) {
  await api.put(`/note/${noteId}`, {
    authorOfTitle,
    description,
    reaction_EmojiId,
    title,
  });
}
