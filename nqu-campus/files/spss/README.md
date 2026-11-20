# 金門大學校園水電資料 — SPSS 分析檔

期間 2023-01-01 ～ 2026-11-19（台北時間），資料產生 2026-11-21 00:49，來源為 ETL v3 清洗值。

| 檔案 | 一列代表 | 適合用途 |
|---|---|---|
| nqu_daily.sav | 1 天 | 相關、迴歸、時間序列、平日／週末比較 |
| nqu_hourly.sav | 1 小時 | 日內負載型態、尖離峰、燈號與時段關係 |
| nqu_daily_power_long.sav | 1 天 × 1 迴路 | 各大樓比較（ANOVA、無母數檢定、混合模型） |
| nqu_daily_water_long.sav | 1 天 × 1 水錶 | 各水錶用水比較 |

每個 .sav 都有同名 .csv（UTF-8，欄名相同），供 Excel、R、Python 使用。變數說明見 codebook.csv。

## 變數命名
- `kw_*` 每小時平均功率 kW、`kwh_*` 每日用電 kWh、`w_*` 用水 m³、`lr_*` 紅燈分鐘、`ls_*` 主要燈號（0 綠 1 黃 2 紅 3 無訊號 4 白 5 藍）
- `temp`、`humid`、`pm25` 環境；每日檔另有 `_mean`、`_max`、`_min`
- `year`、`month`、`quarter`、`weekday`（1=週一）、`weekend`（1=週末）

## 開啟方式
- SPSS：檔案 → 開啟 → 資料 → 選 .sav（標籤與數值標籤會自動帶入）
- 免費替代：PSPP、JASP、jamovi 皆可直接開 .sav；R 用 `haven::read_sav()`；Python 用 `pyreadstat.read_sav()`

## 使用前注意
- 空白（.）為缺值：設備離線或當日時點不足 80%。不要把缺值當 0。
- 能源通訊系統資料自 2023-10-18 起；2026-02-22 ～ 2026-08-17 離線。校園資訊平台 2025-08-26 ～ 2025-10-17 停擺。
- 環境感測器 2025-05-02 起離線，之後溫濕度、PM2.5 為缺值。
- 2023 年總電錶（kw_tot、kwh_tot）數值規模約為 2024 年後的 1/40，跨年分析請篩選 year >= 2024 或分開處理。
- 燈號多數只在 2023-12 ～ 2025-10 與 2026-10 有資料；學生二舍門禁燈自 2023-01 起。
- 每日用電 = 當日 3 分鐘平均功率 × 24 小時；每日用水 = 月累積水量的日結算差。

## SPSS 語法範例
```
* 2024 年後平日與週末全校用電差異.
TEMPORARY.
SELECT IF (year >= 2024).
T-TEST GROUPS=weekend(0 1) /VARIABLES=kwh_tot.

* 各大樓每日用電比較（長表）.
GET FILE='nqu_daily_power_long.sav'.
SELECT IF (system = 1 AND circuit > 1 AND year >= 2024).
ONEWAY kwh BY circuit /STATISTICS DESCRIPTIVES /POSTHOC=GH.

* 溫度與用電相關（每日寬表，2023-10 ~ 2025-04）.
CORRELATIONS /VARIABLES=temp_mean kwh_tot kwh_dorm kwh_lib.
```
