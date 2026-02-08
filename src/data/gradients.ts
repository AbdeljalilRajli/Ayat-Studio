export interface GradientPreset {
  id: string;
  name: string;
  css: string;
}

export const gradients: GradientPreset[] = [
  {
    id: 'none',
    name: 'No Gradient',
    css: 'none'
  },
  {
    id: 'emerald-night',
    name: 'Emerald Night',
    css: 'linear-gradient(135deg, #052e2b 0%, #064e3b 45%, #0f172a 100%)'
  },
  {
    id: 'midnight-oasis',
    name: 'Midnight Oasis',
    css: 'radial-gradient(circle at 20% 10%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 40%), linear-gradient(135deg, #0b1220 0%, #064e3b 55%, #061a1a 100%)'
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    css: 'linear-gradient(135deg, #0f172a 0%, #064e3b 45%, #d4af37 140%)'
  },
  {
    id: 'mosaic-dusk',
    name: 'Mosaic Dusk',
    css: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #064e3b 70%, #0b1220 100%)'
  },
  {
    id: 'desert-slate',
    name: 'Desert Slate',
    css: 'linear-gradient(135deg, #111827 0%, #1e293b 45%, #713f12 110%)'
  },
  {
    id: 'teal-minbar',
    name: 'Teal Minbar',
    css: 'radial-gradient(circle at 80% 0%, rgba(16,185,129,0.28) 0%, rgba(16,185,129,0) 55%), linear-gradient(135deg, #0b1220 0%, #134e4a 55%, #064e3b 100%)'
  }
];
