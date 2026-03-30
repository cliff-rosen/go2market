# Use Case Dimensions

TableThat's market is defined by the intersection of multiple independent dimensions. Each dimension slices the space differently. A specific use case is a point in this multi-dimensional space — and each point carries different implications for messaging, community targeting, product requirements, and competitive positioning.

---

## Dimension 1: Row Entity Type

What kind of thing does each row represent? This is the most fundamental dimension because it determines where the data lives, how it's researched, and how fast it goes stale.

### Products & Services
- **Software / SaaS tools** — project management, CRM, design tools, dev tools
- **Physical products** — equipment, supplies, consumer goods
- **Professional services (broad)** — marketing agencies, law firms, accountants
- **Professional services (narrow)** — psychiatrists accepting new patients, pediatric dentists with Saturday hours, Spanish-speaking therapists

### Organizations
- **Companies** — vendors, suppliers, partners, competitors
- **Publishers & media** — book publishers, journals, magazines, podcasts
- **Schools & programs** — K-12, universities, bootcamps, certification programs
- **Nonprofits & foundations** — grant-making orgs, charitable organizations
- **Government agencies & programs** — regulatory bodies, benefit programs

### People
- **Professional contacts** — leads, prospects, hiring managers, investors
- **Service providers** — doctors, lawyers, consultants, contractors, freelancers
- **Collaborators** — co-authors, research partners, potential hires
- **Public figures** — speakers, influencers, experts in a domain
- **Personal contacts** — event guests, alumni, community members

### Places
- **Businesses with locations** — restaurants, coworking spaces, gyms, daycare centers
- **Real estate** — apartments, commercial space, land
- **Venues** — event spaces, conference centers, wedding venues
- **Neighborhoods / areas** — for relocation, investment, market expansion

### Opportunities
- **Job listings** — full-time, contract, freelance, internship
- **Grants & funding** — government, foundation, corporate
- **RFPs & contracts** — procurement opportunities, government bids
- **Submission windows** — publisher calls, conference CFPs, award nominations
- **Scholarships & fellowships** — academic, professional, creative

### Information Objects
- **Academic papers** — journal articles, preprints, conference proceedings
- **Clinical trials** — active, recruiting, completed
- **Regulations & standards** — compliance requirements, certifications
- **Patents** — prior art, competitive landscape
- **Recipes, protocols, methods** — structured procedures

---

## Dimension 2: User Action Pattern

What is the user doing with this table? This determines the UX that matters most and shapes how we talk about the product.

### Comparison shopping
The user has a decision to make and needs to evaluate options side by side. The table is a decision tool — the end state is a choice.

*Examples: vendor evaluation, product comparison, apartment hunting, school selection*

### Research compilation
The user is building a reference dataset — a landscape view of a space. The table is an intelligence asset. There may be no single decision; the value is in having the picture.

*Examples: competitive landscape, market map, literature review, regulatory inventory*

### Pipeline tracking
The user accumulates entities over time and moves them through stages. The table is a workflow tool — rows have status, dates, and next actions.

*Examples: job applications, sales leads, grant submissions, content calendar, bug triage*

### Decision support / scoring
The user needs to prioritize or rank entities against criteria. The table is an analytical tool — enrichment creates the basis for sorting and filtering to the best options.

*Examples: lead scoring, vendor shortlisting, investment screening, triage by severity*

### Directory building
The user is compiling a comprehensive list for a specific niche. Completeness matters more than comparison. The table is a reference tool.

*Examples: "all pediatric dentists in Austin," "publishers accepting unsolicited sci-fi," "coworking spaces in Portland"*

### Monitoring / watchlist
The user tracks a set of entities for changes over time. The table is a dashboard — the value comes from noticing when something changes.

*Examples: competitor pricing, job board for a niche role, regulatory changes, stock/crypto watchlist*

---

## Dimension 3: User Role

Who is doing this? This determines where they hang out, what language they use, what they're willing to pay, and what adjacent tools they already use.

### Business functions
- **Procurement / operations** — vendor evaluation, supplier comparison, compliance tracking
- **Sales / business development** — lead research, prospect enrichment, competitive positioning
- **Marketing** — content research, influencer lists, event planning, competitive messaging
- **HR / recruiting** — candidate sourcing, benefits comparison, onboarding resources
- **Finance / accounting** — grant research, investment screening, audit tracking
- **Product management** — competitive analysis, feature comparison, user research synthesis

### Professional roles
- **Consultants** — client deliverables (comparison matrices, landscape reports, recommendations)
- **Freelancers / creators** — market research (publishers, clients, gigs, submission targets)
- **Researchers / academics** — literature review, trial tracking, grant applications
- **Real estate professionals** — property comparison, market analysis, lead tracking
- **Legal professionals** — case research, regulatory tracking, vendor compliance

### Personal use
- **Life decisions** — apartments, schools, doctors, camps, elder care, wedding vendors
- **Purchase decisions** — products, services, travel planning
- **Application tracking** — jobs, grad schools, scholarships, residency programs
- **Hobby / passion projects** — gear comparison, collection tracking, event finding

---

## Dimension 4: Table Lifespan

How long does this table stay useful? This affects retention, re-engagement, and whether the user becomes a repeat visitor or a one-shot user.

### Ephemeral (hours to days)
The table serves a single decision and is discarded. User gets value fast but may not return until the next decision.

*Examples: "which restaurant for Saturday night," quick product lookup, one-time price comparison*

### Short-lived (days to weeks)
The table supports an active project with a clear end date. User returns several times during the project, then moves on.

*Examples: apartment hunting, event planning, hiring for one role, planning a trip*

### Medium-lived (weeks to months)
The table tracks an ongoing effort that eventually concludes. Regular updates and re-enrichment add value.

*Examples: job search, grant application cycle, vendor evaluation project, school admissions season*

### Long-lived (months to years)
The table is a persistent workspace the user maintains indefinitely. This is where the strongest retention signal lives.

*Examples: sales pipeline, content calendar, competitive intelligence tracker, ongoing vendor roster, submission tracking for a writing career*

---

## Dimension 5: Data Freshness Requirements

How quickly does the data go stale? This determines how important re-enrichment and refresh features are, and shapes which verticals are feasible today.

### Static
Data rarely changes. Once researched, it stays accurate for months or longer.

*Examples: historical facts, academic papers, patent filings, company founding dates*

### Slow-moving (monthly+)
Data changes, but slowly enough that periodic manual re-enrichment is sufficient.

*Examples: company employee counts, product feature lists, school programs, doctor specialties*

### Moderate (weekly)
Data changes frequently enough to notice within weeks. Automated refresh would add clear value.

*Examples: SaaS pricing, job listings, event dates, grant deadlines, competitor features*

### Fast-moving (daily or faster)
Data changes constantly. A static table is dangerous — stale data leads to bad decisions.

*Examples: apartment availability, stock prices, flight prices, inventory/stock levels, breaking news*

**Implication:** Fast-moving data is a poor fit for TableThat today. The sweet spot is slow-moving to moderate — data that benefits from periodic re-enrichment but doesn't require real-time feeds.

---

## Dimension 6: Data Source Accessibility

Where does the data actually live, and can the AI get to it? This is the lamppost principle applied at the use-case level.

### Fully public web
Data is on publicly accessible web pages. Standard search + fetch works.

*Examples: product pages, company websites, government databases, conference sites, publisher guidelines*

### Structured public APIs
Authoritative data available via free or affordable APIs. Best quality, most reliable.

*Examples: PubMed, ClinicalTrials.gov, Google Places, GitHub, government data portals*

### Semi-public / gated
Data exists but requires accounts, paywalls, or API keys. Accessible with effort.

*Examples: G2/Capterra (partial paywall), Glassdoor (login wall), LinkedIn (heavily restricted), Zillow (limited API)*

### Private / locked
Data is behind auth walls, proprietary databases, or simply not on the web.

*Examples: MLS listings, internal company databases, private networks, personal referrals*

**Implication:** The first two tiers are where TableThat wins today. Semi-public is reachable with targeted tooling. Private data means the user is doing manual entry and using TableThat as an organizational tool — still valuable, but a different pitch.

---

## Dimension 7: Research Depth Per Row

How much work does the AI need to do to populate or enrich a single row? This affects cost, speed, and perceived quality.

### Lookup (seconds)
A single fact that can be answered from a search snippet. One query, one answer.

*Examples: company headquarters, founding year, CEO name, website URL*

### Standard research (tens of seconds)
Requires visiting 1-2 pages and extracting specific information. The typical enrichment case.

*Examples: product pricing, doctor specialties, school enrollment numbers, grant deadlines*

### Deep research (minutes)
Requires reading multiple sources, synthesizing, and making judgments. This is where TableThat's agentic research really differentiates.

*Examples: "is this publisher friendly to debut authors?", "does this vendor meet our compliance requirements?", "what's the sentiment on this product in the community?"*

### Investigative (many minutes, multi-step)
Requires chaining multiple research steps, cross-referencing sources, and possibly following up on leads. Currently at the edge of what the system handles well.

*Examples: "find the decision-maker at this company for our product category", "assess the financial health of this supplier", "compile the full submission requirements for this grant"*

---

## Dimension 8: Collaboration & Sharing

Is this a solo activity or a team effort? This determines feature requirements and pricing leverage.

### Solo, private
One person, for their own use. No sharing needed.

*Examples: apartment hunting, personal job search, hobby research*

### Solo, shared output
One person builds it, then shares the result (export, link, presentation). The table is a deliverable.

*Examples: consultant building a comparison matrix for a client, marketer presenting competitive analysis, student sharing research with an advisor*

### Small team, sequential
A few people contribute to the same table, but not simultaneously. Turn-taking is fine.

*Examples: two co-founders evaluating vendors, a small sales team enriching leads, spouses comparing schools*

### Team, collaborative
Multiple people working on the same table, potentially at the same time. Requires real-time sync, permissions, and conflict resolution.

*Examples: procurement team managing vendor pipeline, recruiting team tracking candidates, editorial team running content calendar*

**Implication:** TableThat v1 is solo. "Solo, shared output" is achievable now via export. Team use is a growth vector but requires significant infrastructure (real-time sync, permissions, audit trail). The community targeting should focus on solo users and solo-shared-output users today.

---

## Dimension 9: Adjacent Tools & Workflow Position

What does the user do before and after they use TableThat? This determines integration points, competitive context, and how to position the product.

### Starts from nothing
The user has no existing data. TableThat is the starting point — they describe what they need and the AI builds it.

*This is the hero use case. "Describe what you need, get a researched table."*

### Starts from a list
The user has names or URLs but no structured data. They import a CSV or paste a list, then use TableThat to enrich it.

*Examples: a list of leads from a conference, a set of company names from a report, bookmarked apartments*

### Feeds into a decision
The table's output drives an action: choosing a vendor, applying to a job, booking a restaurant. The table is a means to an end.

### Feeds into a deliverable
The table is exported and incorporated into a report, presentation, or recommendation. The value is partly in the research, partly in the structured format.

### Feeds into another system
The table's data moves into a CRM, ATS, project management tool, or spreadsheet for ongoing use. Integration and export quality matter.

---

## Using the Dimensions

A specific use case is a coordinate in this space:

> **Example:** A procurement manager evaluating SaaS vendors for the team.
> - Entity: SaaS tools
> - Action: Comparison shopping → decision support
> - Role: Procurement
> - Lifespan: Medium (weeks — the evaluation project)
> - Freshness: Moderate (pricing changes)
> - Source: Fully public web + semi-public (G2)
> - Depth: Standard to deep (pricing is lookup; compliance is deep research)
> - Collaboration: Small team, sequential
> - Workflow: Starts from a list (shortlist from initial RFP), feeds into a decision

> **Example:** A parent finding a child psychiatrist.
> - Entity: People (service providers)
> - Action: Directory building → comparison shopping
> - Role: Personal (life decision)
> - Lifespan: Short (days to weeks)
> - Freshness: Slow-moving (doctor info is relatively stable)
> - Source: Semi-public (insurance directories, Psychology Today, practice websites)
> - Depth: Standard (accepting new patients, specialties, insurance accepted)
> - Collaboration: Solo or shared output (sharing with partner)
> - Workflow: Starts from nothing, feeds into a decision (booking an appointment)

These coordinates tell us:
1. **Where to find this user** (community mapping — which subreddits, forums, HN discussions)
2. **What language to use** (the problem they describe vs. the solution we offer)
3. **Which product capabilities matter most** (enrichment depth, refresh, export, collaboration)
4. **How sticky the use case is** (lifespan × freshness = retention potential)
