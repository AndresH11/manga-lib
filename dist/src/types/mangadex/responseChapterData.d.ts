export type ResponseChapterData = {
    result: string;
    baseUrl: string;
    chapter: Chapter;
};
type Chapter = {
    hash: string;
    data: string[];
    dataSaver: string[];
};
export {};
