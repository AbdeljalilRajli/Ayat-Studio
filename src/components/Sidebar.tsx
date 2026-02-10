import { Upload, Download, Smartphone, Square, Monitor, Image as ImageIcon, Palette, Type, Frame, BookOpen } from 'lucide-react';
import type { Verse } from '../data/verses';
import type { Pattern } from '../data/patterns';
import type { GradientPreset } from '../data/gradients';
import type { BorderType } from '../data/borders';
import { borderTypes } from '../data/borders';
import { ColorPicker } from './ColorPicker';

type FontFamily = 'Amiri' | 'Lateef' | 'Scheherazade' | 'Reem Kufi' | 'Noto Naskh' | 'Cairo' | 'Tajawal' | 'Almarai' | 'Noto Sans Arabic' | 'DM Mono' | 'Ruwudu' | 'IBM Plex Sans Arabic';

interface SidebarProps {
  verses: Verse[];
  patterns: Pattern[];
  gradients: GradientPreset[];
  selectedVerseId: string;
  onSelectVerse: (id: string) => void;
  backgroundImage: string | null;
  onBackgroundImageChange: (image: string | null) => void;
  backgroundMode: 'solid' | 'gradient';
  onBackgroundModeChange: (mode: 'solid' | 'gradient') => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  selectedGradientId: string;
  onSelectGradient: (id: string) => void;
  selectedPatternId: string;
  onSelectPattern: (id: string) => void;
  patternOpacity: number;
  onPatternOpacityChange: (opacity: number) => void;
  patternColor: string;
  onPatternColorChange: (color: string) => void;
  vignetteIntensity: number;
  onVignetteIntensityChange: (intensity: number) => void;
  fontFamily: FontFamily;
  onFontFamilyChange: (family: FontFamily) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  textColor: 'gold' | 'white' | 'black';
  onTextColorChange: (color: 'gold' | 'white' | 'black') => void;
  borderType: BorderType['id'];
  onBorderTypeChange: (type: BorderType['id']) => void;
  showTranslation: boolean;
  onShowTranslationChange: (show: boolean) => void;
  onExport: (ratio: 'story' | 'square' | 'desktop') => void;
}

export function Sidebar({
  verses,
  patterns,
  gradients,
  selectedVerseId,
  onSelectVerse,
  backgroundImage,
  onBackgroundImageChange,
  backgroundMode,
  onBackgroundModeChange,
  backgroundColor,
  onBackgroundColorChange,
  selectedGradientId,
  onSelectGradient,
  selectedPatternId,
  onSelectPattern,
  patternOpacity,
  onPatternOpacityChange,
  patternColor,
  onPatternColorChange,
  vignetteIntensity,
  onVignetteIntensityChange,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
  borderType,
  onBorderTypeChange,
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
    <aside className="w-full lg:w-[360px] lg:h-screen flex flex-col overflow-hidden relative shrink-0">
      {/* Background layers */}
      <div className="absolute inset-0 bg-slate-950" />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M42 0l10.5 10.5L63 0l10.5 10.5V31.5L63 42l10.5 10.5V73.5L63 63 52.5 73.5 42 63 31.5 73.5 21 63 10.5 73.5V52.5L21 42 10.5 31.5V10.5L21 0l10.5 10.5L42 0zm0 21L31.5 31.5 42 42l10.5-10.5L42 21zm0 42L31.5 73.5 42 84l10.5-10.5L42 63z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '84px 84px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/98 to-[#064e3b]/60" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="px-5 pt-6 pb-5 border-b border-[#d4af37]/15">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37]/15 to-transparent" />
              <BookOpen className="w-5 h-5 text-[#d4af37] relative" />
            </div>
            <div className="flex-1">
              <h1 className="text-[18px] leading-tight font-semibold tracking-tight text-[#d4af37]">
                Ayat Studio
              </h1>
              <p className="text-[11px] text-slate-400">Create beautiful Quran wallpapers</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-900/30 border border-white/5 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              A calm, modern editor inspired by Islamic geometry. Customize verse, background, patterns, typography, and borders.
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 py-5 space-y-5 lg:flex-1 lg:overflow-y-auto">
        {/* Verse Selection */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Select Verse
            </h2>
            <select
              value={selectedVerseId}
              onChange={(e) => onSelectVerse(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/40 border border-[#d4af37]/25 text-sm text-white focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 transition-colors"
            >
              {verses.map((verse) => (
                <option key={verse.id} value={verse.id}>
                  {verse.surah} ({verse.reference})
                </option>
              ))}
            </select>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950/50 to-slate-900/30 border border-[#d4af37]/10">
              <p className="font-amiri text-right text-[22px] leading-relaxed mb-2 text-[#d4af37]" style={{ direction: 'rtl' }}>
                {verses.find(v => v.id === selectedVerseId)?.arabic.slice(0, 56)}...
              </p>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                {verses.find(v => v.id === selectedVerseId)?.translation.slice(0, 80)}...
              </p>
            </div>
          </section>

        {/* Background */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Background
            </h2>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-xs text-slate-400">Upload Image</label>
              <label className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-[#d4af37]/25 cursor-pointer hover:border-[#d4af37]/60 hover:bg-slate-950/55 transition-colors">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20">
                  <Upload className="w-4 h-4 text-[#d4af37]" />
                </span>
                <span className="text-sm text-slate-200">Choose image...</span>
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
                  className="text-xs text-rose-300/90 hover:text-rose-200 transition-colors"
                >
                  Remove image
                </button>
              )}
            </div>

            {/* Solid Color */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs text-slate-400">Background Style</label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onBackgroundModeChange('solid')}
                  className={`py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    backgroundMode === 'solid'
                      ? 'bg-[#d4af37] text-slate-950'
                      : 'bg-slate-950/35 border border-white/5 text-slate-200 hover:border-[#d4af37]/25'
                  }`}
                >
                  Solid
                </button>
                <button
                  type="button"
                  onClick={() => onBackgroundModeChange('gradient')}
                  className={`py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    backgroundMode === 'gradient'
                      ? 'bg-[#d4af37] text-slate-950'
                      : 'bg-slate-950/35 border border-white/5 text-slate-200 hover:border-[#d4af37]/25'
                  }`}
                >
                  Gradient
                </button>
              </div>

              {backgroundMode === 'solid' ? (
                <>
                  <label className="block text-xs text-slate-400">Solid Color</label>
                  <ColorPicker color={backgroundColor} onChange={onBackgroundColorChange} />
                </>
              ) : (
                <>
                  <label className="block text-xs text-slate-400">Gradient Preset</label>
                  <select
                    value={selectedGradientId}
                    onChange={(e) => onSelectGradient(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950/40 border border-[#d4af37]/25 text-sm text-white focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 transition-colors"
                  >
                    {gradients.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="h-12 rounded-2xl border border-white/5"
                    style={{ backgroundImage: gradients.find(g => g.id === selectedGradientId)?.css || 'none' }}
                  />
                </>
              )}
            </div>
          </section>

        {/* Pattern */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Pattern Overlay
            </h2>
            <select
              value={selectedPatternId}
              onChange={(e) => onSelectPattern(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/40 border border-[#d4af37]/25 text-sm text-white focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 transition-colors"
            >
              {patterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name}
                </option>
              ))}
            </select>
            <div className="space-y-2">
              <label className="flex justify-between text-xs text-slate-400">
                <span>Pattern Intensity</span>
                <span className="text-[#d4af37] font-medium">{patternOpacity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={patternOpacity}
                onChange={(e) => onPatternOpacityChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-slate-400">Pattern Color</label>
              <ColorPicker color={patternColor} onChange={onPatternColorChange} />
            </div>
          </section>

        {/* Vignette */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37]">Vignette Effect</h2>
            <div className="space-y-2">
              <label className="flex justify-between text-xs text-slate-400">
                <span>Darken Edges</span>
                <span className="text-[#d4af37] font-medium">{vignetteIntensity}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={vignetteIntensity}
                onChange={(e) => onVignetteIntensityChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>
          </section>

        {/* Typography */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <Type className="w-4 h-4" />
              Typography
            </h2>
            
            {/* Font Family */}
            <div className="space-y-2">
              <label className="block text-xs text-slate-400">Arabic Font</label>
              <select
                value={fontFamily}
                onChange={(e) => onFontFamilyChange(e.target.value as FontFamily)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/40 border border-[#d4af37]/25 text-sm text-white focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 transition-colors"
              >
                <option value="Amiri">Amiri (Classical)</option>
                <option value="Lateef">Lateef (Elegant)</option>
                <option value="Scheherazade">Scheherazade New (Traditional)</option>
                <option value="Reem Kufi">Reem Kufi (Modern Kufic)</option>
                <option value="Noto Naskh">Noto Naskh (Readable)</option>
                <option value="Cairo">Cairo (Contemporary)</option>
                <option value="Tajawal">Tajawal (Modern)</option>
                <option value="Almarai">Almarai (Bold)</option>
                <option value="Noto Sans Arabic">Noto Sans Arabic (Clean)</option>
                <option value="DM Mono">DM Mono (Monospace)</option>
                <option value="Ruwudu">Ruwudu (Calligraphy)</option>
                <option value="IBM Plex Sans Arabic">IBM Plex Sans (Professional)</option>
              </select>
              {/* Font Preview */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950/45 to-slate-900/25 border border-[#d4af37]/10 text-center">
                <p
                  className="text-[26px] leading-relaxed text-[#d4af37]"
                  style={{
                    direction: 'rtl',
                    fontFamily:
                      fontFamily === 'Amiri'
                        ? 'Amiri, serif'
                        : fontFamily === 'Lateef'
                          ? 'Lateef, cursive'
                          : fontFamily === 'Scheherazade'
                            ? 'Scheherazade New, serif'
                            : fontFamily === 'Reem Kufi'
                              ? 'Reem Kufi, sans-serif'
                              : fontFamily === 'Noto Naskh'
                                ? 'Noto Naskh Arabic, serif'
                                : fontFamily === 'Cairo'
                                  ? 'Cairo, sans-serif'
                                  : fontFamily === 'Tajawal'
                                    ? 'Tajawal, sans-serif'
                                    : fontFamily === 'Almarai'
                                      ? 'Almarai, sans-serif'
                                      : fontFamily === 'Noto Sans Arabic'
                                        ? 'Noto Sans Arabic, sans-serif'
                                        : fontFamily === 'DM Mono'
                                          ? 'DM Mono, monospace'
                                          : fontFamily === 'Ruwudu'
                                            ? 'Ruwudu, serif'
                                            : 'IBM Plex Sans Arabic, sans-serif'
                  }}
                >
                  بسم الله
                </p>
                <p className="text-xs text-slate-500 mt-1">{fontFamily}</p>
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="flex justify-between text-xs text-slate-400">
                <span>Font Size</span>
                <span className="text-[#d4af37] font-medium">{fontSize}px</span>
              </label>
              <input
                type="range"
                min="24"
                max="120"
                value={fontSize}
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <label className="block text-xs text-slate-400">Text Color</label>
              <div className="grid grid-cols-3 gap-2">
                {(['gold', 'white', 'black'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => onTextColorChange(color)}
                    className={`py-2.5 px-3 rounded-2xl text-sm capitalize transition-all active:scale-[0.99] ${
                      textColor === color ? 'ring-2 ring-[#d4af37]/80 ring-offset-2 ring-offset-slate-950/60' : 'hover:ring-1 hover:ring-[#d4af37]/25'
                    } ${
                      color === 'gold'
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-slate-950 font-semibold'
                        : color === 'white'
                          ? 'bg-white text-slate-950 font-semibold'
                          : 'bg-slate-950 text-white border border-slate-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </section>

        {/* Frame/Border Selection */}
          <section className="rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-sm p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <Frame className="w-4 h-4" />
              Border Style
            </h2>
            <select
              value={borderType}
              onChange={(e) => onBorderTypeChange(e.target.value as BorderType['id'])}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/40 border border-[#d4af37]/25 text-sm text-white focus:border-[#d4af37]/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 transition-colors"
            >
              {borderTypes.map((border) => (
                <option key={border.id} value={border.id}>
                  {border.name} - {border.description}
                </option>
              ))}
            </select>
            <label className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/40 border border-white/5 cursor-pointer hover:border-[#d4af37]/25 transition-colors">
              <div>
                <div className="text-sm text-slate-200">Show translation</div>
                <div className="text-xs text-slate-500">Include English below the verse</div>
              </div>
              <input
                type="checkbox"
                checked={showTranslation}
                onChange={(e) => onShowTranslationChange(e.target.checked)}
                className="w-4 h-4 rounded border-[#d4af37]/30 bg-slate-950/40 text-[#d4af37] focus:ring-[#d4af37]/30"
              />
            </label>
          </section>
        </div>

        {/* Export Section */}
        <div className="px-5 py-5 border-t border-[#d4af37]/15 bg-slate-950/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#d4af37] flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </h2>
            <span className="text-[11px] text-slate-500">PNG • High quality</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onExport('story')}
              className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-all"
            >
              <Smartphone className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-200">Story</span>
              <span className="text-[10px] text-slate-500">9:16</span>
            </button>
            <button
              onClick={() => onExport('square')}
              className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-all"
            >
              <Square className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-200">Post</span>
              <span className="text-[10px] text-slate-500">1:1</span>
            </button>
            <button
              onClick={() => onExport('desktop')}
              className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-900/35 border border-white/5 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-all"
            >
              <Monitor className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="text-xs text-slate-200">Desktop</span>
              <span className="text-[10px] text-slate-500">16:9</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
