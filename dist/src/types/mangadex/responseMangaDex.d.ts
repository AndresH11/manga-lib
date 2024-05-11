import { chapter, genre } from '../type';
import { Links, Relationship } from './responseDetailsGenres';
export type ResponseDetailMangaDex = {
    path: string;
    url: string;
    author: string;
    title: string;
    status: string;
    genres: genre[];
    chapters: chapter[];
    description: string;
    year: number;
    relationships: Relationship[];
    links: Links;
    originalLanguage: string;
    availableTranslatedLanguages: string[];
};
export type ResponseChapterMangaDex = {
    limit: number;
    offset: number;
    totalData: number;
    data: Data1[];
};
export type Data1 = {
    chapter: string;
    title: string;
    externalUrl: null;
    pages: number;
    id: string;
};
