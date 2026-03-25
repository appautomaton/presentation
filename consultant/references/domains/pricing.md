# Pricing Strategy

How to set, structure, and defend prices. Covers value-based pricing, willingness-to-pay research, pricing architecture, tier design, and price changes.

---

## 0. Pricing Diagnostics

Before WTP analysis or architecture design, run these three diagnostics to quantify where value is leaking.

**Price-Volume-Mix (PVM) decomposition.** Isolate how much of margin change is price-driven vs volume vs mix. If margin declined 400bps: was it price erosion (−200bps), volume loss (−150bps), or mix shift (−50bps)? This determines whether the fix is pricing, commercial, or portfolio.

**Pocket margin waterfall.** List price → contractual discounts → off-invoice rebates → freight/terms → pocket price. The gap between list price and pocket price is leakage. A wide price band (large variance in actual transaction prices) signals pricing chaos — inconsistent discounting, no governance. Pocket margin waterfall is the single most diagnostic device for leakage.

**Discount governance audit.** Map: who approves discounts, at what thresholds, and what's the override rate? If >30% of deals exceed approval thresholds, governance exists on paper but not in practice. Fix governance before architecture.

---

## 1. Value-Based Pricing

Price against the value you create, not the cost you incur.

### Economic Value Estimation (EVE)

**Step 1 — Reference value.** What does the customer's next-best alternative cost? Include total cost of ownership, not sticker price alone. This is the floor the customer is already willing to pay.

**Step 2 — Differentiation value.** Map every dimension where your offering differs from the reference. Assign dollar values:

| Factor | Direction | Value |
|---|---|---|
| Superior performance or features | + | $X |
| Time savings for the customer | + | $X |
| Risk reduction | + | $X |
| Missing features vs. reference | − | $X |
| Switching costs the customer incurs | − | $X |

**Step 3 — Total Economic Value** = Reference Value + Net Differentiation Value.

**Step 4 — Set price within the value range.**
- Price floor: your cost + minimum acceptable margin.
- Price ceiling: Total Economic Value to the customer.
- Target price: 50-80% of TEV. The remainder is the customer's incentive to switch.

**Value-sharing rule of thumb:**
- Weak differentiation, competitive market: capture 20-40% of value created.
- Moderate differentiation: 40-60%.
- Strong differentiation, high switching costs: 60-80%.

---

## 2. Willingness-to-Pay Research

| Method | Best for | Sample size | Accuracy |
|---|---|---|---|
| Van Westendorp | Quick range-finding, early stage | 100-300 | Moderate |
| Gabor-Granger | Direct demand curve estimation | 200-500 | Moderate |
| Conjoint analysis | Multi-attribute trade-off, tier design | 300-1,000 | High |
| A/B price testing | Validation of specific price points | 1,000+ per variant | High |

**Conjoint** decomposes total value into component features. Use it when designing tiers or bundles — it reveals which features drive willingness-to-pay and which are table stakes.

---

## 3. Competitive Pricing Analysis

Map the competitive landscape on two axes: price level and perceived value. Four positions emerge:

| | High perceived value | Low perceived value |
|---|---|---|
| **High price** | Premium (defensible if differentiation holds) | Overpriced (vulnerable) |
| **Low price** | Value play (aggressive, may trigger price war) | Economy (cost-leader position) |

Key questions:
- Where do we sit? Where do we want to sit?
- Which competitors set the reference price in each segment?
- What is the price-volume trade-off? (Price elasticity by segment.)
- How will competitors respond to our price change?

---

## 4. Pricing Architecture

### Good / Better / Best

Three tiers is the standard. Each tier serves a different buyer:

| Tier | Role | Design principle |
|---|---|---|
| Good | Entry point, minimizes adoption friction | Core value only, no extras |
| Better | Primary revenue driver, most customers land here | 80% of value at a moderate premium |
| Best | Margin maximizer, captures high-WTP buyers | Full feature set, premium positioning |

**Design rules:**
- The gap between Good and Better should feel like a bargain — the incremental value clearly exceeds the incremental price.
- The gap between Better and Best should feel aspirational but justifiable for power users.
- Good should not be so attractive that it cannibalizes Better. If >40% of customers choose Good, the tier boundary is wrong.

### Usage-based pricing

Charge per unit of consumption (API calls, seats, compute hours, transactions). Works when usage correlates with value received. Risky when customers can't predict their spend — they under-commit or churn when the bill surprises them.

**Hybrid model**: base platform fee (predictable) + usage overage (scales with value). Reduces budget uncertainty while preserving upside capture.

---

## 5. Price Elasticity

**Factors that reduce elasticity** (allow higher prices):
- Few substitutes available
- High switching costs
- Price is a small share of the buyer's total cost
- The product is mission-critical
- Strong brand or perceived quality premium

**Factors that increase elasticity** (require price discipline):
- Many alternatives available
- Low switching costs
- Price-transparent market
- Discretionary purchase
- Commodity perception

---

## 6. Price Changes

### Price increase playbook

1. **Build the case before announcing.** Quantify the value delivered since the last price change. Frame the increase as a value story, not a cost-pass-through.
2. **Segment the impact.** Not every customer sees the same increase. Protect high-value, high-risk accounts with tailored transitions.
3. **Give lead time.** 60-90 days minimum for enterprise; 30 days for SMB. Surprise increases destroy trust.
4. **Grandfather selectively.** Legacy pricing for long-tenured or high-NPS accounts, with a sunset date.
5. **Monitor churn in the 90 days after.** If churn exceeds the revenue gain from the increase, the increase was too aggressive.

### Discount governance

Uncontrolled discounting is a margin leak. Every discount should answer: Why this amount? Why this customer? What do we get in return?

| Discount type | Acceptable when | Red flag |
|---|---|---|
| Volume discount | Genuine volume commitment with contractual obligation | "Volume discount" with no volume floor |
| Multi-year discount | Customer commits 2-3 years; reduces churn risk | Discount exceeds the NPV benefit of the longer term |
| Competitive match | Documented competitive threat, customer would otherwise churn | Matching without verifying the competitive offer |
| Strategic discount | Named strategic account with expansion potential | Every account gets labeled "strategic" |

---

## 7. SaaS Pricing Specifics

| Metric | Benchmark | What it signals |
|---|---|---|
| ARPU growth rate | Should exceed inflation | Pricing power and successful upsell |
| Net revenue retention | >110% for enterprise, >100% for SMB | Expansion revenue exceeds contraction + churn |
| Discount rate (avg) | <15% off list | Pricing discipline |
| Price realization | >90% of list price | Sales team holds the line |
| Expansion revenue / total new ACV | >30% | Land-and-expand is working |

**Monetization levers** (in order of impact): price increase on renewals, new tier or add-on, usage-based overage, new product cross-sell, volume tiering, professional services pricing.

---

## 8. Tier Design Framework

Systematic approach to designing Good/Better/Best pricing tiers, feature fencing, price ratios, and decoy positioning.

### Feature Fencing

Map features to tiers using a 2D scoring system:

**Breadth Score (1-5):** How many customer segments want this feature?
- 1: Niche (< 10%), 2: Specialized (10-25%), 3: Common (25-50%), 4: Majority (50-75%), 5: Universal (> 75%)

**Value Intensity Score (1-5):** How much value does this feature create?
- 1: Nice-to-have, 2: Moderate gain, 3: Significant improvement, 4: Critical capability, 5: Mission-critical

**Tier Assignment Matrix:**

| Breadth × Value | Score Range | Tier | Rationale |
|---|---|---|---|
| Universal + High Value | 20-25 | Good (base) | Everyone needs it, everyone gets it |
| High Breadth + Medium Value | 15-19 | Good or Better | Depends on competitive positioning |
| Medium Breadth + High Value | 12-16 | Better (mid) | Core differentiator for majority |
| Low Breadth + High Value | 8-12 | Best (premium) | Power users pay premium |
| Low Breadth + Low Value | 2-7 | Exclude or Add-on | Not worth including in tiers |

### Price Ratio Patterns

| Pattern | Ratio | Target Distribution | When to Use |
|---|---|---|---|
| **Linear** | 1x : 2x : 3x | 40% / 40% / 20% | Commoditized market, price-sensitive buyers |
| **Accelerating** | 1x : 2x : 4x | 50% / 35% / 15% | Value increases non-linearly with tier |
| **Compressed** | 1x : 1.5x : 2x | 30% / 50% / 20% | Push customers to mid-tier (highest margin) |
| **Decoy-Optimized** | 1x : 2.5x : 3x | 35% / 10% / 55% | Make premium attractive by comparison |
| **Wide Spread** | 1x : 3x : 10x | 60% / 25% / 15% | Enterprise tier is custom/negotiated |

### Decoy Positioning

Use the mid-tier as a decoy to make the premium tier more attractive via asymmetric dominance.

**Decoy design rules:**
1. **Price proximity:** Decoy should be 70-90% of premium price
2. **Feature gap:** Premium should have 2-3 exclusive features decoy lacks
3. **Value gap:** Premium should deliver 2-3x more value than decoy
4. **Intentional weakness:** Decoy should feel incomplete or overpriced

**When NOT to use decoys:**
- When mid-tier is your target segment
- When customers are sophisticated and will see through it
- When you need balanced distribution across tiers

### Tier Naming

| Style | Examples | Best For |
|---|---|---|
| Functional | Basic / Professional / Enterprise | B2B SaaS, technical products |
| Aspirational | Starter / Growth / Scale | Startups, SMBs |
| Descriptive | Essential / Plus / Premium | Consumer products |
| Branded | Silver / Gold / Platinum | Luxury, memberships |
| Audience-based | Individual / Team / Business | Collaboration tools |

Avoid "Free" (use "Basic"), avoid negative framing ("Limited" → "Essential"), match category conventions.

### Tier Validation Tests

1. **Distribution:** Target 30-40% Good, 40-50% Better, 15-25% Best. Red flag: >50% in Good or >40% in Best.
2. **Upgrade path:** Can customers articulate why they'd move up one tier?
3. **Competitive positioning:** Are your tiers competitive at each price point?
4. **Margin:** Mid-tier should have highest gross margin (lowest support cost, highest volume).
5. **Cannibalization:** If >40% choose Good, raise the tier boundary or reduce Good features.
