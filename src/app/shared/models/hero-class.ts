import { IBase, IThumbnail } from "../interfaces/hero-interface";

export class HeroDto implements IBase {
    constructor(
        public id = 0,
        public description = '',
        public name = '',
        public thumbnail = {path:'', extension:''} as IThumbnail
    ) { }
}

export class Hero implements IBase {
    constructor(
        public id = 0,
        public description = '',
        public name = '',
        public thumbnail = ''
    ) {}

 }