# Vertical Playbook: From Use-Case Dimensions to Active Workflow

## Purpose

The [vision](vision.md) defines two orientations we're pursuing: person-driven and community-driven. The [use-case dimensions](use-case-dimensions.md) define the space of possible verticals for TableThat. This document bridges the gap: how do we go from "the space is huge" to "we are actively running outreach in a specific vertical"?

The output of this process is a vertical pinned down enough to enter one of the two workflows.

---

## The Problem

TableThat is a general-purpose product. We can't do outreach in general — we need a vertical to target. But picking a vertical isn't a single decision; it's a series of steps that progressively narrow the space until we have something concrete enough to act on.

Each step produces an artifact. Each artifact is an input to the next step. If a step doesn't produce a clear answer, we iterate on that step — not skip ahead.

---

## Step 1: Brainstorm Candidate Verticals

**Input:** The use-case dimensions doc + our knowledge of the product.

**Process:** Generate a list of specific use cases — not abstract categories, but concrete scenarios a real person would describe in their own words. Each candidate should be a point in the dimension space:

> "A procurement manager comparing SaaS vendors for a team purchase"
> "A parent trying to find a child psychiatrist who takes their insurance"
> "A freelance writer tracking which publishers accept unsolicited manuscripts"

Don't filter yet. The goal is breadth. Aim for 15-30 candidates.

**Output:** A list of candidate verticals, each described as a person + problem + action.

---

## Step 2: Score for Product Fit

**Input:** The candidate list from Step 1.

**Process:** For each candidate, assess how well TableThat *as it exists today* serves this use case. Not what we could build — what we have. Key questions:

- Does the core loop work? (Describe what you need → get a researched table)
- Is the data accessible? (Public web, APIs — not behind paywalls or auth walls)
- Is the research depth right? (Standard research, not investigative multi-step)
- Is the lifespan long enough to drive retention? (Not ephemeral one-shot use)

Score each candidate: **strong fit**, **partial fit**, or **poor fit**. Drop the poor fits.

**Output:** A shorter list of candidates that the product can actually serve today.

---

## Step 3: Assess Reachability

**Input:** The filtered list from Step 2.

**Process:** For each surviving candidate, answer the key question: *can we actually reach these people?* This is where the two orientations diverge — and where we figure out which workflow applies.

### Community reachability
- Are there Reddit communities, HN discussions, Discourse forums, or other API-accessible places where people with this problem gather?
- How active are they? (Dead subreddit = dead end)
- Are people actually discussing the problem, or just the broader topic?
- Can we engage, or is it read-only / heavily moderated?

Use the [Community API Explorer](../explorer/) to test this empirically — search for the keywords this vertical would use, browse the candidate communities, see what's actually there.

### Person reachability
- Can we identify individuals with this problem? By what signal? (Role + company? Public posts? Conference attendance?)
- Can we get their email addresses? (Public, or through enrichment tools like Apollo, Hunter, etc.)
- Is there enough volume to sustain a campaign? (10 reachable people isn't a vertical)

**Output:** For each candidate, a reachability assessment for both orientations. Some verticals will be reachable by community, some by person, some by both, some by neither.

---

## Step 4: Pick the Vertical and the Orientation

**Input:** Scored candidates with reachability assessments.

**Process:** Choose the vertical where product fit AND reachability overlap most strongly. Then choose the orientation:

- **Start with community** if: there are active, accessible communities where people describe the problem in their own words, and you want to learn the market's language before doing direct outreach. Community-driven is also better for learning — you see real conversations, real pain, real objections.

- **Start with person** if: you can identify specific individuals who clearly have the problem, you have a way to reach them (email), and you have enough signal to write a genuinely personalized message. Person-driven is better for high-value, low-volume verticals where each conversion matters.

- **Start with both** if: you have the bandwidth, and the two orientations target the same vertical from different angles. Community engagement builds signal that improves person-driven research, and vice versa.

Most likely: **start with community** for a new vertical. You learn faster, and the signal feeds person-driven outreach later.

**Output:** One vertical, one (or both) orientations, and a clear reason why.

---

## Step 5: Define the Monitoring Set (Community) or Target List (Person)

This is where you enter the active workflow defined in the vision.

### If community-driven:

1. List the specific communities to monitor (subreddits, HN tags, forums — by name)
2. Define the keywords and problem-space language for this vertical (their words, not ours)
3. Set up monitoring in the explorer tool
4. Establish what a "high-signal post" looks like for this vertical
5. Draft engagement guidelines (tone, what's helpful, what to avoid)

### If person-driven:

1. Define the target profile (role, industry, company size, signals of need)
2. Identify sources for finding these people (LinkedIn, directories, community profiles)
3. Build an initial target list (start small — 20-50 people)
4. Research the first batch deeply before writing any outreach
5. Draft the first message and drip sequence for this vertical

---

## Step 6: Run, Measure, Iterate

**What to measure:**
- Community: Are we finding high-signal posts? Are our engagements getting responses? Are people clicking through?
- Person: Are we getting replies? Are the replies positive/curious or dismissive? Is the research deep enough?

**What to iterate on:**
- The monitoring set (add/remove communities based on signal quality)
- The keywords (the market's language evolves as you listen)
- The engagement approach (what tone works, what gets ignored)
- The vertical itself (if signal is weak across the board, revisit Step 4)

**When to expand:**
Once a vertical is producing consistent signal and engagement, consider:
- Adding the second orientation (if you started with one)
- Expanding to adjacent verticals using what you've learned
- Feeding insights back into product development

---

## Summary

```
Step 1: Brainstorm candidates (person + problem + action)
Step 2: Score for product fit (drop poor fits)
Step 3: Assess reachability (community and/or person)
Step 4: Pick the vertical and orientation
Step 5: Define monitoring set or target list (enter active workflow)
Step 6: Run, measure, iterate
```

The whole point is to avoid two failure modes:
1. **Paralysis** — endlessly analyzing the dimension space without ever doing outreach
2. **Spray and pray** — skipping the analysis and doing outreach in a vaguely defined market

Each step has a concrete output. If you can't produce the output, you're not ready for the next step.
