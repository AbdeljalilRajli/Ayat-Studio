import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { verses } from './data/verses';
import { patterns } from './data/patterns';
import { CanvasPreview, type CanvasSettings } from './components/CanvasPreview';
import { Sidebar } from './components/Sidebar';

type FontFamily = 'Amiri' | 'Lateef' | 'Scheherazade' | 'Reem Kufi' | 'Noto Naskh' | 'Cairo' | 'Tajawal' | 'Almarai' | 'Noto Sans Arabic' | 'DM Mono' | 'Ruwudu' | 'IBM Plex Sans Arabic';

function App() {
  // State for all customization options
  const [selectedVerseId, setSelectedVerseId] = useState(verses[0].id);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#064e3b');
  const [selectedPatternId, setSelectedPatternId] = useState('none');
  const [patternOpacity, setPatternOpacity] = useState(30);
  const [vignetteIntensity, setVignetteIntensity] = useState(50);
  const [fontFamily, setFontFamily] = useState<FontFamily>('Amiri');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState<'gold' | 'white' | 'black'>('gold');
  const [borderType, setBorderType] = useState('ornate-corners');
  const [showTranslation, setShowTranslation] = useState(true);
  const [previewAspectRatio, setPreviewAspectRatio] = useState<'story' | 'square' | 'desktop'>('story');
  const [isExporting, setIsExporting] = useState(false);

  // Refs for canvas elements
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get current settings
  const currentVerse = verses.find(v => v.id === selectedVerseId) || verses[0];
  const currentPattern = patterns.find(p => p.id === selectedPatternId) || patterns[0];

  const canvasSettings: CanvasSettings = {
    verse: currentVerse,
    backgroundImage,
    backgroundColor,
    pattern: currentPattern,
    patternOpacity,
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
      exportContainer.style.left = '-9999px';
      exportContainer.style.top = '0';
      exportContainer.style.width = `${width}px`;
      exportContainer.style.height = `${height}px`;
      exportContainer.style.zIndex = '-1000';
      
      document.body.appendChild(exportContainer);

      // Render the canvas preview into the export container
      // We'll create a clone of the canvas with the proper dimensions
      const canvasContent = `
        <div style="
          width: ${width}px;
          height: ${height}px;
          position: relative;
          overflow: hidden;
          background-color: ${backgroundColor};
          ${backgroundImage ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;` : ''}
        ">
          ${currentPattern.id !== 'none' ? `
            <div style="
              position: absolute;
              inset: 0;
              background-image: ${currentPattern.css};
              background-size: ${Math.floor(width / 18)}px ${Math.floor(width / 18)}px;
              opacity: ${patternOpacity / 100};
              mix-blend-mode: multiply;
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
            ${borderType !== 'none' ? `
              <div style="
                position: absolute;
                inset: ${Math.floor(width * 0.04)}px;
                border: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};
                opacity: 0.6;
              ">
                <div style="position: absolute; top: -2px; left: -2px; width: ${Math.floor(width * 0.03)}px; height: ${Math.floor(width * 0.03)}px; border-top: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'}; border-left: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};"></div>
                <div style="position: absolute; top: -2px; right: -2px; width: ${Math.floor(width * 0.03)}px; height: ${Math.floor(width * 0.03)}px; border-top: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'}; border-right: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};"></div>
                <div style="position: absolute; bottom: -2px; left: -2px; width: ${Math.floor(width * 0.03)}px; height: ${Math.floor(width * 0.03)}px; border-bottom: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'}; border-left: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};"></div>
                <div style="position: absolute; bottom: -2px; right: -2px; width: ${Math.floor(width * 0.03)}px; height: ${Math.floor(width * 0.03)}px; border-bottom: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'}; border-right: 2px solid ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};"></div>
              </div>
            ` : ''}
            <div style="
              font-family: ${
                fontFamily === 'Amiri' ? 'Amiri, serif' : 
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
              font-size: ${Math.floor(fontSize * (width / 400))}px;
              color: ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};
              text-shadow: ${textColor === 'white' ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)'};
              direction: rtl;
              text-align: center;
              line-height: 1.6;
            ">${currentVerse.arabic}</div>
            <div style="
              width: ${Math.floor(width * 0.04)}px;
              height: 1px;
              background-color: ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};
              opacity: 0.5;
              margin: ${Math.floor(width * 0.02)}px 0;
            "></div>
            ${showTranslation ? `
              <div style="
                font-size: ${Math.max(Math.floor(fontSize * 0.35 * (width / 400)), 14)}px;
                color: ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};
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
              font-size: ${Math.floor(width * 0.018)}px;
              color: ${textColor === 'gold' ? '#d4af37' : textColor === 'white' ? '#ffffff' : '#000000'};
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
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900">
      {/* Sidebar */}
      <Sidebar
        verses={verses}
        patterns={patterns}
        selectedVerseId={selectedVerseId}
        onSelectVerse={setSelectedVerseId}
        backgroundImage={backgroundImage}
        onBackgroundImageChange={setBackgroundImage}
        backgroundColor={backgroundColor}
        onBackgroundColorChange={setBackgroundColor}
        selectedPatternId={selectedPatternId}
        onSelectPattern={setSelectedPatternId}
        patternOpacity={patternOpacity}
        onPatternOpacityChange={setPatternOpacity}
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
      />

      {/* Main Stage */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#d4af37] blur-[100px]" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#064e3b] blur-[120px]" />
          </div>

          {/* Canvas Preview */}
          <div className="relative z-10 mb-16">
            <CanvasPreview
              ref={canvasRef}
              settings={canvasSettings}
              aspectRatio={previewAspectRatio}
            />
          </div>

          {/* Aspect Ratio Toggles */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            <button
              onClick={() => setPreviewAspectRatio('story')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                previewAspectRatio === 'story'
                  ? 'bg-[#d4af37] text-slate-900'
                  : 'glass text-gray-300 hover:bg-[#d4af37]/20'
              }`}
            >
              9:16 Story
            </button>
            <button
              onClick={() => setPreviewAspectRatio('square')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                previewAspectRatio === 'square'
                  ? 'bg-[#d4af37] text-slate-900'
                  : 'glass text-gray-300 hover:bg-[#d4af37]/20'
              }`}
            >
              1:1 Square
            </button>
            <button
              onClick={() => setPreviewAspectRatio('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                previewAspectRatio === 'desktop'
                  ? 'bg-[#d4af37] text-slate-900'
                  : 'glass text-gray-300 hover:bg-[#d4af37]/20'
              }`}
            >
              16:9 Desktop
            </button>
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
