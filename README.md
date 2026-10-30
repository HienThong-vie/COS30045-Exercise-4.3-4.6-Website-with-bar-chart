# Exercises 4.3–4.7 – Website with a D3 bar chart

COS30045 Data Visualisation – Demonstration 2 (Week 7)
Chung Hien Thong (106212681), Swinburne University of Technology

**Live site (Mercury):** http://mercury.swin.edu.au/cos30045/s106212681/dv-04-bar-chart-exercise/index.html

## What this is

A horizontal bar chart of the number of TV models registered by each brand, built step by step: D3 set-up (4.3), loading a CSV (4.4), binding data (4.5), scales (4.6) and labels (4.7). As Exercise 4.3 Step 1 asks, the Exercise 4.2 warm-up code was removed (it is still in the earlier commits of this repo).

All four Demonstration 2 exercises share the same navigation bar, so they work as one website on Mercury:

| Exercise | Folder / repository |
|---|---|
| 4.1 SVG house | `dv-03-svg-exercise` |
| 4.3–4.7 Website with bar chart | `dv-04-bar-chart-exercise` |
| 5 Multi-chart page | `dv-05-multichart-webpage` |
| 6 Interactivity | `dv-06-interactivity` |

## Files

```
index.html          page with the chart and explanations
css/style.css       site styles + bar hover style
js/main.js          Exercises 4.3–4.7: the bar chart
data/tvBrandCount.csv   TV models per brand (brands with ≥ 20 models), from my KNIME workflow
img/PowerIcon.png   logo
```

## Running locally

`d3.csv()` uses `fetch`, so the page must be served over HTTP (opening the file directly with `file://` blocks the CSV).
Use the VS Code **Live Server** extension, or run `python -m http.server 8000` in this folder and open http://localhost:8000.
D3 v7 is loaded from `https://d3js.org/d3.v7.min.js`.

## References

- Dufour, A. M. & Meeks, E. (2024). *D3.js in Action* (3rd ed.). Manning Publications.
- COS30045 Week 4–6 exercise instructions (Canvas, 2026).
- Australian Government Energy Rating – television registration data (2026); Australian Energy Regulator – annual spot prices (1998–2024).
