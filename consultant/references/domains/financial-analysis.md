# Financial Analysis

Consulting-specific decision rules and thresholds. Claude already knows valuation methods, cost structures, and modeling techniques.

## Decision Rules

- **S-curve warning**: Do not default to linear extrapolation for products in early adoption phases. Model the adoption curve explicitly.
- **Sensitivity test**: If the recommendation changes between base and downside scenarios, the investment is too sensitive to recommend.
- **Cost benchmark**: Any cost category >20% above peer median is an optimization candidate. Materially below peers may signal under-investment.
- **CAC boundary**: Exclude customer success spend from CAC (that's retention, not acquisition). Always calculate blended and by-channel.
- **"Do nothing" baseline**: Every investment case needs a comparator. What happens if we don't act? Quantify the cost of inaction.

## Discount Rate Calibration

| Risk level | Rate range | Example |
|---|---|---|
| Low | 5-8% | Core operations, efficiency |
| Medium | 8-12% | Growth initiatives |
| High | 12-20% | New market entry |
| Very high | 20%+ | New ventures, R&D |

When in doubt, use the higher rate. Rejecting a good project is less costly than accepting a bad one.

## Technique Nudges

- **MIRR over IRR** when cash flows change sign multiple times or IRR produces unrealistically high numbers.
- **Real-options thinking** when projects have embedded flexibility (expand, abandon, defer, switch). Traditional NPV undervalues these.

For current valuation multiples and comparable transaction data, use web search rather than training knowledge.
