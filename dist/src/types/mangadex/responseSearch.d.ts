import { Datum } from './listLatestUpdate';
export type ResponseSearch = {
    result: string;
    response: string;
    data: Datum[];
    limit: number;
    offset: number;
    total: number;
};
export type DatumAttributes = {
    title: Title;
    altTitles: AltTitle[];
    description: PurpleDescription;
    isLocked: boolean;
    links: Links | null;
    originalLanguage: string;
    lastVolume: null | string;
    lastChapter: null | string;
    publicationDemographic: null | string;
    status: Status;
    year: number | null;
    contentRating: ContentRating;
    tags: Tag[];
    state: State;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: null | string;
};
export type AltTitle = {
    en?: string;
    ko?: string;
    ja?: string;
    fr?: string;
    th?: string;
    'zh-hk'?: string;
    'ja-ro'?: string;
    it?: string;
    'zh-ro'?: string;
    zh?: string;
};
export type ContentRating = 'safe' | 'erotica';
export type PurpleDescription = {
    en?: string;
    fr?: string;
    ja?: string;
    ko?: string;
    th?: string;
    'zh-hk'?: string;
    zh?: string;
};
export type Links = {
    ap?: string;
    mu?: string;
    raw?: string;
};
export type State = 'published';
export type Status = 'completed' | 'ongoing';
export type Tag = {
    id: string;
    type: TagType;
    attributes: TagAttributes;
    relationships: unknown[];
};
export type TagAttributes = {
    name: Title;
    description: string;
    group: Group;
    version: number;
};
export type Group = 'genre' | 'format' | 'theme';
export type Title = {
    en?: string;
};
export type TagType = 'tag';
export type Relationship = {
    id: string;
    type: RelationshipType;
    attributes?: RelationshipAttributes;
    related?: string;
};
export type RelationshipAttributes = {
    name?: string;
    imageUrl?: null;
    biography?: Title;
    twitter?: null | string;
    pixiv?: null | string;
    melonBook?: null;
    fanBox?: null;
    booth?: null;
    nicoVideo?: null;
    skeb?: null;
    fantia?: null;
    tumblr?: null | string;
    youtube?: null | string;
    weibo?: null;
    naver?: null;
    website?: null | string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    description?: string;
    volume?: null | string;
    fileName?: string;
    locale?: string;
};
export type RelationshipType = 'author' | 'artist' | 'cover_art' | 'creator' | 'manga';
