import { Image, Monitor, Smartphone, HelpCircle, FileImage, LayoutGrid } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImagePlaceholderProps {
  filename: string;
  path: string;
  description: string;
  alt: string;
  aspectRatio?: string;
  type?: 'hero' | 'mockup' | 'blog' | 'og' | 'comparison';
  className?: string;
}

export const ImagePlaceholder = ({
  filename,
  path,
  description,
  alt,
  aspectRatio = 'aspect-video',
  type = 'mockup',
  className,
}: ImagePlaceholderProps) => {
  const getIcon = () => {
    switch (type) {
      case 'hero':
        return <Monitor className="w-10 h-10 text-primary-light animate-pulse" />;
      case 'mockup':
        return <LayoutGrid className="w-8 h-8 text-primary-light" />;
      case 'blog':
        return <FileImage className="w-8 h-8 text-purple-400" />;
      case 'og':
        return <Image className="w-12 h-12 text-blue-400" />;
      case 'comparison':
        return <Smartphone className="w-8 h-8 text-emerald-400" />;
      default:
        return <HelpCircle className="w-8 h-8 text-slate-400" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'hero':
        return 'border-primary/30 bg-primary/5 hover:border-primary/50';
      case 'blog':
        return 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/45';
      case 'comparison':
        return 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/45';
      default:
        return 'border-white/5 bg-[#151B2B] hover:border-white/20';
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all duration-300 overflow-hidden shadow-inner group",
        getBorderColor(),
        aspectRatio,
        className
      )}
    >
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-300" />
      
      <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {getIcon()}
      </div>

      <div className="max-w-md px-4">
        <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/10 text-slate-300 px-2 py-0.5 rounded mb-2 border border-white/5">
          Imagen Pendiente ({type})
        </span>
        <h4 className="text-sm font-bold text-white mb-1 truncate" title={filename}>
          {filename}
        </h4>
        <p className="text-xs text-slate-500 font-mono mb-3 bg-black/30 py-1 px-2 rounded inline-block max-w-full truncate border border-white/5">
          {path}
        </p>
        <p className="text-xs text-slate-400 mb-2 leading-relaxed">
          {description}
        </p>
        <div className="text-[10px] text-slate-500 border-t border-white/5 pt-2 mt-2">
          <span className="font-semibold text-slate-400">Alt SEO:</span> "{alt}"
        </div>
      </div>
    </div>
  );
};
