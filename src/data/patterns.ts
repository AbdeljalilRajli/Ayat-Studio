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
    id: "frame",
    name: "Ornate Frame",
    css: `url('/patterns%20svgs/frame.svg')`
  },
  {
    id: "geometry",
    name: "Geometry",
    css: `url('/patterns%20svgs/geometry.svg')`
  },
  {
    id: "islam",
    name: "Islamic Emblem",
    css: `url('/patterns%20svgs/islam.svg')`
  },
  {
    id: "islamic-1",
    name: "Islamic Motif I",
    css: `url('/patterns%20svgs/islamic(1).svg')`
  },
  {
    id: "islamic",
    name: "Islamic Motif II",
    css: `url('/patterns%20svgs/islamic.svg')`
  },
  {
    id: "pattern-1",
    name: "Pattern I",
    css: `url('/patterns%20svgs/pattern(1).svg')`
  },
  {
    id: "pattern-2",
    name: "Pattern II",
    css: `url('/patterns%20svgs/pattern(2).svg')`
  },
  {
    id: "pattern",
    name: "Pattern III",
    css: `url('/patterns%20svgs/pattern.svg')`
  },
  {
    id: "patterns",
    name: "Pattern Grid",
    css: `url('/patterns%20svgs/patterns.svg')`
  },
  {
    id: "ramadan",
    name: "Ramadan Lantern",
    css: `url('/patterns%20svgs/ramadan.svg')`
  },
  {
    id: "shape",
    name: "Abstract Shape",
    css: `url('/patterns%20svgs/shape.svg')`
  },
  {
    id: "window",
    name: "Mashrabiya Window",
    css: `url('/patterns%20svgs/window.svg')`
  }
];
