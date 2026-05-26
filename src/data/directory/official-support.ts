export const OFFICIAL_SUPPORT_LAST_VERIFIED = "2026-04-20";

export const MOHP_MENTAL_HEALTH_PLATFORM_URL = "https://mentalhealth.mohp.gov.eg";
export const MOHP_HOTLINE_SOURCE_URL = "https://www.mohp.gov.eg/NewsDetails.aspx?subject_id=5901";
export const DAR_AL_IFTA_CONTACTS_URL = "https://www.dar-alifta.org/en/contacts";
export const DAR_AL_IFTA_TELEPHONE_SERVICE_URL = "https://www.dar-alifta.org/en/service/details/32/telephone-service";
export const WHO_MENTAL_HEALTH_URL = "https://www.who.int/health-topics/mental-health";
export const WHO_MENTAL_DISORDERS_URL = "https://www.who.int/en/news-room/fact-sheets/detail/mental-disorders";
export const WHO_DEPRESSION_URL = "https://www.who.int/en/news-room/fact-sheets/detail/depression";
export const WHO_ANXIETY_URL = "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders";
export const WHO_SUICIDE_URL = "https://www.who.int/news-room/fact-sheets/detail/suicide";

export const EGYPT_CRISIS_CONTACTS = {
  mentalHealthShortCode: "16328",
  mentalHealthTollFree: "08008880700",
  mentalHealthLandline: "0220816831",
  ambulance: "123",
  darAlIfta: "107",
} as const;

export interface OfficialGuidanceCard {
  id: string;
  label: string;
  url: string;
  stat: string;
  description: string;
  sourceType: "who" | "mohp" | "dar-al-ifta";
}

export const OFFICIAL_MENTAL_HEALTH_GUIDANCE: OfficialGuidanceCard[] = [
  {
    id: "who-mental-health",
    label: "WHO: Mental health",
    url: WHO_MENTAL_HEALTH_URL,
    stat: "Mental well-being and treatment gaps",
    description:
      "Official WHO overview describing mental health as mental well-being, explaining treatment gaps, stigma, and why effective care remains under-resourced worldwide.",
    sourceType: "who",
  },
  {
    id: "who-mental-disorders",
    label: "WHO: Mental disorders",
    url: WHO_MENTAL_DISORDERS_URL,
    stat: "1 in 7 people globally in 2021",
    description:
      "WHO fact sheet summarizing prevalence, risk factors, and treatment access for mental disorders, including depression and anxiety.",
    sourceType: "who",
  },
  {
    id: "who-depression",
    label: "WHO: Depression",
    url: WHO_DEPRESSION_URL,
    stat: "332 million people estimated worldwide",
    description:
      "WHO depression fact sheet explaining symptoms, risk factors, help-seeking thresholds, and the link between depression and suicide risk.",
    sourceType: "who",
  },
  {
    id: "who-anxiety",
    label: "WHO: Anxiety disorders",
    url: WHO_ANXIETY_URL,
    stat: "359 million people in 2021",
    description:
      "WHO anxiety fact sheet covering symptoms, risk factors, evidence-based treatments, and the relationship between anxiety, depression, and suicidality.",
    sourceType: "who",
  },
  {
    id: "who-suicide",
    label: "WHO: Suicide",
    url: WHO_SUICIDE_URL,
    stat: "720,000+ deaths each year",
    description:
      "WHO suicide fact sheet outlining global burden, crisis risk factors, and the importance of immediate support and early intervention.",
    sourceType: "who",
  },
  {
    id: "mohp-mental-health",
    label: "Egypt MoHP mental-health platform",
    url: MOHP_MENTAL_HEALTH_PLATFORM_URL,
    stat: "Official Egyptian support route",
    description:
      "Official Egyptian Ministry of Health mental-health portal for support navigation, literacy materials, and referral orientation.",
    sourceType: "mohp",
  },
];
