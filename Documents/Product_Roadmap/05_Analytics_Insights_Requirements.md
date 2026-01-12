# Analytics & Insights Requirements

## 1. Real-Time Server-Log Dashboard
**Category:** Analytics
**User Problem:** Admins only see data with 24h delay (Google Analytics).
**Proposed Solution:** A simplified dashboard parsing local server access logs/Nginx logs in real-time to show active visitors and hit counts. No external tracking scripts.
**UI/UX:** Live counter. Sparkline charts updating every minute.
**User Flow:** Login -> Dashboard is first screen -> "50 users online".
**Success Metrics:** Admin usage frequency.
**Priority:** Should-have

## 2. Content Performance Heatmaps
**Category:** Analytics
**User Problem:** Authors don't know where readers stop reading (drop-off points).
**Proposed Solution:** Scroll-depth tracking visualized as a heatmap overlay on the article.
**UI/UX:** "Analytics Mode" toggle on published post. Colors (Red to Blue) show where eyes/scrolls focused.
**User Flow:** Activate heatmap -> See that 80% dropped off after the 2nd image -> Optimize that section.
**Success Metrics:** Improvement in read-through rate.
**Priority:** Must-have

## 3. Audience Demographics & Interest Graph
**Category:** Analytics
**User Problem:** Broad stats don't tell *who* the audience is.
**Proposed Solution:** Aggregated data on reader interests (based on tags read) and geography (anonymized).
**UI/UX:** Pie charts for "Top Interests". Map for locations.
**User Flow:** Weekly report shows "Your audience loves: Travel, Tech, Coffee".
**Success Metrics:** Content strategy alignment.
**Priority:** Nice-to-have

## 4. Conversion Funnel Analysis
**Category:** Analytics
**User Problem:** Not knowing what action led to a subscription.
**Proposed Solution:** Track path from Landing -> Article -> Subscribe Button -> Success.
**UI/UX:** Funnel diagram showing drop-off % at each step.
**User Flow:** Analyze funnel -> See 50% drop at "Sign Up Form" -> Simplify form fields.
**Success Metrics:** Conversion Rate Optimization (CRO).
**Priority:** Should-have

## 5. Exportable PDF/CSV Reports
**Category:** Analytics
**User Problem:** Need to share data with stakeholders who don't have login access.
**Proposed Solution:** One-click generation of branded PDF reports summarizing monthly performance.
**UI/UX:** "Export Report" button. Date range picker.
**User Flow:** Select "Last Month" -> Export -> Download PDF.
**Success Metrics:** Number of exports.
**Priority:** Should-have
