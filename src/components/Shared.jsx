import { cn } from '../lib/data';
export { cn };


export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-amber-100 text-amber-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-800',
    teal: 'bg-teal-100 text-teal-800',
    muted: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide', variants[variant], className)}>
      {children}
    </span>
  );
}

export function StatusDot({ status }) {
  const cfg = {
    active: { cls: 'bg-green-500', label: '有効' },
    inactive: { cls: 'bg-slate-300', label: '無効' },
  }[status] || { cls: 'bg-slate-300', label: status };
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px]">
      <span className={cn('w-2 h-2 rounded-full', cfg.cls)} />
      {cfg.label}
    </span>
  );
}

export function StatCard({ label, value, change, up }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{label}</div>
      <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{value}</div>
      {change && (
        <div className={cn('text-[12px] font-medium mt-1.5', up ? 'text-green-600' : 'text-red-500')}>
          {change}
        </div>
      )}
    </div>
  );
}

export function Card({ children, className }) {
  return <div className={cn('bg-white border border-slate-200 rounded-xl shadow-sm', className)}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={cn('px-5 py-4 border-b border-slate-100 flex items-center justify-between', className)}>{children}</div>;
}

export function CardTitle({ children }) {
  return <div className="text-[14px] font-semibold text-slate-900 tracking-tight">{children}</div>;
}

export function CardBody({ children, className }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function Btn({ children, variant = 'primary', size = 'md', onClick, disabled, className }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg transition-all cursor-pointer border-0';
  const sizes = { sm: 'text-[12px] px-3 py-1.5', md: 'text-[13px] px-4 py-2', lg: 'text-[14px] px-5 py-2.5' };
  const variants = {
    primary: 'bg-amber-400 text-slate-900 hover:bg-amber-500',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    teal: 'bg-teal-600 text-white hover:bg-teal-700',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={cn(base, sizes[size], variants[variant], disabled && 'opacity-50 cursor-not-allowed', className)}>
      {children}
    </button>
  );
}

export function SearchInput({ value, onChange, placeholder = '検索...' }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 h-9 text-[13px] border border-slate-200 rounded-lg outline-none bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
      />
    </div>
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="h-9 px-3 text-[13px] border border-slate-200 rounded-lg outline-none bg-white focus:border-amber-400 cursor-pointer">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function PriceRankBadge({ rank }) {
  const map = { A: ['bg-amber-100 text-amber-800', 'Aランク'], B: ['bg-blue-100 text-blue-800', 'Bランク'], C: ['bg-slate-100 text-slate-600', 'Cランク'] };
  const [cls, label] = map[rank] || ['bg-slate-100 text-slate-600', rank];
  return <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full', cls)}>{label}</span>;
}

export function OrderStatusBadge({ status }) {
  const map = {
    pending: ['bg-slate-100 text-slate-600', '未手配'],
    processing: ['bg-blue-100 text-blue-700', '手配中'],
    shipped: ['bg-amber-100 text-amber-800', '出荷済'],
    delivered: ['bg-green-100 text-green-700', '納品完了'],
  };
  const [cls, label] = map[status] || ['bg-slate-100 text-slate-600', status];
  return <span className={cn('inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full', cls)}>{label}</span>;
}

export function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2 text-[11.5px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
      <span className="w-0.5 h-3.5 bg-amber-400 rounded-sm" />
      {children}
    </div>
  );
}

export function EmptyState({ icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-[13px]">{text}</div>
    </div>
  );
}

export function StockIndicator({ stock }) {
  if (stock === 0) return <span className="text-[12.5px] font-semibold text-red-500">在庫なし</span>;
  if (stock <= 5) return <span className="text-[12.5px] font-semibold text-amber-600">残{stock}個（少）</span>;
  return <span className="text-[12.5px] text-green-700 font-medium">在庫 {stock}個</span>;
}
