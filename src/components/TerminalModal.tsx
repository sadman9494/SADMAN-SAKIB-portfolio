import React from 'react';
import { X, Terminal } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCvModal: () => void;
  onAskAi: (prompt: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenCvModal,
  onAskAi,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl rounded-2xl bg-[#09090b] border border-[#27272a] shadow-2xl overflow-hidden flex flex-col h-[560px] terminal-glow relative">
        
        {/* Terminal Modal Header */}
        <div className="bg-[#121215] px-4 py-3 border-b border-[#27272a] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#a78bfa]" />
            <span className="font-mono text-xs text-white font-bold">
              root@ss-architect: ~ (Interactive CLI Window)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded Interactive Reactive Terminal */}
        <div className="flex-1 overflow-hidden p-1 bg-[#09090b]">
          <InteractiveTerminal
            compact={false}
            onNavigateSection={(sec) => {
              onNavigateSection(sec);
              onClose();
            }}
            onOpenCvModal={() => {
              onOpenCvModal();
              onClose();
            }}
            onAskAi={(prompt) => {
              onAskAi(prompt);
              onClose();
            }}
          />
        </div>

      </div>
    </div>
  );
};

