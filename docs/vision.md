# Agent-Driven Go-to-Market — Vision

## First Principles

Every go-to-market motion reduces to one question: how do you get in front of the right person with the right message? The approaches differ in what you're targeting:

| Channel | Unit of Engagement | Description |
|---|---|---|
| **Person-driven** | An individual with an email | Direct outreach — research a specific person, craft a message for them |
| **Community-driven** | A post within a community | Show up where conversations are already happening |
| **Advertising** | A cohort or persona | Pay to put a message in front of a defined audience segment |
| **Content** | A topic | Create material that attracts inbound interest over time |

There could be others. We're focusing on the first two — person-driven and community-driven — because they're the highest-leverage channels for agent-driven automation and the ones where research depth matters most.

---

## Pillar 1: Person-Driven

**Unit of engagement:** A real-world individual with an email address.

This is direct outreach. We know (or can infer) who the person is before we ever contact them. The entire workflow is a pipeline from identification to conversation.

### The Pipeline

**1. Research → Funnel Entry**

The first job is finding people who plausibly need what we're building. This is the top of the funnel — sourcing targets from LinkedIn, company directories, community profiles, event attendee lists, wherever real people with real roles surface. The agent's job here is volume with signal: cast wide, but filter hard.

**2. Deep Research → Message Crafting**

Once someone enters the funnel, the heavy work begins. Before any outreach, we build a rich picture of this specific person: what they've posted, what their company does, what problems they're likely facing right now. This research is the entire difference between outreach that gets a reply and outreach that gets deleted.

The message must pass one test: *could this only have been written for this person?* If you could swap in a different name and it still makes sense, it's spam.

**3. Drip Campaign**

After the first touch, we run a short, highly customized sequence. Each message builds on the last and adapts to signal (or silence). This is not a generic cadence — every step reflects what we know about this person and how they've responded.

### The Anti-Pattern

The current state of AI outreach is mass personalization that fools nobody. "I noticed your company does [scraped tagline]" is not research. Templates with `{first_name}` swapped in are not personalization. If the research is shallow, the message is spam — and the entire value proposition collapses. Better to reach 10 people well than 1,000 badly.

The bar is: could this message only have been written for this specific person? If you could swap in a different name and it still makes sense, it's spam.

### Key Properties
- The target is always a known individual
- Research quality is the bottleneck — shallow research kills everything downstream
- The campaign is sequential and stateful (each touch depends on the last)
- Success metric: reply rate and conversation quality, not volume

---

## Pillar 2: Community-Driven

**Unit of engagement:** A post within a community — not the community itself, and not a person.

This is a completely different motion. We're not reaching out to someone; we're showing up where conversations are already happening. The challenge is that the universe of communities and posts is enormous, so the entire system is a series of filters.

### The Pipeline

**1. Community Filtering → Monitoring Set**

We cannot monitor every post in every community across every medium. The first step is narrowing the universe to a manageable monitoring set. This is a strategic decision:

- Which platforms can we access via API? (Reddit, HN, Discourse, Discord — each with different constraints)
- Within each platform, which communities discuss problems we solve?
- How active are they? Is there enough signal to justify monitoring?
- Can we actually engage there, or is it read-only?

The output is a curated set of communities worth watching. This set evolves as we learn.

**2. Post Monitoring → Opportunity Detection**

Within the monitoring set, we need an algorithm that continuously scans for posts worth engaging with. Not every post is relevant, and not every relevant post is actionable. The monitoring algorithm should:

- Filter by keyword and topic relevance (fast, cheap pass)
- Score surviving posts for signal: is this person describing a problem we solve? How urgent? How engaged is the thread?
- Surface the highest-signal opportunities with enough context to act on

This is where scale matters — a human can follow a handful of threads; the agent can scan thousands.

**3. Engagement → Adaptive Response**

Once we've found a post worth engaging with, the engagement itself is fundamentally different from person-driven outreach. Every post is a different setting: different community norms, different conversation context, different tone expectations. There is no reusable template.

The engagement algorithm must:

- Understand the specific context of this post and thread
- Respect the norms of this particular community
- Craft a response that is genuinely helpful independent of any product mention
- Adapt the approach each time — unlike a drip campaign, there is no sequence to follow

### Key Properties
- The target is always a post, not a person
- The funnel is a series of filters: platforms → communities → posts → engagement-worthy posts
- Every engagement is a one-shot in a unique context (vs. person-driven's sequential campaign)
- Success metric: engagement quality (upvotes, replies, click-throughs), not reach

---

## The Structural Difference

| | Person-Driven | Community-Driven |
|---|---|---|
| **Unit** | Individual with an email | Post within a community |
| **Starting point** | We find them | They surface a need |
| **Research** | Deep on one person | Broad across thousands of posts |
| **Engagement** | Sequential drip campaign | One-shot adaptive response |
| **State** | Stateful (each touch depends on history) | Stateless (each post is independent) |
| **Bottleneck** | Research quality per person | Filtering efficiency across communities |
| **Risk** | Spam (bad research) | Bans (bad community fit) |

Both pillars feed a shared product loop: community engagement surfaces real language and pain points, person-driven conversations reveal individual needs, and both inform what we build next.

---

## Open Questions

- Which products are we targeting with each pillar? Do both apply to both KH and TableThat?
- For person-driven: what are the best sources for target identification in our verticals?
- For community-driven: which platform × community combinations form the initial monitoring set?
- How do we close the loop from engagement back to product development?
- What's the MVP scope for each pillar's agent system?
