import { useState } from 'react';
import { PARTS } from '../lib/data';
import { Card, CardHeader, CardTitle, CardBody, Badge, Btn, SearchInput, Select, SectionTitle, StockIndicator, cn } from '../components/Shared';


const CATEGORIES = ['すべて', '油圧系統', 'シール・パッキン', 'ボルト・ネジ', '駆動系', '油脂類', '刈取部', '吸排気系', '冷却系'];

function margin(p) { return p.cost > 0 ? Math.round(((p.price - p.cost) / p.price) * 100) : 0; }

export default function PartsMaster() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('すべて');
  const [selected, setSelected] = useState(null);

  const filtered = PARTS.filter(p =>
    (cat === 'すべて' || p.category === cat) &&
    (!search || p.name.includes(search) || p.code.includes(search) || p.maker.includes(search))
  );

  return (
    <div className="screen-enter">
      <div className="grid gap-4" style={{ gridTemplateColumns: selected ? '1fr 360px' : '1fr' }}>
        <div className="space-y-4">
          {/* Header stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '総部品数', value: `${PARTS.length}点` },
              { label: '在庫あり', value: `${PARTS.filter(p => p.stock > 0).length}点` },
              { label: '在庫切れ', value: `${PARTS.filter(p => p.stock === 0).length}点`, red: true },
              { label: '平均粗利率', value: `${Math.round(PARTS.reduce((s,p)=>s+margin(p),0)/PARTS.length)}%` },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className={`text-2xl font-bold tracking-tight ${s.red ? 'text-red-500' : 'text-slate-900'}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>部品マスタ</CardTitle>
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} placeholder="部品名・型番・メーカーで検索" />
                <Select value={cat} onChange={setCat} options={CATEGORIES.map(c => ({ value: c, label: c }))} />
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
                    {['部品コード', '部品名', 'カテゴリ', 'メーカー', '在庫', '仕入原価', '販売価格', '粗利率', '納期', ''].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected?.id === p.id ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                      onClick={() => setSelected(selected?.id === p.id ? null : p)}>
                      <td className="px-4 py-3 font-mono text-[12px] text-slate-500">{p.code}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                      <td className="px-4 py-3"><Badge variant="muted">{p.category}</Badge></td>
                      <td className="px-4 py-3 text-slate-600">{p.maker}</td>
                      <td className="px-4 py-3"><StockIndicator stock={p.stock} /></td>
                      <td className="px-4 py-3 font-mono text-slate-700">¥{p.cost.toLocaleString()}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-slate-900">¥{p.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[12.5px] font-bold ${margin(p) >= 40 ? 'text-green-600' : margin(p) >= 25 ? 'text-amber-600' : 'text-red-500'}`}>
                          {margin(p)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{p.leadDays}日</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <Btn size="sm" variant="ghost">編集</Btn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-50 text-[12px] text-slate-400">
              {filtered.length}件 / 全{PARTS.length}件
            </div>
          </Card>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="space-y-3 screen-enter">
            <Card>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-semibold text-[16px] leading-tight">{selected.name}</div>
                    <div className="text-slate-400 font-mono text-[12px] mt-1">{selected.code}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300 text-lg">✕</button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-400 text-lg">¥</span>
                  <span className="text-amber-400 text-4xl font-bold tracking-tight">{selected.price.toLocaleString()}</span>
                </div>
                <div className="text-slate-400 text-[12px] mt-1">
                  原価 ¥{selected.cost.toLocaleString()} / 粗利率 {margin(selected)}%
                </div>
              </div>
              <CardBody className="space-y-4">
                <SectionTitle>基本情報</SectionTitle>
                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  {[
                    ['カテゴリ', selected.category],
                    ['メーカー', selected.maker],
                    ['対応機種', selected.model],
                    ['単位', selected.unit],
                    ['標準納期', `${selected.leadDays}日`],
                    ['ステータス', selected.status === 'active' ? '有効' : '無効'],
                  ].map(([l, v]) => (
                    <div key={l} className="bg-slate-50 rounded-lg p-2.5">
                      <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">{l}</div>
                      <div className="font-medium text-slate-800">{v}</div>
                    </div>
                  ))}
                </div>

                <SectionTitle>在庫・仕入れ</SectionTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">現在在庫</span>
                    <StockIndicator stock={selected.stock} />
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">仕入原価</span>
                    <span className="font-mono font-semibold">¥{selected.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">販売価格</span>
                    <span className="font-mono font-semibold">¥{selected.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-slate-500">粗利額</span>
                    <span className="font-mono font-semibold text-green-600">¥{(selected.price - selected.cost).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Btn size="sm" variant="primary" className="flex-1">価格AIで最適化</Btn>
                  <Btn size="sm" variant="secondary">相見積もり</Btn>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
