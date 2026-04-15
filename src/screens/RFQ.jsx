import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Btn, SectionTitle, Badge } from '../components/Shared';
import { RFQ_LIST } from '../lib/data';

const QUOTES = [
  { name:'山田部品販売', region:'愛知県 / 農機専門', status:'replied', price:38500, total:115500, lead:'3日', note:'保証2年・純正品', rec:true },
  { name:'東海機械部品', region:'静岡県 / 総合部品',  status:'replied', price:41200, total:123600, lead:'5日', note:'純正品', rec:false },
  { name:'中部農機パーツ', region:'岐阜県 / 農機専門', status:'replied', price:43800, total:131400, lead:'7日', note:'互換品可', rec:false },
  { name:'全国農機ネット', region:'東京都 / 全国対応',  status:'replied', price:46000, total:138000, lead:'4日', note:'送料無料', rec:false },
  { name:'関西部品センター', region:'大阪府 / 大型在庫', status:'pending', price:null, total:null, lead:null, note:'期限 6/13 17:00', rec:false },
];

const TL = [
  { cls:'done',    icon:'✓', title:'仕入先を自動選定（5社）',        time:'6/12 09:42 ｜ AIがカテゴリ・実績でマッチング' },
  { cls:'done',    icon:'✓', title:'専用リンク付きメールを一斉送信',  time:'6/12 09:43 ｜ 5社へ自動送信完了' },
  { cls:'done',    icon:'✓', title:'回答を自動集計・比較表示',        time:'6/12 14:20 ｜ 4社回答を自動整理' },
  { cls:'current', icon:'→', title:'発注先を決定・発注',              time:'⬆ 担当者が確認・承認' },
  { cls:'todo',    icon:'○', title:'発注書を自動生成・送付',          time:'承認後に自動実行' },
];

const TL_DOT = { done:'bg-green-100 text-green-700', current:'bg-amber-100 text-amber-700 ring-2 ring-amber-400', todo:'bg-slate-100 text-slate-400' };

export default function RFQ() {
  const [activeRfq, setActiveRfq] = useState('RFQ-2025-1142');

  return (
    <div className="screen-enter space-y-4">
      {/* RFQ list cards */}
      <div className="grid grid-cols-3 gap-3">
        {RFQ_LIST.map(r => (
          <div key={r.id} onClick={() => setActiveRfq(r.id)}
            className={`bg-white border rounded-xl p-4 cursor-pointer transition-all shadow-sm ${
              activeRfq === r.id ? 'border-amber-400 shadow-amber-100' : 'border-slate-200 hover:border-slate-300'
            }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="font-mono text-[12px] text-blue-600 font-semibold">{r.id}</div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                r.status === 'active' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
              }`}>
                {r.status === 'active' ? '進行中' : '決定済み'}
              </span>
            </div>
            <div className="text-[13.5px] font-semibold text-slate-800 mb-0.5">{r.partName}</div>
            <div className="text-[12px] text-slate-400 mb-3">{r.partCode} / 数量: {r.qty}個</div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-slate-500">{r.customer}</span>
              <span className={`font-semibold ${r.replied === r.total ? 'text-green-600' : 'text-amber-600'}`}>
                {r.replied}/{r.total}社回答
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail area */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 300px' }}>
        <div className="space-y-4">
          {/* RFQ header */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-teal-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📋</div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold text-slate-900">油圧ポンプAssy — 相見積もり依頼 #RFQ-2025-1142</div>
              <div className="text-[12px] text-slate-400 font-mono mt-0.5 truncate">
                依頼日時: 2025-06-12 09:42 ｜ 部品コード: HYP-8840-B ｜ 必要数量: 3個 ｜ 納期希望: 6/20
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[11px] text-slate-400 uppercase tracking-wide">回答済み</div>
              <div className="text-[20px] font-bold text-teal-600 leading-tight">4/5社</div>
            </div>
          </div>

          {/* Quotes table */}
          <Card>
            <CardHeader>
              <CardTitle>仕入先　回答一覧</CardTitle>
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />AI最安値ハイライト済
              </span>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['仕入先','ステータス','単価（税抜）','3個合計','納期','備考'].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUOTES.map((s,i) => (
                    <tr key={i} className={`border-b border-slate-50 last:border-0 transition-colors ${s.rec ? 'bg-teal-50/50' : 'hover:bg-slate-50'}`}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-800">{s.name}</div>
                          {s.rec && <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full uppercase tracking-wide">★ AI推奨</span>}
                        </div>
                        <div className="text-[11.5px] text-slate-400 mt-0.5">{s.region}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full ${
                          s.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full bg-current ${s.status === 'pending' ? 'pulse-dot' : ''}`} />
                          {s.status === 'replied' ? '回答済み' : '回答中'}
                        </span>
                      </td>
                      <td className={`px-4 py-3.5 font-mono font-semibold text-[14px] ${s.rec ? 'text-teal-700' : s.price ? 'text-slate-800' : 'text-slate-300'}`}>
                        {s.price ? `¥${s.price.toLocaleString()}` : '—'}
                      </td>
                      <td className={`px-4 py-3.5 font-mono font-bold text-[14px] ${s.rec ? 'text-teal-700' : s.total ? 'text-slate-800' : 'text-slate-300'}`}>
                        {s.total ? `¥${s.total.toLocaleString()}` : '—'}
                      </td>
                      <td className={`px-4 py-3.5 font-mono text-[13px] font-semibold ${s.lead === '3日' ? 'text-green-600' : s.lead ? 'text-slate-600' : 'text-slate-300'}`}>
                        {s.lead || '—'}
                      </td>
                      <td className="px-4 py-3.5 text-[12.5px] text-slate-400">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex items-center justify-between">
              <div>
                <div className="text-[12px] text-slate-400 mb-0.5">1社見積もり時の想定仕入れ値 ¥46,000 → AI相見積もり後</div>
                <div className="text-[22px] font-bold text-green-600 leading-tight">
                  ¥38,500 <span className="text-[14px] font-medium">（-16.3% 削減）</span>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Btn variant="secondary">詳細を確認</Btn>
                <Btn variant="teal">
                  山田部品販売へ発注
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Btn>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader><CardTitle>自動化ワークフロー</CardTitle></CardHeader>
            <CardBody>
              <div className="space-y-0">
                {TL.map((t, i) => (
                  <div key={i} className="flex gap-3 pb-4 relative last:pb-0">
                    {i < TL.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-px bg-slate-200" />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0 relative z-10 ${TL_DOT[t.cls]}`}>
                      {t.icon}
                    </div>
                    <div className="pt-1">
                      <div className="text-[13px] font-semibold text-slate-800">{t.title}</div>
                      <div className="text-[11.5px] text-slate-400 mt-0.5">{t.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>今月の削減効果</CardTitle></CardHeader>
            <CardBody className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">処理案件</div>
                  <div className="text-[22px] font-bold text-slate-900">38件</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-[10.5px] text-slate-400 uppercase tracking-wide mb-1">平均削減率</div>
                  <div className="text-[22px] font-bold text-green-600">15.8%</div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3.5">
                <div className="text-[11px] text-green-700 font-semibold uppercase tracking-wide mb-1">今月の累計コスト削減</div>
                <div className="text-[26px] font-bold text-green-700 leading-tight">¥1,840,000</div>
              </div>
              <div className="text-[12px] text-slate-400 leading-relaxed">
                1社見積もり時比較。<br/>人的工数は<strong className="text-slate-600">週12時間 → 0時間</strong>に削減。
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
