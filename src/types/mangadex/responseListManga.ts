export type responseListMangaDex = {
  totalData: number;
  canNext: boolean;
  canPrev: boolean;
  totalPage?: number;
  currentPage: number;
  data: Data[];
};

export type Data = {
  _id: string;
  image_thumbnail: string;
  title: string;
};
