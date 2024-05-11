import axios from 'axios';
import { Cover } from '../types/mangadex/cover';
import { Datum } from '../types/mangadex/listLatestUpdate';

export const getCover = async (manga: Datum): Promise<Cover> => {
  const coverArt = manga.relationships.find(
    (relation) => relation.type == 'cover_art'
  )?.id;

  const response = await axios.get(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    `https://api.mangadex.org/cover/${coverArt!}`
  );

  return response.data as Cover;
};
