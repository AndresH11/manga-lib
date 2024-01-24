import { AbstractMangaFactory, chapter, genre, responseListManga } from '../types/type';
import { responseChapterMangaDex, responseDetailMangaDex } from '../types/mangadex/responseMangaDex';
export declare class Mangadex implements AbstractMangaFactory {
    baseUrl: string;
    all_genres: genre[];
    constructor(baseUrl: string);
    getListByGenre(genre: genre, page?: number | undefined, status?: any, sort?: any): Promise<responseListManga>;
    getListLatestUpdate(page?: number | undefined): Promise<responseListManga>;
    getDetailManga(url: string): Promise<responseDetailMangaDex>;
    getDataChapter(url_chapter: string, url?: string | undefined, path?: string | undefined, prev_chapter?: chapter | undefined, next_chapter?: chapter | undefined): Promise<responseChapterMangaDex>;
    search(keyword: string, page?: number | undefined): Promise<responseListManga>;
}
