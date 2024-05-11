export type ResponseDataChapterInfoData = {
  result: string;
  response: string;
  data: Datum[];
  limit: number;
  offset: number;
  total: number;
};

export type Datum = {
  id: string;
  type: string;
  attributes: Attributes;
};

export type Attributes = {
  volume: string;
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

export type ResponsePages = {
  result: string;
  baseUrl: string;
  chapter: Chapter;
};

export type Chapter = {
  hash: string;
  data: string[];
  dataSaver: string[];
};

export type PagesResponse = {
  data: string[];
};
