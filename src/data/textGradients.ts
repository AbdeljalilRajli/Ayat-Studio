export interface TextGradientPreset {
    id: string;
    name: string;
    css: string;
}

export const textGradients: TextGradientPreset[] = [
    {
        id: 'gold',
        name: 'Gold',
        css: 'linear-gradient(135deg, #b8860b 0%, #d4af37 25%, #ffd700 50%, #f0e68c 75%, #d4af37 100%)'
    },
    {
        id: 'silver',
        name: 'Silver',
        css: 'linear-gradient(135deg, #9ca3af 0%, #d1d5db 25%, #f3f4f6 50%, #e5e7eb 75%, #9ca3af 100%)'
    },
    {
        id: 'rose-gold',
        name: 'Rose Gold',
        css: 'linear-gradient(135deg, #b76e79 0%, #e0bfb8 25%, #ffdfd4 50%, #e0bfb8 75%, #b76e79 100%)'
    },
    {
        id: 'midnight',
        name: 'Midnight',
        css: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)'
    },
    {
        id: 'dawn',
        name: 'Dawn',
        css: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #7c3aed 100%)'
    },
    {
        id: 'emerald',
        name: 'Emerald',
        css: 'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #34d399 100%)'
    },
    {
        id: 'ocean',
        name: 'Ocean',
        css: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)'
    },
    {
        id: 'saffron',
        name: 'Saffron',
        css: 'linear-gradient(135deg, #92400e 0%, #f59e0b 35%, #fde68a 65%, #d97706 100%)'
    }
];
