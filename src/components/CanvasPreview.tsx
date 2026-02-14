import { forwardRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Verse } from '../data/verses';
import type { Pattern } from '../data/patterns';
import type { BorderType } from '../data/borders';
import type { GradientPreset } from '../data/gradients';
import type { TextGradientPreset } from '../data/textGradients';

export interface CanvasSettings {
  verse: Verse;
  backgroundImage: string | null;
  backgroundMode: 'solid' | 'gradient';
  backgroundColor: string;
  backgroundGradient: GradientPreset;
  pattern: Pattern;
  patternOpacity: number;
  patternColor: string;
  vignetteIntensity: number;
  fontFamily: 'Amiri' | 'Lateef' | 'Scheherazade' | 'Reem Kufi' | 'Noto Naskh' | 'Cairo' | 'Tajawal' | 'Almarai' | 'Noto Sans Arabic' | 'DM Mono' | 'Ruwudu' | 'IBM Plex Sans Arabic';
  fontSize: number;
  textColor: 'gold' | 'white' | 'black' | 'gradient';
  textGradient: TextGradientPreset;
  showTranslation: boolean;
  borderType: BorderType['id'];
}

interface CanvasPreviewProps {
  settings: CanvasSettings;
  aspectRatio: 'story' | 'square' | 'desktop';
}

const aspectRatioClasses = {
  story: 'aspect-[9/16] w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[560px]',
  square: 'aspect-square w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[620px]',
  desktop: 'aspect-[16/9] w-full max-w-[920px] 2xl:max-w-[1040px]'
};

const textColorMap = {
  gold: '#d4af37',
  white: '#ffffff',
  black: '#000000',
  gradient: '#d4af37' // Fallback for borders/dividers
};

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ settings, aspectRatio }, ref) => {
    const {
      verse,
      backgroundImage,
      backgroundMode,
      backgroundColor,
      backgroundGradient,
      pattern,
      patternOpacity,
      patternColor,
      vignetteIntensity,
      fontFamily,
      fontSize,
      textColor,
      textGradient,
      showTranslation,
      borderType
    } = settings;

    const fontFamilyMap = {
      'Amiri': "Amiri, serif",
      'Lateef': "Lateef, cursive",
      'Scheherazade': "Scheherazade New, serif",
      'Reem Kufi': "Reem Kufi, sans-serif",
      'Noto Naskh': "Noto Naskh Arabic, serif",
      'Cairo': "Cairo, sans-serif",
      'Tajawal': "Tajawal, sans-serif",
      'Almarai': "Almarai, sans-serif",
      'Noto Sans Arabic': "Noto Sans Arabic, sans-serif",
      'DM Mono': "DM Mono, monospace",
      'Ruwudu': "Ruwudu, serif",
      'IBM Plex Sans Arabic': "IBM Plex Sans Arabic, sans-serif"
    };
    const currentFontFamily = fontFamilyMap[fontFamily];
    const currentTextColor = textColorMap[textColor];
    const isGradientText = textColor === 'gradient';
    const basePatternAlpha = Math.min(1, Math.pow(patternOpacity / 100, 0.65) * 1.25);
    const strongPatternAlpha = Math.max(0, Math.min(1, (patternOpacity - 70) / 30)) * 0.9;

    // Build a key that changes when the background changes, to trigger fade-in
    const bgKey = useMemo(() => {
      if (backgroundImage) return `img-${backgroundImage.slice(-20)}`;
      if (backgroundMode === 'gradient') return `grad-${backgroundGradient.id}`;
      return `solid-${backgroundColor}`;
    }, [backgroundImage, backgroundMode, backgroundGradient.id, backgroundColor]);

    // Gradient style for text
    const textGradientStyle: React.CSSProperties = isGradientText
      ? {
        backgroundImage: textGradient.css,
        backgroundSize: '100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
      : {};

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={bgKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          ref={ref}
          className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden shadow-2xl ring-1 ring-white/10`}
          style={{
            backgroundColor,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : backgroundMode === 'gradient' && backgroundGradient.id !== 'none'
                ? backgroundGradient.css
                : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Layer 1: Background (already set on parent) */}

          {/* Layer 2: Pattern Overlay */}
          {pattern.id !== 'none' && (
            <>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: patternColor,
                  WebkitMaskImage: pattern.css,
                  maskImage: pattern.css,
                  WebkitMaskSize: '120px 120px',
                  maskSize: '120px 120px',
                  WebkitMaskRepeat: 'repeat',
                  maskRepeat: 'repeat',
                  opacity: basePatternAlpha,
                  mixBlendMode: 'soft-light'
                }}
              />
              {strongPatternAlpha > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: patternColor,
                    WebkitMaskImage: pattern.css,
                    maskImage: pattern.css,
                    WebkitMaskSize: '120px 120px',
                    maskSize: '120px 120px',
                    WebkitMaskRepeat: 'repeat',
                    maskRepeat: 'repeat',
                    opacity: strongPatternAlpha,
                    mixBlendMode: 'normal'
                  }}
                />
              )}
            </>
          )}

          {/* Layer 3: Vignette/Dark Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,${vignetteIntensity / 100}) 100%)`,
              boxShadow: `inset 0 0 ${100 + vignetteIntensity}px rgba(0,0,0,${vignetteIntensity / 200})`
            }}
          />

          {/* Layer 4: Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10">
            {/* Border Frame */}
            {borderType !== 'none' && (
              <>
                {borderType === 'simple' && (
                  <div
                    className="absolute inset-8 border pointer-events-none"
                    style={{ borderColor: currentTextColor, opacity: 0.6, borderWidth: '1px' }}
                  />
                )}

                {borderType === 'double' && (
                  <>
                    <div
                      className="absolute inset-8 border-2 pointer-events-none"
                      style={{ borderColor: currentTextColor, opacity: 0.6 }}
                    />
                    <div
                      className="absolute inset-9 border pointer-events-none"
                      style={{ borderColor: currentTextColor, opacity: 0.4, borderWidth: '1px' }}
                    />
                  </>
                )}

                {borderType === 'ornate-corners' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.6 }}
                    />
                    <div className="absolute -top-3 -left-3 w-8 h-8" style={{ borderTop: `3px solid ${currentTextColor}`, borderLeft: `3px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -top-3 -right-3 w-8 h-8" style={{ borderTop: `3px solid ${currentTextColor}`, borderRight: `3px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -bottom-3 -left-3 w-8 h-8" style={{ borderBottom: `3px solid ${currentTextColor}`, borderLeft: `3px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -bottom-3 -right-3 w-8 h-8" style={{ borderBottom: `3px solid ${currentTextColor}`, borderRight: `3px solid ${currentTextColor}`, opacity: 0.8 }} />
                  </div>
                )}

                {borderType === 'geometric' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.5 }}
                    />
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `8px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `8px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: `8px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `8px solid ${currentTextColor}`, opacity: 0.7 }} />
                  </div>
                )}

                {borderType === 'mosque' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.6 }}
                    />
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-16"
                      style={{
                        borderTop: `3px solid ${currentTextColor}`,
                        borderLeft: `3px solid ${currentTextColor}`,
                        borderRight: `3px solid ${currentTextColor}`,
                        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                        opacity: 0.7
                      }}
                    />
                  </div>
                )}

                {borderType === 'andalusian' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.5 }}
                    />
                    <div className="absolute -top-6 left-1/4 -translate-x-1/2 w-16 h-10" style={{ borderTop: `2px solid ${currentTextColor}`, borderLeft: `2px solid ${currentTextColor}`, borderRight: `2px solid ${currentTextColor}`, borderRadius: '50% 50% 0 0', opacity: 0.6 }} />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-10" style={{ borderTop: `2px solid ${currentTextColor}`, borderLeft: `2px solid ${currentTextColor}`, borderRight: `2px solid ${currentTextColor}`, borderRadius: '50% 50% 0 0', opacity: 0.6 }} />
                    <div className="absolute -top-6 left-3/4 -translate-x-1/2 w-16 h-10" style={{ borderTop: `2px solid ${currentTextColor}`, borderLeft: `2px solid ${currentTextColor}`, borderRight: `2px solid ${currentTextColor}`, borderRadius: '50% 50% 0 0', opacity: 0.6 }} />
                    <div className="absolute -top-2 -left-2 w-10 h-10" style={{ borderTop: `3px solid ${currentTextColor}`, borderLeft: `3px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute -top-2 -right-2 w-10 h-10" style={{ borderTop: `3px solid ${currentTextColor}`, borderRight: `3px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute -bottom-2 -left-2 w-10 h-10" style={{ borderBottom: `3px solid ${currentTextColor}`, borderLeft: `3px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10" style={{ borderBottom: `3px solid ${currentTextColor}`, borderRight: `3px solid ${currentTextColor}`, opacity: 0.7 }} />
                  </div>
                )}

                {borderType === 'moroccan' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-[3px]"
                      style={{ borderColor: currentTextColor, opacity: 0.6 }}
                    />
                    <div
                      className="absolute inset-2 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.4 }}
                    />
                    <div className="absolute -top-3 -left-3 w-6 h-6 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -top-3 -right-3 w-6 h-6 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.8 }} />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0" style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: `6px solid ${currentTextColor}`, opacity: 0.7 }} />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0" style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: `6px solid ${currentTextColor}`, opacity: 0.7 }} />
                  </div>
                )}

                {borderType === 'islamic-lattice' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.5 }}
                    />
                    <div className="absolute -top-4 -left-4">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 rotate-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 rotate-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 rotate-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 rotate-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.7 }} />
                      </div>
                    </div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 border-t-2" style={{ borderColor: currentTextColor, opacity: 0.6 }} />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-4 border-b-2" style={{ borderColor: currentTextColor, opacity: 0.6 }} />
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-12 border-l-2" style={{ borderColor: currentTextColor, opacity: 0.6 }} />
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-12 border-r-2" style={{ borderColor: currentTextColor, opacity: 0.6 }} />
                  </div>
                )}

                {borderType === 'mihrab-frame' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.55 }}
                    />
                    <div
                      className="absolute inset-2 border"
                      style={{ borderColor: currentTextColor, opacity: 0.3 }}
                    />
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-28 h-14"
                      style={{
                        borderTop: `3px solid ${currentTextColor}`,
                        borderLeft: `3px solid ${currentTextColor}`,
                        borderRight: `3px solid ${currentTextColor}`,
                        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                        opacity: 0.75
                      }}
                    />
                    <div className="absolute top-8 -left-1 w-2 h-20" style={{ backgroundColor: currentTextColor, opacity: 0.55 }} />
                    <div className="absolute top-8 -right-1 w-2 h-20" style={{ backgroundColor: currentTextColor, opacity: 0.55 }} />
                  </div>
                )}

                {borderType === 'safavid-stars' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-[3px]"
                      style={{ borderColor: currentTextColor, opacity: 0.55 }}
                    />
                    <div
                      className="absolute inset-3 border"
                      style={{ borderColor: currentTextColor, opacity: 0.28 }}
                    />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                      </div>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                      </div>
                    </div>
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                      </div>
                    </div>
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                        <div className="absolute inset-0 rotate-45" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                      </div>
                    </div>
                  </div>
                )}

                {borderType === 'crescent-chain' && (
                  <div className="absolute inset-8 pointer-events-none">
                    <div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: currentTextColor, opacity: 0.52 }}
                    />
                    <div
                      className="absolute inset-2 border"
                      style={{ borderColor: currentTextColor, opacity: 0.28 }}
                    />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 translate-x-1 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 -translate-x-1 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 translate-y-1 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 -translate-y-1 w-5 h-5 rounded-full" style={{ border: `2px solid ${currentTextColor}`, opacity: 0.75 }} />
                  </div>
                )}
              </>
            )}

            {/* Arabic Text */}
            <div
              className="text-center leading-relaxed"
              style={{
                fontFamily: currentFontFamily,
                fontSize: `${fontSize}px`,
                fontWeight: 400,
                color: isGradientText ? undefined : currentTextColor,
                textShadow: isGradientText ? 'none' : (textColor === 'white' ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)'),
                direction: 'rtl',
                ...textGradientStyle
              }}
            >
              {verse.arabic}
            </div>

            {/* Divider */}
            <div
              className="w-16 h-px my-4 sm:my-5"
              style={{
                backgroundColor: currentTextColor,
                opacity: 0.5
              }}
            />

            {/* Translation */}
            {showTranslation && (
              <div
                className="text-center max-w-[80%] leading-relaxed"
                style={{
                  fontSize: `${Math.max(fontSize * 0.35, 14)}px`,
                  color: currentTextColor,
                  opacity: 0.9,
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 300,
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }}
              >
                {verse.translation}
              </div>
            )}

            {/* Surah Reference */}
            <div
              className="mt-6 text-sm tracking-wider uppercase"
              style={{
                color: currentTextColor,
                opacity: 0.7,
                fontFamily: 'system-ui, sans-serif'
              }}
            >
              {verse.surah} — {verse.reference}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';
