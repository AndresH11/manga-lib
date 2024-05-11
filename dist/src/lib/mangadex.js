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
const mangadex_1 = require("../utils/mangadex");
class Mangadex {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.all_genres = [];
    }
    getListLatestUpdate(page, isErotict, languje, tags1, order) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalData = 0;
            let data = [];
            let offset = 0;
            if (page != undefined)
                if (page >= 0 && page <= 9983)
                    offset = page;
                else
                    throw new Error('Offset is out of bound');
            try {
                const tags = yield axios_1.default.get(`https://api.mangadex.org/manga/tag`);
                const tags2 = tags.data;
                let includedTagIDs = [];
                let excludedTagIDs = [];
                if (tags1.length > 0) {
                    includedTagIDs = tags2.data
                        .filter((tag) => tags1 === null || tags1 === void 0 ? void 0 : tags1.includes(tag.attributes.name.en))
                        .map((tag) => tag.id);
                    excludedTagIDs = tags2.data
                        .filter((tag) => !(tags1 === null || tags1 === void 0 ? void 0 : tags1.includes(tag.attributes.name.en)))
                        .map((tag) => tag.id);
                }
                const contentRating = ['safe'];
                if (isErotict)
                    contentRating.push('pornographic', 'erotica', 'uggestive');
                const url = languje == 'es'
                    ? `https://api.mangadex.org/manga?availableTranslatedLanguage[]=es&availableTranslatedLanguage[]=es-la`
                    :
                        `https://api.mangadex.org/manga?availableTranslatedLanguage[]=${languje}`;
                const response = yield (0, axios_1.default)({
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
                const listLatestUpdate = response.data;
                totalData = listLatestUpdate.total;
                data = yield Promise.all(listLatestUpdate.data.map((manga) => __awaiter(this, void 0, void 0, function* () {
                    const cover = yield (0, mangadex_1.getCover)(manga);
                    return {
                        _id: manga.id,
                        title: manga.attributes.title.en,
                        image_thumbnail: `https://uploads.mangadex.org/covers/${manga.id}/${cover.data.attributes.fileName}`,
                    };
                })));
                return {
                    totalData,
                    canNext: offset <= 9967 ? true : false,
                    canPrev: offset === 0 ? false : true,
                    totalPage: 9983,
                    currentPage: offset,
                    data,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDetailManga(url, languje) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceId = url;
                const responseGenres = yield axios_1.default.get(`https://api.mangadex.org/manga/${sourceId}?includes[]=artist&includes[]=author&includes[]=cover_art`);
                const responseGenresAxios = responseGenres.data;
                const infoData = responseGenresAxios.data;
                const title = (_a = infoData.attributes.title.en) !== null && _a !== void 0 ? _a : 'null';
                const description = (_c = (_b = infoData.attributes.description) === null || _b === void 0 ? void 0 : _b.en) !== null && _c !== void 0 ? _c : 'null';
                return {
                    path: this.baseUrl + `/title/${sourceId}`,
                    url,
                    title,
                    description,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDataChapter(url_chapter, languje, offset, orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sourceId = url_chapter;
                const data = [];
                let order = true;
                if (orderBy == 'desc')
                    order = false;
                const url = languje == 'es'
                    ?
                        `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=es&translatedLanguage[]=es-la&includes[]=scanlation_group&&includes[]=user&order[volume]=${order ? 'asc' : 'desc'}&order[chapter]=${order ? 'asc' : 'desc'}&offset=${offset}&limit=10&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`
                    : `https://api.mangadex.org/manga/${sourceId}/feed?translatedLanguage[]=${languje}&includes[]=scanlation_group&&includes[]=user&order[volume]=${order ? 'asc' : 'desc'}&order[chapter]=${order ? 'asc' : 'desc'}&offset=${offset}&limit=10&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`;
                const responseInfoData = yield axios_1.default.get(url);
                const responseAxiosInfo = responseInfoData.data;
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
                return {
                    limit: responseAxiosInfo.limit,
                    offset: responseAxiosInfo.offset,
                    totalData: responseAxiosInfo.total,
                    data,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getPages(sourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_data = [];
            try {
                const responseImgData = yield axios_1.default.get(`https://api.mangadex.org/at-home/server/${sourceId}?forcePort443=false`);
                const responseAxiosImgData = responseImgData.data;
                const hash = responseAxiosImgData.chapter.hash;
                responseAxiosImgData.chapter.data.map((_, i) => {
                    page_data.push(`https://uploads.mangadex.org/data/${hash}/${responseAxiosImgData.chapter.data[i]}`);
                });
                return {
                    data: page_data,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    search(keyword, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let totalData = 0;
                let data = [];
                let offset = 0;
                if (page != undefined)
                    if (page >= 0 && page <= 9983)
                        offset = page;
                    else
                        throw new Error('Offset is out of bound');
                const responseAxiosMangas = yield axios_1.default.get(`https://api.mangadex.org/manga?limit=10&offset=${offset}&includes[]=cover_art&includes[]=artist&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&title=${keyword}&order[relevance]=desc`);
                const listLatestUpdate = responseAxiosMangas.data;
                totalData = listLatestUpdate.total;
                data = yield Promise.all(listLatestUpdate.data.map((manga) => __awaiter(this, void 0, void 0, function* () {
                    const cover = yield (0, mangadex_1.getCover)(manga);
                    return {
                        _id: manga.id,
                        title: manga.attributes.title.en,
                        image_thumbnail: `https://uploads.mangadex.org/covers/${manga.id}/${cover.data.attributes.fileName}`,
                    };
                })));
                return {
                    totalData,
                    canNext: offset <= 9967 ? true : false,
                    canPrev: offset >= 16 ? true : false,
                    totalPage: 9983,
                    currentPage: offset,
                    data,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.Mangadex = Mangadex;
