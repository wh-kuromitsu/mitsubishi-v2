import { useState } from 'react';
import { SUPPLIERS } from '../lib/data';
import { Card, CardHeader, CardTitle, CardBody, Badge, Btn, SearchInput, PriceRankBadge, SectionTitle, StatusDot } from '../components/Shared';

function Stars({ n }) {
  return (
    <span className="flex items-center gap-0.5 text-[13px]">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(n) ? 'text-amber-400' : 'text-slate-200'}>★</span>
      ))}
      <span className="ml-1 text-[12px] font-mono text-slate-500">{n.toFixed(1)}</span>
    </span>
  );
}

export default function SupplierMaster() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = SUPPLIERS.filter(s =>
    !search || s.name.includes(search) || s.region.includes(search) || s.contact.includes(search)
  );

  return (
    <div className="screen-enter">
      <div className="grid gap-4" style={{ gridTemplateColumns: selected ? '1fr 360px' : '1fr' }}>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '登録仕入先数', value: `${SUPPLIERS.length}社` },
              { label: '稼働中', value: `${SUPPLIERS.filter(s => s.status === 'active').length}社` },
              { label: 'Aランク仕入先', value: `${SUPPLIERS.filter(s => s.priceRank === 'A').length}社` },
              { label: '平均評価', value: `${(SUPPLIERS.reduce((s,v) => s + v.rating, 0) / SUPPLIERS.length).toFixed(1)}` },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>仕入先マスタ</CardTitle>
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
                    {['社名', '地域', '取扱カテゴリ', '評価', '価格ランク', '標準納期', '取引実績', 'ステータス', ''].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected?.id === s.id ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelected(selected?.id === s.id ? null : s)}>
                      <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                      <td className="px-4 py-3 text-slate-600">{s.region}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {s.category.slice(0, 2).map(c => <Badge key={c} variant="muted">{c}</Badge>)}
                          {s.category.length > 2 && <Badge variant="muted">+{s.category.length - 2}</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3"><Stars n={s.rating} /></td>
                      <td className="px-4 py-3"><PriceRankBadge rank={s.priceRank} /></td>
                      <td className="px-4 py-3 font-mono text-slate-500">{s.leadDays}日</td>
                      <td className="px-4 py-3 font-mono text-slate-700">{s.totalOrders}件</td>
                      <td className="px-4 py-3"><StatusDot status={s.status} /></td>
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
              <div className="bg-gradient-to-br from-teal-800 to-teal-900 rounded-t-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-semibold text-[16px]">{selected.name}</div>
                    <div className="text-teal-300 text-[12px] mt-1">{selected.region}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-teal-400 hover:text-white text-lg">✕</button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <PriceRankBadge rank={selected.priceRank} />
                  <Stars n={selected.rating} />
                </div>
              </div>
              <CardBody className="space-y-4">
                <SectionTitle>連絡先</SectionTitle>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['担当者', selected.contact],
                    ['メール', selected.email],
                    ['電話', selected.phone],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                      <span className="text-slate-400">{l}</span>
                      <span className="font-medium text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>

                <SectionTitle>取引条件</SectionTitle>
                <div className="space-y-2 text-[13px]">
                  {[
                    ['支払条件', selected.paymentTerms],
                    ['標準納期', `${selected.leadDays}日`],
                    ['累計取引件数', `${selected.totalOrders}件`],
                  ].map(([l, v]) => (
                    <div key={l} className="flex items-start justify-between py-1.5 border-b border-slate-50 gap-2">
                      <span className="text-slate-400 flex-shrink-0">{l}</span>
                      <span className="font-medium text-slate-700 text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <SectionTitle>取扱カテゴリ</SectionTitle>
                <div className="flex flex-wrap gap-1.5">
                  {selected.category.map(c => <Badge key={c} variant="teal">{c}</Badge>)}
                </div>

                <div className="flex gap-2 pt-1">
                  <Btn size="sm" variant="teal" className="flex-1">見積もり依頼</Btn>
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
