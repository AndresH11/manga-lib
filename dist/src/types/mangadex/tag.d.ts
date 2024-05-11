export type Tags = {
    result: string;
    response: string;
    data: Datum[];
};
export type Datum = {
    id: string;
    type: string;
    attributes: Attributes;
};
export type Attributes = {
    name: Name;
    group: string;
    version: number;
};
export type Name = {
    en: string;
};
