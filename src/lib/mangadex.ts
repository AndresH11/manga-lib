import axios from 'axios';
import { AbstractMangaFactory, genre, responseChapter } from '../types/type';
import {
  ResponseDataChapterInfoData,
  ResponseDetailMangaDex,
  ResponseDetailsGenres,
  ResponseSearch,
  responseListMangaDex,
} from '../types/mangadex';
import { ListLatesUpdate } from '../types/mangadex/listLatestUpdate';
import { Data } from '../types/mangadex/responseListManga';
import { getCover } from '../utils/mangadex';
import { Languaje } from '../types/mangadex/languaje';
import { Tags } from '../types/mangadex/tag';
import { Data1 } from '../types/mangadex/responseMangaDex';
import {
  PagesResponse,
  ResponsePages,
} from '../types/mangadex/responseDataChapterInfoData';

export class Mangadex implements AbstractMangaFactory {
  baseUrl: string;
  all_genres: genre[];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.all_genres = [] as genre[];
  }
  /*getListByGenre(
    genre: genre,
    page?: number | undefined,
    status?: any,
    sort?: any
  ): Promise<responseListManga> {
    throw new Error('Method not implemented.');
  }*/

  async getListLatestUpdate(
    page?: number | undefined,
    isErotict?: boolean,
    languje?: string,
    tags1?: string[],
    order?: object
  ): Promise<responseListMangaDex> {
    let totalData = 0;
    let data: Data[] = [];
    let offset = 0;
    if (page != undefined)
      if (page >= 0 && page <= 9983) offset = page;
      else throw new Error('Offset is out of bound');
    try {
      const tags = await axios.get(`https://api.mangadex.org/manga/tag`);

      const tags2 = tags.data as Tags;

      let includedTagIDs: string[] = [];
      let excludedTagIDs: string[] = [];

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (tags1!.length > 0) {
        includedTagIDs = tags2.data
          .filter((tag) => tags1?.includes(tag.attributes.name.en))
          .map((tag) => tag.id);

        excludedTagIDs = tags2.data
          .filter((tag) => !tags1?.includes(tag.attributes.name.en))
          .map((tag) => tag.id);
      }

      const contentRating = ['safe'];
      if (isErotict) contentRating.push('pornographic', 'erotica', 'uggestive');

      const url =
        languje == 'es'
          ? `https://api.mangadex.org/manga?availableTranslatedLanguage[]=es&availableTranslatedLanguage[]=es-la`
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            `https://api.mangadex.org/manga?availableTranslatedLanguage[]=${languje!}`;

      const response = await axios({
        method: 'GET',
        url: url,
        params: {
          limit: '10',
          offset: offset,
          contentRating: contentRating,
          order: order,
          includedTags: includedTagIDs,
          excludedTags: excludedTagIDs,
        },
      });

      //updatedAt: 'asc',
      //relevance: 'desc',
      //rating: 'asc',
      //createdAt: 'asc',

      const listLatestUpdate = response.data as ListLatesUpdate;

      totalData = listLatestUpdate.total;

      data = await Promise.all(
        listLatestUpdate.data.map(async (manga) => {
          const cover = await getCover(manga);
          return {
            _id: manga.id,
            title: manga.attributes.title.en,
            image_thumbnail: `https://uploads.mangadex.org/covers/${manga.id}/${cover.data.attributes.fileName}`,
          };
        })
      );

      return {
        totalData,
        canNext: offset <= 9967 ? true : false,
        canPrev: offset === 0 ? false : true,
        totalPage: 9983,
        currentPage: offset,
        data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getDetailManga(
    url: string,
    languje: Languaje
  ): Promise<ResponseDetailMangaDex> {
    try {
      const sourceId = url;
      //const genres: genre[] = [] as genre[];
      //Get info Manga like (title, author, tag)
      const responseGenres = await axios.get(
        `https://api.mangadex.org/manga/${sourceId}?includes[]=artist&includes[]=author&includes[]=cover_art`
      );

      const responseGenresAxios = responseGenres.data as ResponseDetailsGenres;
      const infoData = responseGenresAxios.data;
      //const author = infoData.relationships[0].attributes?.name ?? '';
      const title = infoData.attributes.title.en ?? 'null';
      //const status = infoData.attributes.status ?? 'null';
      const description = infoData.attributes.description?.en ?? 'null';
      //const links = infoData.attributes.links;
      //const originalLanguage = infoData.attributes.originalLanguage;
      //const year = infoData.attributes.year;
      //const availableTranslatedLanguages =
      //infoData.attributes.availableTranslatedLanguages;
      //const relationships = infoData.relationships;

      //infoData.attributes.tags.map((e) => {
      //  genres.push({
      //    url: `https://mangadex.org/tag/` + e.id,
      //    name: e.attributes.name.en,
      //    path: '/tag/' + e.id,
      //  });
      //});

      //Get info Manga Chapter
      /*const chapters: chapter[] = [] as chapter[];
      const responseChapters = await axios.get(
        `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=${languje}&includes[]=scanlation_group&&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
      );*/
      /*const responseChaptersAxio =
        responseChapters.data as ResponseDetailsChapters;
      const chapterData = responseChaptersAxio.data;*/
      /*chapterData.map((e) => {
        chapters.push({
          path: '/' + e.id,
          url: `https://mangadex.org/chapter/${e.id}`,
          parent_href: '/chapter/' + e.id,
          title: e.attributes.title,
        });
      });*/
      return {
        path: this.baseUrl + `/title/${sourceId}`,
        url,
        //author,
        //genres,
        title,
        //status,
        description,
        //year,
        //links,
        //originalLanguage,
        //availableTranslatedLanguages,
      } as ResponseDetailMangaDex;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getDataChapter(
    url_chapter: string,
    /*url?: string | undefined,
    path?: string | undefined,
    prev_chapter?: chapter | undefined,
    next_chapter?: chapter | undefined*/
    languje?: string,
    offset?: string,
    orderBy?: string
  ): Promise<responseChapter> {
    try {
      const sourceId = url_chapter;
      const data = [] as Data1[];
      let order = true;
      if (orderBy == 'desc') order = false;

      const url =
        languje == 'es'
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=es&translatedLanguage[]=es-la&includes[]=scanlation_group&&includes[]=user&order[volume]=${
              order ? 'asc' : 'desc'
            }&order[chapter]=${
              order ? 'asc' : 'desc'
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            }&offset=${offset!}&limit=10&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
          : `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=${languje!}&includes[]=scanlation_group&&includes[]=user&order[volume]=${
              order ? 'asc' : 'desc'
            }&order[chapter]=${
              order ? 'asc' : 'desc'
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            }&offset=${offset!}&limit=10&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`;
      // get info data
      const responseInfoData = await axios.get(url);
      //?includes[]=scanlation_group&includes[]=manga&includes[]=user
      const responseAxiosInfo =
        responseInfoData.data as ResponseDataChapterInfoData;
      const infoData = responseAxiosInfo.data;

      for (let i = 0; i < infoData.length; i++) {
        data.push({
          id: infoData[i].id,
          chapter: infoData[i].attributes.chapter,
          title: infoData[i].attributes.title,
          externalUrl: infoData[i].attributes.externalUrl,
          pages: infoData[i].attributes.pages,
        });
      }

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      //get img data
      //const responseImgData = await axios.get(
      //  `https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`
      //);
      //const responseAxiosImgData = responseImgData.data as ResponseChapterData;
      //
      //const hash = responseAxiosImgData.chapter.hash;
      //responseAxiosImgData.chapter.data.map((e, i) => {
      //  chapter_data.push({
      //    _id: i,
      //    src_origin: `https://uploads.mangadex.org/data/${hash}/${responseAxiosImgData.chapter.data[i]}`,
      //    alt: `${title} id: ${i}`,
      //  });
      //});
      return {
        limit: responseAxiosInfo.limit,
        offset: responseAxiosInfo.offset,
        totalData: responseAxiosInfo.total,
        data,
      } as unknown as responseChapter;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPages(sourceId: string): Promise<PagesResponse> {
    const page_data: string[] = [];
    try {
      const responseImgData = await axios.get(
        `https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`
      );
      const responseAxiosImgData = responseImgData.data as ResponsePages;

      const hash = responseAxiosImgData.chapter.hash;
      responseAxiosImgData.chapter.data.map((_, i) => {
        page_data.push(
          `https://uploads.mangadex.org/data/${hash}/${responseAxiosImgData.chapter.data[i]}`
        );
      });

      return {
        data: page_data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async search(
    keyword: string,
    page?: number | undefined
  ): Promise<responseListMangaDex> {
    try {
      let totalData = 0;
      let data: Data[] = [];
      let offset = 0;
      if (page != undefined)
        if (page >= 0 && page <= 9983) offset = page;
        else throw new Error('Offset is out of bound');
      const responseAxiosMangas = await axios.get(
        `https://api.mangadex.org/manga?limit=10&offset=${offset}&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&title=${keyword}&order[relevance]=desc`
      );
      const listLatestUpdate = responseAxiosMangas.data as ResponseSearch;
      totalData = listLatestUpdate.total;
      data = await Promise.all(
        listLatestUpdate.data.map(async (manga) => {
          const cover = await getCover(manga);
          return {
            _id: manga.id,
            title: manga.attributes.title.en,
            image_thumbnail: `https://uploads.mangadex.org/covers/${manga.id}/${cover.data.attributes.fileName}`,
          };
        })
      );

      return {
        totalData,
        canNext: offset <= 9967 ? true : false,
        canPrev: offset >= 16 ? true : false,
        totalPage: 9983,
        currentPage: offset,
        data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
