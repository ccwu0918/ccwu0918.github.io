# 國立金門大學校園水電資料 — 15 個 JASP 分析主題資料檔

資料來源：ETL v3 清洗值（與平台、SPSS／JASP 匯出同源），資料至 2026-11-20，台北時間。

| 檔案 | 列數 | 欄數 | 建議分析 |
|---|---:|---:|---|
| T01_平日週末用電.csv | 961 | 5 | 獨立樣本 t 檢定／Mann-Whitney：weekend → kwh_total |
| T02_星期別用電.csv | 961 | 4 | 單因子 ANOVA／Kruskal-Wallis：weekday → kwh_total |
| T03_季節月份用電.csv | 961 | 6 | ANOVA：season（或 month_f）→ kwh_total |
| T04_溫度與用電.csv | 454 | 8 | 相關分析：temp_mean ↔ kwh_total / kwh_dorm / kwh_library |
| T05_用電多元迴歸.csv | 448 | 9 | 線性迴歸：kwh_total ~ temp_mean + humid_mean + weekend + term |
| T06_各大樓用電比較.csv | 6,606 | 4 | ANOVA／Kruskal-Wallis：building → kwh（長表） |
| T07_學期與寒暑假宿舍用電.csv | 961 | 9 | ANOVA：term → kwh_dorm_area（及學生宿舍分錶） |
| T08_國定假日用電.csv | 961 | 6 | ANOVA：daytype（平日／週末／國定假日）→ kwh_total |
| T09_年度同期比較.csv | 573 | 6 | 雙因子 ANOVA：year_f × month_f → kwh_total（2024 vs 2026，1–10 月） |
| T10_日內負載型態.csv | 4,329 | 7 | 雙因子 ANOVA：hour_f（或 period）× weekend → kw_total（2025 上半年逐時） |
| T11_熱泵熱水器與溫度.csv | 440 | 7 | 線性迴歸：kwh_heatpump ~ temp_mean + term |
| T12_宿舍區分錶迴歸.csv | 488 | 10 | 線性迴歸：kwh_dorm_area ~ 各分錶（驗證哪些電錶在宿舍區底下） |
| T13_各水錶用水比較.csv | 3,930 | 5 | 雙因子 ANOVA／無母數：meter × weekend → m3（長表） |
| T14_用水與用電關聯.csv | 869 | 9 | 相關分析：同一棟的每日用水 m3 ↔ 用電 kWh |
| T15_門禁紅燈與時段.csv | 31,643 | 7 | 列聯表卡方檢定：period × red；羅吉斯迴歸：red ~ period + weekend + term |

## 匯入
JASP → ☰ Open → Computer → Browse → 選 CSV。文字欄（weekday、weekend、term、daytype、season、building、meter、period、red、*_src、*_f）
會自動判為 Nominal；數值欄為 Scale。分類值前面的數字只用來排序。空白為缺值。

## 共同欄位
- weekend：1 平日／2 週末；daytype：1 平日／2 週末／3 國定假日（holidays 套件的台灣國定假日）
- term：1 上課／2 期末考／3 期末後至放假前／4 寒假／5 暑假，依金大實際校曆（111～115 學年度，src/school_calendar.py）；假期 = 假期開始 ~ 下學期上課前一天；113 學年起期末後約 2 週為彈性補充教學
- acad_sem：學年學期（例 113-2）；dorm_open：宿舍開放 1／開閉館當天 0.5／閉館 0（閉館期間仍可能有寒暑假住宿生）
- season：1 春（3–5 月）／2 夏（6–8）／3 秋（9–11）／4 冬（12–2）
- kwh_*：每日用電 kWh；kw_*：每小時平均功率 kW；m3_*：每日用水 m³
- kwh_total_src／kw_total_src：總電來源 1 總電錶實測／2 7迴路合計／3 6迴路推估；只想用實測值時，在 JASP 以 Filter 排除 2、3（7 迴路合計約比總電錶低 4%）

## 注意
- 用電主題多從 2024-01 起；總電錶與 7 大迴路合計比值不在 0.8～1.25 的日子（2023-01～10 規模偏小）已設為缺值；2025-03-31～08-25 總電錶讀值偏低（約 41%），已改用 7 大迴路合計（綜前缺值日以 6 迴路 × 1.099 推估），以 kwh_total_src 標示
- 環境感測器 2025-05-02 起離線，溫濕度主題只涵蓋 2023-10～2025-05 期間有值的日子
- 每日資料前後相關（時間序列），t 檢定與 ANOVA 的 p 值會偏小，請一併看效果量（Cohen's d、η²）
