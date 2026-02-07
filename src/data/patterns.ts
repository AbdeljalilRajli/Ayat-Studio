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
    css: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 2px, transparent 3px),
      radial-gradient(circle at 0% 0%, rgba(212,175,55,0.2) 1px, transparent 2px),
      radial-gradient(circle at 100% 0%, rgba(212,175,55,0.2) 1px, transparent 2px),
      radial-gradient(circle at 0% 100%, rgba(212,175,55,0.2) 1px, transparent 2px),
      radial-gradient(circle at 100% 100%, rgba(212,175,55,0.2) 1px, transparent 2px)`
  },
  {
    id: "mosaic",
    name: "Geometric Mosaic",
    css: `linear-gradient(45deg, rgba(212,175,55,0.15) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.15) 75%),
      linear-gradient(-45deg, rgba(212,175,55,0.15) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.15) 75%)`
  },
  {
    id: "tessellation",
    name: "Tessellation",
    css: `repeating-linear-gradient(60deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 2px, transparent 2px, transparent 40px),
      repeating-linear-gradient(-60deg, rgba(212,175,55,0.1) 0px, rgba(212,175,55,0.1) 2px, transparent 2px, transparent 40px)`
  },
  {
    id: "hexagons",
    name: "Hexagon Grid",
    css: `repeating-linear-gradient(90deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 1px, transparent 1px, transparent 60px),
      repeating-linear-gradient(30deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 1px, transparent 1px, transparent 60px),
      repeating-linear-gradient(-30deg, rgba(212,175,55,0.12) 0px, rgba(212,175,55,0.12) 1px, transparent 1px, transparent 60px)`
  },
  {
    id: "arabesque",
    name: "Arabesque Lines",
    css: `repeating-linear-gradient(45deg, rgba(212,175,55,0.2) 0px, rgba(212,175,55,0.2) 2px, transparent 2px, transparent 20px),
      repeating-linear-gradient(-45deg, rgba(212,175,55,0.2) 0px, rgba(212,175,55,0.2) 2px, transparent 2px, transparent 20px)`
  },
  {
    id: "grid",
    name: "Fine Grid",
    css: `linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)`
  },
  {
    id: "dots",
    name: "Subtle Dots",
    css: `radial-gradient(circle at center, rgba(212,175,55,0.4) 3px, transparent 4px)`
  },
  {
    id: "diamonds",
    name: "Diamond Weave",
    css: `linear-gradient(45deg, rgba(212,175,55,0.15) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.15) 75%),
      linear-gradient(135deg, rgba(212,175,55,0.15) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.15) 75%)`
  },
  {
    id: "islamic-geo",
    name: "Islamic Geometric",
    css: `repeating-conic-gradient(from 0deg at 50% 50%, rgba(212,175,55,0.15) 0deg 30deg, transparent 30deg 60deg),
      repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 60deg, rgba(212,175,55,0.15) 60deg 90deg)`
  },
  {
    id: "circles",
    name: "Concentric Circles",
    css: `repeating-radial-gradient(circle at center, rgba(212,175,55,0.15) 0px, rgba(212,175,55,0.15) 2px, transparent 2px, transparent 30px)`
  }
];
