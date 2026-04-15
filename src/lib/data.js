// cn utility
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── MASTER DATA ───────────────────────────────────────────────────────────

export const PARTS = [
  { id: 'P001', name: '油圧フィルターAssy', code: 'HF-4820-KT', category: '油圧系統', maker: 'クボタ', model: 'GL-320', stock: 12, cost: 18200, price: 24800, unit: '個', leadDays: 3, status: 'active' },
  { id: 'P002', name: 'Oリング（油圧系）', code: 'OR-482-GL', category: 'シール・パッキン', maker: '汎用', model: '各種', stock: 84, cost: 1900, price: 3200, unit: '個', leadDays: 1, status: 'active' },
  { id: 'P003', name: 'ドレンプラグ（M14）', code: 'DP-M14-KT', category: 'ボルト・ネジ', maker: '汎用', model: '各種', stock: 156, cost: 950, price: 1850, unit: '個', leadDays: 1, status: 'active' },
  { id: 'P004', name: '作動油 20L缶', code: 'HYD-OIL-20L', category: '油脂類', maker: '出光興産', model: '汎用', stock: 28, cost: 4800, price: 8400, unit: '缶', leadDays: 2, status: 'active' },
  { id: 'P005', name: '油圧ポンプAssy', code: 'HYP-8840-B', category: '油圧系統', maker: 'ヤンマー', model: 'YT-series', stock: 3, cost: 38500, price: 67000, unit: '個', leadDays: 5, status: 'active' },
  { id: 'P006', name: 'Vベルト 3V-560', code: 'VB-3V560', category: '駆動系', maker: 'バンドー化学', model: '各種', stock: 42, cost: 1200, price: 2400, unit: '本', leadDays: 2, status: 'active' },
  { id: 'P007', name: 'エアフィルターエレメント', code: 'AF-GL280', category: '吸排気系', maker: 'クボタ', model: 'GL-280/320', stock: 8, cost: 2800, price: 5200, unit: '個', leadDays: 3, status: 'active' },
  { id: 'P008', name: 'コンバイン刃（替刃セット10枚）', code: 'CB-BLADE-10', category: '刈取部', maker: 'クボタ', model: 'SR-series', stock: 15, cost: 9800, price: 18000, unit: 'セット', leadDays: 4, status: 'active' },
  { id: 'P009', name: 'ファンベルト', code: 'FB-KT480', category: '駆動系', maker: '三ツ星ベルト', model: 'GL-480', stock: 0, cost: 3200, price: 5800, unit: '本', leadDays: 7, status: 'inactive' },
  { id: 'P010', name: 'ウォーターポンプAssy', code: 'WP-GL320', category: '冷却系', maker: 'クボタ', model: 'GL-320', stock: 4, cost: 22000, price: 38000, unit: '個', leadDays: 5, status: 'active' },
  { id: 'P011', name: 'グリスニップルM8', code: 'GN-M8-STD', category: 'ボルト・ネジ', maker: '汎用', model: '各種', stock: 320, cost: 80, price: 180, unit: '個', leadDays: 1, status: 'active' },
  { id: 'P012', name: 'ラジエターホース（上）', code: 'RH-UP-GL', category: '冷却系', maker: 'クボタ', model: 'GL-series', stock: 6, cost: 3600, price: 6800, unit: '本', leadDays: 4, status: 'active' },
];

export const SUPPLIERS = [
  { id: 'S001', name: '山田部品販売', region: '愛知県', category: ['油圧系統', '冷却系', 'シール・パッキン'], rating: 4.8, paymentTerms: '月末締め翌月末払い', contact: '山田 太郎', email: 'yamada@yamada-parts.jp', phone: '052-XXX-XXXX', leadDays: 3, priceRank: 'A', status: 'active', totalOrders: 142 },
  { id: 'S002', name: '東海機械部品', region: '静岡県', category: ['駆動系', '油圧系統', '吸排気系'], rating: 4.5, paymentTerms: '月末締め翌々月15日払い', contact: '鈴木 一郎', email: 'suzuki@tokai-parts.jp', phone: '054-XXX-XXXX', leadDays: 5, priceRank: 'B', status: 'active', totalOrders: 87 },
  { id: 'S003', name: '中部農機パーツ', region: '岐阜県', category: ['刈取部', '駆動系', 'ボルト・ネジ'], rating: 4.2, paymentTerms: '月末締め翌月末払い', contact: '加藤 次郎', email: 'kato@chubu-nouki.jp', phone: '058-XXX-XXXX', leadDays: 7, priceRank: 'C', status: 'active', totalOrders: 63 },
  { id: 'S004', name: '全国農機ネット', region: '東京都', category: ['油圧系統', '冷却系', '吸排気系', '油脂類'], rating: 4.0, paymentTerms: '都度払い', contact: '田村 三郎', email: 'tamura@nouki-net.jp', phone: '03-XXX-XXXX', leadDays: 4, priceRank: 'B', status: 'active', totalOrders: 55 },
  { id: 'S005', name: '関西部品センター', region: '大阪府', category: ['油圧系統', '駆動系', 'シール・パッキン', '油脂類'], rating: 4.6, paymentTerms: '月末締め翌月末払い', contact: '西村 五郎', email: 'nishimura@kansai-parts.jp', phone: '06-XXX-XXXX', leadDays: 3, priceRank: 'A', status: 'active', totalOrders: 98 },
  { id: 'S006', name: '北陸農機資材', region: '富山県', category: ['刈取部', 'ボルト・ネジ', '油脂類'], rating: 3.9, paymentTerms: '月末締め翌月末払い', contact: '高橋 六郎', email: 'takahashi@hokuriku-nouki.jp', phone: '076-XXX-XXXX', leadDays: 6, priceRank: 'C', status: 'inactive', totalOrders: 21 },
];

export const CUSTOMERS = [
  { id: 'C001', name: '鈴木農機 株式会社', region: '愛知県', type: '農機販売店', contact: '鈴木 健一', phone: '052-YYY-YYYY', email: 'suzuki@suzuki-nouki.jp', totalSales: 2840000, lastOrder: '2025-06-10', orderCount: 38, priceGroup: 'A', status: 'active' },
  { id: 'C002', name: '田中農業サービス', region: '岐阜県', type: '農業法人', contact: '田中 幸子', phone: '058-YYY-YYYY', email: 'tanaka@tanaka-agri.jp', totalSales: 1520000, lastOrder: '2025-06-08', orderCount: 22, priceGroup: 'B', status: 'active' },
  { id: 'C003', name: '農事組合法人　山里', region: '三重県', type: '農業法人', contact: '山本 義雄', phone: '059-YYY-YYYY', email: 'yamamoto@yamazato.jp', totalSales: 980000, lastOrder: '2025-05-28', orderCount: 15, priceGroup: 'B', status: 'active' },
  { id: 'C004', name: '渡辺農機センター', region: '静岡県', type: '農機修理店', contact: '渡辺 修二', phone: '054-YYY-YYYY', email: 'watanabe@wata-nouki.jp', totalSales: 3210000, lastOrder: '2025-06-11', orderCount: 47, priceGroup: 'A', status: 'active' },
  { id: 'C005', name: '中川農業機械', region: '愛知県', type: '農機販売店', contact: '中川 博', phone: '0566-YYY-YYYY', email: 'nakagawa@nakagawa-nouki.jp', totalSales: 760000, lastOrder: '2025-05-15', orderCount: 11, priceGroup: 'C', status: 'active' },
  { id: 'C006', name: '小林農場', region: '岐阜県', type: '農業法人', contact: '小林 達也', phone: '0575-YYY-YYYY', email: 'kobayashi@kobayashi-farm.jp', totalSales: 430000, lastOrder: '2025-04-20', orderCount: 8, priceGroup: 'C', status: 'inactive' },
];

export const ORDERS = [
  { id: 'ORD-2025-1088', customer: '鈴木農機 株式会社', parts: [{ code: 'HF-4820-KT', name: '油圧フィルターAssy', qty: 2, price: 24800 }, { code: 'OR-482-GL', name: 'Oリング', qty: 4, price: 3200 }], total: 62400, status: 'delivered', ordered: '2025-06-10', delivered: '2025-06-13', supplier: '山田部品販売' },
  { id: 'ORD-2025-1089', customer: '渡辺農機センター', parts: [{ code: 'HYP-8840-B', name: '油圧ポンプAssy', qty: 3, price: 67000 }], total: 201000, status: 'processing', ordered: '2025-06-12', delivered: null, supplier: '山田部品販売' },
  { id: 'ORD-2025-1090', customer: '田中農業サービス', parts: [{ code: 'VB-3V560', name: 'Vベルト', qty: 6, price: 2400 }, { code: 'AF-GL280', name: 'エアフィルター', qty: 2, price: 5200 }], total: 24800, status: 'shipped', ordered: '2025-06-11', delivered: null, supplier: '東海機械部品' },
  { id: 'ORD-2025-1091', customer: '農事組合法人 山里', parts: [{ code: 'CB-BLADE-10', name: 'コンバイン刃セット', qty: 4, price: 18000 }], total: 72000, status: 'pending', ordered: '2025-06-13', delivered: null, supplier: null },
  { id: 'ORD-2025-1092', customer: '鈴木農機 株式会社', parts: [{ code: 'HYD-OIL-20L', name: '作動油 20L', qty: 5, price: 8400 }, { code: 'DP-M14-KT', name: 'ドレンプラグ', qty: 10, price: 1850 }], total: 60500, status: 'delivered', ordered: '2025-06-08', delivered: '2025-06-11', supplier: '関西部品センター' },
  { id: 'ORD-2025-1093', customer: '渡辺農機センター', parts: [{ code: 'WP-GL320', name: 'ウォーターポンプAssy', qty: 1, price: 38000 }, { code: 'RH-UP-GL', name: 'ラジエターホース', qty: 2, price: 6800 }], total: 51600, status: 'shipped', ordered: '2025-06-12', delivered: null, supplier: '山田部品販売' },
  { id: 'ORD-2025-1094', customer: '中川農業機械', parts: [{ code: 'GN-M8-STD', name: 'グリスニップルM8', qty: 50, price: 180 }], total: 9000, status: 'delivered', ordered: '2025-06-09', delivered: '2025-06-10', supplier: '中部農機パーツ' },
];

export const RFQ_LIST = [
  { id: 'RFQ-2025-1142', partCode: 'HYP-8840-B', partName: '油圧ポンプAssy', qty: 3, customer: '渡辺農機センター', issued: '2025-06-12 09:42', deadline: '2025-06-13 17:00', replied: 4, total: 5, status: 'active' },
  { id: 'RFQ-2025-1138', partCode: 'WP-GL320', partName: 'ウォーターポンプAssy', qty: 1, customer: '渡辺農機センター', issued: '2025-06-11 14:20', deadline: '2025-06-12 17:00', replied: 5, total: 5, status: 'decided' },
  { id: 'RFQ-2025-1133', partCode: 'CB-BLADE-10', partName: 'コンバイン刃セット', qty: 4, customer: '農事組合法人 山里', issued: '2025-06-13 10:00', deadline: '2025-06-14 12:00', replied: 1, total: 4, status: 'active' },
];
