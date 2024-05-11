import { Cover } from '../types/mangadex/cover';
import { Datum } from '../types/mangadex/listLatestUpdate';
export declare const getCover: (manga: Datum) => Promise<Cover>;
