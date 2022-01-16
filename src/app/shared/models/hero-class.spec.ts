import { Comics, ComicsDto, Hero, HeroDto, Series, SeriesDto } from './hero-class';

describe('Comics', () => {
  it('should create an instance', () => {
    expect(new Comics()).toBeTruthy();
  });
});

describe('ComicsDto', () => {
  it('should create an instance', () => {
    expect(new ComicsDto()).toBeTruthy();
  });
});

describe('Hero', () => {
  it('should create an instance', () => {
    expect(new Hero()).toBeTruthy();
  });
});

describe('HeroDto', () => {
  it('should create an instance', () => {
    expect(new HeroDto()).toBeTruthy();
  });
});

describe('Series', () => {
  it('should create an instance', () => {
    expect(new Series()).toBeTruthy();
  });
});

describe('SeriesDto', () => {
  it('should create an instance', () => {
    expect(new SeriesDto()).toBeTruthy();
  });
});