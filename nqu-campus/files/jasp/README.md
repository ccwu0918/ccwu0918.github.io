# 金門大學校園水電資料 — JASP 匯入用 CSV

## 檔案
| 檔案 | 一列代表 | 建議分析 |
|---|---|---|
| jasp_daily.csv | 1 天（2023-01-01 ～ 2026-10-31） | 描述統計、相關、迴歸 |
| jasp_daily_2024plus.csv | 1 天（2024 年後） | 與 jasp_daily 相同，已排除 2023 年總電錶規模問題，可直接用 |
| jasp_hourly.csv | 1 小時 | 日內型態：以 hour_f 為因子做 ANOVA、描述統計分組 |
| jasp_daily_power_long.csv | 1 天 × 1 迴路 | 各大樓比較：ANOVA、Kruskal-Wallis，因子 circuit |
| jasp_daily_water_long.csv | 1 天 × 1 水錶 | 各水錶比較，因子 meter |

欄名、中文說明、單位、建議類型見 jasp_variables.csv。

## 匯入
JASP → ☰ Open → Computer → Browse → 選 CSV。JASP 會自動判斷類型：
- 文字欄（weekday、weekend、circuit、meter、system、ls_*、year_f、month_f、quarter_f、hour_f）→ Nominal
- 數值欄（kwh_*、kw_*、w_*、lr_*、temp*、humid*、pm25*）→ Scale
- 分類欄前面的數字（如「1 週一」「03 學生一舍」）只用來保持排序
- 空白儲存格為缺值（設備離線或當日時點不足），JASP 會自動排除

## 分析範例
- 平日與週末用電：開 jasp_daily_2024plus.csv → T-Tests → Independent Samples：Dependent = kwh_tot，Grouping = weekend
- 各大樓用電比較：開 jasp_daily_power_long.csv → 用資料篩選（漏斗圖示）留 system = 「1 校園資訊平台」且 year ≥ 2024 → ANOVA：Dependent = kwh，Fixed Factor = circuit，Post Hoc 選 Games-Howell
- 溫度與用電：jasp_daily.csv → Regression → Correlation：temp_mean、kwh_tot、kwh_dorm、kwh_lib（溫度只到 2025-05-02）
- 一天內負載型態：jasp_hourly.csv → Descriptives：Variables = kw_tot，Split = hour_f，勾 Boxplots

## 注意
- 2023 年 kw_tot / kwh_tot 數值規模約為 2024 年後的 1/40，跨年分析請用 jasp_daily_2024plus.csv 或篩選 year ≥ 2024。
- 能源通訊系統資料自 2023-10-18 起；2026-02-22 ～ 2026-08-17 離線。環境感測器 2025-05-02 起離線。
- 時間序列資料前後天高度相關，t 檢定與 ANOVA 的 p 值會偏小，解讀時以效果量為主。
