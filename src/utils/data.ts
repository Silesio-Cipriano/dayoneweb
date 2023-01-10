import Emoji1 from '../assets/DayOneEmoji/determined-face.svg';
import Emoji2 from '../assets/DayOneEmoji/anguished-face.svg';
import Emoji3 from '../assets/DayOneEmoji/astonished-face.svg';
import Emoji4 from '../assets/DayOneEmoji/rolling-on-the-floor-laughing-2.svg';
import Emoji5 from '../assets/DayOneEmoji/face-with-steam-from-nose.svg';
import Emoji6 from '../assets/DayOneEmoji/face-screaming-in-fear.svg';
import Emoji7 from '../assets/DayOneEmoji/face-with-tongue.svg';
import Emoji8 from '../assets/DayOneEmoji/face-with-monocle.svg';
import Emoji9 from '../assets/DayOneEmoji/zipper-mouth-face.svg';
import Emoji10 from '../assets/DayOneEmoji/Lier.svg';
import Emoji11 from '../assets/DayOneEmoji/writing-hand-1.svg';
import Emoji12 from '../assets/DayOneEmoji/loudly-crying-face.svg';
import Emoji13 from '../assets/DayOneEmoji/dizzy-face.svg';
import Emoji14 from '../assets/DayOneEmoji/face-with-rolling-eyes.svg';
import Emoji15 from '../assets/DayOneEmoji/crying-face.svg';
import Emoji16 from '../assets/DayOneEmoji/face-vomiting.svg';
import { ReactNode } from 'react';
import { NoteData } from './types';

interface IEmojiProps {
  id: number;
  emoji: any;
}
export const emojiData: IEmojiProps[] = [
  {
    id: 0,
    emoji: Emoji1,
  },
  {
    id: 1,
    emoji: Emoji2,
  },
  {
    id: 2,
    emoji: Emoji3,
  },
  {
    id: 3,
    emoji: Emoji4,
  },
  {
    id: 4,
    emoji: Emoji5,
  },
  {
    id: 5,
    emoji: Emoji6,
  },
  {
    id: 6,
    emoji: Emoji7,
  },
  {
    id: 7,
    emoji: Emoji8,
  },
  {
    id: 8,
    emoji: Emoji9,
  },
  {
    id: 9,
    emoji: Emoji10,
  },
  {
    id: 10,
    emoji: Emoji12,
  },
  {
    id: 11,
    emoji: Emoji11,
  },
];

export const dataArray: NoteData[] = [
  {
    note: {
      authorOfTitle: 'Lorenzina Pereira',
      createAt: '23 _ 2022-11-30',
      title:
        'Um homem feliz é aquele que pode ver a beleza na natureza, ouvir a música no silêncio e sentir a presença de Deus em todas as coisas.',
      description:
        'Vivamus velit velit, interdum vel velit ut, auctor ullamcorper elit. Praesent a urna et nibh tempor scelerisque. Nullam consequat, sapien et tempor consectetur, erat ligula tempus mi, ac sollicitudin velit velit vel libero. Pellentesque imperdiet mauris sed purus euismod, et posuere lectus tempor.',
      userId: '1',
      reaction_EmojiId: '1',
      id: '1',
      status: 'true',
    },
    reaction_Emoji: {
      id: '1',
      url: 'https://res.cloudinary.com/dqodxamgl/image/upload/v1672760093/DayOne/Emoji/determined-face_hpcwv9.svg',
    },
  },
];
