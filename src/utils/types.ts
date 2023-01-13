export type CreateNote = {
  authorOfTitle: string;
  title: string;
  description: string;
  reaction_EmojiId: string;
};

type Reaction_Emoji = {
  id: string;
  url: string;
};

export type Note = {
  id: string;
  authorOfTitle: string;
  title: string;
  description: string;
  image?: string;
  createAt: string;
  userId: string;
  categoryId?: string;
  status: string;
  reaction_EmojiId: string;
};

export type NoteData = {
  note: Note;
  reaction_Emoji: Reaction_Emoji;
};

export type ModalNotification = {
  title: string;
  variant: 'Sucess' | 'Warning' | 'Error';
  description: string;
};
