import { Upload, Download, Smartphone, Square, Monitor, Image as ImageIcon, Palette, Type, Frame, BookOpen } from 'lucide-react';
import type { Verse } from '../data/verses';
import type { Pattern } from '../data/patterns';

interface SidebarProps {
  verses: Verse[];
  patterns: Pattern[];
  selectedVerseId: string;
  onSelectVerse: (id: string) => void;
  backgroundImage: string | null;
  onBackgroundImageChange: (image: string | null) => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  selectedPatternId: string;
  onSelectPattern: (id: string) => void;
  patternOpacity: number;
  onPatternOpacityChange: (opacity: number) => void;
  vignetteIntensity: number;
  onVignetteIntensityChange: (intensity: number) => void;
  fontFamily: 'Amiri' | 'Lateef';
  onFontFamilyChange: (family: 'Amiri' | 'Lateef') => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  textColor: 'gold' | 'white' | 'black';
  onTextColorChange: (color: 'gold' | 'white' | 'black') => void;
  showFrame: boolean;
  onShowFrameChange: (show: boolean) => void;
  showTranslation: boolean;
  onShowTranslationChange: (show: boolean) => void;
  onExport: (ratio: 'story' | 'square' | 'desktop') => void;
}

export function Sidebar({
  verses,
  patterns,
  selectedVerseId,
  onSelectVerse,
  backgroundImage,
  onBackgroundImageChange,
  backgroundColor,
  onBackgroundColorChange,
  selectedPatternId,
  onSelectPattern,
  patternOpacity,
  onPatternOpacityChange,
  vignetteIntensity,
  onVignetteIntensityChange,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
  showFrame,
  onShowFrameChange,
  showTranslation,
  onShowTranslationChange,
  onExport
}: SidebarProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onBackgroundImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-80 h-screen glass flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#d4af37]/20">
        <h1 className="text-xl font-bold text-gold-gradient flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#d4af37]" />
          Aya Wallpaper
        </h1>
        <p className="text-xs text-gray-400 mt-1">Create beautiful Quran wallpapers</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Verse Selection */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Select Verse
          </h2>
          <select
            value={selectedVerseId}
            onChange={(e) => onSelectVerse(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 text-sm text-white focus:border-[#d4af37] focus:outline-none"
          >
            {verses.map((verse) => (
              <option key={verse.id} value={verse.id}>
                {verse.surah} ({verse.reference})
              </option>
            ))}
          </select>
          <div className="p-3 rounded-lg bg-slate-800/30 border border-[#d4af37]/10 text-xs text-gray-300">
            <p className="font-amiri text-right text-lg mb-2" style={{ direction: 'rtl' }}>
              {verses.find(v => v.id === selectedVerseId)?.arabic.slice(0, 50)}...
            </p>
            <p>{verses.find(v => v.id === selectedVerseId)?.translation.slice(0, 60)}...</p>
          </div>
        </section>

        {/* Background */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Background
          </h2>
          
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Upload Image</label>
            <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 cursor-pointer hover:bg-slate-800/70 transition-colors">
              <Upload className="w-4 h-4 text-[#d4af37]" />
              <span className="text-sm text-gray-300">Choose image...</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {backgroundImage && (
              <button
                onClick={() => onBackgroundImageChange(null)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove image
              </button>
            )}
          </div>

          {/* Solid Color */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Or Solid Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="text-sm text-gray-300 font-mono">{backgroundColor}</span>
            </div>
          </div>
        </section>

        {/* Pattern */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Pattern Overlay
          </h2>
          <select
            value={selectedPatternId}
            onChange={(e) => onSelectPattern(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 text-sm text-white focus:border-[#d4af37] focus:outline-none"
          >
            {patterns.map((pattern) => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.name}
              </option>
            ))}
          </select>
          <div className="space-y-2">
            <label className="flex justify-between text-xs text-gray-400">
              <span>Pattern Intensity</span>
              <span>{patternOpacity}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={patternOpacity}
              onChange={(e) => onPatternOpacityChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </section>

        {/* Vignette */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37]">Vignette Effect</h2>
          <div className="space-y-2">
            <label className="flex justify-between text-xs text-gray-400">
              <span>Darken Edges</span>
              <span>{vignetteIntensity}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={vignetteIntensity}
              onChange={(e) => onVignetteIntensityChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </h2>
          
          {/* Font Family */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Arabic Font</label>
            <div className="flex gap-2">
              <button
                onClick={() => onFontFamilyChange('Amiri')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                  fontFamily === 'Amiri'
                    ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37]'
                    : 'bg-slate-800/50 border border-[#d4af37]/30 text-gray-300 hover:bg-slate-800/70'
                }`}
              >
                Amiri
              </button>
              <button
                onClick={() => onFontFamilyChange('Lateef')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                  fontFamily === 'Lateef'
                    ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37]'
                    : 'bg-slate-800/50 border border-[#d4af37]/30 text-gray-300 hover:bg-slate-800/70'
                }`}
              >
                Lateef
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label className="flex justify-between text-xs text-gray-400">
              <span>Font Size</span>
              <span>{fontSize}px</span>
            </label>
            <input
              type="range"
              min="24"
              max="120"
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <label className="block text-xs text-gray-400">Text Color</label>
            <div className="flex gap-2">
              {(['gold', 'white', 'black'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => onTextColorChange(color)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize transition-all ${
                    textColor === color
                      ? 'ring-2 ring-[#d4af37]'
                      : ''
                  } ${
                    color === 'gold'
                      ? 'bg-gradient-to-br from-[#d4af37] to-[#f0e68c] text-slate-900'
                      : color === 'white'
                      ? 'bg-white text-slate-900'
                      : 'bg-black text-white border border-gray-600'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Frame Toggle */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
            <Frame className="w-4 h-4" />
            Frame
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showFrame}
              onChange={(e) => onShowFrameChange(e.target.checked)}
              className="w-4 h-4 rounded border-[#d4af37]/30 bg-slate-800/50 text-[#d4af37] focus:ring-[#d4af37]"
            />
            <span className="text-sm text-gray-300">Show ornamental border</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={(e) => onShowTranslationChange(e.target.checked)}
              className="w-4 h-4 rounded border-[#d4af37]/30 bg-slate-800/50 text-[#d4af37] focus:ring-[#d4af37]"
            />
            <span className="text-sm text-gray-300">Show translation</span>
          </label>
        </section>
      </div>

      {/* Export Section */}
      <div className="p-4 border-t border-[#d4af37]/20 space-y-3">
        <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Wallpaper
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onExport('story')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all"
          >
            <Smartphone className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-gray-300">Story</span>
            <span className="text-[10px] text-gray-500">9:16</span>
          </button>
          <button
            onClick={() => onExport('square')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all"
          >
            <Square className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-gray-300">Post</span>
            <span className="text-[10px] text-gray-500">1:1</span>
          </button>
          <button
            onClick={() => onExport('desktop')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all"
          >
            <Monitor className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-gray-300">Desktop</span>
            <span className="text-[10px] text-gray-500">16:9</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
