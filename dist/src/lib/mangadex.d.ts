import { AbstractMangaFactory, genre, responseChapter } from '../types/type';
import { ResponseDetailMangaDex, responseListMangaDex } from '../types/mangadex';
import { Languaje } from '../types/mangadex/languaje';
import { PagesResponse } from '../types/mangadex/responseDataChapterInfoData';
export declare class Mangadex implements AbstractMangaFactory {
    baseUrl: string;
    all_genres: genre[];
    constructor(baseUrl: string);
    getListLatestUpdate(page?: number | undefined, isErotict?: boolean, languje?: string, tags1?: string[], order?: object): Promise<responseListMangaDex>;
    getDetailManga(url: string, languje: Languaje): Promise<ResponseDetailMangaDex>;
    getDataChapter(url_chapter: string, languje?: string, offset?: string, orderBy?: string): Promise<responseChapter>;
    getPages(sourceId: string): Promise<PagesResponse>;
    search(keyword: string, page?: number | undefined): Promise<responseListMangaDex>;
}
