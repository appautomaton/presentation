# Market Sizing Examples

Practical market sizing examples across three business models with triangulation and sensitivity analysis.

---

**User:** "Size the market for an AI contract management platform targeting US mid-market."

## 1. B2B SaaS — AI Contract Management Platform

**Target:** Mid-market companies (100-1,000 employees), U.S.

### Top-Down

| Step | Value | Source |
|------|-------|--------|
| Global CLM market | $2.9B | Grand View Research |
| North America share | 42% | Grand View Research |
| U.S. share of NA | 88% | GDP ratio |
| Mid-market segment | 30% | Gartner |
| **SAM** | **$322M** | Calculated |

### Bottom-Up

| Step | Value | Source |
|------|-------|--------|
| U.S. companies 100-1K employees | 120,000 | Census Bureau |
| % managing 500+ contracts | 35% | Industry survey |
| Target customers | 42,000 | Calculated |
| Average ACV | $18,000 | Competitor pricing |
| **SAM** | **$756M** | Calculated |
| Realistic penetration (5yr) | 3% | B2B SaaS benchmark |
| **SOM** | **$22.7M** | Calculated |

### Triangulation

- Top-down: $322M | Bottom-up: $756M | Delta: 135%
- **Diagnosis:** Bottom-up counts all potential users; top-down measures current spending. Gap = unmet demand (manual processes). Apply "willingness to pay" filter: $756M × 0.45 = $340M.
- **Final:** TAM $2.9B | SAM $330M | SOM $22-23M

---

## 2. B2C — Premium Plant-Based Protein Bars

**Target:** Health-conscious millennials/Gen Z, U.S.

### Top-Down

| Step | Value | Source |
|------|-------|--------|
| U.S. protein bar market | $6.2B | Statista |
| Plant-based share | 14% | Mordor Intelligence |
| Premium tier (>$3.50/bar) | 25% | Retail analysis |
| **SAM** | **$217M** | Calculated |

### Bottom-Up

| Step | Value | Source |
|------|-------|--------|
| Millennials + Gen Z (18-42) | 140M | Census |
| Health-conscious | 38% | Mintel |
| Buy protein bars monthly | 22% | Nielsen |
| Prefer plant-based | 18% | Food Industry Assoc |
| Target consumers | 2.1M | Calculated |
| Annual spend per buyer | $156 | Nielsen |
| Premium uplift | 1.3× | Estimated |
| **SAM** | **$426M** | Calculated |
| Capture rate (Year 3) | 1% | D2C benchmark |
| **SOM** | **$4.3M** | Calculated |

### Triangulation

- Top-down: $217M | Bottom-up: $426M | Delta: 96%
- **Diagnosis:** Bottom-up includes switchers from non-plant-based. Use top-down for conservative, bottom-up for upside.

---

## 3. Marketplace — Freelance Graphic Design

**Target:** Small businesses (<50 employees), U.S.

### Key: Size GMV First, Then Apply Take Rate

| Step | Value | Source |
|------|-------|--------|
| U.S. freelance design spending | $15.8B | IBISWorld + Upwork |
| % through online platforms | 35% | Staffing Industry |
| Small business segment | 60% | Estimated |
| **Addressable GMV** | **$3.32B** | Calculated |
| Platform take rate | 15% | Benchmark (Upwork 10-20%) |
| **SAM (revenue)** | **$498M** | Calculated |
| GMV capture (Year 3) | 0.3% | Marketplace benchmark |
| **SOM (GMV)** | **$9.96M** | Calculated |
| **SOM (revenue)** | **$1.49M** | Calculated |

**Always label GMV vs. revenue clearly.**

---

## 4. Sensitivity Analysis

Identify 3-4 high-uncertainty assumptions, vary by reasonable range.

**Example (B2B SaaS):**

| Assumption | Low | Base | High | Basis |
|-----------|-----|------|------|-------|
| U.S. companies (100-1K) | 100K | 120K | 150K | Census ± methodology |
| % managing 500+ contracts | 25% | 35% | 45% | Survey confidence interval |
| ACV | $14K | $18K | $24K | Competitor range |
| Penetration (5yr) | 2% | 3% | 5% | B2B benchmark |

**Outputs:**

| Scenario | SAM | SOM |
|----------|-----|-----|
| Low | $350M | $7.0M |
| Base | $756M | $22.7M |
| High | $1,620M | $81.0M |

**Interpretation:** SOM ranges $7-81M (base $22.7M, matching bottom-up). Widest driver: penetration rate. Note: triangulation adjusts base SAM from $756M to $330M via WTP filter — applying that adjustment compresses the range further. Recommend validating through pilot before full launch.

---

## 5. Common Mistakes

| Mistake | Fix |
|---------|-----|
| Confusing TAM with SAM | Filter by geography, segment, channel |
| Double-counting | Map segments mutually exclusively |
| Stale data | Note year of every data point |
| Ignoring substitutes | Include manual processes, adjacent tools |
| Assuming 100% conversion | Apply realistic penetration (1-5% for B2B SaaS) |
| Mixing GMV and revenue | Label clearly |
| Precision bias | Round appropriately, show ranges |
| No triangulation | Always run both approaches |

---

## 6. Presentation Template

**Header:** Market title, date, confidence (H/M/L)

**Section 1 — Numbers (top third):**
- TAM / SAM / SOM with growth rates

**Section 2 — Assumptions (middle):**
- 4-6 critical assumptions: name, value, source, confidence
- Highlight lowest-confidence in color

**Section 3 — Sensitivity (bottom):**
- Low/Base/High SOM range
- Implication: "Base case supports $X ARR in Y years"
- Risk: "Biggest uncertainty is [X]; recommend [validation]"

**Rules:**
- <30 words per bullet
- Every number has source
- Consistent units ($M or $B)
- Date stamp
