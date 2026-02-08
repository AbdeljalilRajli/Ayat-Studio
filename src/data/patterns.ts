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
    id: "eight-point-star",
    name: "Eight-Point Star",
    css: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.55' stroke-width='2'%3E%3Cpath d='M48 8l10 10 14-6 6 14 14 6-6 14 10 10-10 10 6 14-14 6-6 14-14-6-10 10-10-10-14 6-6-14-14-6 6-14-10-10 10-10-6-14 14-6 6-14 14 6z'/%3E%3Cpath d='M48 24l8 8 12-4 4 12 12 4-4 12 8 8-8 8 4 12-12 4-4 12-12-4-8 8-8-8-12 4-4-12-12-4 4-12-8-8 8-8-4-12 12-4 4-12 12 4z' stroke-opacity='0.25'/%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    id: "zellige-tiles",
    name: "Zellige Tiles",
    css: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.35' stroke-width='2'%3E%3Cpath d='M60 6l16 16 22-10 10 22 16 16-16 16 10 22-22 10-16 16-16-16-22 10-10-22-16-16 16-16-10-22 22-10z'/%3E%3Cpath d='M60 34l12 12 16-6 6 16 12 12-12 12 6 16-16 6-12 12-12-12-16 6-6-16-12-12 12-12-6-16 16-6z' stroke-opacity='0.2'/%3E%3Cpath d='M20 60h80M60 20v80' stroke-opacity='0.18'/%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    id: "girih-lattice",
    name: "Girih Lattice",
    css: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.32' stroke-width='2'%3E%3Cpath d='M64 6l18 18 25-11 11 25 18 18-18 18 11 25-25 11-18 18-18-18-25 11-11-25-18-18 18-18-11-25 25-11z'/%3E%3Cpath d='M64 34l12 12 17-7 7 17 12 12-12 12 7 17-17 7-12 12-12-12-17 7-7-17-12-12 12-12-7-17 17-7z' stroke-opacity='0.18'/%3E%3Cpath d='M64 6v122M6 64h122M20 20l88 88M108 20L20 108' stroke-opacity='0.12'/%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    id: "rosette",
    name: "Rosette Medallion",
    css: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.28'%3E%3Ccircle cx='70' cy='70' r='50' stroke-width='2'/%3E%3Ccircle cx='70' cy='70' r='34' stroke-width='2' stroke-opacity='0.18'/%3E%3Cpath d='M70 14l10 18 20-2-6 20 18 10-18 10 6 20-20-2-10 18-10-18-20 2 6-20-18-10 18-10-6-20 20 2z' stroke-width='2'/%3E%3Cpath d='M70 28l8 14 16-1-5 16 14 8-14 8 5 16-16-1-8 14-8-14-16 1 5-16-14-8 14-8-5-16 16 1z' stroke-width='2' stroke-opacity='0.16'/%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    id: "arabesque-vine",
    name: "Arabesque Vine",
    css: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.24' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M16 64c16-28 32-28 48 0s32 28 48 0'/%3E%3Cpath d='M16 64c16 28 32 28 48 0s32-28 48 0' stroke-opacity='0.18'/%3E%3Cpath d='M32 48c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z' stroke-opacity='0.14'/%3E%3Cpath d='M96 48c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z' stroke-opacity='0.14'/%3E%3C/g%3E%3C/svg%3E")`
  },
  {
    id: "kufic-grid",
    name: "Kufic Grid",
    css: `linear-gradient(rgba(212,175,55,0.22) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.22) 1px, transparent 1px)`
  },
  {
    id: "subtle-dots",
    name: "Subtle Dots",
    css: `radial-gradient(circle at center, rgba(212,175,55,0.45) 1.5px, transparent 2.5px)`
  },
  {
    id: "diamond-weave",
    name: "Diamond Weave",
    css: `linear-gradient(45deg, rgba(212,175,55,0.22) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.22) 75%),
      linear-gradient(135deg, rgba(212,175,55,0.22) 25%, transparent 25%, transparent 75%, rgba(212,175,55,0.22) 75%)`
  },
  {
    id: "concentric",
    name: "Concentric Circles",
    css: `repeating-radial-gradient(circle at center, rgba(212,175,55,0.18) 0px, rgba(212,175,55,0.18) 2px, transparent 2px, transparent 34px)`
  }
];
