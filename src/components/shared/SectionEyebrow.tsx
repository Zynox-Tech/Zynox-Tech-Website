import clsx from 'clsx';

interface SectionEyebrowProps {
  number: string;
  label: string;
  accent: 'web' | 'mobile' | 'custom' | 'game';
  className?: string;
}

export function SectionEyebrow({ number, label, accent, className }: SectionEyebrowProps) {
  const accentClasses = {
    web: 'text-accent-web',
    mobile: 'text-accent-mobile',
    custom: 'text-accent-custom',
    game: 'text-accent-game',
  };

  return (
    <div className={clsx("flex items-center gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.08em]", accentClasses[accent], className)}>
      <span>{number}</span>
      <span className="w-8 h-[1px] bg-current opacity-30" />
      <span>{label}</span>
    </div>
  );
}
