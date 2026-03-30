# Agent-Driven Go-to-Market — Vision

## First Principles

Every go-to-market motion reduces to one question: how do you get in front of the right person with the right message? The approaches differ in what you're targeting:

| Orientation | Possible Channels | Our Focus |
|---|---|---|
| **Person** | Email, phone, text, direct mail, LinkedIn DM, ... | Email |
| **Community** | Online forums, social platforms, professional associations, meetups, conferences, ... | Reddit, HN, Discourse |
| **Cohort / Persona** | Paid search, social ads, display, sponsorships, ... | — |
| **Topic** | Blog, SEO, newsletters, Twitter/X, YouTube, ... | — |

Your **orientation** is the thing in the world that you believe has high affinity with your product. It's your theory of where demand lives — and that theory takes different shapes:

- **Person:** You believe specific individuals have the problem you solve. You know (or can infer) who they are — by role, by company, by what they've posted or built. The bet is that if you can reach *this person* with the right message, there's a match. Why this person? Because something about their situation — their job, their industry, their public frustration — signals that they need what you're building.

- **Community:** You believe the problem you solve is being actively discussed somewhere. Not by a specific person you've identified, but in a place where people with the problem gather and talk. The bet is that if you show up where the conversation is happening, you'll find demand in real time. Why this community? Because the people in it are already describing the pain your product addresses.

- **Cohort / Persona:** You believe a category of people — defined by demographics, behavior, or role — has the problem, but you don't know them individually. The bet is that if you put a message in front of enough people matching the profile, some will convert. Why this cohort? Because the profile correlates with the need.

- **Topic:** You believe people are searching for answers to questions your product addresses. The bet is that if you create the best content on that topic, demand will find you. Why this topic? Because search volume and content gaps signal unmet need.

The channel is how you reach the thing you're oriented toward. There's no one-to-one mapping — each orientation has many possible channels. What matters is choosing the orientation first, then picking the channels that make sense for your situation.

We're focusing on the first two orientations — person and community — because they're the highest-leverage for agent-driven automation and the ones where research depth matters most.

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

There are two modes of community engagement:

- **Reactive:** We find an existing post where someone is describing a problem we solve, and we engage in that thread. This is the primary mode — it's lower risk and naturally contextual.

- **Proactive:** We create our own post in a community. This is only appropriate *after* we've established through monitoring that the community has active, ongoing discussion around the problem space we address. You don't walk into a room and start talking about yourself — you listen first, confirm the topic is live, and then contribute something original that fits the conversation the community is already having. The bar for a self-generated post is higher: it must stand on its own as genuinely useful content, not just a vehicle for a product mention.

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

For **reactive engagement** (responding to existing posts), the algorithm must:

- Understand the specific context of this post and thread
- Respect the norms of this particular community
- Craft a response that is genuinely helpful independent of any product mention
- Adapt the approach each time — unlike a drip campaign, there is no sequence to follow

For **proactive engagement** (creating original posts), the prerequisites are stricter:

- We must have monitored the community long enough to confirm active discussion in our problem space
- The post must be native to the community's format and tone — a how-to, a comparison, a question, a resource share — whatever fits
- The content must provide standalone value; a product mention, if present at all, should be incidental
- Timing matters: the post should feel like a natural contribution to an ongoing conversation in the community, not a cold drop

### Key Properties
- The target is always a post, not a person — whether we're responding to someone else's post or creating our own
- The funnel is a series of filters: platforms → communities → posts → engagement-worthy posts
- Proactive posting is unlocked only after monitoring confirms the community is actively discussing the relevant problem space
- Every engagement is a one-shot in a unique context (vs. person-driven's sequential campaign)
- Success metric: engagement quality (upvotes, replies, click-throughs), not reach

---

## The Structural Difference

| | Person-Driven | Community-Driven |
|---|---|---|
| **Unit** | Individual with an email | Post within a community |
| **Starting point** | We find them | They surface a need |
| **Research** | Deep on one person | Broad across thousands of posts |
| **Engagement** | Sequential drip campaign | One-shot adaptive response (reactive) or original post (proactive, after establishing community fit) |
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
