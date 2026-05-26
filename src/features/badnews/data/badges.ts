// AUTO-GENERATED from getbadnews.com open-source data
// Do NOT edit manually

export type BadgeId = "IMPERSONATION" | "EMOTION" | "POLARIZATION" | "CONSPIRACY" | "DISCREDIT" | "TROLLING";

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  expandedDescription: string;
  icon: string | null;
}

export const BADGES: Badge[] = [
  {
    "id": "IMPERSONATION",
    "name": "IMPERSONATION",
    "description": "Most people pay little attention to sources. As a purveyor of disinformation, you can use that to your advantage.",
    "expandedDescription": "Impersonating someone else and disguising yourself as a credible news source can be highly effective. Most people pay little attention to sources. As a purveyor of disinformation, you can use that to your advantage. A minute ago you were just an angry citizen, now you're a big shot editor-in-chief running a real news site.",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/vermommen.png"
  },
  {
    "id": "EMOTION",
    "name": "EMOTION",
    "description": "Emotional content can be extremely effective if you want your news to go viral.",
    "expandedDescription": "Playing into basic emotions such as fear, anger and empathy make people more susceptible to your message. ",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/fear.png"
  },
  {
    "id": "POLARIZATION",
    "name": "POLARIZATION",
    "description": "You've amplified an isolated post into a full-blown scandal on social media and are driving left and right apart.",
    "expandedDescription": "By finding existing grievances and blowing them up, you can drive people apart and make them think a story is much more important than it really is. Left and right are now much further apart than before. This can be easily exploited by content producers.",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/polariseer.png"
  },
  {
    "id": "CONSPIRACY",
    "name": "CONSPIRACY",
    "description": "A well-crafted lie published at the right time makes people lose trust in institutions.",
    "expandedDescription": "Conspiracy theories are a big part of online news sites. They can be defined as the belief that unexplained events are orchestrated by a covert group or organisation. ",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/manipuleren.png"
  },
  {
    "id": "DISCREDIT",
    "name": "DISCREDIT",
    "description": "You've defended yourself against attacks from outside by going on a ruthless counteroffensive.",
    "expandedDescription": "Discrediting your opponents is an important part of disinformation because it deflects the attention from the untruths you are spreading. ",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/defend.png"
  },
  {
    "id": "TROLLING",
    "name": "TROLLING",
    "description": "Your opponents are completely lost. You've used a variety of disinformation techniques, and deliberately caused societal distrust and chaos.",
    "expandedDescription": "Trolls exploit people's emotions and deliberately blur the line between truth and untruth. Engaging in a discussion with a troll means wasting precious time and energy, but that's exactly what they want! ",
    "icon": "https://www.getbadnews.com/wp-content/uploads/2021/10/trolling_badge.png"
  }
];

export const BADGE_MAP: Record<string, Badge> = {};
BADGES.forEach(b => { BADGE_MAP[b.id] = b; });
