export type ResponseDetailsChapters = {
  result: string;
  response: string;
  data: Datum[];
  limit: number;
  offset: number;
  total: number;
};

type Datum = {
  id: string;
  type: DatumType;
  attributes: DatumAttributes;
  relationships: Relationship[];
};

type DatumAttributes = {
  volume: null | string;
  chapter: string;
  title: string;
  translatedLanguage: EdLanguage;
  externalUrl: null | string;
  publishAt: Date;
  readableAt: Date;
  createdAt: Date;
  updatedAt: Date;
  pages: number;
  version: number;
};

type EdLanguage = 'es-la' | 'en';

type Relationship = {
  id: string;
  type: RelationshipType;
  attributes?: RelationshipAttributes;
};

type RelationshipAttributes = {
  name?: Name;
  altNames?: AltName[];
  locked?: boolean;
  website?: string;
  ircServer?: null;
  ircChannel?: null;
  discord?: Discord | null;
  contactEmail?: ContactEmail;
  description?: null | string;
  twitter?: null | string;
  mangaUpdates?: null | string;
  focusedLanguages?: EdLanguage[];
  official?: boolean;
  verified?: boolean;
  inactive?: boolean;
  publishDelay?: null;
  exLicensed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  version: number;
  username?: Username;
  roles?: Role[];
};

type AltName = {
  en: string;
};

type ContactEmail =
  | 'support@s-bookstore.jp'
  | 'rio.poneglyph.scans@gmail.com'
  | 'losmugiwaraop2012@gmail.com';

type Discord = 'qAkpHxH' | 'E29EnZj';

type Name = 'MangaPlus' | 'Rio Poneglyph Scans' | 'Los Mugiwara Scans';

type Role =
  | 'ROLE_GROUP_MEMBER'
  | 'ROLE_USER'
  | 'ROLE_POWER_UPLOADER'
  | 'ROLE_BOT'
  | 'ROLE_MEMBER'
  | 'ROLE_GROUP_LEADER';

type Username = 'NotXunder' | 'VinsmokeSanjiOP' | 'toy-meiker';

type RelationshipType = 'scanlation_group' | 'manga' | 'user';

type DatumType = 'chapter';
