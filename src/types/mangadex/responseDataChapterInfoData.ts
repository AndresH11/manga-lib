export type ResponseDataChapterInfoData = {
  result: string;
  response: string;
  data: Data;
};

type Data = {
  id: string;
  type: string;
  attributes: DataAttributes;
  relationships: Relationship[];
};

type DataAttributes = {
  volume: null;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl: null;
  publishAt: Date;
  readableAt: Date;
  createdAt: Date;
  updatedAt: Date;
  pages: number;
  version: number;
};

type Relationship = {
  id: string;
  type: string;
  attributes: RelationshipAttributes;
};

type RelationshipAttributes = {
  name?: string;
  altNames?: unknown[];
  locked?: boolean;
  website?: string;
  ircServer?: null;
  ircChannel?: null;
  discord?: string;
  contactEmail?: string;
  description?: PurpleDescription | null;
  twitter?: string;
  mangaUpdates?: null;
  focusedLanguages?: string[];
  official?: boolean;
  verified?: boolean;
  inactive?: boolean;
  publishDelay?: null;
  exLicensed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  version: number;
  title?: Title;
  altTitles?: AltTitle[];
  isLocked?: boolean;
  links?: Links;
  originalLanguage?: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string;
  status?: string;
  year?: number;
  contentRating?: string;
  tags?: Tag[];
  state?: string;
  chapterNumbersResetOnNewVolume?: boolean;
  availableTranslatedLanguages?: string[];
  latestUploadedChapter?: string;
  username?: string;
  roles?: string[];
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

type PurpleDescription = {
  en: string;
  ru: string;
  uk: string;
  'es-la': string;
  'pt-br': string;
};

type Links = {
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
  type: Type;
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

type Type = 'tag';
