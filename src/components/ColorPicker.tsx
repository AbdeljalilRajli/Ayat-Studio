import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, Palette } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const presetColors = [
  '#064e3b', // Emerald deep
  '#0f172a', // Slate 900
  '#1e293b', // Slate 800
  '#312e81', // Indigo 900
  '#4c1d95', // Violet 900
  '#701a75', // Fuchsia 900
  '#831843', // Pink 900
  '#881337', // Rose 900
  '#450a0a', // Red 950
  '#451a03', // Amber 950
  '#713f12', // Yellow 800
  '#365314', // Lime 900
  '#14532d', // Green 900
  '#134e4a', // Teal 900
  '#164e63', // Cyan 900
  '#0c4a6e', // Sky 900
  '#1e3a8a', // Blue 900
  '#172554', // Blue 950
  '#000000',
  '#ffffff',
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedTrigger = pickerRef.current?.contains(target);
      const clickedPopover = popoverRef.current?.contains(target);
      if (!clickedTrigger && !clickedPopover) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const width = 256; // w-64
      const margin = 8;
      const maxLeft = Math.max(margin, window.innerWidth - width - margin);
      const left = Math.min(Math.max(rect.left, margin), maxLeft);
      const top = rect.bottom + 8;

      setPopoverPos({ top, left });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={pickerRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50 border border-[#d4af37]/30 hover:bg-slate-800/70 transition-all w-full"
      >
        <div
          className="w-10 h-10 rounded-lg shadow-inner border-2 border-white/20"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1 text-left">
          <span className="text-sm text-gray-300 font-mono">{color}</span>
        </div>
        <Palette className="w-4 h-4 text-[#d4af37]" />
      </button>

      {/* Color Picker Popover */}
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className="fixed z-[10000] w-64 p-4 rounded-xl bg-slate-800 border border-[#d4af37]/30 shadow-2xl"
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            {/* Current Color Preview */}
            <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-slate-900/80">
              <div
                className="w-12 h-12 rounded-lg shadow-inner border-2 border-white/20"
                style={{ backgroundColor: color }}
              />
              <div>
                <p className="text-xs text-gray-400">Selected</p>
                <p className="text-sm text-white font-mono">{color}</p>
              </div>
            </div>

            {/* Preset Colors Grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => {
                    onChange(presetColor);
                    setIsOpen(false);
                  }}
                  className="w-9 h-9 rounded-lg shadow-md hover:scale-110 transition-transform relative"
                  style={{ backgroundColor: presetColor }}
                >
                  {color.toLowerCase() === presetColor.toLowerCase() && (
                    <Check className="w-5 h-5 text-white absolute inset-0 m-auto drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Custom Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-slate-900 border-0 p-0"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-[#d4af37]/30 text-sm text-white font-mono uppercase focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
