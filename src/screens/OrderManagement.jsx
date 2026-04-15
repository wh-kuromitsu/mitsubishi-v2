import { useState } from 'react';
import { ORDERS } from '../lib/data';
import { Card, CardHeader, CardTitle, CardBody, Badge, Btn, SearchInput, Select, OrderStatusBadge, SectionTitle } from '../components/Shared';

const STATUS_OPTS = [
  { value: 'all', label: 'すべてのステータス' },
  { value: 'pending', label: '未手配' },
  { value: 'processing', label: '手配中' },
  { value: 'shipped', label: '出荷済' },
  { value: 'delivered', label: '納品完了' },
];

export default function OrderManagement() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = ORDERS.filter(o =>
    (status === 'all' || o.status === status) &&
    (!search || o.id.includes(search) || o.customer.includes(search))
  );

  const counts = { pending: 0, processing: 0, shipped: 0, delivered: 0 };
  ORDERS.forEach(o => counts[o.status]++);

  return (
    <div className="screen-enter">
      <div className="grid gap-4" style={{ gridTemplateColumns: selected ? '1fr 380px' : '1fr' }}>
        <div className="space-y-4">
          {/* Status summary */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '未手配', count: counts.pending, color: 'text-slate-600', bg: 'bg-slate-100', action: () => setStatus('pending') },
              { label: '手配中', count: counts.processing, color: 'text-blue-700', bg: 'bg-blue-50', action: () => setStatus('processing') },
              { label: '出荷済み', count: counts.shipped, color: 'text-amber-700', bg: 'bg-amber-50', action: () => setStatus('shipped') },
              { label: '納品完了', count: counts.delivered, color: 'text-green-700', bg: 'bg-green-50', action: () => setStatus('delivered') },
            ].map(s => (
              <div key={s.label} onClick={s.action}
                className={`${s.bg} border border-transparent rounded-xl p-4 cursor-pointer hover:border-slate-200 transition`}>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className={`text-3xl font-bold ${s.color} tracking-tight`}>{s.count}</div>
                <div className="text-[11.5px] text-slate-400 mt-0.5">件</div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>受発注管理</CardTitle>
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} placeholder="受注番号・顧客名で検索" />
                <Select value={status} onChange={setStatus} options={STATUS_OPTS} />
                <Btn size="sm" variant="primary">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  新規受注
                </Btn>
              </div>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['受注番号', '顧客', 'ステータス', '部品', '金額', '受注日', '納品日', '仕入先', ''].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(o => (
                    <tr key={o.id}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected?.id === o.id ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelected(selected?.id === o.id ? null : o)}>
                      <td className="px-4 py-3 font-mono text-[12px] text-blue-600 font-semibold">{o.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{o.customer}</td>
                      <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
                      <td className="px-4 py-3 text-slate-500 text-[12.5px]">
                        {o.parts[0].name}{o.parts.length > 1 && ` 他${o.parts.length - 1}点`}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">¥{o.total.toLocaleString()}</td>
                      <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{o.ordered}</td>
                      <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{o.delivered || '—'}</td>
                      <td className="px-4 py-3 text-[12.5px] text-slate-600">{o.supplier || <span className="text-amber-600 font-semibold">未手配</span>}</td>
                      <td className="px-4 py-3"><Btn size="sm" variant="ghost">詳細</Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-50 text-[12px] text-slate-400">
              {filtered.length}件 / 全{ORDERS.length}件　合計金額: ¥{filtered.reduce((s,o)=>s+o.total,0).toLocaleString()}
            </div>
          </Card>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="space-y-3 screen-enter">
            <Card>
              <div className={`rounded-t-xl p-5 ${selected.status === 'delivered' ? 'bg-gradient-to-br from-green-800 to-green-900' : selected.status === 'processing' ? 'bg-gradient-to-br from-blue-800 to-blue-900' : 'bg-gradient-to-br from-slate-800 to-slate-900'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-mono text-[13px] font-semibold">{selected.id}</div>
                    <div className="text-white/70 text-[12px] mt-1">{selected.customer}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white text-lg">✕</button>
                </div>
                <div className="mt-4">
                  <div className="text-white/50 text-[11px] mb-1">受注金額</div>
                  <div className="text-3xl font-bold text-white">¥{selected.total.toLocaleString()}</div>
                </div>
                <div className="mt-3"><OrderStatusBadge status={selected.status} /></div>
              </div>
              <CardBody className="space-y-4">
                <SectionTitle>受注部品</SectionTitle>
                <div className="space-y-2">
                  {selected.parts.map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-[13px] py-2 border-b border-slate-50">
                      <div>
                        <div className="font-medium text-slate-800">{p.name}</div>
                        <div className="text-[12px] text-slate-400">{p.qty}個 × ¥{p.price.toLocaleString()}</div>
                      </div>
                      <div className="font-mono font-semibold text-slate-900">¥{(p.qty * p.price).toLocaleString()}</div>
                    </div>
                  ))}
                  <div className="flex justify-between text-[14px] font-bold pt-1">
                    <span>合計</span>
                    <span className="text-amber-600">¥{selected.total.toLocaleString()}</span>
                  </div>
                </div>

                <SectionTitle>納品情報</SectionTitle>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['受注日', selected.ordered],
                    ['仕入先', selected.supplier || '未手配'],
                    ['納品日', selected.delivered || '未納品'],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-400">{l}</span>
                      <span className="font-medium text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  {selected.status === 'pending' && <Btn size="sm" variant="teal" className="flex-1">AI相見積もり開始</Btn>}
                  {selected.status === 'processing' && <Btn size="sm" variant="blue" className="flex-1">発注状況確認</Btn>}
                  {selected.status === 'shipped' && <Btn size="sm" variant="primary" className="flex-1">納品完了にする</Btn>}
                  <Btn size="sm" variant="secondary">編集</Btn>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
