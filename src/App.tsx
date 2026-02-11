import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Monitor, Smartphone, Square } from 'lucide-react';
import { verses } from './data/verses';
import { patterns } from './data/patterns';
import { gradients } from './data/gradients';
import { CanvasPreview, type CanvasSettings } from './components/CanvasPreview';
import { Sidebar } from './components/Sidebar';

type FontFamily = 'Amiri' | 'Lateef' | 'Scheherazade' | 'Reem Kufi' | 'Noto Naskh' | 'Cairo' | 'Tajawal' | 'Almarai' | 'Noto Sans Arabic' | 'DM Mono' | 'Ruwudu' | 'IBM Plex Sans Arabic';

function App() {
  // State for all customization options
  const [selectedVerseId, setSelectedVerseId] = useState(verses[0].id);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundMode, setBackgroundMode] = useState<'solid' | 'gradient'>('solid');
  const [backgroundColor, setBackgroundColor] = useState('#064e3b');
  const [selectedGradientId, setSelectedGradientId] = useState('emerald-night');
  const [selectedPatternId, setSelectedPatternId] = useState('none');
  const [patternOpacity, setPatternOpacity] = useState(30);
  const [patternColor, setPatternColor] = useState('#d4af37');
  const [vignetteIntensity, setVignetteIntensity] = useState(50);
  const [fontFamily, setFontFamily] = useState<FontFamily>('Amiri');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState<'gold' | 'white' | 'black' | 'gold-gradient'>('gold');
  const [borderType, setBorderType] = useState('ornate-corners');
  const [showTranslation, setShowTranslation] = useState(true);
  const [previewAspectRatio, setPreviewAspectRatio] = useState<'story' | 'square' | 'desktop'>('story');
  const [isExporting, setIsExporting] = useState(false);

  // Refs for canvas elements
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get current settings
  const currentVerse = verses.find(v => v.id === selectedVerseId) || verses[0];
  const currentPattern = patterns.find(p => p.id === selectedPatternId) || patterns[0];
  const currentGradient = gradients.find(g => g.id === selectedGradientId) || gradients[0];

  const canvasSettings: CanvasSettings = {
    verse: currentVerse,
    backgroundImage,
    backgroundMode,
    backgroundColor,
    backgroundGradient: currentGradient,
    pattern: currentPattern,
    patternOpacity,
    patternColor,
    vignetteIntensity,
    fontFamily,
    fontSize,
    textColor,
    borderType,
    showTranslation
  };

  // Export dimensions for each aspect ratio
  const exportDimensions = {
    story: { width: 1080, height: 1920 },
    square: { width: 1080, height: 1080 },
    desktop: { width: 1920, height: 1080 }
  };

  const handleExport = async (ratio: 'story' | 'square' | 'desktop') => {
    setIsExporting(true);

    try {
      // Create a temporary off-screen container for high-res export
      const exportContainer = document.createElement('div');
      const { width, height } = exportDimensions[ratio];

      // Set up the export container
      exportContainer.style.position = 'fixed';
      exportContainer.style.left = '0';
      exportContainer.style.top = '0';
      exportContainer.style.width = `${width}px`;
      exportContainer.style.height = `${height}px`;
      exportContainer.style.pointerEvents = 'none';
      exportContainer.style.zIndex = '-1';

      document.body.appendChild(exportContainer);

      // Render the canvas preview into the export container
      // We'll create a clone of the canvas with the proper dimensions
      const exportPatternAlpha = patternOpacity / 100;

      const fontScaleReferenceWidth = ratio === 'desktop' ? 960 : 540;
      const exportScale = width / fontScaleReferenceWidth;

      const exportArabicFontSize = Math.round(fontSize * exportScale);
      const exportTranslationFontSize = Math.max(Math.round(fontSize * 0.35 * exportScale), 14);
      const exportMetaFontSize = Math.round(14 * exportScale);

      const exportTextColor = textColor === 'gold' || textColor === 'gold-gradient' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000';
      const isGoldGradient = textColor === 'gold-gradient';
      const sanitizeForStyleAttr = (value: string) => value.replaceAll('"', "'");

      const svgPatternToPngDataUrl = async (cssUrlValue: string, size: number, tintColor?: string) => {
        const match = cssUrlValue.match(/url\((['"]?)(.*?)\1\)/);
        const rawUrl = match?.[2];
        if (!rawUrl) return null;

        const isSvgDataUrl = rawUrl.startsWith('data:image/svg+xml');
        const isSvgFileUrl = (() => {
          try {
            const url = new URL(rawUrl, window.location.origin);
            return url.pathname.toLowerCase().endsWith('.svg');
          } catch {
            return false;
          }
        })();

        if (!isSvgDataUrl && !isSvgFileUrl) return null;

        const img = new Image();
        img.decoding = 'async';
        img.crossOrigin = 'anonymous';
        img.src = rawUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load SVG pattern'));
        });

        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        if (!ctx) return null;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        if (tintColor) {
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = tintColor;
          ctx.fillRect(0, 0, size, size);
          ctx.globalCompositeOperation = 'source-over';
        }

        return c.toDataURL('image/png');
      };

      const exportPatternCss = await (async () => {
        const css = currentPattern.css;
        if (css === 'none') return 'none';

        const trimmed = css.trim();
        if (trimmed.startsWith('url(')) {
          const pngDataUrl = await svgPatternToPngDataUrl(trimmed, 120, patternColor);
          if (pngDataUrl) return `url('${pngDataUrl}')`;
        }

        return sanitizeForStyleAttr(css);
      })();

      const exportGradientCss = sanitizeForStyleAttr(currentGradient.css);
      const exportBackgroundImageStyle = backgroundImage
        ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;`
        : backgroundMode === 'gradient' && currentGradient.id !== 'none'
          ? `background-image: ${exportGradientCss};`
          : '';

      const borderHtml = (() => {
        if (borderType === 'none') return '';

        const inset = Math.floor(width * 0.04);

        if (borderType === 'simple') {
          return `
            <div style="
              position: absolute;
              inset: ${inset}px;
              border: 1px solid ${exportTextColor};
              opacity: 0.6;
              pointer-events: none;
            "></div>
          `;
        }

        if (borderType === 'double') {
          return `
            <div style="
              position: absolute;
              inset: ${inset}px;
              border: 2px solid ${exportTextColor};
              opacity: 0.6;
              pointer-events: none;
            "></div>
            <div style="
              position: absolute;
              inset: ${inset + 4}px;
              border: 1px solid ${exportTextColor};
              opacity: 0.35;
              pointer-events: none;
            "></div>
          `;
        }

        if (borderType === 'ornate-corners') {
          const c = Math.floor(width * 0.03);
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="position:absolute; top:-2px; left:-2px; width:${c}px; height:${c}px; border-top:2px solid ${exportTextColor}; border-left:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; top:-2px; right:-2px; width:${c}px; height:${c}px; border-top:2px solid ${exportTextColor}; border-right:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; bottom:-2px; left:-2px; width:${c}px; height:${c}px; border-bottom:2px solid ${exportTextColor}; border-left:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; bottom:-2px; right:-2px; width:${c}px; height:${c}px; border-bottom:2px solid ${exportTextColor}; border-right:2px solid ${exportTextColor}; opacity:0.85;"></div>
            </div>
          `;
        }

        if (borderType === 'geometric') {
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.5;"></div>
              <div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; bottom:-10px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-top:10px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; left:-10px; top:50%; transform:translateY(-50%); width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-right:10px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; right:-10px; top:50%; transform:translateY(-50%); width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:10px solid ${exportTextColor}; opacity:0.7;"></div>
            </div>
          `;
        }

        if (borderType === 'mosque') {
          const archW = Math.floor(width * 0.12);
          const archH = Math.floor(width * 0.06);
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="
                position:absolute;
                top:${-Math.floor(archH * 0.55)}px;
                left:50%;
                transform:translateX(-50%);
                width:${archW}px;
                height:${archH}px;
                border-top:3px solid ${exportTextColor};
                border-left:3px solid ${exportTextColor};
                border-right:3px solid ${exportTextColor};
                border-radius:50% 50% 0 0 / 100% 100% 0 0;
                opacity:0.7;
              "></div>
            </div>
          `;
        }

        if (borderType === 'andalusian') {
          const w = Math.floor(width * 0.07);
          const h = Math.floor(width * 0.045);
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.5;"></div>
              <div style="position:absolute; top:${-Math.floor(h * 0.6)}px; left:25%; transform:translateX(-50%); width:${w}px; height:${h}px; border-top:2px solid ${exportTextColor}; border-left:2px solid ${exportTextColor}; border-right:2px solid ${exportTextColor}; border-radius:50% 50% 0 0; opacity:0.6;"></div>
              <div style="position:absolute; top:${-Math.floor(h * 0.6)}px; left:50%; transform:translateX(-50%); width:${w}px; height:${h}px; border-top:2px solid ${exportTextColor}; border-left:2px solid ${exportTextColor}; border-right:2px solid ${exportTextColor}; border-radius:50% 50% 0 0; opacity:0.6;"></div>
              <div style="position:absolute; top:${-Math.floor(h * 0.6)}px; left:75%; transform:translateX(-50%); width:${w}px; height:${h}px; border-top:2px solid ${exportTextColor}; border-left:2px solid ${exportTextColor}; border-right:2px solid ${exportTextColor}; border-radius:50% 50% 0 0; opacity:0.6;"></div>
              <div style="position:absolute; top:-2px; left:-2px; width:${Math.floor(w * 0.7)}px; height:${Math.floor(w * 0.7)}px; border-top:3px solid ${exportTextColor}; border-left:3px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; top:-2px; right:-2px; width:${Math.floor(w * 0.7)}px; height:${Math.floor(w * 0.7)}px; border-top:3px solid ${exportTextColor}; border-right:3px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; bottom:-2px; left:-2px; width:${Math.floor(w * 0.7)}px; height:${Math.floor(w * 0.7)}px; border-bottom:3px solid ${exportTextColor}; border-left:3px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; bottom:-2px; right:-2px; width:${Math.floor(w * 0.7)}px; height:${Math.floor(w * 0.7)}px; border-bottom:3px solid ${exportTextColor}; border-right:3px solid ${exportTextColor}; opacity:0.7;"></div>
            </div>
          `;
        }

        if (borderType === 'moroccan') {
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:3px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="position:absolute; inset:${Math.floor(width * 0.01)}px; border:2px solid ${exportTextColor}; opacity:0.35;"></div>
              <div style="position:absolute; top:-10px; left:-10px; width:20px; height:20px; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; top:-10px; right:-10px; width:20px; height:20px; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; bottom:-10px; left:-10px; width:20px; height:20px; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; bottom:-10px; right:-10px; width:20px; height:20px; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.85;"></div>
              <div style="position:absolute; top:50%; left:-2px; transform:translateY(-50%); width:0; height:0; border-top:7px solid transparent; border-bottom:7px solid transparent; border-right:7px solid ${exportTextColor}; opacity:0.7;"></div>
              <div style="position:absolute; top:50%; right:-2px; transform:translateY(-50%); width:0; height:0; border-top:7px solid transparent; border-bottom:7px solid transparent; border-left:7px solid ${exportTextColor}; opacity:0.7;"></div>
            </div>
          `;
        }

        if (borderType === 'islamic-lattice') {
          const star = Math.floor(width * 0.02);
          return `
            <div style="position:absolute; inset:${inset}px; pointer-events:none;">
              <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.5;"></div>

              <div style="position:absolute; top:${-star}px; left:${-star}px; width:${star * 2}px; height:${star * 2}px;">
                <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.7;"></div>
                <div style="position:absolute; inset:0; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.7;"></div>
              </div>
              <div style="position:absolute; top:${-star}px; right:${-star}px; width:${star * 2}px; height:${star * 2}px;">
                <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.7;"></div>
                <div style="position:absolute; inset:0; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.7;"></div>
              </div>
              <div style="position:absolute; bottom:${-star}px; left:${-star}px; width:${star * 2}px; height:${star * 2}px;">
                <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.7;"></div>
                <div style="position:absolute; inset:0; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.7;"></div>
              </div>
              <div style="position:absolute; bottom:${-star}px; right:${-star}px; width:${star * 2}px; height:${star * 2}px;">
                <div style="position:absolute; inset:0; border:2px solid ${exportTextColor}; opacity:0.7;"></div>
                <div style="position:absolute; inset:0; transform:rotate(45deg); border:2px solid ${exportTextColor}; opacity:0.7;"></div>
              </div>

              <div style="position:absolute; top:-2px; left:50%; transform:translateX(-50%); width:${Math.floor(width * 0.06)}px; border-top:2px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="position:absolute; bottom:-2px; left:50%; transform:translateX(-50%); width:${Math.floor(width * 0.06)}px; border-bottom:2px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="position:absolute; left:-2px; top:50%; transform:translateY(-50%); height:${Math.floor(width * 0.06)}px; border-left:2px solid ${exportTextColor}; opacity:0.6;"></div>
              <div style="position:absolute; right:-2px; top:50%; transform:translateY(-50%); height:${Math.floor(width * 0.06)}px; border-right:2px solid ${exportTextColor}; opacity:0.6;"></div>
            </div>
          `;
        }

        return `
          <div style="
            position: absolute;
            inset: ${inset}px;
            border: 2px solid ${exportTextColor};
            opacity: 0.6;
            pointer-events: none;
          "></div>
        `;
      })();

      const canvasContent = `
        <div style="
          width: ${width}px;
          height: ${height}px;
          position: relative;
          overflow: hidden;
          background-color: ${backgroundColor};
          ${exportBackgroundImageStyle}
        ">
          ${currentPattern.id !== 'none' ? `
            <div style="
              position: absolute;
              inset: 0;
              background-image: ${exportPatternCss};
              background-size: 120px 120px;
              background-repeat: repeat;
              opacity: ${exportPatternAlpha};
              pointer-events: none;
            "></div>
          ` : ''}
          <div style="
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,${vignetteIntensity / 100}) 100%);
            box-shadow: inset 0 0 ${100 + vignetteIntensity}px rgba(0,0,0,${vignetteIntensity / 200});
            pointer-events: none;
          "></div>
          <div style="
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: ${Math.floor(width * 0.06)}px;
          ">
            ${borderHtml}
            ${isGoldGradient ? `
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" style="overflow: visible; direction: rtl; text-align: center;">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#b8860b"/>
                    <stop offset="25%" style="stop-color:#d4af37"/>
                    <stop offset="50%" style="stop-color:#ffd700"/>
                    <stop offset="70%" style="stop-color:#f0e68c"/>
                    <stop offset="100%" style="stop-color:#d4af37"/>
                  </linearGradient>
                </defs>
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="central"
                  text-anchor="middle"
                  fill="url(#goldGrad)"
                  style="
                    font-family: ${fontFamily === 'Amiri' ? 'Amiri, serif' :
            fontFamily === 'Lateef' ? 'Lateef, cursive' :
              fontFamily === 'Scheherazade' ? 'Scheherazade New, serif' :
                fontFamily === 'Reem Kufi' ? 'Reem Kufi, sans-serif' :
                  fontFamily === 'Noto Naskh' ? 'Noto Naskh Arabic, serif' :
                    fontFamily === 'Cairo' ? 'Cairo, sans-serif' :
                      fontFamily === 'Tajawal' ? 'Tajawal, sans-serif' :
                        fontFamily === 'Almarai' ? 'Almarai, sans-serif' :
                          fontFamily === 'Noto Sans Arabic' ? 'Noto Sans Arabic, sans-serif' :
                            fontFamily === 'DM Mono' ? 'DM Mono, monospace' :
                              fontFamily === 'Ruwudu' ? 'Ruwudu, serif' :
                                'IBM Plex Sans Arabic, sans-serif'
          };
                    font-size: ${exportArabicFontSize}px;
                    direction: rtl;
                  "
                >${currentVerse.arabic}</text>
              </svg>
            ` : `<div style="
              font-family: ${fontFamily === 'Amiri' ? 'Amiri, serif' :
          fontFamily === 'Lateef' ? 'Lateef, cursive' :
            fontFamily === 'Scheherazade' ? 'Scheherazade New, serif' :
              fontFamily === 'Reem Kufi' ? 'Reem Kufi, sans-serif' :
                fontFamily === 'Noto Naskh' ? 'Noto Naskh Arabic, serif' :
                  fontFamily === 'Cairo' ? 'Cairo, sans-serif' :
                    fontFamily === 'Tajawal' ? 'Tajawal, sans-serif' :
                      fontFamily === 'Almarai' ? 'Almarai, sans-serif' :
                        fontFamily === 'Noto Sans Arabic' ? 'Noto Sans Arabic, sans-serif' :
                          fontFamily === 'DM Mono' ? 'DM Mono, monospace' :
                            fontFamily === 'Ruwudu' ? 'Ruwudu, serif' :
                              'IBM Plex Sans Arabic, sans-serif'
        };
              font-size: ${exportArabicFontSize}px;
              color: ${exportTextColor};
              text-shadow: ${textColor === 'white' ? '0 2px 10px rgba(0,0,0,0.55)' : '0 2px 10px rgba(0,0,0,0.35)'};
              direction: rtl;
              text-align: center;
              line-height: 1.6;
            ">${currentVerse.arabic}</div>`}
            <div style="
              width: ${Math.floor(width * 0.04)}px;
              height: 1px;
              background-color: ${exportTextColor};
              opacity: 0.5;
              margin: ${Math.floor(width * 0.02)}px 0;
            "></div>
            ${showTranslation ? `
              <div style="
                font-size: ${exportTranslationFontSize}px;
                color: ${exportTextColor};
                opacity: 0.9;
                font-family: system-ui, sans-serif;
                font-weight: 300;
                text-shadow: 0 1px 4px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 80%;
                line-height: 1.5;
              ">${currentVerse.translation}</div>
            ` : ''}
            <div style="
              margin-top: ${Math.floor(width * 0.03)}px;
              font-size: ${exportMetaFontSize}px;
              color: ${exportTextColor};
              opacity: 0.7;
              font-family: system-ui, sans-serif;
              letter-spacing: 0.1em;
              text-transform: uppercase;
            ">${currentVerse.surah} — ${currentVerse.reference}</div>
          </div>
        </div>
      `;

      exportContainer.innerHTML = canvasContent;

      // Wait for fonts to load
      await document.fonts.ready;

      // Ensure layout + paint have occurred before capture
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      await new Promise(resolve => setTimeout(resolve, 50));

      // Capture with html2canvas
      const canvas = await html2canvas(exportContainer, {
        width,
        height,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: backgroundColor,
        logging: false
      });

      // Convert to image and download
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `quran-wallpaper-${ratio}-${currentVerse.surah}-${currentVerse.reference.replace(':', '-')}.png`;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      document.body.removeChild(exportContainer);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-screen bg-slate-900 overflow-y-auto lg:h-screen lg:overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        verses={verses}
        patterns={patterns}
        gradients={gradients}
        selectedVerseId={selectedVerseId}
        onSelectVerse={setSelectedVerseId}
        backgroundImage={backgroundImage}
        onBackgroundImageChange={setBackgroundImage}
        backgroundMode={backgroundMode}
        onBackgroundModeChange={setBackgroundMode}
        backgroundColor={backgroundColor}
        onBackgroundColorChange={setBackgroundColor}
        selectedGradientId={selectedGradientId}
        onSelectGradient={setSelectedGradientId}
        selectedPatternId={selectedPatternId}
        onSelectPattern={setSelectedPatternId}
        patternOpacity={patternOpacity}
        onPatternOpacityChange={setPatternOpacity}
        patternColor={patternColor}
        onPatternColorChange={setPatternColor}
        vignetteIntensity={vignetteIntensity}
        onVignetteIntensityChange={setVignetteIntensity}
        fontFamily={fontFamily}
        onFontFamilyChange={setFontFamily}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        textColor={textColor}
        onTextColorChange={setTextColor}
        borderType={borderType}
        onBorderTypeChange={setBorderType}
        showTranslation={showTranslation}
        onShowTranslationChange={setShowTranslation}
        onExport={handleExport}
        isExporting={isExporting}
      />

      {/* Main Stage */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Canvas Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background-canvas.jpg')`
          }}
        />
        {/* Dark overlay - reduced at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.7) 60%, rgba(15, 23, 42, 0.4) 100%)'
          }}
        />

        <div className="flex-1 relative p-4 sm:p-8 overflow-visible lg:overflow-y-auto">
          <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-5 py-4">
            <CanvasPreview
              ref={canvasRef}
              settings={canvasSettings}
              aspectRatio={previewAspectRatio}
            />

            <div className="glass-light rounded-2xl p-1.5 flex items-center gap-1 lg:sticky lg:bottom-6">
              <button
                onClick={() => setPreviewAspectRatio('story')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${previewAspectRatio === 'story'
                  ? 'bg-[#d4af37] text-slate-950'
                  : 'text-slate-200 hover:bg-white/5'
                  }`}
              >
                <Smartphone className="w-4 h-4" />
                9:16
              </button>
              <button
                onClick={() => setPreviewAspectRatio('square')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${previewAspectRatio === 'square'
                  ? 'bg-[#d4af37] text-slate-950'
                  : 'text-slate-200 hover:bg-white/5'
                  }`}
              >
                <Square className="w-4 h-4" />
                1:1
              </button>
              <button
                onClick={() => setPreviewAspectRatio('desktop')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${previewAspectRatio === 'desktop'
                  ? 'bg-[#d4af37] text-slate-950'
                  : 'text-slate-200 hover:bg-white/5'
                  }`}
              >
                <Monitor className="w-4 h-4" />
                16:9
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isExporting && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-light px-8 py-6 rounded-xl flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#d4af37] font-medium">Generating wallpaper...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
