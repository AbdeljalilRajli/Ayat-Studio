import { forwardRef } from 'react';
import type { Verse } from '../data/verses';
import type { Pattern } from '../data/patterns';

export interface CanvasSettings {
  verse: Verse;
  backgroundImage: string | null;
  backgroundColor: string;
  pattern: Pattern;
  patternOpacity: number;
  vignetteIntensity: number;
  fontFamily: 'Amiri' | 'Lateef';
  fontSize: number;
  textColor: 'gold' | 'white' | 'black';
  showFrame: boolean;
  showTranslation: boolean;
}

interface CanvasPreviewProps {
  settings: CanvasSettings;
  aspectRatio: 'story' | 'square' | 'desktop';
}

const aspectRatioClasses = {
  story: 'aspect-[9/16] w-[360px]',
  square: 'aspect-square w-[400px]',
  desktop: 'aspect-[16/9] w-[640px]'
};

const textColorMap = {
  gold: '#d4af37',
  white: '#ffffff',
  black: '#000000'
};

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ settings, aspectRatio }, ref) => {
    const {
      verse,
      backgroundImage,
      backgroundColor,
      pattern,
      patternOpacity,
      vignetteIntensity,
      fontFamily,
      fontSize,
      textColor,
      showFrame,
      showTranslation
    } = settings;

    const fontClass = fontFamily === 'Amiri' ? 'font-amiri' : 'font-lateef';
    const currentTextColor = textColorMap[textColor];

    return (
      <div
        ref={ref}
        className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden shadow-2xl`}
        style={{
          backgroundColor,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Layer 1: Background (already set on parent) */}

        {/* Layer 2: Pattern Overlay */}
        {pattern.id !== 'none' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: pattern.css,
              backgroundSize: '60px 60px',
              opacity: patternOpacity / 100,
              mixBlendMode: 'multiply'
            }}
          />
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
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          {/* Ornamental Frame */}
          {showFrame && (
            <div
              className="absolute inset-8 border-2 pointer-events-none"
              style={{
                borderColor: currentTextColor,
                opacity: 0.6
              }}
            >
              {/* Corner decorations */}
              <div
                className="absolute -top-1 -left-1 w-6 h-6"
                style={{
                  borderTop: `2px solid ${currentTextColor}`,
                  borderLeft: `2px solid ${currentTextColor}`
                }}
              />
              <div
                className="absolute -top-1 -right-1 w-6 h-6"
                style={{
                  borderTop: `2px solid ${currentTextColor}`,
                  borderRight: `2px solid ${currentTextColor}`
                }}
              />
              <div
                className="absolute -bottom-1 -left-1 w-6 h-6"
                style={{
                  borderBottom: `2px solid ${currentTextColor}`,
                  borderLeft: `2px solid ${currentTextColor}`
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6"
                style={{
                  borderBottom: `2px solid ${currentTextColor}`,
                  borderRight: `2px solid ${currentTextColor}`
                }}
              />
            </div>
          )}

          {/* Arabic Text */}
          <div
            className={`${fontClass} text-center leading-relaxed`}
            style={{
              fontSize: `${fontSize}px`,
              color: currentTextColor,
              textShadow: textColor === 'white' ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
              direction: 'rtl'
            }}
          >
            {verse.arabic}
          </div>

          {/* Divider */}
          <div
            className="w-16 h-px my-4"
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
      </div>
    );
  }
);

CanvasPreview.displayName = 'CanvasPreview';
