# Mode A: Conversation-First Outreach — Deep Dive

## What This Is

An agent system that continuously monitors online communities for conversations where our products are relevant, surfaces the highest-signal opportunities, and supports engagement — whether automated or human-driven.

## The Reality Check

Across every platform we researched, the same pattern holds: **monitoring is easy; automated engagement is hard or forbidden.** This shapes the entire architecture.

| Platform | Monitor | Auto-Engage | Verdict |
|----------|---------|-------------|---------|
| Reddit | Easy, free tier | Technically possible, high ban risk | Monitor freely, engage carefully |
| Hacker News | Easy, free, no auth | No write API exists | Monitor only, engage manually |
| Discord | Requires bot invite from admin | Yes, if invited and permitted | Only viable for servers you're welcomed into |
| Discourse forums | Easy via API/RSS | Possible with admin-issued key | Monitor freely, engage with permission |
| Stack Exchange | Easy, free API | Very restricted | Monitor only |

**Implication:** The agent's primary job is *intelligence*, not *action*. It scans at machine scale and surfaces opportunities for human-quality engagement. Trying to automate the engagement itself is where most people get burned.

---

## Platform-by-Platform Breakdown

### Reddit

**Access:**
- OAuth2 required. Register an app at reddit.com/prefs/apps to get client ID and secret.
- Free tier: 100 requests/minute. Sufficient for monitoring dozens of subreddits.
- For commercial use at scale, Reddit requires a paid arrangement (contact their sales team).

**Libraries:** PRAW (Python, gold standard) or snoowrap (Node.js). Both handle OAuth and rate limiting automatically.

**What the agent can do:**
- Search posts by keyword across subreddits or site-wide (`/search`, `/r/{subreddit}/search`)
- Poll `/new` endpoints to catch fresh posts in real-time (no websocket — polling only)
- Read full comment trees on any post
- Track specific users' activity

**What the agent can do but probably shouldn't:**
- Post comments via `/api/comment`. Technically works, but:
  - New accounts face rate limits and karma requirements
  - Many subreddits have AutoModerator rules blocking low-karma or new accounts
  - Reddit's spam filters will shadowban accounts that post in patterns that look automated
  - Repetitive promotional comments get caught fast
  - Community backlash for astroturfing is severe

**Recommended approach:**
- **Agent monitors** subreddits for high-signal posts (keyword matching, sentiment, relevance scoring)
- **Agent drafts** potential responses
- **Human reviews and posts** from a real account with genuine community participation history
- Over time, if a subreddit is friendly to our product category, consider very light automated responses — but only after establishing a real presence

**Note on Pushshift:** The third-party Reddit archive that was widely used for historical search had its access revoked in 2023. You'll need to build your own collection pipeline via the standard API if you want historical data.

### Hacker News

**Access:**
- Official API (Firebase-based): `https://hacker-news.firebaseio.com/v0/` — no auth required, read-only
- Algolia Search API: `https://hn.algolia.com/api/v1/` — no auth required, ~10,000 requests/hour
- Both are free and generous

**What the agent can do:**
- Search all stories and comments by keyword, date range, author, type (story/comment/ask_hn)
- Poll for new posts matching our keywords every few minutes via Algolia's `/search_by_date`
- Track top stories, new stories, best stories (up to 500 per list)
- Monitor for mentions of competitors, problem-space keywords, or our own products

**What the agent cannot do:**
- Post anything. There is no write API. Period.
- Posting would require reverse-engineering form submissions with session cookies — fragile, against HN norms, and moderators (dang) are extremely active in killing promotional content.

**Recommended approach:**
- **Agent monitors** HN comprehensively — it's one of the highest-signal communities for technical products
- **Agent alerts** when a relevant thread is trending (e.g., "Show HN" in our space, or someone asking about our problem domain)
- **Human engages** from a real account with genuine HN participation history
- HN rewards substantive, authentic comments. No shortcuts here.

### Discord

**Access:**
- Bot API with token-based auth via the Developer Portal
- Libraries: discord.js (Node), discord.py (Python)
- The bot **must be invited** by a server admin — it cannot self-join, even "public" servers

**Critical constraint — MESSAGE_CONTENT intent:**
- Since August 2022, reading message *content* requires the `MESSAGE_CONTENT` privileged intent
- Must be enabled in the Developer Portal
- If the bot is in 100+ servers, Discord must approve it
- Without this intent, you only get metadata (author, timestamp), not the actual text

**Server discovery:**
- No API for discovering servers. Discord's Server Discovery feature is not exposed programmatically.
- Third-party directories exist (disboard.org, top.gg, discord.me) — some have APIs or can be scraped
- Realistically: manual research to identify relevant servers, then request admin invites

**What the agent can do (once invited):**
- Monitor all messages in permitted channels in real-time via WebSocket Gateway
- Search message history in channels with appropriate permissions
- Post messages (with `SEND_MESSAGES` permission) — rate limited to ~5 messages per 5 seconds per channel

**Recommended approach:**
- Identify the 10-20 most relevant Discord servers in our product spaces
- Reach out to admins, explain the bot's purpose, request invites
- Monitor for relevant conversations, surface them
- If engagement is appropriate, it should be genuinely helpful (answering questions, sharing resources) — not promotional blasts
- Self-bots (automating a regular user account) are a Terms of Service violation

### Forums (Discourse, Stack Exchange, Niche Communities)

**Discourse-based forums:**
- Many tech communities run on Discourse (e.g., community.openai.com, many product forums)
- Discourse has a full REST API: search posts, read topics, create posts (with admin-issued API key)
- RSS feeds available on most Discourse forums
- Good candidate for both monitoring and, where permitted, engagement

**Stack Exchange:**
- Free API: 300 req/day without key, 10,000/day with registered app
- Search across all Stack Exchange sites
- Write access is very restricted — focus on monitoring

**RSS everywhere:**
- Many forums (phpBB, vBulletin, Discourse) expose RSS feeds
- Low-tech but reliable for monitoring — poll feeds with a parser

---

## Architecture: The Monitoring Pipeline

```
┌─────────────────────────────────────────────────────┐
│                   DATA SOURCES                       │
│                                                      │
│  Reddit API    HN Algolia    Discord    RSS/Forums   │
│  (PRAW)        (REST)        (Gateway)  (Feedparser) │
└──────┬──────────┬────────────┬──────────┬───────────┘
       │          │            │          │
       ▼          ▼            ▼          ▼
┌─────────────────────────────────────────────────────┐
│              INGESTION LAYER                         │
│                                                      │
│  Scheduled pollers (Reddit, HN, RSS)                 │
│  Real-time listeners (Discord Gateway)               │
│  Normalize all content into common format:           │
│  { source, url, author, text, timestamp, community } │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              RELEVANCE ENGINE                        │
│                                                      │
│  Keyword matching (fast filter)                      │
│  LLM-based relevance scoring (is this actually       │
│  about our problem space, or just keyword noise?)    │
│  Priority ranking: urgency × relevance × reach      │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              ACTION LAYER                            │
│                                                      │
│  High-signal items → Draft response (LLM)           │
│  Route to human review queue                         │
│  Track engagement outcomes                           │
│  Feed learnings back into relevance scoring          │
└─────────────────────────────────────────────────────┘
```

### Common Content Format

Every piece of ingested content gets normalized to:

```
{
  source:      "reddit" | "hn" | "discord" | "discourse" | "rss"
  platform_id: "reddit:r/datascience:abc123"
  url:         "https://..."
  author:      "username"
  text:        "the actual post/comment content"
  title:       "post title if applicable"
  community:   "r/datascience" | "HN" | "server:channel"
  timestamp:   "2026-03-26T..."
  context:     "parent post or thread title for comments"
}
```

### Relevance Scoring

Two-pass system:
1. **Fast filter:** Keyword/regex matching to eliminate obvious noise (~90% of content). Cheap, fast.
2. **LLM scoring:** For posts that pass the fast filter, an LLM evaluates: "Is this person describing a problem that our product addresses? How urgent is their need? How engaged is the thread?" Returns a relevance score + reasoning.

This keeps LLM costs manageable — you're only scoring the ~10% that passes keyword filtering.

---

## Social Listening Tools (Build vs. Buy)

Several existing tools cover parts of this pipeline:

| Tool | What it monitors | API? | Cost | Notes |
|------|-----------------|------|------|-------|
| **F5Bot** | HN, Reddit, Lobsters | No (email alerts) | Free | Great for basic keyword alerts |
| **Syften** | HN, Reddit, forums | Webhooks | ~$19/mo | Purpose-built for community monitoring |
| **Mention** | Web, social, forums | REST API (paid plans) | ~$41/mo+ | Broader coverage, less community-focused |
| **Brand24** | Social, blogs, forums | API (premium) | ~$79/mo+ | Includes sentiment analysis |

**Build vs. buy consideration:**
- For pure monitoring/alerting, tools like Syften or F5Bot get you 80% of the value immediately
- The custom build pays off when you need: LLM-based relevance scoring, draft response generation, integration with your engagement workflow, and the feedback loop that learns from outcomes
- Hybrid approach: start with existing tools for alerting, build the relevance engine and response drafting on top

---

## Engagement Strategy: The Human-in-the-Loop

Since automated engagement is restricted or risky on every major platform, the system is designed around **machine-scale monitoring with human-quality engagement.**

### Workflow

1. **Agent surfaces opportunity** — "This post in r/dataengineering matches our product. Relevance: 0.92. The user is asking about exactly the problem we solve. 47 upvotes, 12 comments, posted 2 hours ago."

2. **Agent drafts response** — A contextual, helpful reply that addresses the user's specific question, with the product mentioned naturally if appropriate. Not a template.

3. **Human reviews** — Decides whether to engage, edits the draft for voice and authenticity, posts from a real account.

4. **System tracks outcome** — Did it get engagement? Drive traffic? Result in a signup? Feed this back into relevance scoring.

### Engagement Rules

- **Never post from a fresh or purpose-built account.** Build real community presence first.
- **The response must be genuinely helpful even without the product mention.** If removing the product link makes the response worthless, it's spam.
- **Respect community norms.** Every subreddit, Discord server, and forum has its own culture. The agent should learn and flag these.
- **Volume control.** A handful of high-quality engagements per day beats dozens of mediocre ones.

---

## Open Questions

- Which specific subreddits, Discord servers, and forums are most relevant for KH vs. TableThat?
- What keywords and problem-space language should the relevance engine look for?
- Do we start with existing tools (Syften/F5Bot) for quick wins, or build the custom pipeline from day one?
- Who handles the human-in-the-loop engagement? Is this us, or do we eventually hire for this?
- What's the budget for API access if we need Reddit's commercial tier?
