import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Btn, SectionTitle } from '../components/Shared';

const COST = 31200;
const OPT  = 52400;

function calcConv(v)   { return Math.min(95, Math.max(5, Math.round(98 - Math.pow((v - 42000) / 3000, 2)))); }
function calcMargin(v) { return Math.max(0, ((v - COST) / v) * 100); }

function Meter({ label, pct, colorClass, val }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-[11.5px] w-20 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[12px] font-mono font-semibold w-9 text-right" style={{ color: 'rgba(255,255,255,0.8)' }}>{val}</span>
    </div>
  );
}

function ShapRow({ label, pct, pos, val }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <span className="text-[12.5px] text-slate-500 w-32 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${pos ? 'bg-orange-400' : 'bg-blue-400'}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-[12px] font-mono font-semibold w-14 text-right ${pos ? 'text-orange-500' : 'text-blue-500'}`}>{val}</span>
    </div>
  );
}

export default function Pricing() {
  const [simPrice, setSimPrice] = useState(OPT);
  const conv   = calcConv(simPrice);
  const margin = calcMargin(simPrice);
  const isOpt  = Math.abs(simPrice - OPT) < 2000;

  return (
    <div className="screen-enter space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        {[
          { label: '今月の期待利益',        value: '¥4.2M', change: '↑ AI最適価格適用後', up: true },
          { label: '平均利益率',            value: '31.4%', change: '↑ 8.2pt 改善', up: true },
          { label: '成約率（AI推奨価格）',   value: '82%',   change: '比較：手動価格 68%', up: true },
          { label: '処理済み案件（今月）',   value: '248件', change: '↑ 全件AIレコメンド', up: true },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">{s.label}</div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{s.value}</div>
            <div className="text-[12px] font-medium mt-1.5 text-green-600">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 350px' }}>
        {/* LEFT: Price card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          {/* Navy hero */}
          <div className="p-6" style={{ background: 'linear-gradient(135deg, #0f1c2e, #1a2d45)' }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-white font-semibold text-[16px] leading-snug">油圧フィルターAssy + 周辺部品セット</div>
                <div className="text-[12px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>HF-4820-KT ｜ クボタ GL-320 ｜ 鈴木農機 様</div>
              </div>
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                最適価格算出済
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[20px]" style={{ color: 'rgba(255,255,255,0.45)' }}>¥</span>
              <span className="text-[54px] font-bold leading-none tracking-tighter text-amber-400">52,400</span>
            </div>
            <div className="text-[12.5px] mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>推奨提示価格（税抜）　仕入原価 ¥31,200 → 粗利率 40.5%</div>
            <Meter label="成約率予測"   pct={81} colorClass="bg-green-400" val="81%" />
            <Meter label="市場競争力"   pct={74} colorClass="bg-blue-400"  val="高" />
            <Meter label="期待利益スコア" pct={88} colorClass="bg-amber-400" val="88" />
          </div>

          {/* Sensitivity chart */}
          <div className="px-6 pt-5 pb-2">
            <div className="text-[11.5px] font-semibold text-slate-400 uppercase tracking-wider mb-3">価格 vs 成約率・期待利益　感度分析</div>
            <svg width="100%" height="140" viewBox="0 0 500 140">
              {[50,150,250,350,450].map(x => <line key={x} x1={x} y1="10" x2={x} y2="120" stroke="#f1f5f9" strokeWidth="1"/>)}
              {[40,80].map(y => <line key={y} x1="50" y1={y} x2="470" y2={y} stroke="#f1f5f9" strokeWidth="1"/>)}
              <path d="M50,18 C100,20 140,28 180,42 C220,58 250,75 290,95 C330,112 380,120 450,124" fill="none" stroke="#60a5fa" strokeWidth="2.5"/>
              <path d="M50,110 C80,105 120,88 170,68 C200,55 230,42 265,35 C290,30 310,34 340,46 C370,60 400,80 450,108" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
              <line x1="265" y1="10" x2="265" y2="130" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3"/>
              <circle cx="265" cy="35" r="5" fill="#f59e0b"/>
              <circle cx="265" cy="66" r="5" fill="#60a5fa"/>
              <text x="268" y="9" fontSize="10" fill="#f59e0b" fontFamily="monospace">最適点</text>
              <line x1="58" y1="135" x2="76" y2="135" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="79" y="139" fontSize="10" fill="#94a3b8">期待利益</text>
              <line x1="148" y1="135" x2="166" y2="135" stroke="#60a5fa" strokeWidth="2.5"/>
              <text x="169" y="139" fontSize="10" fill="#94a3b8">成約率</text>
            </svg>
            <div className="flex justify-between text-[10.5px] text-slate-400 font-mono mt-1 px-1">
              <span>¥38,000</span><span>¥44,000</span><span className="text-amber-500 font-semibold">¥52,400←最適</span><span>¥58,000</span><span>¥65,000</span>
            </div>
          </div>

          {/* SHAP */}
          <div className="px-6 pt-4 pb-2 border-t border-slate-100 mt-3">
            <div className="flex items-center gap-2 text-[11.5px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
              <span className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center text-[12px]">🔬</span>
              価格根拠（SHAP分析）
            </div>
            <ShapRow label="市場在庫希少性"   pct={88} pos val="+¥4,200"/>
            <ShapRow label="同顧客の購買履歴"  pct={65} pos val="+¥3,100"/>
            <ShapRow label="季節性（収穫前期）" pct={52} pos val="+¥2,500"/>
            <ShapRow label="競合最安値"        pct={42}     val="-¥2,000"/>
            <ShapRow label="顧客価格感度"       pct={28}     val="-¥1,200"/>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-[13px] text-blue-800 leading-relaxed">
              過去の類似案件では¥48,000で成約率90%でしたが、現在は市場在庫が薄く農機具シーズン前の需要増もあり、
              <strong>¥52,400でも成約率81%を維持</strong>できると予測されます。競合より8%安い水準を保ちつつ期待利益を最大化しています。
            </div>
          </div>

          <div className="flex gap-2.5 justify-end px-6 py-4 border-t border-slate-100 mt-auto">
            <Btn variant="secondary">価格を調整する</Btn>
            <Btn variant="blue">
              この価格で提案書を作成
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Btn>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-4">
          {/* Competitor table */}
          <Card>
            <CardHeader><CardTitle>競合・市場価格</CardTitle></CardHeader>
            <CardBody className="p-0">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">ソース</th>
                    <th className="text-right text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">価格</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['競合A（ネット最安値）','¥56,800',false],
                    ['競合B（地域業者）','¥61,000',false],
                    ['競合C（大手通販）','¥57,400',false],
                    ['市場平均価格','¥58,400',false],
                    ['★ 自社推奨価格','¥52,400',true],
                  ].map(([n,p,ours]) => (
                    <tr key={n} className="border-b border-slate-50 last:border-0">
                      <td className={`px-5 py-2.5 ${ours ? 'font-bold text-amber-700' : 'text-slate-600'}`}>{n}</td>
                      <td className={`px-5 py-2.5 text-right font-mono font-semibold ${ours ? 'text-amber-700' : 'text-slate-800'}`}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 text-[12px] text-slate-400 border-t border-slate-50">
                市場平均より <strong className="text-green-600">10.3%安い</strong> 水準を維持
              </div>
            </CardBody>
          </Card>

          {/* History */}
          <Card>
            <CardHeader><CardTitle>過去の成約履歴</CardTitle></CardHeader>
            <CardBody className="space-y-0 p-0">
              {[
                { win:true,  label:'3ヶ月前　同型顧客', price:'¥48,000'},
                { win:false, label:'4ヶ月前　別顧客',   price:'¥58,000'},
                { win:true,  label:'5ヶ月前　同顧客',   price:'¥51,000'},
                { win:true,  label:'6ヶ月前　同型顧客', price:'¥46,500'},
                { win:false, label:'8ヶ月前　別顧客',   price:'¥62,000'},
              ].map((h,i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-2.5 border-b border-slate-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${h.win ? 'bg-green-500' : 'bg-red-400'}`} />
                  <span className="text-[13px] text-slate-600 flex-1">{h.label}</span>
                  <span className="text-[13px] font-mono font-semibold text-slate-800">{h.price}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${h.win ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                    {h.win ? '成約' : '失注'}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Simulator */}
          <Card>
            <CardHeader><CardTitle>価格シミュレーター</CardTitle></CardHeader>
            <CardBody className="space-y-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[12.5px] text-slate-500">提示価格</span>
                <span className="text-[16px] font-bold font-mono">¥{simPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={38000} max={70000} value={simPrice} step={200}
                onChange={e => setSimPrice(Number(e.target.value))}
                style={{ background: `linear-gradient(to right, #f59e0b ${(simPrice-38000)/(70000-38000)*100}%, #e2e8f0 0%)` }}
                className="w-full" />
              <div className="flex justify-between text-[10.5px] text-slate-400 font-mono">
                <span>¥38,000</span><span>¥70,000</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-1">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">成約率</div>
                  <div className="text-[22px] font-bold text-slate-900">{conv}%</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">粗利率</div>
                  <div className={`text-[22px] font-bold ${isOpt ? 'text-amber-600' : 'text-slate-900'}`}>
                    {margin.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
