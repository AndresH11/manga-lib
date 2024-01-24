"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mangadex = void 0;
const axios_1 = __importDefault(require("axios"));
class Mangadex {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.all_genres = [];
    }
    getListByGenre(genre, page, status, sort) {
        throw new Error('Method not implemented.');
    }
    getListLatestUpdate(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalData = 0;
            let data = [];
            let offset = 0;
            if (page != undefined)
                if (page >= 0 && page <= 9983)
                    offset = page;
                else
                    throw new Error('Offset is out of bound');
            yield axios_1.default
                .get(`https://api.mangadex.org/manga?limit=16&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`)
                .then(function (response) {
                const listLatestUpdate = response.data.data;
                totalData = response.data.total;
                data = listLatestUpdate.map((e, i) => {
                    return {
                        _id: offset + i,
                        title: e.attributes.title.en,
                        href: `/${e.id}`,
                        image_thumbnail: 'not implemented',
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
        });
    }
    getDetailManga(url) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceId = url;
                const genres = [];
                const responseGenres = yield axios_1.default.get(`https://api.mangadex.org/manga/${sourceId}?includes[]=artist&includes[]=author&includes[]=cover_art`);
                const responseGenresAxios = responseGenres.data;
                const infoData = responseGenresAxios.data;
                const author = (_b = (_a = infoData.relationships[0].attributes) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                const title = (_c = infoData.attributes.title.en) !== null && _c !== void 0 ? _c : 'null';
                const status = (_d = infoData.attributes.status) !== null && _d !== void 0 ? _d : 'null';
                const description = (_e = infoData.attributes.description) !== null && _e !== void 0 ? _e : 'null';
                const links = infoData.attributes.links;
                const originalLanguage = infoData.attributes.originalLanguage;
                const year = infoData.attributes.year;
                const availableTranslatedLanguages = infoData.attributes.availableTranslatedLanguages;
                const relationships = infoData.relationships;
                infoData.attributes.tags.map((e) => {
                    genres.push({
                        url: `https://mangadex.org/tag/` + e.id,
                        name: e.attributes.name.en,
                        path: '/tag/' + e.id,
                    });
                });
                const chapters = [];
                const responseChapters = yield axios_1.default.get(`https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=es-la&includes[]=scanlation_group&&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=0&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`);
                const responseChaptersAxio = responseChapters.data;
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
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    getDataChapter(url_chapter, url, path, prev_chapter, next_chapter) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceId = url_chapter;
                const chapter_data = [];
                const responseInfoData = yield axios_1.default.get(`https://api.mangadex.org/chapter/${sourceId}?includes[]=scanlation_group&includes[]=manga&includes[]=user`);
                const responseAxiosInfo = responseInfoData.data;
                const infoData = responseAxiosInfo.data;
                const externalUrl = infoData.attributes.externalUrl;
                const pages = infoData.attributes.pages;
                let mangaId = 0;
                for (let i = 0; i < infoData.relationships.length; i++)
                    if (infoData.relationships[i].type == 'manga') {
                        mangaId = i;
                        break;
                    }
                const title = `${(_a = infoData.relationships[mangaId].attributes.title) === null || _a === void 0 ? void 0 : _a.en} chap ${infoData.attributes.chapter} [${infoData.attributes.title}]`;
                const responseImgData = yield axios_1.default.get(`https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`);
                const responseAxiosImgData = responseImgData.data;
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
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }
    search(keyword, page) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalData = 0;
            let data = [];
            let offset = 0;
            if (page != undefined)
                if (page >= 0 && page <= 9983)
                    offset = page;
                else
                    throw new Error('Offset is out of bound');
            yield axios_1.default
                .get(`https://api.mangadex.org/manga?limit=10&offset=${offset}&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=${keyword}&order[relevance]=desc`)
                .then(function (response) {
                totalData = response.data.total;
                const listLatestUpdate = response.data.data;
                totalData = response.data.total;
                data = listLatestUpdate.map((e, i) => {
                    return {
                        _id: i,
                        title: e.attributes.title.en,
                        href: e.id,
                        image_thumbnail: 'not implemented',
                    };
                });
            })
                .catch(function (error) {
                console.log(error);
            });
            return {
                totalData,
                canNext: offset <= 9967 ? true : false,
                canPrev: offset >= 16 ? true : false,
                totalPage: 9983,
                currentPage: offset,
                data,
            };
        });
    }
}
exports.Mangadex = Mangadex;
