# Industry Context Adaptation

Where consulting methodology needs recalibration for industry-specific constraints. Not an industry primer — the model already knows these sectors. Each entry targets an analytical trap where default tools produce structurally wrong results.

---

## Healthcare / Life Sciences

- **Market sizing**: Decompose by payer class (commercial, Medicare, Medicaid, VA/DoD, self-pay). Aggregate TAM is misleading — reimbursement rates, coverage criteria, and growth dynamics differ by payer.
- **Revenue modeling**: Provider revenue is reimbursement, not price × volume. Formula: contracted rate × case mix index × (1 − denial rate), segmented by payer. Facility vs. professional fee splits matter.
- **Go-to-market timelines**: Regulatory pathway dominates. 510(k): 6-12 months. De novo: 12-24 months. PMA: 2-4 years. CMS coverage determination: 6-18 months post-clearance. Sequential gates, not parallelizable.
- **Forward projections**: Value-based care transition means volume-based revenue models may be structurally wrong over 3-5 year horizons. Model the fee-for-service to capitated/bundled payment shift explicitly.

---

## Defense / Government

- **Sales funnel**: Procurement IS the go-to-market. SBIR Phase I → Phase II → Phase III, or RFI → RFP → proposal → award → option exercise. Customer acquisition cost = proposal cost + compliance overhead.
- **Market sizing**: Contract ceiling ≠ obligated funding ≠ realized revenue. A $500M IDIQ ceiling may yield $12M in year-one task orders. Size by obligated funding and historical obligation rates, not ceiling values.
- **Pricing**: Cost-plus or competitive-bid, not value-based. Margins are structurally bounded by FAR/DFARS. DCAA audit risk on indirect rates.
- **Demand cycles**: Budget follows FYDP, PPBE, and congressional appropriation — political cycles, not market cycles. Continuing resolutions freeze new starts.
- **Compliance**: FAR/DFARS, ITAR/EAR, CMMC, CUI handling are structural costs of participation, not optional overhead. Factor 15-25% compliance burden into cost structure for small businesses.

---

## Financial Services

- **Growth constraints**: Regulatory capital requirements (Basel III/IV, RBC) cap growth — revenue expansion requires proportional capital allocation. Model capital adequacy alongside revenue.
- **Cost structure**: Compliance cost is structural and increasing. A single rulemaking cycle can reshape the competitive landscape.
- **Profitability**: Product P&L vs. entity P&L diverge due to pervasive cross-subsidization. Analyze at the relationship level, not the product level.
- **Sensitivity**: Interest rate shifts can overwhelm operational improvements. A 100bp rate move may exceed the P&L impact of a full year of cost optimization. Always model rate sensitivity.

---

## SaaS / Technology

Pre-training covers this sector well. Key recalibration points only:

- **Revenue**: ARR ≠ recognized revenue ≠ bookings. Use the revenue waterfall: new ARR + expansion − contraction − churn = net new ARR.
- **Health metric**: Net revenue retention (NRR) is the governing indicator. NRR > 120%: installed base grows without new logos. NRR < 100%: the business is leaking.
- **Unit economics**: Distinguish blended CAC from channel-specific CAC. Payback period on CAC (not just LTV/CAC ratio) determines cash runway requirements.

---

## Manufacturing / Industrial

- **Revenue recognition**: Bookings ≠ revenue. Long-cycle manufacturing has 12-24 month lag. Backlog and book-to-bill ratio are leading indicators, not trailing.
- **Capacity**: Capacity constraints are hard ceilings on growth. Growth analysis without capacity analysis is fiction. Expansion capex timelines: 18-36 months.
- **Profit pools**: Aftermarket (parts, service, MRO, upgrades) margins typically 2-4× OEM product margins. Often the actual profit engine — analyze separately.
- **Supply chain**: Single-source dependencies create binary risk. Map Tier 1 and Tier 2 supplier concentration before recommending growth strategies that assume supply elasticity.

---

## Energy / Utilities

- **Commodity exposure**: Price cycles overwhelm operational improvements. A $10/bbl oil move may exceed the EBITDA impact of all cost initiatives combined. Model commodity sensitivity before operational levers.
- **Governing metric**: ROIC, not margin. High-capex businesses can show healthy margins and still destroy value when returns fall below WACC.
- **Timelines**: Permitting and regulatory approval (environmental review, grid interconnection, resource rights) take 3-7+ years. Hard constraints, not schedule risk.
