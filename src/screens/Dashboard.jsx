import { StatCard, Card, CardHeader, CardTitle, CardBody, Badge, OrderStatusBadge } from '../components/Shared';
import { ORDERS } from '../lib/data';

const barData = [38,45,52,48,60,67,72,78,85,79,91,100];
const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

export default function Dashboard() {
  const recentOrders = ORDERS.slice(0, 5);

  return (
    <div className="screen-enter space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5">
        <StatCard label="今月の売上" value="¥12.4M" change="↑ 18.3% 先月比" up />
        <StatCard label="クロスセル率" value="34%" change="↑ 12pt 前四半期比" up />
        <StatCard label="仕入削減効果（月次）" value="¥1.84M" change="↑ 相見積もり導入後" up />
        <StatCard label="AI精度（部品特定）" value="94.2%" change="↑ 継続改善中" up />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Recent orders */}
        <Card>
          <CardHeader>
            <CardTitle>最近の受注</CardTitle>
            <Badge variant="muted">直近7件</Badge>
          </CardHeader>
          <div className="divide-y divide-slate-50">
            {recentOrders.map(o => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition">
                <OrderStatusBadge status={o.status} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-slate-800 truncate">{o.customer}</div>
                  <div className="text-[11.5px] text-slate-400 font-mono mt-0.5">{o.id}</div>
                </div>
                <div className="text-[14px] font-bold text-slate-900 font-mono">¥{o.total.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly chart */}
        <Card>
          <CardHeader>
            <CardTitle>月別AI活用効果（万円）</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-end gap-1.5 h-20 mb-2">
              {barData.map((h, i) => (
                <div key={i} style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-sm ${i === 11 ? 'bg-amber-400' : 'bg-amber-200'}`} />
              ))}
            </div>
            <div className="flex justify-around text-[10px] text-slate-400 font-mono">
              {months.map(m => <span key={m}>{m}</span>)}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: '累計削減効果', value: '¥21.4M', color: 'text-green-600' },
                { label: '今月AI処理件数', value: '248件', color: 'text-blue-600' },
                { label: 'RFQ削減率（平均）', value: '15.8%', color: 'text-teal-600' },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 rounded-lg p-3">
                  <div className="text-[10.5px] text-slate-400 mb-1">{s.label}</div>
                  <div className={`text-[17px] font-bold ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* AI activity */}
      <Card>
        <CardHeader><CardTitle>AIアクション ログ（本日）</CardTitle></CardHeader>
        <div className="divide-y divide-slate-50">
          {[
            { time: '09:42', icon: '📋', type: 'RFQ', text: '油圧ポンプAssy — 5社へ自動見積もり依頼送信', badge: 'RFQ' },
            { time: '10:15', icon: '🔍', type: '部品特定', text: '油圧フィルターAssy — 画像解析完了（信頼度97%）', badge: '診断' },
            { time: '10:17', icon: '💰', type: '価格提案', text: 'HF-4820-KT — AI推奨価格 ¥52,400 算出（期待利益スコア 88）', badge: '価格' },
            { time: '11:30', icon: '✅', type: '成約', text: '鈴木農機 様 — ¥62,400 受注確定（クロスセル含む）', badge: '成約' },
            { time: '14:20', icon: '📊', type: 'RFQ集計', text: 'HYP-8840-B — 4社回答を自動集計。山田部品販売 最安値 ¥38,500', badge: 'RFQ' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition">
              <div className="text-[11px] font-mono text-slate-400 w-10 flex-shrink-0">{a.time}</div>
              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-content-center text-sm flex-shrink-0 flex items-center justify-center">{a.icon}</div>
              <div className="flex-1 text-[13px] text-slate-700">{a.text}</div>
              <Badge variant="muted">{a.badge}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
