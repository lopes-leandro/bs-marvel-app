export interface IThumbnail {
    path: string;
    extension: string;
}

export interface IBase {
    id: number;
    description: string;
}

export interface IPrices {
    type: string;
    price: string;
}

export interface IStories {}

export interface ISeries {
    title: string;
    startYear: number;
    endYear: number;
}

export interface IComics extends IBase {
    title: string;
    isbn: string;
    ean: string;
    format: string;
    pageCount: string;
}