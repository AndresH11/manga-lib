import axios from 'axios';
import {
  AbstractMangaFactory,
  chapter,
  genre,
  image_chapter,
  responseListManga,
} from '../types/type';
import {
  ResponseChapterData,
  ResponseChapterMangaDex,
  ResponseDataChapterInfoData,
  ResponseDetailMangaDex,
  ResponseDetailsChapters,
  ResponseDetailsGenres,
  ResponseSearch,
} from '../types/mangadex';
import { ListLatesUpdate } from '../types/mangadex/listLatestUpdate';

export class Mangadex implements AbstractMangaFactory {
  baseUrl: string;
  all_genres: genre[];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.all_genres = [] as genre[];
  }
  getListByGenre(
    genre: genre,
    page?: number | undefined,
    status?: any,
    sort?: any
  ): Promise<responseListManga> {
    throw new Error('Method not implemented.');
  }

  async getListLatestUpdate(
    page?: number | undefined
  ): Promise<responseListManga> {
    let totalData = 0;
    let data: {
      _id: string;
      image_thumbnail: string;
      title: string;
      href: string;
      availableTranslatedLanguages: string[];
    }[] = [];
    let offset = 0;
    if (page != undefined)
      if (page >= 0 && page <= 9983) offset = page;
      else throw new Error('Offset is out of bound');
    await axios
      .get(
        `https://api.mangadex.org/manga?limit=16&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
      )
      .then(function (response) {
        const listLatestUpdate = response.data as ListLatesUpdate;
        totalData = listLatestUpdate.total;
        data = listLatestUpdate.data.map((manga) => {
          return {
            _id: manga.id,
            title: manga.attributes.title.en,
            href: `/${manga.id}`,
            image_thumbnail: 'not implemented',
            availableTranslatedLanguages:
              manga.attributes.availableTranslatedLanguages,
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return {
      totalData,
      canNext: offset <= 9967 ? true : false,
      canPrev: offset === 0 ? false : true,
      totalPage: 9983,
      currentPage: offset,
      data,
    };
  }
  async getDetailManga(url: string): Promise<ResponseDetailMangaDex> {
    try {
      const sourceId = url;
      const genres: genre[] = [] as genre[];
      //Get info Manga like (title, author, tag)
      const responseGenres = await axios.get(
        `https://api.mangadex.org/manga/${sourceId}?includes[]=artist&includes[]=author&includes[]=cover_art`
      );
      const responseGenresAxios = responseGenres.data as ResponseDetailsGenres;
      const infoData = responseGenresAxios.data;
      const author = infoData.relationships[0].attributes?.name ?? '';
      const title = infoData.attributes.title.en ?? 'null';
      const status = infoData.attributes.status ?? 'null';
      const description = infoData.attributes.description ?? 'null';
      const links = infoData.attributes.links;
      const originalLanguage = infoData.attributes.originalLanguage;
      const year = infoData.attributes.year;
      const availableTranslatedLanguages =
        infoData.attributes.availableTranslatedLanguages;
      const relationships = infoData.relationships;

      infoData.attributes.tags.map((e) => {
        genres.push({
          url: `https://mangadex.org/tag/` + e.id,
          name: e.attributes.name.en,
          path: '/tag/' + e.id,
        });
      });

      //Get info Manga Chapter
      const chapters: chapter[] = [] as chapter[];
      const responseChapters = await axios.get(
        `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=es-la&includes[]=scanlation_group&&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
      );
      const responseChaptersAxio =
        responseChapters.data as ResponseDetailsChapters;
      const chapterData = responseChaptersAxio.data;
      chapterData.map((e) => {
        chapters.push({
          path: '/' + e.id,
          url: `https://mangadex.org/chapter/${e.id}`,
          parent_href: '/chapter/' + e.id,
          title: e.attributes.title,
        });
      });
      return {
        path: this.baseUrl + `/title/${sourceId}`,
        url,
        author,
        genres,
        title,
        status,
        description,
        year,
        relationships,
        links,
        originalLanguage,
        availableTranslatedLanguages,
        chapters,
      };
    } catch (error) {
      console.log(error);
      return error as ResponseDetailMangaDex;
    }
  }
  async getDataChapter(
    url_chapter: string,
    url?: string | undefined,
    path?: string | undefined,
    prev_chapter?: chapter | undefined,
    next_chapter?: chapter | undefined
  ): Promise<ResponseChapterMangaDex> {
    try {
      const sourceId = url_chapter;
      const chapter_data: image_chapter[] = [] as image_chapter[];
      // get info data
      const responseInfoData = await axios.get(
        `https://api.mangadex.org/chapter/${sourceId}?includes[]=scanlation_group&includes[]=manga&includes[]=user`
      );
      const responseAxiosInfo =
        responseInfoData.data as ResponseDataChapterInfoData;
      const infoData = responseAxiosInfo.data;
      const externalUrl = infoData.attributes.externalUrl;
      const pages = infoData.attributes.pages;
      let mangaId = 0;
      for (let i = 0; i < infoData.relationships.length; i++)
        if (infoData.relationships[i].type == 'manga') {
          mangaId = i;
          break;
        }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const title = `${infoData.relationships[mangaId].attributes.title?.en} chap ${infoData.attributes.chapter} [${infoData.attributes.title}]`;
      //get img data
      const responseImgData = await axios.get(
        `https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`
      );
      const responseAxiosImgData = responseImgData.data as ResponseChapterData;
      const hash = responseAxiosImgData.chapter.hash;
      responseAxiosImgData.chapter.data.map((e, i) => {
        chapter_data.push({
          _id: i,
          src_origin: `https://uploads.mangadex.org/data/${hash}/${responseAxiosImgData.chapter.data[i]}`,
          alt: `${title} id: ${i}`,
        });
      });
      return {
        url: `${this.baseUrl}/chapter/${sourceId}`,
        path: `/chapter/${sourceId}`,
        title,
        externalUrl,
        pages,
        chapter_data,
        prev_chapter: null,
        next_chapter: null,
      };
    } catch (error) {
      console.log(error);
      return error as ResponseChapterMangaDex;
    }
  }

  async search(
    keyword: string,
    page?: number | undefined
  ): Promise<responseListManga> {
    let totalData = 0;
    let data: {
      _id: string;
      image_thumbnail: string;
      title: string;
      href: string;
    }[] = [];
    let offset = 0;
    if (page != undefined)
      if (page >= 0 && page <= 9983) offset = page;
      else throw new Error('Offset is out of bound');
    const responseAxiosMangas = await axios.get(
      `https://api.mangadex.org/manga?limit=10&offset=${offset}&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=${keyword}&order[relevance]=desc`
    );
    const listLatestUpdate = responseAxiosMangas.data as ResponseSearch;
    totalData = listLatestUpdate.total;
    data = listLatestUpdate.data.map((manga) => {
      return {
        _id: manga.id,
        title: manga.attributes.title.en ?? '',
        href: manga.id,
        image_thumbnail: 'not implemented',
      };
    });

    return {
      totalData,
      canNext: offset <= 9967 ? true : false,
      canPrev: offset >= 16 ? true : false,
      totalPage: 9983,
      currentPage: offset,
      data,
    };
  }
}
