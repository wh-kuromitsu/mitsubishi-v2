import { useState } from 'react';
import { CUSTOMERS } from '../lib/data';
import { Card, CardHeader, CardTitle, CardBody, Badge, Btn, SearchInput, SectionTitle, StatusDot, PriceRankBadge } from '../components/Shared';

export default function CustomerMaster() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = CUSTOMERS.filter(c =>
    !search || c.name.includes(search) || c.region.includes(search) || c.contact.includes(search)
  );

  return (
    <div className="screen-enter">
      <div className="grid gap-4" style={{ gridTemplateColumns: selected ? '1fr 360px' : '1fr' }}>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '顧客数', value: `${CUSTOMERS.length}社` },
              { label: '今月取引あり', value: `${CUSTOMERS.filter(c => c.lastOrder >= '2025-06-01').length}社` },
              { label: '総売上（累計）', value: '¥9.9M' },
              { label: 'Aグループ顧客', value: `${CUSTOMERS.filter(c => c.priceGroup === 'A').length}社` },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>顧客マスタ</CardTitle>
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} placeholder="社名・地域・担当者で検索" />
                <Btn size="sm" variant="primary">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  新規登録
                </Btn>
              </div>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['顧客名', '地域', '区分', '担当者', '累計売上', '直近発注', '発注件数', '価格G', 'ステータス', ''].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected?.id === c.id ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                      <td className="px-4 py-3 font-semibold text-slate-800">{c.name}</td>
                      <td className="px-4 py-3 text-slate-600">{c.region}</td>
                      <td className="px-4 py-3"><Badge variant="muted">{c.type}</Badge></td>
                      <td className="px-4 py-3 text-slate-600">{c.contact}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-slate-900">¥{c.totalSales.toLocaleString()}</td>
                      <td className="px-4 py-3 font-mono text-slate-500 text-[12px]">{c.lastOrder}</td>
                      <td className="px-4 py-3 font-mono text-slate-700">{c.orderCount}件</td>
                      <td className="px-4 py-3"><PriceRankBadge rank={c.priceGroup} /></td>
                      <td className="px-4 py-3"><StatusDot status={c.status} /></td>
                      <td className="px-4 py-3"><Btn size="sm" variant="ghost">詳細</Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="space-y-3 screen-enter">
            <Card>
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-t-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-semibold text-[15px]">{selected.name}</div>
                    <div className="text-blue-300 text-[12px] mt-1">{selected.region} / {selected.type}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-blue-400 hover:text-white text-lg">✕</button>
                </div>
                <div className="mt-4">
                  <div className="text-blue-300 text-[11px] mb-1">累計売上</div>
                  <div className="text-3xl font-bold text-white">¥{selected.totalSales.toLocaleString()}</div>
                </div>
              </div>
              <CardBody className="space-y-4">
                <SectionTitle>連絡先</SectionTitle>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['担当者', selected.contact],
                    ['電話', selected.phone],
                    ['メール', selected.email],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-400">{l}</span>
                      <span className="font-medium text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>

                <SectionTitle>取引情報</SectionTitle>
                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  {[
                    ['価格グループ', <PriceRankBadge rank={selected.priceGroup} />],
                    ['発注件数', `${selected.orderCount}件`],
                    ['直近発注日', selected.lastOrder],
                    ['ステータス', <StatusDot status={selected.status} />],
                  ].map(([l, v]) => (
                    <div key={l} className="bg-slate-50 rounded-lg p-2.5">
                      <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">{l}</div>
                      <div className="font-medium text-slate-800">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <Btn size="sm" variant="blue" className="flex-1">見積書を作成</Btn>
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
