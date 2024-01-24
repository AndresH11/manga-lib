export type ListLatesUpdate = {
  result: string;
  response: string;
  data: Datum[];
  limit: number;
  offset: number;
  total: number;
};

export type Datum = {
  id: string;
  type: RelationshipType;
  attributes: DatumAttributes;
  relationships: Relationship[];
};

export type DatumAttributes = {
  title: Title;
  altTitles: AltTitle[];
  description: PurpleDescription;
  isLocked: boolean;
  links: Links;
  originalLanguage: OriginalLanguage;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: null | string;
  status: Status;
  year: number | null;
  contentRating: string;
  tags: Tag[];
  state: State;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
};

export type AltTitle = {
  ja?: string;
  fr?: string;
  en?: string;
  es?: string;
  pl?: string;
  ru?: string;
  de?: string;
  'pt-br'?: string;
  id?: string;
  'zh-ro'?: string;
  zh?: string;
  'zh-hk'?: string;
  it?: string;
  vi?: string;
  'ja-ro'?: string;
  tr?: string;
  'es-la'?: string;
  ms?: string;
  th?: string;
  ko?: string;
  hr?: string;
  pt?: string;
  ar?: string;
  uk?: string;
  hi?: string;
  'ko-ro'?: string;
  fa?: string;
  ka?: string;
  ne?: string;
};

export type PurpleDescription = {
  en?: string;
  es?: string;
  ru?: string;
  tr?: string;
  'pt-br'?: string;
  fr?: string;
  'es-la'?: string;
  it?: string;
  pt?: string;
  ar?: string;
  ja?: string;
  uk?: string;
};

export type Links = {
  al?: string;
  ap?: string;
  bw?: string;
  kt?: string;
  mu?: string;
  amz?: string;
  ebj?: string;
  mal?: string;
  raw?: string;
  engtl?: string;
  cdj?: string;
  nu?: string;
};

export type OriginalLanguage = 'ja' | 'zh' | 'ko';

export type State = 'published';

export type Status = 'ongoing' | 'completed';

export type Tag = {
  id: string;
  type: TagType;
  attributes: TagAttributes;
  relationships: unknown[];
};

export type TagAttributes = {
  name: Title;
  description: '';
  group: Group;
  version: number;
};

export type Group = 'format' | 'genre' | 'theme' | 'content';

export type Title = {
  en: string;
};

export type TagType = 'tag';

export type Relationship = {
  id: string;
  type: RelationshipType;
  related?: Related;
};

export type Related =
  | 'colored'
  | 'main_story'
  | 'spin_off'
  | 'doujinshi'
  | 'side_story'
  | 'prequel';

export type RelationshipType =
  | 'author'
  | 'artist'
  | 'cover_art'
  | 'manga'
  | 'creator';
