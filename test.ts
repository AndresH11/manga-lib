/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import axios from "axios";
// import * as cheerio from "cheerio";
/*import { Manga, MangaType } from './src';*/

// void (async () => {
//   const t = await axios("https://ww5.mangakakalot.tv/");
//   const $ = cheerio.load(t.data);
//   const x = $("#contentstory > div > div.itemupdate");
//   x.map((i, el) => {
//     if (i == 0) console.log(el.childNodes[0].next);
//   });
// })();

// void axios.get("https://toonily.com/").then((res) => {
//   const $ = cheerio.load(res.data);

//   const wrap_items = $("#loop-content > div > div");

//   wrap_items.each((i, e) => {
//     const title = $(e)
//       .find("div > div.item-summary > div.post-title.font-title > h3 > a")
//       .text();
//     console.log(title);
//   });

// });

// Array.from(
//   document.querySelectorAll(
//     "body > div.wrap > div > div > div.c-breadcrumb-wrapper > div > div > div > div.c-genres-block.archive-page > div > div.genres__collapse > div > ul > li > a"
//   )
// ).map((e) => {
//   return {
//     name: e.textContent?.trim().split(" (")[0].split("\n")[0],
//     path: e.getAttribute("href")?.substring("https://toonily.com".length),
//   };
// });

/*const t = new Manga().build(MangaType.MANGADEX);

void (async () => {
  //console.log(await t.search('naruto'));
  //console.log(await t.getDetailManga('6b1eb93e-473a-4ab3-9922-1a66d2a29a4a'));
  console.log(await t.getDataChapter('a9d38ece-c007-433f-beb9-3a7d2554fc3f'));
})();*/
