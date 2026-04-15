import { useState } from 'react';
import './index.css';
import Dashboard from './screens/Dashboard';
import Diagnosis from './screens/Diagnosis';
import Pricing from './screens/Pricing';
import RFQ from './screens/RFQ';
import PartsMaster from './screens/PartsMaster';
import SupplierMaster from './screens/SupplierMaster';
import CustomerMaster from './screens/CustomerMaster';
import OrderManagement from './screens/OrderManagement';

const NAV = [
  {
    section: 'メインメニュー',
    items: [
      { id: 'dashboard', label: 'ダッシュボード', title: 'ダッシュボード', icon: DashIcon },
      { id: 'diagnosis', label: 'AI部品診断', title: 'AI部品診断・クロスセル', icon: ScanIcon, badge: 'NEW' },
      { id: 'pricing', label: '動的プライシング', title: '動的プライシング', icon: PriceIcon },
      { id: 'rfq', label: 'マルチ見積もり', title: 'マルチ見積もりボット', icon: RFQIcon, badge: '3' },
    ],
  },
  {
    section: 'マスタ管理',
    items: [
      { id: 'parts', label: '部品マスタ', title: '部品マスタ', icon: PartsIcon },
      { id: 'suppliers', label: '仕入先マスタ', title: '仕入先マスタ', icon: SupplierIcon },
      { id: 'customers', label: '顧客マスタ', title: '顧客マスタ', icon: CustomerIcon },
    ],
  },
  {
    section: '業務管理',
    items: [
      { id: 'orders', label: '受発注管理', title: '受発注管理', icon: OrderIcon },
    ],
  },
];

const SCREENS = {
  dashboard: Dashboard,
  diagnosis: Diagnosis,
  pricing: Pricing,
  rfq: RFQ,
  parts: PartsMaster,
  suppliers: SupplierMaster,
  customers: CustomerMaster,
  orders: OrderManagement,
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
function Icon({ children }) {
  return <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">{children}</svg>;
}
function DashIcon() { return <Icon><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>; }
function ScanIcon() { return <Icon><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></Icon>; }
function PriceIcon() { return <Icon><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></Icon>; }
function RFQIcon() { return <Icon><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Icon>; }
function PartsIcon() { return <Icon><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></Icon>; }
function SupplierIcon() { return <Icon><path d="M3 3h18l-2 9H5L3 3z"/><circle cx="9" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></Icon>; }
function CustomerIcon() { return <Icon><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></Icon>; }
function OrderIcon() { return <Icon><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></Icon>; }

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('dashboard');
  const Screen = SCREENS[active];
  const activeItem = NAV.flatMap(s => s.items).find(i => i.id === active);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'hsl(222 47% 11%)' }}>
      {/* SIDEBAR */}
      <aside className="w-[232px] flex flex-col flex-shrink-0 border-r" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>⚙️</div>
          <div>
            <div className="text-white font-bold text-[14.5px] tracking-tight leading-none">PartsBrain</div>
            <div className="text-[10px] mt-0.5 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>AI Platform</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
          {NAV.map(group => (
            <div key={group.section}>
              <div className="text-[10px] font-semibold uppercase tracking-widest px-2.5 mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {group.section}
              </div>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const isActive = active === item.id;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] font-medium transition-all text-left border-0"
                      style={{
                        background: isActive ? 'rgba(245,158,11,0.15)' : 'transparent',
                        color: isActive ? '#f59e0b' : 'rgba(255,255,255,0.5)',
                      }}
                      onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                      onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
                    >
                      <item.icon />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10.5px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: '#f59e0b', color: 'hsl(222 47% 11%)' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] text-white font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>田</div>
            <div>
              <div className="text-[12.5px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>田中 翔太</div>
              <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>営業部　主任</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-7 h-14 flex items-center justify-between flex-shrink-0 z-10">
          <span className="text-[15px] font-semibold text-slate-900 tracking-tight">{activeItem?.title}</span>
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[11.5px] font-semibold px-2.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
              AI稼働中
            </div>
            <button className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 hover:text-slate-700 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
              設定
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Screen key={active} />
        </main>
      </div>
    </div>
  );
}
