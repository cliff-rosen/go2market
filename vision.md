# Agent-Driven Go-to-Market — Vision

## The Bet

We use AI agents not just *in* our products, but to *launch* them. Two autonomous systems work in parallel: one finds and reaches our market, the other closes the feedback loop to product-market fit.

## Products

- **KH** — [TBD: core value prop and target user]
- **TableThat** — [TBD: core value prop and target user]

---

## Pillar 1: Outreach Engine

**Goal:** Identify who our users are, where they are, and reach them with the right message in the right channel.

### Research Phase
- Profile the ideal user for each product (role, pain points, context)
- Map where those people actually spend time: specific subreddits, Discord servers, HN threads, niche forums, LinkedIn groups, newsletters, Twitter/X communities
- Rank channels by signal density (where are people *actively talking about this problem*?) not just audience size

### Engagement Phase
- Craft channel-native messaging — a Reddit comment is not an email is not a LinkedIn post
- Prioritize value-first engagement: answer questions, share insights, demonstrate expertise before pitching
- Use email strategically (warm intros, follow-ups to engaged users) not as the primary cold channel

### Key Insight
The agent advantage isn't volume — it's *research depth*. A human can monitor 3 subreddits. An agent can monitor 300 and surface the 5 conversations that matter today.

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
