import { IBase, IComics, ISeries, IThumbnail } from "../interfaces/hero-interface";

export class HeroDto implements IBase {
    constructor(
        public id = 0,
        public description = '',
        public name = '',
        public thumbnail = { path: '', extension: '' } as IThumbnail
    ) { }
}

export class Hero implements IBase {
    constructor(
        public id = 0,
        public description = '',
        public name = '',
        public thumbnail = ''
    ) { }
}

export class ComicsDto implements IComics {
    constructor(
        public id = 0,
        public description = '',
        public title = '',
        public isbn = '',
        public ean = '',
        public format = '',
        public pageCount = '',
        public thumbnail = { path: '', extension: '' } as IThumbnail
    ) { }
}

export class Comics implements IComics {
    constructor(
        public id = 0,
        public description = '',
        public title = '',
        public isbn = '',
        public ean = '',
        public format = '',
        public pageCount = '',
        public imgUrl = ''
    ) { }
}

export class SeriesDto implements ISeries {
    constructor(
        public title = '',
        public startYear = 0,
        public endYear = 0,
        public id = 0,
        public description = '',
        public thumbnail = { path: '', extension: '' } as IThumbnail
    ) { }
}

export class Series implements ISeries {
    constructor(
        public title = '',
        public startYear = 0,
        public endYear = 0,
        public id = 0,
        public description = '',
        public imgUrl = ''
    ) { }
}