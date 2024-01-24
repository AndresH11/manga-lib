export type ResponseDetailsGenres = {
  result: string;
  response: string;
  data: Data;
};

type Data = {
  id: string;
  type: RelationshipType;
  attributes: DataAttributes;
  relationships: Relationship[];
};

type DataAttributes = {
  title: Title;
  altTitles: AltTitle[];
  description: PurpleDescription;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: string;
  year: number;
  contentRating: string;
  tags: Tag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
};

type AltTitle = {
  ko?: string;
  my?: string;
  th?: string;
  bn?: string;
  ne?: string;
  zh?: string;
  'zh-hk'?: string;
  mn?: string;
  ar?: string;
  fa?: string;
  he?: string;
  vi?: string;
  ru?: string;
  ms?: string;
  uk?: string;
  ta?: string;
  hi?: string;
  kk?: string;
  ja?: string;
};

export type PurpleDescription = {
  en: string;
  ru: string;
  uk: string;
  'es-la': string;
  'pt-br': string;
};

export type Links = {
  al: string;
  ap: string;
  bw: string;
  kt: string;
  mu: string;
  amz: string;
  cdj: string;
  ebj: string;
  mal: string;
  raw: string;
  engtl: string;
};

type Tag = {
  id: string;
  type: TagType;
  attributes: TagAttributes;
  relationships: unknown[];
};

type TagAttributes = {
  name: Title;
  description: string;
  group: string;
  version: number;
};

type Title = {
  en: string;
};

type TagType = 'tag';

export type Relationship = {
  id: string;
  type: RelationshipType;
  attributes?: RelationshipAttributes;
  related?: Related;
};

type RelationshipAttributes = {
  name?: string;
  imageUrl?: null;
  biography?: Title;
  twitter?: null;
  pixiv?: null;
  melonBook?: null;
  fanBox?: null;
  booth?: null;
  nicoVideo?: null;
  skeb?: null;
  fantia?: null;
  tumblr?: null;
  youtube?: null;
  weibo?: null;
  naver?: null;
  website?: null;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  description?: string;
  volume?: string;
  fileName?: string;
  locale?: string;
};

type Related =
  | 'doujinshi'
  | 'side_story'
  | 'spin_off'
  | 'colored'
  | 'adapted_from'
  | 'prequel'
  | 'alternate_version';

type RelationshipType = 'author' | 'artist' | 'cover_art' | 'manga';
