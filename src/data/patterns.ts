export interface Pattern {
  id: string;
  name: string;
  css: string;
}

export const patterns: Pattern[] = [
  {
    id: "none",
    name: "No Pattern",
    css: "none"
  },
  {
    id: "stars",
    name: "Islamic Stars",
    css: `
      radial-gradient(circle at 50% 50%, transparent 10%, rgba(0,0,0,0.1) 10.5%, transparent 11%) 0 0,
      radial-gradient(circle at 0% 0%, transparent 10%, rgba(0,0,0,0.1) 10.5%, transparent 11%) 50px 50px,
      radial-gradient(circle at 100% 100%, transparent 10%, rgba(0,0,0,0.1) 10.5%, transparent 11%) 50px 50px,
      radial-gradient(circle at 0% 100%, transparent 10%, rgba(0,0,0,0.1) 10.5%, transparent 11%) 50px 50px,
      radial-gradient(circle at 100% 0%, transparent 10%, rgba(0,0,0,0.1) 10.5%, transparent 11%) 50px 50px
    `
  },
  {
    id: "mosaic",
    name: "Geometric Mosaic",
    css: `
      linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.08) 49%, rgba(0,0,0,0.08) 51%, transparent 52%) 0 0,
      linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.08) 49%, rgba(0,0,0,0.08) 51%, transparent 52%) 0 0
    `
  },
  {
    id: "tessellation",
    name: "Tessellation",
    css: `
      conic-gradient(from 0deg at 50% 50%, transparent 45deg, rgba(0,0,0,0.1) 45deg, rgba(0,0,0,0.1) 90deg, transparent 90deg) 0 0,
      conic-gradient(from 180deg at 50% 50%, transparent 45deg, rgba(0,0,0,0.1) 45deg, rgba(0,0,0,0.1) 90deg, transparent 90deg) 30px 30px
    `
  },
  {
    id: "hexagons",
    name: "Hexagon Grid",
    css: `
      linear-gradient(30deg, transparent 45%, rgba(0,0,0,0.07) 45%, rgba(0,0,0,0.07) 55%, transparent 55%) 0 0,
      linear-gradient(-30deg, transparent 45%, rgba(0,0,0,0.07) 45%, rgba(0,0,0,0.07) 55%, transparent 55%) 0 0,
      linear-gradient(90deg, transparent 45%, rgba(0,0,0,0.07) 45%, rgba(0,0,0,0.07) 55%, transparent 55%) 17px 30px
    `
  },
  {
    id: "arabesque",
    name: "Arabesque",
    css: `
      repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px),
      repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)
    `
  },
  {
    id: "grid",
    name: "Fine Grid",
    css: `
      linear-gradient(0deg, transparent 98%, rgba(0,0,0,0.1) 98%, rgba(0,0,0,0.1) 100%) 0 0,
      linear-gradient(90deg, transparent 98%, rgba(0,0,0,0.1) 98%, rgba(0,0,0,0.1) 100%) 0 0
    `
  },
  {
    id: "dots",
    name: "Subtle Dots",
    css: `
      radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 2px, transparent 2.5px) 0 0
    `
  },
  {
    id: "diamonds",
    name: "Diamond Weave",
    css: `
      linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, transparent 55%) 0 0,
      linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.1) 55%, transparent 55%) 25px 25px
    `
  }
];
