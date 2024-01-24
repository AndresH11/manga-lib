import { chapter, genre } from '../type';
import { Description, Links, Relationship } from './responseDetailsGenres';
export type responseDetailMangaDex = {
    path: string;
    url: string;
    author: string;
    title: string;
    status: string;
    genres: genre[];
    chapters: chapter[];
    description: Description;
    year: number;
    relationships: Relationship[];
    links: Links;
    originalLanguage: string;
    availableTranslatedLanguages: string[];
};
