import { chapter, genre, image_chapter } from '../type';
import {
  PurpleDescription,
  Links,
  Relationship,
} from './responseDetailsGenres';

export type ResponseDetailMangaDex = {
  path: string;
  url: string;
  author: string;
  title: string;
  status: string;
  genres: genre[];
  chapters: chapter[];
  description: PurpleDescription;
  year: number;
  relationships: Relationship[];
  links: Links;
  originalLanguage: string;
  availableTranslatedLanguages: string[];
};

export type ResponseChapterMangaDex = {
  url?: string;
  path?: string;
  title: string;
  chapter_data: image_chapter[];
  prev_chapter: chapter | null;
  next_chapter: chapter | null;
  externalUrl: string | null;
  pages: number;
};
