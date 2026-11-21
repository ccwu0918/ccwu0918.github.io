# 國立金門大學校園水電資料 — 聯合國永續發展目標（SDGs）15 個 JASP 分析主題

資料至 2026-11-20（台北時間）；與平台、T01～T15 主題同源。

| 檔案 | SDG 目標 | 列數 | 欄數 | 建議分析 |
|---|---|---:|---:|---|
| S01_SDG7_能源效率月趨勢.csv | SDG 7.3 能源效率 | 34 | 6 | 線性迴歸：kwh_per_day ~ t_month + month_f（控制季節後的長期趨勢；t_month 係數 = 每月變化 kWh/日） |
| S02_SDG13_用電碳排放.csv | SDG 13.2 溫室氣體 | 961 | 10 | 描述統計（各年 co2_t 加總）；ANOVA：year_f、term → co2_t |
| S03_SDG7_夜間基載比.csv | SDG 7.3 能源效率 | 6,689 | 8 | Kruskal-Wallis：building → base_ratio（越接近 1 代表夜間待機越高）；雙因子 ANOVA：building × weekend |
| S04_SDG7_校曆期間節能.csv | SDG 7.3／12 節約 | 6,606 | 8 | 雙因子 ANOVA：building × term → log_kwh（看各棟寒暑假相對上課期的節電幅度） |
| S05_SDG7_尖峰與負載因數.csv | SDG 7.3 能源效率 | 978 | 10 | ANOVA：term／weekday → load_factor；迴歸：peak_kw ~ temp_max + weekend |
| S06_SDG13_度日與用電.csv | SDG 13.1 氣候調適 | 454 | 10 | 線性迴歸：kwh_total ~ cdd24 + hdd18 + weekend + term（cdd24 係數 = 每 1 度日增加的 kWh） |
| S07_SDG6_用水與校曆.csv | SDG 6.4 用水效率 | 4,778 | 7 | 雙因子 ANOVA／Kruskal-Wallis：meter × term → m3 |
| S08_SDG6_夜間最小流量.csv | SDG 6.4 漏水偵測 | 4,953 | 7 | 列聯表卡方：meter × leak_flag；單樣本 Wilcoxon：night_min_m3h 與 0 比較 |
| S09_SDG4_圖資用電與考試期.csv | SDG 4.a 學習環境 | 961 | 8 | ANOVA：term → kwh_library（期末考期間圖資大樓使用是否增加），可加 weekend 為第二因子 |
| S10_SDG3_PM25超標日.csv | SDG 3.9／11.6 空氣品質 | 534 | 9 | 列聯表卡方：season × exceed_std；描述統計：各月 pm25_mean |
| S11_SDG11_PM25與氣象.csv | SDG 11.6 城市環境 | 533 | 6 | 線性迴歸：pm25_mean ~ temp_mean + humid_mean + season（季節為類別變數） |
| S12_SDG7_熱泵與電熱水器.csv | SDG 7.3 高效率設備 | 821 | 8 | 成對 t 檢定／Wilcoxon：kwh_heatpump vs kwh_water_heater；迴歸：heatpump_share ~ temp_mean + term |
| S13_SDG11_安全警示與天氣.csv | SDG 11.b 韌性 | 10,644 | 8 | 羅吉斯迴歸：red_any ~ temp + humid + period；列聯表卡方：period × red_any |
| S14_SDG13_年度減碳比較.csv | SDG 13.3 減碳成效 | 10 | 8 | 成對 t 檢定／Wilcoxon：co2t_day_2024 vs co2t_day_2026（同月比較，n = 10 個月） |
| S15_SDG17_資料可得性.csv | SDG 17.18 資料可得性 | 235 | 5 | Kruskal-Wallis：system → availability_pct；列聯表：system × status |

## 對應的 SDG 細項
- SDG 3.9：減少空氣污染造成的疾病　SDG 4.a：提供安全有效的學習環境
- SDG 6.4：提升用水效率　SDG 7.2／7.3：提高再生能源與能源效率
- SDG 11.6：降低城市環境衝擊（空品）　SDG 11.b：提升韌性與災害風險管理
- SDG 12.2：自然資源永續管理　SDG 13.1／13.2／13.3：氣候調適、溫室氣體、減碳教育與成效
- SDG 17.18：提高可靠資料的可得性

## 共同欄位
- term：1 上課／2 期末考／3 期末後至放假前／4 寒假／5 暑假（金大實際校曆）；acad_sem：學年學期；dorm_open：宿舍開放 1／開閉館當天 0.5／閉館 0
- kwh_total_src：總電來源 1 總電錶實測／2 7迴路合計／3 6迴路推估

## 係數與標準
- 電力排碳係數（經濟部能源署公告之公用售電業係數）：112 年 0.494、113 年 0.474、114 年 0.467（115 年尚未公告，暫用 0.467）kg CO2e/度。金門為獨立電網、以柴油發電為主，實際排碳強度可能高於全國係數，本資料採全國公告值以便與其他學校比較
- PM2.5 日平均標準：2024-09-30 空氣品質標準修正前 35 μg/m³、修正後 30 μg/m³；另附 WHO 2021 指引 15 μg/m³ 比較
- 度日：cdd24 = max(0, 日均溫 − 24)，hdd18 = max(0, 18 − 日均溫)
- S13：8 成以上時間都是紅燈的燈號視為常亮或故障，不納入（執行時會列出）
- 夜間最小流量：1～4 時每小時用水的最小值，> 0.02 m³/h 標為「夜間持續流量」（可能漏水或夜間用水，需現場確認）

## 注意
- 2023-01 ～ 2023-10 校園各電錶倍率設定不同，7 大迴路與總電錶在該期間設為缺值
- 環境感測器 2025-05-02 起離線，溫度、PM2.5 相關主題（S05 溫度、S06、S10、S11、S12 溫度、S13）只涵蓋之前期間
- 能源通訊系統 2026-02-22 ～ 08-17 離線；燈號多數只在 2023-12 ～ 2025-10 有資料
- 每日資料前後相關，t 檢定與 ANOVA 的 p 值會偏小，請一併看效果量
