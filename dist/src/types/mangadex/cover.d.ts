export type Cover = {
    result: string;
    response: string;
    data: _Data;
};
export type _Data = {
    id: string;
    type: string;
    attributes: Attributes;
    relationships: Relationship[];
};
export type Attributes = {
    description: string;
    volume: string;
    fileName: string;
    locale: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
};
export type Relationship = {
    id: string;
    type: string;
};
