import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Btn, SectionTitle, Badge } from '../components/Shared';

const CS_ITEMS = [
  { id: 0, priority: 'high', priLabel: '必須交換', name: 'Oリング（油圧系）', code: 'OR-482-GL', price: 3200, reason: 'フィルター交換時に必ずシール劣化が起きるため、97%のケースで同時交換が発生しています。' },
  { id: 1, priority: 'med',  priLabel: '推奨交換',   name: 'ドレンプラグ（M14）', code: 'DP-M14-KT', price: 1850, reason: '過去データより、フィルター交換後3ヶ月以内にドレン交換が発生するケース74%。予防交換を推奨。' },
  { id: 2, priority: 'low',  priLabel: 'あわせて検討', name: '作動油 20L缶', code: 'HYD-OIL-20L', price: 8400, reason: 'GL-320 で油圧系メンテ時には作動油も同時補充が推奨。在庫消費サイクルと合致します。' },
];

const PRI_STYLE = {
  high: 'bg-red-50 text-red-600',
  med:  'bg-amber-50 text-amber-700',
  low:  'bg-green-50 text-green-700',
};

export default function Diagnosis() {
  const [scanning, setScanning] = useState(false);
  const [done, setDone]         = useState(false);
  const [selected, setSelected] = useState([0, 1]);

  const handleScan = () => {
    if (done) return;
    setScanning(true);
    setTimeout(() => { setScanning(false); setDone(true); }, 2200);
  };

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const BASE = 24800;
  const total = BASE + CS_ITEMS.filter(c => selected.includes(c.id)).reduce((s, c) => s + c.price, 0);

  return (
    <div className="screen-enter grid gap-5" style={{ gridTemplateColumns: '320px 1fr' }}>

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader><CardTitle>📷 部品写真をアップロード</CardTitle></CardHeader>
          <CardBody>
            {/* Mock photo */}
            <div className="relative w-full h-40 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-3 overflow-hidden">
              <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
                <rect x="10" y="30" width="100" height="40" rx="6" fill="#d1d5db"/>
                <circle cx="30" cy="72" r="14" fill="#9ca3af" stroke="#6b7280" strokeWidth="2"/>
                <circle cx="30" cy="72" r="6" fill="#6b7280"/>
                <circle cx="90" cy="75" r="10" fill="#9ca3af" stroke="#6b7280" strokeWidth="2"/>
                <circle cx="90" cy="75" r="4" fill="#6b7280"/>
                <rect x="40" y="18" width="40" height="24" rx="4" fill="#b0b8c8"/>
                <rect x="18" y="46" width="18" height="12" rx="2" fill="#6b7280"/>
                <text x="60" y="58" fontSize="9" fill="#9ca3af" textAnchor="middle" fontFamily="monospace">農機部品</text>
              </svg>
              {scanning && (
                <div className="absolute inset-0 bg-slate-900/75 flex flex-col items-center justify-center gap-2.5 text-white text-[13.5px]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                  </svg>
                  <span>AI解析中...</span>
                  <div className="w-40 h-[3px] bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full scan-animate" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Btn variant={done ? 'secondary' : 'primary'} className="flex-1" onClick={handleScan}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                {done ? '解析完了' : 'AI解析スタート'}
              </Btn>
              <Btn variant="secondary">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </Btn>
            </div>
          </CardBody>
        </Card>

        {done && (
          <Card className="screen-enter">
            <CardHeader>
              <CardTitle>特定結果</CardTitle>
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />信頼度 97%
              </span>
            </CardHeader>
            <CardBody className="space-y-3">
              <div>
                <div className="text-[10.5px] text-slate-400 uppercase tracking-wider mb-0.5">部品名</div>
                <div className="text-[14.5px] font-semibold text-slate-900">油圧フィルターAssy</div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  ['型番', 'HF-4820-KT'],
                  ['対応機種', 'クボタ GL-320'],
                ].map(([l, v]) => (
                  <div key={l} className="bg-slate-50 rounded-lg p-2.5">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">{l}</div>
                    <div className="text-[12.5px] font-mono font-medium text-slate-800">{v}</div>
                  </div>
                ))}
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">在庫状況</div>
                  <div className="text-[12.5px] font-semibold text-green-600">● 在庫あり (12個)</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">販売価格</div>
                  <div className="text-[16px] font-bold text-slate-900">¥24,800</div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* RIGHT COLUMN */}
      {done ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col screen-enter overflow-hidden">
          {/* Result header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-lg flex-shrink-0">⚙️</div>
            <div className="flex-1">
              <div className="text-white font-semibold text-[15px]">油圧フィルターAssy — HF-4820-KT</div>
              <div className="text-slate-400 font-mono text-[11.5px] mt-0.5">クボタ GL-320 / 農業機械 / 油圧系統</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">信頼度</div>
              <div className="text-[26px] font-bold text-amber-400 leading-none font-mono">97%</div>
            </div>
          </div>

          {/* Part details */}
          <div className="grid grid-cols-3 gap-0 border-b border-slate-100">
            {[['カテゴリ','油圧系統'],['最終交換目安','500時間毎'],['過去発注回数','347回 / 年']].map(([l,v]) => (
              <div key={l} className="px-5 py-3 border-r border-slate-100 last:border-0">
                <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">{l}</div>
                <div className="text-[13.5px] font-mono font-medium text-slate-700">{v}</div>
              </div>
            ))}
          </div>

          {/* Cross-sell */}
          <div className="p-5 flex-1">
            <div className="flex items-center gap-2 text-[11.5px] font-semibold text-slate-500 uppercase tracking-widest mb-4">
              <span className="w-0.5 h-3.5 bg-amber-400 rounded-sm" />
              AIが推奨する同時交換部品（3点）
            </div>
            <div className="grid grid-cols-3 gap-3">
              {CS_ITEMS.map(item => (
                <div key={item.id} onClick={() => toggle(item.id)}
                  className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
                    selected.includes(item.id)
                      ? 'border-amber-400 bg-amber-50 shadow-sm shadow-amber-100'
                      : 'border-slate-200 hover:border-amber-300 hover:shadow-sm'
                  }`}>
                  {/* Checkmark */}
                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-all ${
                    selected.includes(item.id) ? 'bg-amber-400 border-amber-400 text-slate-900' : 'border-slate-300'
                  }`}>
                    {selected.includes(item.id) && '✓'}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full inline-block mb-2.5 ${PRI_STYLE[item.priority]}`}>
                    {item.priLabel}
                  </div>
                  <div className="text-[13px] font-semibold text-slate-800 mb-0.5">{item.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mb-2">{item.code}</div>
                  <div className="text-[17px] font-bold text-slate-900">¥{item.price.toLocaleString()}</div>
                  <div className="text-[11.5px] text-slate-500 mt-2.5 pt-2.5 border-t border-slate-200 leading-relaxed">{item.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order bar */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex items-center justify-between">
            <div>
              <div className="text-[12.5px] text-slate-500">選択中 {selected.length}点（本体含め {selected.length + 1}点）</div>
              <div className="text-[22px] font-bold text-slate-900 leading-tight">¥{total.toLocaleString()}</div>
            </div>
            <div className="flex gap-2.5">
              <Btn variant="secondary">見積書を出力</Btn>
              <Btn variant="primary">
                価格AIに渡す
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Btn>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center">
          <div className="text-center text-slate-400">
            <div className="text-5xl mb-3">🔍</div>
            <div className="text-[14px] font-medium text-slate-600">写真を解析すると</div>
            <div className="text-[13px] mt-1">部品情報とクロスセル提案が表示されます</div>
          </div>
        </div>
      )}
    </div>
  );
}
