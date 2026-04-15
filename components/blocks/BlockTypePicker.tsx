'use client';

import {
  Zap, Type, LayoutGrid, HelpCircle, BarChart3,
  Quote, Code, Image, Megaphone, Minus, X,
} from 'lucide-react';
import { BlockType, BLOCK_TYPES } from '@/lib/blocks/types';

interface BlockTypePickerProps {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
}

export default function BlockTypePicker({ onSelect, onClose }: BlockTypePickerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#1A1720] border border-[rgba(54,46,40,0.5)] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(54,46,40,0.4)]">
          <h3 className="font-display text-lg font-bold text-[#F5F0EB]">Add Content Block</h3>
          <button onClick={onClose} className="p-2 rounded-lg text-[#6B6158] hover:text-[#F5F0EB] hover:bg-[rgba(54,46,40,0.3)] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {BLOCK_TYPES.map(({ type, label, description, icon }) => {
            const icons: Record<string, React.ComponentType<{ className?: string }>> = {
              Zap, Type, LayoutGrid, HelpCircle, BarChart3, Quote, Code, Image, Megaphone, Minus,
            };
            const Icon = icons[icon] || Zap;
            return (
              <button
                key={type}
                onClick={() => { onSelect(type); onClose(); }}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-[rgba(54,46,40,0.15)] hover:bg-[rgba(217,119,87,0.1)] border border-[rgba(54,46,40,0.3)] hover:border-[#D97757]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D97757]/10 flex items-center justify-center group-hover:bg-[#D97757]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#D97757]" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#F5F0EB]">{label}</div>
                  <div className="text-xs text-[#6B6158] mt-0.5">{description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}