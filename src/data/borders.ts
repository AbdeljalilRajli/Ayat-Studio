export interface BorderType {
  id: string;
  name: string;
  description: string;
}

export const borderTypes: BorderType[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No border'
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Clean thin border'
  },
  {
    id: 'ornate-corners',
    name: 'Ornate Corners',
    description: 'Decorative corner accents'
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description: 'Islamic geometric patterns at corners'
  },
  {
    id: 'double',
    name: 'Double Frame',
    description: 'Double line border'
  },
  {
    id: 'mosque',
    name: 'Mosque Arch',
    description: 'Mosque-inspired top arch'
  },
  {
    id: 'andalusian',
    name: 'Andalusian',
    description: 'Moorish horseshoe arches and intricate patterns'
  },
  {
    id: 'moroccan',
    name: 'Moroccan Zellige',
    description: 'Traditional Moroccan tile-inspired geometric border'
  },
  {
    id: 'islamic-lattice',
    name: 'Islamic Lattice',
    description: 'Eight-pointed star and interlacing geometric patterns'
  }
];
