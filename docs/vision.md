# Agent-Driven Go-to-Market — Vision

## The Bet

We use AI agents not just *in* our products, but to *launch* them. Two autonomous systems work in parallel: one finds and reaches our market, the other closes the feedback loop to product-market fit.

## Products

- **KH** — [TBD: core value prop and target user]
- **TableThat** — [TBD: core value prop and target user]

---

## Pillar 1: Outreach Engine

**Goal:** Identify who our users are, where they are, and reach them with the right message in the right channel.

The outreach engine operates in three distinct modes. These are not interchangeable — each has its own targeting unit, agent behavior, data model, and success metrics.

### Mode A: Conversation-First (Reddit, HN, Discord, Forums)

**Targeting unit:** A thread or post — not a person.

**How it works:**
1. **Discover** — Identify communities where our problem space is actively discussed. Find the specific subreddits, Discord servers, HN topics, and niche forums where people talk about the pain our products address.
2. **Monitor** — Continuously scan for high-signal posts: "I'm struggling with X", "looking for a tool that does Y", "how do you handle Z?" These are people with an active, immediate need.
3. **Engage** — Craft a response that genuinely helps, with the product as a natural part of the answer. The value must be real — communities will punish anything that smells like astroturfing.

**Agent role:** Scanner and drafter. The agent monitors at a scale no human can (hundreds of communities), surfaces the conversations that matter, and drafts contextual responses for review or auto-posting.

**Success metrics:** Engagement quality (upvotes, replies, follow-on questions), click-throughs to product, signups attributed to community engagement.

**Key risk:** Getting banned. The line between helpful participant and shill is community-defined and strict. The agent must understand community norms.

### Mode B: Person-First (LinkedIn, Email, Direct Outreach)

**Targeting unit:** An individual person.

**How it works:**
1. **Identify** — Build a target profile: role, company, industry, likely pain points. Who specifically would benefit from each product?
2. **Research** — Deep-dive on each target before contact. What have they posted about? What's their company doing? What problems are they likely facing *right now*? This is where most AI outreach fails — they skip this step entirely.
3. **Reach out** — Craft a message that demonstrates genuine understanding of this person's situation. Not a template with {first_name} swapped in. A message that could only have been written for them.

**Agent role:** Researcher and composer. The heavy lift is research — building a rich picture of each target so the outreach is relevant. The agent compresses hours of research into seconds per target, but invests that time in quality, not volume.

**Success metrics:** Reply rate (not open rate), conversation quality, meetings booked, conversions. A single meaningful reply outweighs 1,000 ignored emails.

**Key risk:** Irrelevance. If the research is shallow, the message is spam. The entire value proposition collapses. Better to reach 10 people well than 1,000 badly.

**Anti-pattern to avoid:** The current state of AI outreach — mass personalization that fools nobody. "I noticed your company does [scraped tagline]" is not research. The bar is: could this message only have been written for this specific person?

### Mode C: Content & Magnet (Blog, Twitter/X, Newsletters, SEO)

**Targeting unit:** A topic or keyword — not a person or conversation.

**How it works:**
1. **Identify** — Find the topics, questions, and search terms our target users care about. What are they Googling? What content gaps exist?
2. **Create** — Produce content that genuinely addresses those topics: blog posts, Twitter threads, short-form insights, how-to guides. The product is the backstory, not the headline.
3. **Distribute** — Put content where it'll be found: SEO for search, social for discovery, newsletters for retention. Build a presence that attracts inbound interest over time.

**Agent role:** Researcher, drafter, and distributor. The agent identifies content opportunities, drafts material, and handles distribution cadence. Human review for voice and quality.

**Success metrics:** Inbound traffic, content-attributed signups, email list growth, search ranking for target terms.

**Key risk:** Generic content. AI can produce volume effortlessly, but generic content is noise. The content must reflect genuine insight about the problem space — not "Top 10 Tips" filler.

### Cross-Mode Insight

The three modes reinforce each other:
- **Conversation-first** surfaces real language and pain points → feeds **content** topics and **person-first** targeting
- **Content** builds credibility → makes **person-first** outreach warmer and **conversation-first** engagement more authoritative
- **Person-first** conversations reveal individual needs → inform **conversation-first** monitoring and **content** direction

The agent advantage isn't volume in any mode — it's *research depth and coverage*. A human can monitor 3 subreddits, research 5 prospects, and write 1 article a week. The agent can monitor 300, research 50, and draft 5 — all feeding each other.

---

## Pillar 2: Product Loop

**Goal:** Close the delta between MVP and product-market fit as fast as possible.

### The Core Model

There is always a gap between what an MVP delivers and what product-market fit looks like. Even a random walk through feature space would eventually find PMF — given infinite time. Two things compress that timeline:

1. **Velocity** — how fast you can ship changes
2. **Aim** — knowing *which* changes matter

Velocity without aim is a random walk. Aim without velocity is a whiteboard. The product loop's job is to provide the aim.

### Drivers of the Delta

The critical challenge: define the *drivers* that measure the distance between what users currently get and product-market fit. These are the signals that tell you whether you're converging or wandering.

Candidate driver categories:
- **Activation gap** — are users reaching the moment where they get real value? How many? How fast? What blocks them?
- **Retention signal** — do users come back? What distinguishes users who stay from those who don't?
- **Value frequency** — how often does the product deliver its core value? (Daily tool vs. occasional utility changes everything)
- **Effort-to-value ratio** — how much work does the user put in vs. how much value they extract? PMF feels effortless.
- **Word-of-mouth readiness** — would a user recommend this? Not as a survey — as observed behavior (shares, invites, mentions)

### The Measurement Problem

Getting drivers right is necessary but not sufficient. You also have to *measure* them accurately. This means:
- Instrumenting the product to capture the right events
- Capturing qualitative signal (what users say, not just what they do)
- Having the agent synthesize both into a coherent read on each driver

### The Loop

```
Define drivers → Measure drivers → Ship changes aimed at drivers → Re-measure → Refine drivers
```

Each cycle should answer: "Did that change move us closer to PMF, and how do we know?"

### Key Insight

The product loop is a *control system*. The drivers are your sensors. The agent is your feedback processor. Feature velocity is your actuator. Get the sensors wrong and nothing else matters — you're steering blind.

---

## What Makes This Different

Traditional GTM: marketing team + analytics dashboard + intuition + quarterly reviews.

Agent-driven GTM: continuous research + continuous synthesis + tight feedback loops. The agents don't replace judgment — they compress the time between "we don't know" and "now we know."

---

## Open Questions

- What are the specific value props and target users for KH and TableThat?
- Which outreach channels have the highest signal for each product's audience?
- What does "activation" look like for each product — what's the moment of real value?
- What are the right drivers for each product? (The candidate categories above need to be made concrete per product)
- How do we instrument the products to capture driver signals without over-engineering?
- What's the MVP scope for the agent systems themselves?
