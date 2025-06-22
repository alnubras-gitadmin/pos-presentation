import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  children: ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'bg-secondary border-border text-foreground',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
  success: 'bg-green-50 border-green-200 text-green-700',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  danger: 'bg-red-50 border-red-200 text-red-700',
};

const variantIcons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
};

export function Callout({ children, variant = 'default', className = '' }: CalloutProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={`rounded-md border px-4 py-3 flex items-start gap-3 ${variantStyles[variant]} ${className}`}
    >
      <Icon className="h-5 w-5 mt-[2px] flex-shrink-0" />
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
}
