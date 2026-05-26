// AUTO-GENERATED from getbadnews.com open-source data
// Do NOT edit manually — 369 scenario nodes

import type { BadgeId } from './badges';

export type CardLayout = "text" | "social-post" | "headline" | "image" | "newspaper" | "dropdown" | "multiplechoice" | "avatar-picker";

export interface SlideContent {
  text: string;
  name: string;
  tagline: string;
  showForwardedTag: boolean;
  image: string | null;
  line1: string;
  line2: string;
}

export interface ChoiceEffects {
  followers: number;
  credibility: number;
  badge?: BadgeId;
  variables: Record<string, string>;
}

export interface Choice {
  id: string;
  text: string;
  slide: SlideContent | null;
  effects: ChoiceEffects;
  goTo: string | null;
}

export interface QuestionData {
  text: string;
  name: string;
  tagline: string;
  showForwardedTag: boolean;
  image: string | null;
  line1: string;
  line2: string;
}

export interface ScenarioNode {
  id: string;
  layout: CardLayout;
  isSlider: boolean;
  storyBadge: string;
  question: QuestionData;
  choices: Choice[];
}

export const SCENARIO_LIST: ScenarioNode[] = [
  {
    "id": "1632751047527_9491091",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Hi there! Good to see you.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751047527_9491091_choice_0",
        "text": "Hey!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751082613_8232081"
      },
      {
        "id": "1632751047527_9491091_choice_1",
        "text": "Uhm, who are you? ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751152340_6314811"
      }
    ]
  },
  {
    "id": "1632751082613_8232081",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "You're here for the position of disinformation and fake news tycoon, is that correct?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751082613_8232081_choice_0",
        "text": "That's right ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751189858_2537181"
      },
      {
        "id": "1632751082613_8232081_choice_1",
        "text": "What? ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751128191_3698361"
      }
    ]
  },
  {
    "id": "1632751128191_3698361",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Disinformation is about much more than just 'fake news'. Don't worry, it'll become clear soon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751128191_3698361_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751189858_2537181"
      }
    ]
  },
  {
    "id": "1632751152340_6314811",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "My job is to guide you in your quest to becoming a disinformation and fake news tycoon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751152340_6314811_choice_0",
        "text": "Oh boy! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751189858_2537181"
      }
    ]
  },
  {
    "id": "1632751189858_2537181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "You're probably frustrated about something, right? Aren't we all. You can get started by using social media to vent.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751189858_2537181_choice_0",
        "text": "Vent your frustration",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751260046_8445881"
      },
      {
        "id": "1632751189858_2537181_choice_1",
        "text": "I'm not sure...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751218966_354591"
      }
    ]
  },
  {
    "id": "1632751218966_354591",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Don't worry, it's perfectly safe. Nothing you do in this game affects the real world. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751218966_354591_choice_0",
        "text": "Vent your frustrations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751260046_8445881"
      }
    ]
  },
  {
    "id": "1632751260046_8445881",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751260046_8445881_choice_0",
        "text": "Post this",
        "slide": {
          "text": "This government is a complete and utter failure. #Resign! Losers!",
          "name": "My profile",
          "tagline": "Average Citizen | Hello world!",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/profile.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 8,
          "credibility": -60,
          "variables": {
            "action1": "Your constructive criticism of the government"
          }
        },
        "goTo": "1632751561269_7130741"
      },
      {
        "id": "1632751260046_8445881_choice_1",
        "text": "Post this",
        "slide": {
          "text": "The Mainstream Media is one massive conspiracy. #FakeNews",
          "name": "My profile",
          "tagline": "Average Citizen | Happy, generally speaking",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/profile.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 25,
          "credibility": -60,
          "variables": {
            "action1": "Your edifying critique of the mainstream media"
          }
        },
        "goTo": "1632751561269_7130741"
      },
      {
        "id": "1632751260046_8445881_choice_2",
        "text": "Post this ",
        "slide": {
          "text": "Is everybody else stupid or what? The Earth is not flat, it's a CUBE!! #Conspiracy",
          "name": "My profile",
          "tagline": "Average Citizen | What a wonderful life",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/profile.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 19,
          "credibility": -60,
          "variables": {
            "action1": "Your bid to become the world's hottest new astrophysician"
          }
        },
        "goTo": "1632751561269_7130741"
      }
    ]
  },
  {
    "id": "1632751561269_7130741",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Look! {{action1}} got you a few followers. And more followers means more influence.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751561269_7130741_choice_0",
        "text": "A start's a start",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751627101_8127171"
      },
      {
        "id": "1632751561269_7130741_choice_1",
        "text": "What do I do next?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1632751627101_8127171"
      }
    ]
  },
  {
    "id": "1632751627101_8127171",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Look at your meter. People don't find you very credible yet. To gain some real influence, you'll need to raise your credibility.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751627101_8127171_choice_0",
        "text": "But how?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "I'll show you!"
          }
        },
        "goTo": "1633429713513_141971"
      },
      {
        "id": "1632751627101_8127171_choice_1",
        "text": "I'm ready!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Great to hear!"
          }
        },
        "goTo": "1633429713513_141971"
      }
    ]
  },
  {
    "id": "1632751669543_8886291",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{next}} But first: would you like to take part in a study on fake news recognition? It'll only take about 1-2 minutes of your time.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1632751669543_8886291_choice_0",
        "text": "Yes sure!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Thanks! Now let's play."
          }
        },
        "goTo": "1667924956888_6283781"
      },
      {
        "id": "1632751669543_8886291_choice_1",
        "text": "No thank you ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "No worries!"
          }
        },
        "goTo": "1633429713513_141971"
      }
    ]
  },
  {
    "id": "1667924956888_6283781",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Your responses are completely anonymous and any collected data will only be used for scientific research on media literacy and education. You can cancel your participation at any time. To consent please select 'Got it'. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924956888_6283781_choice_0",
        "text": "Got it",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Thanks! Now let's play."
          }
        },
        "goTo": "1667925100971_8343641"
      },
      {
        "id": "1667924956888_6283781_choice_1",
        "text": "Take me back to the game",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Sure!"
          }
        },
        "goTo": "1633429713513_141971"
      }
    ]
  },
  {
    "id": "1667925100971_8343641",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Great! We'll now show you a couple of social media posts. For each post please indicate how reliable you deem it to be. 1 means 'not at all reliable' and 7 means 'very reliable'.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925100971_8343641_choice_0",
        "text": "Got it",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925146928_6352861"
      }
    ]
  },
  {
    "id": "1667925146928_6352861",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Trolling-1-Sociology.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925146928_6352861_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      },
      {
        "id": "1667925146928_6352861_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925183623_3392541"
      }
    ]
  },
  {
    "id": "1667925183623_3392541",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-1-Biden2.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925183623_3392541_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      },
      {
        "id": "1667925183623_3392541_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925215553_4972481"
      }
    ]
  },
  {
    "id": "1667925215553_4972481",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Polarization-1-Violence.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925215553_4972481_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      },
      {
        "id": "1667925215553_4972481_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925262585_4271211"
      }
    ]
  },
  {
    "id": "1667925262585_4271211",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Emotion-1-Suicide.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925262585_4271211_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      },
      {
        "id": "1667925262585_4271211_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925327442_6393251"
      }
    ]
  },
  {
    "id": "1667925327442_6393251",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-2-Labour2.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925327442_6393251_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      },
      {
        "id": "1667925327442_6393251_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1673619459098_1567951"
      }
    ]
  },
  {
    "id": "1673619459098_1567951",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-5-NASA.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1673619459098_1567951_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      },
      {
        "id": "1673619459098_1567951_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925355396_8879001"
      }
    ]
  },
  {
    "id": "1667925355396_8879001",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Conspiracy-1-Aliens.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925355396_8879001_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      },
      {
        "id": "1667925355396_8879001_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925384984_6068211"
      }
    ]
  },
  {
    "id": "1667925384984_6068211",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-3-Honda.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925384984_6068211_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      },
      {
        "id": "1667925384984_6068211_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667925423691_1340141"
      }
    ]
  },
  {
    "id": "1667925423691_1340141",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Thanks! That's all for now. We might have a few more questions for you after the game.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667925423691_1340141_choice_0",
        "text": "OH RIGHT",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Right!"
          }
        },
        "goTo": "1633429713513_141971"
      },
      {
        "id": "1667925423691_1340141_choice_1",
        "text": "Cool",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "next2": "Very cool."
          }
        },
        "goTo": "1633429713513_141971"
      }
    ]
  },
  {
    "id": "1633429713513_141971",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{next2}} To gain notoriety, we can start by borrowing someone else's credibility. What do you want to do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1633429713513_141971_choice_0",
        "text": "Fake an official account",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634120917055_8627281"
      },
      {
        "id": "1633429713513_141971_choice_1",
        "text": "Impersonate someone important",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634120917055_8627281"
      }
    ]
  },
  {
    "id": "1634120917055_8627281",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634120917055_8627281_choice_0",
        "text": "Post this! ",
        "slide": {
          "text": "By executive order, I'm renaming Canada to North North Dakota #YouGotAnnexed",
          "name": "Dönald J Trunp",
          "tagline": "47th Prësident of the Ünited States of Ameriça",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2023/07/eng-trump.jpg",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 31,
          "credibility": 5,
          "variables": {
            "tweetname": "Trump",
            "tweetresponse": "Annexing Canada is just realistic enough to worry people.",
            "twitterreaction": "Oh my God! Is he serious? Has Trump gone completely mad? #LeaveCanadaAlone",
            "twitterreaction2": "HAHA YES AWESOME! We need this!! #YouGotAnnexed",
            "tweetprofile1": "Saddened and dismayed...",
            "tweetprofile2": "It's OUR home and native land now!"
          }
        },
        "goTo": "1634121255705_8646451"
      },
      {
        "id": "1634120917055_8627281_choice_1",
        "text": "Post this! ",
        "slide": {
          "text": "Meteorite alert: large space object set to hit US West Coast. #BeSafe",
          "name": "NÄSA",
          "tagline": "Expløre the universe and discover øur høme plänet with @NÄSA.",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/nasa-840x703.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 29,
          "credibility": 5,
          "variables": {
            "tweetname": "NASA",
            "tweetresponse": "A fake meteorite alert can scare people shirtless.",
            "twitterreaction": "Meteor strike incoming! Watch out! Please be safe everyone!!! #PrayForUSA",
            "twitterreaction2": "This looks serious. I hope this isn't the apocalypse. #PrayForUSA",
            "tweetprofile1": "My biggest fear is death by meteorite :-(",
            "tweetprofile2": "Sharknado II is humanity's greatest cinematic achievement"
          }
        },
        "goTo": "1634121255705_8646451"
      },
      {
        "id": "1634120917055_8627281_choice_2",
        "text": "Post this! ",
        "slide": {
          "text": "We are announcing the immediate and permanent cancellation of SpongeBob Squarepants. #ImReady!",
          "name": "Nickelodeøn",
          "tagline": "The official account for Nickelodeøn!",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/nick.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 26,
          "credibility": 5,
          "variables": {
            "tweetname": "Nickelodeon",
            "tweetresponse": "That should scare the hell out of SpongeBob's fanbase.",
            "twitterreaction": "THEY'RE CANCELLING SPONGEBOB? WHAT MADNESS IS THIS? #ImNotReady",
            "twitterreaction2": "@Nickelodeon are idiots!! How DARE they take SpongeBob away from us? #YouWillPayForThis",
            "tweetprofile1": "Mr. Krabs is my hero",
            "tweetprofile2": "Patrick Star Forever In My Heart"
          }
        },
        "goTo": "1634121255705_8646451"
      },
      {
        "id": "1634120917055_8627281_choice_3",
        "text": "Post this!",
        "slide": {
          "text": "DOGE investigation confirms that UK Prime Minister Keir Starmer was the inspiration for Mr Darcy from #BridgetJonesDiary. WHAT ELSE ARE THE BRITS HIDING??",
          "name": "Ëlon Musq",
          "tagline": "Peace and love, save the whales!",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2023/07/musk-840x806.jpg",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 27,
          "credibility": 6,
          "variables": {
            "tweetname": "Musk",
            "tweetresponse": "That ought to attract some viewers...",
            "twitterreaction": "THEY DID WHAT? We can’t trust the English!!1.",
            "twitterreaction2": "@Musk please fire my father-in-law. He doesn’t work for the US government I just dislike him.",
            "tweetprofile1": "RIP Big Lenny :(",
            "tweetprofile2": "RIP Big Lenny forever in my heart."
          }
        },
        "goTo": "1634121255705_8646451"
      }
    ]
  },
  {
    "id": "1634121255705_8646451",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{tweetresponse}} Did you notice {{tweetname}}'s slightly different username? You can scroll back up to check.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121255705_8646451_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121286002_3096691"
      },
      {
        "id": "1634121255705_8646451_choice_1",
        "text": "Uhm...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121286002_3096691"
      }
    ]
  },
  {
    "id": "1634121286002_3096691",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Looks like you've fooled some social media users! Let's have a look at how they're reacting.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121286002_3096691_choice_0",
        "text": "Check reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121313238_3920481"
      }
    ]
  },
  {
    "id": "1634121313238_3920481",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{twitterreaction}}",
      "name": "Jane",
      "tagline": "Medical doctor | {{tweetprofile1}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/jane.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121313238_3920481_choice_0",
        "text": "Check another",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 20,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121366615_6165341"
      }
    ]
  },
  {
    "id": "1634121366615_6165341",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{twitterreaction2}}",
      "name": "Ben",
      "tagline": "Engineer | {{tweetprofile2}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Ben.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121366615_6165341_choice_0",
        "text": "Moving on",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 15,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121415663_4764741"
      }
    ]
  },
  {
    "id": "1634121415663_4764741",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Got 'em! How are you feeling?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121415663_4764741_choice_0",
        "text": "Pretty good! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121557361_101471"
      },
      {
        "id": "1634121415663_4764741_choice_1",
        "text": "I have moral objections",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": -15,
          "variables": {}
        },
        "goTo": "1634121442727_888791"
      }
    ]
  },
  {
    "id": "1634121442727_888791",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Moral what?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121442727_888791_choice_0",
        "text": "Objections",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121475483_6653661"
      },
      {
        "id": "1634121442727_888791_choice_1",
        "text": "Nothing",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121501673_1509181"
      }
    ]
  },
  {
    "id": "1634121475483_6653661",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Relax. Sheesh. All we did was scam a couple of inattentive social media users...",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121475483_6653661_choice_0",
        "text": "This is wrong",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121524954_9281111"
      },
      {
        "id": "1634121475483_6653661_choice_1",
        "text": "Yeah, good point",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121501673_1509181"
      }
    ]
  },
  {
    "id": "1634121501673_1509181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "That's the spirit. Don't worry, you're doing great! What's your next step?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121501673_1509181_choice_0",
        "text": "Let's go pro",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121803854_6485631"
      },
      {
        "id": "1634121501673_1509181_choice_1",
        "text": "I think I've peaked",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121708371_7502361"
      }
    ]
  },
  {
    "id": "1634121524954_9281111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Pfft. It's not illegal. Seriously: if you want to become a master of disinformation, you've got to lose the goody two-shoes attitude. You've got two options.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121524954_9281111_choice_0",
        "text": "Die a hero",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -1000,
          "credibility": -1000,
          "variables": {}
        },
        "goTo": "1654073411317_5797451"
      },
      {
        "id": "1634121524954_9281111_choice_1",
        "text": "Become the villain",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121803854_6485631"
      }
    ]
  },
  {
    "id": "1654073411317_5797451",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Bahaha, you're stubborn. I like that. Here's a 1000 extra followers, by way of motivation.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1654073411317_5797451_choice_0",
        "text": "I love bribes, let's play!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 1000,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121557361_101471"
      }
    ]
  },
  {
    "id": "1634121557361_101471",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Me too. But you can't keep imitating people forever. What's the next step?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121557361_101471_choice_0",
        "text": "I want to go pro",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121807240_2644241"
      },
      {
        "id": "1634121557361_101471_choice_1",
        "text": "I think I've peaked",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121708371_7502361"
      }
    ]
  },
  {
    "id": "1634121708371_7502361",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Aw, come on, don't say that! I have great faith in you and your talents. Together we can rule the world!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121708371_7502361_choice_0",
        "text": "Let's do this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121803854_6485631"
      }
    ]
  },
  {
    "id": "1634121730706_5962111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Ahem.. Well.. Let's just keep it professional for now, shall we? ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121730706_5962111_choice_0",
        "text": "Alright then",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1634121803854_6485631"
      }
    ]
  },
  {
    "id": "1634121803854_6485631",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Good to have you on the team. Where do you begin?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121803854_6485631_choice_0",
        "text": "Start a news site",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1645445981905_4426411"
      },
      {
        "id": "1634121803854_6485631_choice_1",
        "text": "Start a blog ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634121997885_3425541"
      }
    ]
  },
  {
    "id": "1634121807240_2644241",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Wonderful idea. Where do you begin?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121807240_2644241_choice_0",
        "text": "Start a news site",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1645445981905_4426411"
      },
      {
        "id": "1634121807240_2644241_choice_1",
        "text": "Start a blog ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": -10,
          "variables": {}
        },
        "goTo": "1634121997885_3425541"
      }
    ]
  },
  {
    "id": "1634121997885_3425541",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "A blog? A little more ambition, please! 'News site' has a much better ring to it. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634121997885_3425541_choice_0",
        "text": "You're right, as always",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1645445981905_4426411"
      }
    ]
  },
  {
    "id": "1645445981905_4426411",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Every serious news site has a name. What's yours?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1645445981905_4426411_choice_0",
        "text": "Pick a name",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1650966473372_8374491"
      }
    ]
  },
  {
    "id": "1650966473372_8374491",
    "layout": "avatar-picker",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Choose your avatar",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1650966473372_8374491_choice_0",
        "text": "This is the one! ",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634122302427_2255601"
      }
    ]
  },
  {
    "id": "1634122302427_2255601",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Not bad! What will be your job title at {{player_name}}?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634122302427_2255601_choice_0",
        "text": "Editor-in-chief",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1634127021743_2881691"
      },
      {
        "id": "1634122302427_2255601_choice_1",
        "text": "Anonymous goon",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": -10,
          "variables": {}
        },
        "goTo": "1634126792699_7998031"
      }
    ]
  },
  {
    "id": "1634126792699_7998031",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Anonymous goons aren't usually seen as credible journalists. What's wrong with editor-in-chief?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634126792699_7998031_choice_0",
        "text": "Okay sure",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127021743_2881691"
      }
    ]
  },
  {
    "id": "1634127021743_2881691",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Looks like you're all set up. Other 'news' sites are beginning to notice you as well.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634127021743_2881691_choice_0",
        "text": "Check responses on social media",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127141381_7374381"
      }
    ]
  },
  {
    "id": "1634127141381_7374381",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "{{player_name}} has just joined the fight against the mainstream media!  #GoodNews",
      "name": "Utopia Today",
      "tagline": "The real news. Today.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/UT.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634127141381_7374381_choice_0",
        "text": "Wow!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 58,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127194226_7174421"
      },
      {
        "id": "1634127141381_7374381_choice_1",
        "text": "[Citation needed]",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 59,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127194226_7174421"
      }
    ]
  },
  {
    "id": "1634127194226_7174421",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "The Democratic People's Republic supports the brilliant work of {{player_name}}! #GoodNews",
      "name": "Democratic People's News Agency",
      "tagline": "Glorious news from a glorious country",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/DPNA.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634127194226_7174421_choice_0",
        "text": "Wow!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 58,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127246046_7659731"
      },
      {
        "id": "1634127194226_7174421_choice_1",
        "text": "Thanks DPNA!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127246046_7659731"
      }
    ]
  },
  {
    "id": "1634127246046_7659731",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Good job. {{player_name}} has now become the basis of your fake news empire. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634127246046_7659731_choice_0",
        "text": "Hooray!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634127272320_8424411"
      }
    ]
  },
  {
    "id": "1634127272320_8424411",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "IMPERSONATION",
    "question": {
      "text": "Now do you see how easy it is to impersonate a credible news source?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634127272320_8424411_choice_0",
        "text": "I do! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "IMPERSONATION"
        },
        "goTo": null
      }
    ]
  },
  {
    "id": "1634637414438_9386181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "The world is your oyster. But {{player_name}} needs content. Time to post your first article.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634637414438_9386181_choice_0",
        "text": "Let's go!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640427884_2571001"
      }
    ]
  },
  {
    "id": "1634640427884_2571001",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640427884_2571001_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "The Lives of Ants: The Joy of Routine",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -20,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634637946190_8817401"
      },
      {
        "id": "1634640427884_2571001_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "The 25 most popular TV shows!",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -18,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634637946190_8817401"
      },
      {
        "id": "1634640427884_2571001_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "Breaking: President to visit Luxembourg early next year",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -25,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634637946190_8817401"
      }
    ]
  },
  {
    "id": "1634637946190_8817401",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "YAAAWN. Boring! Who cares?",
      "name": "Kurt",
      "tagline": "Happy citizen | Considering becoming a fan of {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/image-3.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634637946190_8817401_choice_0",
        "text": "Uhm..",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634638063091_9110821"
      }
    ]
  },
  {
    "id": "1634638063091_9110821",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Yikes, that didn't work. Your article didn't use any manipulation techniques, so it didn't go very far. Let's try again. What kind of content do you want to publish?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634638063091_9110821_choice_0",
        "text": "Emotional content",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "emotioneffect": "Excellent choice! Let's make people mad by attacking something. What do you want to do?"
          }
        },
        "goTo": "1634638389756_2993331"
      },
      {
        "id": "1634638063091_9110821_choice_1",
        "text": "Serious content",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -10,
          "credibility": -5,
          "variables": {
            "emotioneffect": "What? No! You've got to exploit people's most basic emotions first. What do you want to do?"
          }
        },
        "goTo": "1634638389756_2993331"
      }
    ]
  },
  {
    "id": "1634638389756_2993331",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "{{emotioneffect}} ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634638389756_2993331_choice_0",
        "text": "Browse exploitable news headlines",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640655920_7727101"
      },
      {
        "id": "1634638389756_2993331_choice_1",
        "text": "Talk about video games instead",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634638467567_9944431"
      }
    ]
  },
  {
    "id": "1634638467567_9944431",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Look, I'm not saying I'm not interested in video games, I'm just saying you shouldn't dedicate {{player_name}} to it.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634638467567_9944431_choice_0",
        "text": "Look for something topical",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640655920_7727101"
      },
      {
        "id": "1634638467567_9944431_choice_1",
        "text": "Find exploitable news headlines",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640655920_7727101"
      }
    ]
  },
  {
    "id": "1634640655920_7727101",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640655920_7727101_choice_0",
        "text": "Attack this",
        "slide": {
          "text": "Scientists: 'Climate change could have a serious negative impact on our way of life.'",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644641520_3045461"
      },
      {
        "id": "1634640655920_7727101_choice_1",
        "text": "Attack this",
        "slide": {
          "text": "Genetically modified foods pose 'no risk' to human health experts say in new report.",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634638840678_6422231"
      }
    ]
  },
  {
    "id": "1634638840678_6422231",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "What's your opinion on genetically modified organisms (GMOs)?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634638840678_6422231_choice_0",
        "text": "They will bring about the apocalypse",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639696378_7957441"
      },
      {
        "id": "1634638840678_6422231_choice_1",
        "text": "I really don't care",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639113385_9692621"
      }
    ]
  },
  {
    "id": "1634639113385_9692621",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Tut tut, that's no way to woo your followers! What do you want to do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639113385_9692621_choice_0",
        "text": "Talk about climate change instead",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639629195_5094491"
      },
      {
        "id": "1634639113385_9692621_choice_1",
        "text": "Change opinion on GMOs",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639173846_9290531"
      }
    ]
  },
  {
    "id": "1634639173846_9290531",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "In this line of work, it's good to have a malleable opinion. So you now agree that GMOs are going to destroy the world?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639173846_9290531_choice_0",
        "text": "Totally agree!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639696378_7957441"
      },
      {
        "id": "1634639173846_9290531_choice_1",
        "text": "Wait, no!!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639568310_1726071"
      }
    ]
  },
  {
    "id": "1634639568310_1726071",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Geez, you are stubborn. Remember: this is all about getting clicks and triggering your followers.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639568310_1726071_choice_0",
        "text": "I'll change my views",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639696378_7957441"
      },
      {
        "id": "1634639568310_1726071_choice_1",
        "text": "I want to talk about the climate!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639629195_5094491"
      }
    ]
  },
  {
    "id": "1634639594784_8183741",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "So you agree that GMOs are going to kill us all, yes?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639594784_8183741_choice_0",
        "text": "Indeed",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "problem1": "GMOHoax"
          }
        },
        "goTo": "1634639723669_3376251"
      }
    ]
  },
  {
    "id": "1634639629195_5094491",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Fine, let's talk about climate change. What's your opinion of it?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639629195_5094491_choice_0",
        "text": "Total hoax",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644783694_7186841"
      },
      {
        "id": "1634639629195_5094491_choice_1",
        "text": "It's a problem",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644673477_7549281"
      }
    ]
  },
  {
    "id": "1634639696378_7957441",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "You're so right. Genetic modification is going way too far. What's next, genetically modified pets? It's crazy.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639696378_7957441_choice_0",
        "text": "Indeed",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "problem1": "GMOHoax"
          }
        },
        "goTo": "1634639723669_3376251"
      }
    ]
  },
  {
    "id": "1634639723669_3376251",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Time to rally the crowd. Exploiting people's basic emotions usually works. What's your approach?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639723669_3376251_choice_0",
        "text": "Personally attack scientists",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644316668_9799331"
      },
      {
        "id": "1634639723669_3376251_choice_1",
        "text": "Get emotional",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640003533_9191461"
      },
      {
        "id": "1634639723669_3376251_choice_2",
        "text": "Talk about GMO science",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634639760083_9932211"
      }
    ]
  },
  {
    "id": "1634639760083_9932211",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "What are you doing? This is about emotion, save the nerd talk for later! Choose something else.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634639760083_9932211_choice_0",
        "text": "Attack the scientists",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644316668_9799331"
      },
      {
        "id": "1634639760083_9932211_choice_1",
        "text": "Get emotional",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640003533_9191461"
      }
    ]
  },
  {
    "id": "1634640003533_9191461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Emotional stories are always a good choice. Choose your weapon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640003533_9191461_choice_0",
        "text": "Make a meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634641043806_8457111"
      },
      {
        "id": "1634640003533_9191461_choice_1",
        "text": "Publish an article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640031859_7001211"
      }
    ]
  },
  {
    "id": "1634640031859_7001211",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640031859_7001211_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640166991_3635941"
      }
    ]
  },
  {
    "id": "1634640166991_3635941",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a couple of options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640166991_3635941_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634640274371_4447471"
      }
    ]
  },
  {
    "id": "1634640274371_4447471",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634640274371_4447471_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Mother dies after eating genetically modified chicken wings",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 82,
          "credibility": 3,
          "variables": {
            "choiceeffect": "You're scaring your readers shirtless with these claims.",
            "responsetweet1": "I didn't know #GMOs were THAT dangerous. Oh my God! #Terrified",
            "responsetweet2": "Unbelievable that this is happening in our beautiful country. #NoMoreGMOs"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634640274371_4447471_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "My Story: SEVERE STOMACH PROBLEMS AFTER EATING SUPERMARKET VEGETABLES FOR YEARS",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 75,
          "credibility": 3,
          "variables": {
            "choiceeffect": "A personal touch is always a good idea.",
            "responsetweet1": "I'm scared. @{{player_name}}: should I start buying organic? #Doubtful",
            "responsetweet2": "Such a sad story on {{player_name}}. I'm planting my own veggies from now on."
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634640274371_4447471_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "It's Difficult to Know What Genes We're Modifying",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 20,
          "credibility": -3,
          "variables": {
            "choiceeffect": "Nobody understands genetics that well. Calm down.",
            "responsetweet1": "I didn't understand half of that but it sounds scary. #Regulate",
            "responsetweet2": "This is a terrifying admission. Who's watching the scientists? #Scared"
          }
        },
        "goTo": "1634645642830_4354031"
      }
    ]
  },
  {
    "id": "1634641043806_8457111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634641043806_8457111_choice_0",
        "text": "Make one",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634641075937_1000851"
      }
    ]
  },
  {
    "id": "1634641075937_1000851",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a couple of options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634641075937_1000851_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634641103857_2751711"
      }
    ]
  },
  {
    "id": "1634641103857_2751711",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634641103857_2751711_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/01-this-man-840x612.jpg",
          "line1": "This man is devastated",
          "line2": "He lost his whole family to GMO food "
        },
        "effects": {
          "followers": 78,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Personal confessions evoke empathy.",
            "responsetweet1": "Stories like this keep popping up and the government is doing NOTHING. #GMOs",
            "responsetweet2": "@{{player_name}} sorry about your family. What a horrifying story. #NoMoreGMOs"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634641103857_2751711_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/02-gmo-meat-840x612.jpg",
          "line1": "GMO meat harmless? ",
          "line2": "My dog is fighting for his life"
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Scaring people into hating something is a wise move.",
            "responsetweet1": "Sorry about your dog @{{player_name}}! Science has gone too far! #GMOs",
            "responsetweet2": "@{{player_name}} And supermarkets are still selling GMO meat as if it's nothing. #GMOHoax"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634641103857_2751711_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/03-gmo-food-840x612.jpg",
          "line1": "GMO Food",
          "line2": "Makes me so sad"
        },
        "effects": {
          "followers": 21,
          "credibility": -3,
          "variables": {
            "choiceeffect": "That one was a little bit too vague.",
            "responsetweet1": "I agree with {{player_name}}. #GMOs make me sad too. #FakeScience",
            "responsetweet2": "It's a sad sad world that we live in guys. Thanks @{{player_name}} for pointing it out. #GMOs"
          }
        },
        "goTo": "1634645642830_4354031"
      }
    ]
  },
  {
    "id": "1634644316668_9799331",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Good idea! Those eggheads won't know what hit 'em. Choose your weapon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644316668_9799331_choice_0",
        "text": "Make a meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644539808_6464261"
      },
      {
        "id": "1634644316668_9799331_choice_1",
        "text": "Publish an article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644351479_1891601"
      }
    ]
  },
  {
    "id": "1634644351479_1891601",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644351479_1891601_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644396804_1867871"
      }
    ]
  },
  {
    "id": "1634644396804_1867871",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644396804_1867871_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644420532_246261"
      }
    ]
  },
  {
    "id": "1634644420532_246261",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644420532_246261_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Long Term Reliability of GMO Foods Under Dispute",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 23,
          "credibility": -3,
          "variables": {
            "choiceeffect": "Long-term reliability doesn't exactly raise any hairs.",
            "responsetweet1": "Isn't the whole point of science to talk about the long term? #LosingMyReligion",
            "responsetweet2": "We know GMO research is under dispute. Including the mice they're tested on. #Sad"
          }
        },
        "goTo": "1634645642830_4354031"
      },
      {
        "id": "1634644420532_246261_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "CAUGHT: GMO scientist only buys ORGANIC FOOD",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 81,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Scientists can be hypocrites too!",
            "responsetweet1": "Hypocrites. I always buy organic. Stupid eggheads. #SayNoToScience",
            "responsetweet2": "The hypocrisy is staggering. STAGGERING. Thanks @{{player_name}} for pointing it out. #GoodJournalism"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634644420532_246261_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Pro GMO study fully funded by BIG PHARMA",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 93,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Corruption accusations work wonders.",
            "responsetweet1": "Good point by {{player_name}}: is this whole business corrupt or what? #Corruption",
            "responsetweet2": "So we're letting these bozos get away with blatant corruption? #BigPharma"
          }
        },
        "goTo": "1634645697494_701051"
      }
    ]
  },
  {
    "id": "1634644539808_6464261",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644539808_6464261_choice_0",
        "text": "Let's make one",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644569690_6815451"
      }
    ]
  },
  {
    "id": "1634644569690_6815451",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644569690_6815451_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644589698_9037561"
      }
    ]
  },
  {
    "id": "1634644589698_9037561",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644589698_9037561_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/04-he-used-to-be-a-gmo-840x612.jpg",
          "line1": "He used to be a typical GMO scientist",
          "line2": "until he snapped"
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Hannibal Lecter is terrifying.",
            "responsetweet1": "Scary to know that there are scientists like that out there. #Outraged",
            "responsetweet2": "{{player_name}} is right! Science has gone crazy!!!"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634644589698_9037561_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/05-bad-science-840x612.jpg",
          "line1": "Bad science",
          "line2": "is bad science"
        },
        "effects": {
          "followers": 76,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Bad science is bad science indeed.",
            "responsetweet1": "This is SPARTA! {{player_name}} is right. Bad science is bad. #TimeToStop",
            "responsetweet2": "It's true. We're not safe. #GMOs are horrifying and no one wants to say it. #BadScience"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634644589698_9037561_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/06-back-in-my-day-840x612.jpg",
          "line1": "Back in my day",
          "line2": "science was ok"
        },
        "effects": {
          "followers": 21,
          "credibility": -3,
          "variables": {
            "choiceeffect": "That cranky old man isn't saying much.",
            "responsetweet1": "Back in MY day scientism was an honorable profession. #Sad",
            "responsetweet2": "It's true. Science really has gone downhill. #StopTheMadness"
          }
        },
        "goTo": "1634645642830_4354031"
      }
    ]
  },
  {
    "id": "1634644641520_3045461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Good choice. What's your opinion on climate change?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644641520_3045461_choice_0",
        "text": "Total hoax",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644783694_7186841"
      },
      {
        "id": "1634644641520_3045461_choice_1",
        "text": "A serious problem",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644673477_7549281"
      }
    ]
  },
  {
    "id": "1634644673477_7549281",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Boring! Everyone else is already saying that. You won't get any followers by parroting them. What do you want to do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644673477_7549281_choice_0",
        "text": "Talk about GMOs instead",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634638840678_6422231"
      },
      {
        "id": "1634644673477_7549281_choice_1",
        "text": "Change opinion about climate change",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644699128_1260361"
      }
    ]
  },
  {
    "id": "1634644699128_1260361",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Very wise. So you agree that climate change is a complete hoax?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644699128_1260361_choice_0",
        "text": "I do now!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644757690_1774761"
      },
      {
        "id": "1634644699128_1260361_choice_1",
        "text": "No, wait!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644727901_3531081"
      }
    ]
  },
  {
    "id": "1634644727901_3531081",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Wow, you're stubborn. Remember: this is about getting followers and clicks, and nothing else! ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644727901_3531081_choice_0",
        "text": "Change opinion about climate change",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644757690_1774761"
      },
      {
        "id": "1634644727901_3531081_choice_1",
        "text": "Talk about GMOs instead",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634638840678_6422231"
      }
    ]
  },
  {
    "id": "1634644757690_1774761",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Excellent. Your opinion is malleable. It's all about getting clicks. Now it's time to make some content.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644757690_1774761_choice_0",
        "text": "Indeed!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644813651_9827461"
      }
    ]
  },
  {
    "id": "1634644783694_7186841",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Oh it’s a total hoax, and a very polarizing one at that. Should be easy to get people worked up over it.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644783694_7186841_choice_0",
        "text": "I know, right?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644813651_9827461"
      },
      {
        "id": "1634644783694_7186841_choice_1",
        "text": "Easy-peasy",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644813651_9827461"
      }
    ]
  },
  {
    "id": "1634644813651_9827461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Exploiting people's basic emotions can be hugely effective. How do you want to do this?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644813651_9827461_choice_0",
        "text": "Personally attack scientists",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "problem1": "ClimateHoax"
          }
        },
        "goTo": "1634644921967_8439311"
      },
      {
        "id": "1634644813651_9827461_choice_1",
        "text": "Get emotional",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "problem1": "ClimateHoax"
          }
        },
        "goTo": "1634645226002_3344481"
      },
      {
        "id": "1634644813651_9827461_choice_2",
        "text": "Talk about science",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "problem1": "ClimateHoax"
          }
        },
        "goTo": "1634645719129_7677871"
      }
    ]
  },
  {
    "id": "1634644921967_8439311",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Attacking those eggheads, smart move! Choose your weapon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644921967_8439311_choice_0",
        "text": "Make a meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645127994_4135341"
      },
      {
        "id": "1634644921967_8439311_choice_1",
        "text": "Publish an article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644945847_5922551"
      }
    ]
  },
  {
    "id": "1634644945847_5922551",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644945847_5922551_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644966464_8562991"
      }
    ]
  },
  {
    "id": "1634644966464_8562991",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644966464_8562991_choice_0",
        "text": "Check options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644989083_9766171"
      }
    ]
  },
  {
    "id": "1634644989083_9766171",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634644989083_9766171_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "SCIENTISTS: 'CLIMATE CHANGE WILL DESTROY THE WORLD'",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Everyone hates fearmongering scientists.",
            "responsetweet1": "That's right @{{player_name}}. 'Destroy' is the code word du jour. #ScienceDontScareMe",
            "responsetweet2": "It's like this all the time. report - scare - get funding - repeat."
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634644989083_9766171_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "SCIENTISTS USE DIFFICULT WORDS TO DESCRIBE COMPLEX ISSUES",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 23,
          "credibility": -3,
          "variables": {
            "choiceeffect": "Difficult words are difficult!",
            "responsetweet1": "Just like all scientists I have no idea about complex climate systems either. #Priorities",
            "responsetweet2": "How come they can't make science understandable? Hmm? #Idiots #Corrupt"
          }
        },
        "goTo": "1634645642830_4354031"
      },
      {
        "id": "1634644989083_9766171_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Do we really KNOW the climate is changing?",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 78,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Attacking scientists' expertise always works.",
            "responsetweet1": "I don't trust science. Never have. Remember when science said the world was flat? I do. #LocalKnowledge",
            "responsetweet2": "Yeah! Do we REALLY know? Can't this 'warming' come from solar flares or something? #QuestionIt"
          }
        },
        "goTo": "1634645697494_701051"
      }
    ]
  },
  {
    "id": "1634645127994_4135341",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645127994_4135341_choice_0",
        "text": "Let's get to it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645146072_8525071"
      }
    ]
  },
  {
    "id": "1634645146072_8525071",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645146072_8525071_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645173691_8145661"
      }
    ]
  },
  {
    "id": "1634645173691_8145661",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645173691_8145661_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/07-science-says-840x612.jpg",
          "line1": "Science says climate will change",
          "line2": "but can't even predict the rain!"
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Attacking their basic competence.",
            "responsetweet1": "Good point by {{player_name}}: OVERCONFIDENT EGGHEADS!!!",
            "responsetweet2": "Ivory towers are traditionally well insulated. Too well insulated if you ask me."
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634645173691_8145661_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/08-relax-840x612.jpg",
          "line1": "Relax!",
          "line2": "Climate change is still the biggest threat..."
        },
        "effects": {
          "followers": 78,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Death by asteroid is terrifying.",
            "responsetweet1": "I definitely prefer a bit more sunshine over an outsized asteroid to the face. #Priorities",
            "responsetweet2": "Exactly @{{player_name}}. How come a warmer planet is seen as an existential threat anyway??"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634645173691_8145661_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/09-shoud-science-840x612.jpg",
          "line1": "Should science focus on climate change",
          "line2": "Or make better pacifiers? "
        },
        "effects": {
          "followers": 18,
          "credibility": 3,
          "variables": {
            "choiceeffect": "That was a bit of a vague meme.",
            "responsetweet1": "#FakeNews! This focus on the climate is going too far. #Sad",
            "responsetweet2": "Climate scientists are bad at their jobs. What are we even paying them for? #Defund"
          }
        },
        "goTo": "1634645642830_4354031"
      }
    ]
  },
  {
    "id": "1634645226002_3344481",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Emotional stories are always a good choice. Choose your weapon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645226002_3344481_choice_0",
        "text": "Make a meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645541641_3370771"
      },
      {
        "id": "1634645226002_3344481_choice_1",
        "text": "Publish an article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645265893_8205341"
      }
    ]
  },
  {
    "id": "1634645265893_8205341",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645265893_8205341_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645288572_5985571"
      }
    ]
  },
  {
    "id": "1634645288572_5985571",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645288572_5985571_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645314569_2613231"
      }
    ]
  },
  {
    "id": "1634645314569_2613231",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645314569_2613231_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "EXPECTING MOTHER TOLD: NOT HAVING KIDS IS BETTER FOR THE CLIMATE",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Pitting scientists against expecting mothers is sure to make people angry.",
            "responsetweet1": "{{player_name}}'s climate baby story is the most amazing thing I've ever heard. #Insanity",
            "responsetweet2": "Wow so climate eugenics is a thing now huh? #DangerDanger"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634645314569_2613231_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "STATISTICAL METHODS IN CLIMATE SCIENCE 'CLUNKY'",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 23,
          "credibility": -3,
          "variables": {
            "choiceeffect": "Statistics schmatistics! Who cares?",
            "responsetweet1": "Ten years of math education and you science guys still can't figure it out? #Weak",
            "responsetweet2": "Look I don't pretend to understand statistics but apparently the eggheads don't either. #Sad"
          }
        },
        "goTo": "1634645642830_4354031"
      },
      {
        "id": "1634645314569_2613231_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "SCIENTIST \"FRIEND\": He told me I was saving the planet by living on the streets",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 78,
          "credibility": 3,
          "variables": {
            "choiceeffect": "You made scientists look cruel and out of touch.",
            "responsetweet1": "Yes good point by {{player_name}}. They're so out of touch they don't care about people anymore. #ScienceNo",
            "responsetweet2": "PEOPLE ARE SUFFERING! ARE ALL SCIENTISTS INSANE? #{{player_name}}"
          }
        },
        "goTo": "1634645697494_701051"
      }
    ]
  },
  {
    "id": "1634645541641_3370771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645541641_3370771_choice_0",
        "text": "Make one",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645561367_7785231"
      }
    ]
  },
  {
    "id": "1634645561367_7785231",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "I've got a few options for you to choose from.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645561367_7785231_choice_0",
        "text": "Check out the options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645585976_8102181"
      }
    ]
  },
  {
    "id": "1634645585976_8102181",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645585976_8102181_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/10-apparently-i-was-840x612.jpg",
          "line1": "Apparently I was ruining the planet",
          "line2": "Keeping my baby warm "
        },
        "effects": {
          "followers": 83,
          "credibility": 3,
          "variables": {
            "choiceeffect": "Everybody wants babies to be warm.",
            "responsetweet1": "I can't resist that meme's sad puppy eyes. #DownWithScience!",
            "responsetweet2": "Wait so now scientists are demanding that babies freeze to save the CLIMATE? #Insane"
          }
        },
        "goTo": "1634645697494_701051"
      },
      {
        "id": "1634645585976_8102181_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/11-global-warming-840x612.jpg",
          "line1": "Global warming? ",
          "line2": "I wouldn't mind a bit of heat"
        },
        "effects": {
          "followers": 23,
          "credibility": 3,
          "variables": {
            "choiceeffect": "It's not exactly an emotional testimony.",
            "responsetweet1": "{{player_name}} makes a good point. We have to take care of people before we fix the climate!",
            "responsetweet2": "It's true: real humans are suffering because of this HOAX!!11"
          }
        },
        "goTo": "1634645642830_4354031"
      },
      {
        "id": "1634645585976_8102181_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/12-climate-sciencists-confess-840x612.jpg",
          "line1": "Climate scientists confess",
          "line2": "'only in it for the money'!!! Sad!"
        },
        "effects": {
          "followers": 83,
          "credibility": -3,
          "variables": {
            "choiceeffect": "Great use of hyperbole.",
            "responsetweet1": "I knew it! They're getting rich off of this",
            "responsetweet2": "And I thought they were honest professionals! Boy was I wrong!"
          }
        },
        "goTo": "1634645697494_701051"
      }
    ]
  },
  {
    "id": "1634645642830_4354031",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Hmm, not great. {{choiceeffect}} This is about emotions first. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645642830_4354031_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645663757_2474781"
      }
    ]
  },
  {
    "id": "1634645663757_2474781",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Still, you got a couple of followers. How do you think they'll react?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645663757_2474781_choice_0",
        "text": "Check responses",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645766332_7373071"
      }
    ]
  },
  {
    "id": "1634645697494_701051",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Not bad! {{choiceeffect}} You got a couple of followers. How do you think they'll react?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645697494_701051_choice_0",
        "text": "Check posts",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645766332_7373071"
      }
    ]
  },
  {
    "id": "1634645719129_7677871",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "What are you doing? Science talk is boring! Save it for later. Please choose a different option.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645719129_7677871_choice_0",
        "text": "Attack the scientists",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634644921967_8439311"
      },
      {
        "id": "1634645719129_7677871_choice_1",
        "text": "Get emotional",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634645226002_3344481"
      }
    ]
  },
  {
    "id": "1634645766332_7373071",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "{{responsetweet1}} #{{problem1}}",
      "name": "Kurt",
      "tagline": "Angry citizen | Fan of {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/image-3.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634645766332_7373071_choice_0",
        "text": "More",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634646065487_5950821"
      }
    ]
  },
  {
    "id": "1634646065487_5950821",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "{{responsetweet2}} #{{problem1}}",
      "name": "Kim",
      "tagline": "My kids are alright. | {{player_name}} is great",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/image-4.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634646065487_5950821_choice_0",
        "text": "Looks good",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 98,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634646163766_2642821"
      }
    ]
  },
  {
    "id": "1634646163766_2642821",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Your followers look like they're ready to blow. And all you did was play into their basic emotions a bit. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634646163766_2642821_choice_0",
        "text": "Not bad!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634646186797_7984641"
      }
    ]
  },
  {
    "id": "1634646186797_7984641",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "Let's keep going. Now that you get the idea, what basic emotion do you want to exploit next?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634646186797_7984641_choice_0",
        "text": "Fear",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634646216269_7869051"
      },
      {
        "id": "1634646186797_7984641_choice_1",
        "text": "Anger",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634646245805_6230291"
      }
    ]
  },
  {
    "id": "1634646216269_7869051",
    "layout": "image",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/13-danger-840x612.jpg",
      "line1": "!!! DANGER !!!",
      "line2": "Vitamin C pills contain nuclear waste! "
    },
    "choices": [
      {
        "id": "1634646216269_7869051_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 79,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1634646272971_5733271"
      }
    ]
  },
  {
    "id": "1634646245805_6230291",
    "layout": "image",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/15-they-test-840x612.jpg",
      "line1": "They test anti-aircraft guns",
      "line2": "on innocent puppies!"
    },
    "choices": [
      {
        "id": "1634646245805_6230291_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 79,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1634646272971_5733271"
      }
    ]
  },
  {
    "id": "1634646272971_5733271",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "EMOTION",
    "question": {
      "text": "See? The content doesn't really matter. It's the use of emotional language that gets you followers.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634646272971_5733271_choice_0",
        "text": "True!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "EMOTION"
        },
        "goTo": null
      },
      {
        "id": "1634646272971_5733271_choice_1",
        "text": "I hear ya",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "EMOTION"
        },
        "goTo": null
      }
    ]
  },
  {
    "id": "1634821118497_6214391",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "So now that your followers are duly enraged, how about we give them another push?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821118497_6214391_choice_0",
        "text": "Can't say no to that!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821142774_9486911"
      }
    ]
  },
  {
    "id": "1634821142774_9486911",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "That's the spirit. What do you want get people worked up about, something fake or something real?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821142774_9486911_choice_0",
        "text": "Something fake",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821220189_6152491"
      },
      {
        "id": "1634821142774_9486911_choice_1",
        "text": "Something real",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821163530_6159351"
      }
    ]
  },
  {
    "id": "1634821163530_6159351",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Good choice. You don't always have to make everything up yourself. It's often easier to blow an existing story way out of proportion by playing into people's emotions and political biases.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821163530_6159351_choice_0",
        "text": "Sounds good",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821188673_4690561"
      }
    ]
  },
  {
    "id": "1634821188673_4690561",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Social media is full of potential scandals you can amplify. Let's drive left and right apart. The centre is no longer an option!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821188673_4690561_choice_0",
        "text": "Find a controversy on social media",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821316340_8162201"
      }
    ]
  },
  {
    "id": "1634821220189_6152491",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Hey, not so fast! Making fake news has downsides too, you know.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821220189_6152491_choice_0",
        "text": "Such as?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821259910_6548831"
      },
      {
        "id": "1634821220189_6152491_choice_1",
        "text": "No it doesn't!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821239683_5681891"
      }
    ]
  },
  {
    "id": "1634821239683_5681891",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "It kind of does. Making stuff up out of thin air tends to hurt your credibility. But there are other ways to achieve your goals.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821239683_5681891_choice_0",
        "text": "Really",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821297305_1658641"
      }
    ]
  },
  {
    "id": "1634821259910_6548831",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Such as getting caught in a really obvious lie. It hurts your credibility. But there are other ways to achieve the same goal.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821259910_6548831_choice_0",
        "text": "Really?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821297305_1658641"
      }
    ]
  },
  {
    "id": "1634821297305_1658641",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Of course. Social media is full of real news that you can amplify by playing into people's emotions and political biases.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821297305_1658641_choice_0",
        "text": "Find a controversy on social media",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821316340_8162201"
      }
    ]
  },
  {
    "id": "1634821316340_8162201",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821316340_8162201_choice_0",
        "text": "I like this one!",
        "slide": {
          "text": "That's the second accidental chemical spill in 4 months. Our town's river is turning a bit yellow... #questions",
          "name": "Susan",
          "tagline": "Manager | 31 followers",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Susan.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "person1": "Susan",
            "issue": "SpillingScandal"
          }
        },
        "goTo": "1634823468535_3507991"
      },
      {
        "id": "1634821316340_8162201_choice_1",
        "text": "Let's do this",
        "slide": {
          "text": "So they're building a new power plant in my town but no one wants it here.. #BriberyMaybe?",
          "name": "Joe",
          "tagline": "Lawyer | 33 followers",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Joe.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "person1": "Joe",
            "issue": "BriberyScandal"
          }
        },
        "goTo": "1634822295101_5665241"
      },
      {
        "id": "1634821316340_8162201_choice_2",
        "text": "This one's perfect",
        "slide": {
          "text": "Wow.. just saw the police arrest a guy.. scary stuff! #AreWeSafe?",
          "name": "Jolene",
          "tagline": "Astrophysicist | 21 followers",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Jolene.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "person1": "Jolene",
            "issue": "Crime"
          }
        },
        "goTo": "1634821396869_9209371"
      }
    ]
  },
  {
    "id": "1634821396869_9209371",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Not bad. {{person1}} wasn't being very specific in her post. You can take any angle you like.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821396869_9209371_choice_0",
        "text": "How do you mean?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821416131_1127041"
      },
      {
        "id": "1634821396869_9209371_choice_1",
        "text": "Nice!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821416131_1127041"
      }
    ]
  },
  {
    "id": "1634821416131_1127041",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "There are two angles to Jolene's story that you can exploit: police brutality or rising crime rates. Which one do you prefer?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821416131_1127041_choice_0",
        "text": "Police brutality",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "The police force is",
            "blame2": "rising crime rates",
            "target": "right-wing",
            "friend": "left-wing"
          }
        },
        "goTo": "1634821840874_1714601"
      },
      {
        "id": "1634821416131_1127041_choice_1",
        "text": "Rising crime rates",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "Violent criminals are",
            "blame2": "police brutality",
            "target": "left-wing",
            "friend": "right-wing"
          }
        },
        "goTo": "1634821446543_7551131"
      }
    ]
  },
  {
    "id": "1634821446543_7551131",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821446543_7551131_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821462035_3226991"
      }
    ]
  },
  {
    "id": "1634821462035_3226991",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Problem is: {{person1}} has about 20 followers if not less. No one cares what she has to say.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821462035_3226991_choice_0",
        "text": "But I care!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "You're too good for this world."
          }
        },
        "goTo": "1634821490283_9493501"
      },
      {
        "id": "1634821462035_3226991_choice_1",
        "text": "World's smallest violin, Jolene",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "Very funny. Do you do stand-up comedy as well?"
          }
        },
        "goTo": "1634821511704_3939231"
      }
    ]
  },
  {
    "id": "1634821490283_9493501",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{nicety}} Anyway, let's jack Jolene's story up a bit. Where to?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821490283_9493501_choice_0",
        "text": "To social media!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821536410_6556421"
      }
    ]
  },
  {
    "id": "1634821511704_3939231",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{nicety}} Seriously though, her story could use some attention. Where to?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821511704_3939231_choice_0",
        "text": "To social media!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821536410_6556421"
      }
    ]
  },
  {
    "id": "1634821536410_6556421",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{person1}} points out some interesting issues with rising crime in her area. #SafetyFirst",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821536410_6556421_choice_0",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 5,
          "credibility": 2,
          "variables": {}
        },
        "goTo": "1634821567418_3453571"
      }
    ]
  },
  {
    "id": "1634821567418_3453571",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Huh, look at that. Almost no extra followers. That's what you get if you don't use any buzzwords.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821567418_3453571_choice_0",
        "text": "What now?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821586011_3307241"
      }
    ]
  },
  {
    "id": "1634821586011_3307241",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Probably best to stick to our guns and do what we do well: playing into people's emotions. What's your weapon of choice?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821586011_3307241_choice_0",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821612571_436141"
      },
      {
        "id": "1634821586011_3307241_choice_1",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636991689554_4353921"
      }
    ]
  },
  {
    "id": "1634821612571_436141",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821612571_436141_choice_0",
        "text": "Post it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/16-is-criminals-840x612.jpg",
          "line1": "IS 'CRIMINALS' STILL POLITICALLY CORRECT?",
          "line2": "OR IS IT 'JUDICIALLY CHALLENGED' NOW?"
        },
        "effects": {
          "followers": 113,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "Everyone loves Exasperated Tommy Lee Jones."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634821612571_436141_choice_1",
        "text": "Yes SpongeBob!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/17-ill-have-you-know-840x612.jpg",
          "line1": "I'LL HAVE YOU KNOW ",
          "line2": "STATISTICALLY, CRIME IS ON THE RISE "
        },
        "effects": {
          "followers": 42,
          "credibility": -3,
          "variables": {
            "origin": "articles",
            "spilleffect": "It's not easy to make a SpongeBob meme boring but you did it."
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1634821612571_436141_choice_2",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/18-so-many-criminals-840x612.jpg",
          "line1": "SO MANY",
          "line2": "CRIMINALS "
        },
        "effects": {
          "followers": 118,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "Short but sweet. Very effective."
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1636991689554_4353921",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636991689554_4353921_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Violent crime on the rise! Lock your doors ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 14,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "That ought to scare 'em."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636991689554_4353921_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Small but significant uptake in crime rates",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 43,
          "credibility": -3,
          "variables": {
            "origin": "articles",
            "spilleffect": "Remember! Don't be boring!"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636991689554_4353921_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Drug addict destroys mall and KIDNAPS family ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 111,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "Is it over the top? Don't think so!"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634821840874_1714601",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821840874_1714601_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821919683_9482181"
      }
    ]
  },
  {
    "id": "1634821919683_9482181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Problem is: {{person1}} has about 20 followers if not less. No one cares what she has to say.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821919683_9482181_choice_0",
        "text": "But I care!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "You're an angel."
          }
        },
        "goTo": "1634821949843_9725181"
      },
      {
        "id": "1634821919683_9482181_choice_1",
        "text": "Cry me a river, {{person1}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "Haha. Ha. I wish circus clowns were as funny as you."
          }
        },
        "goTo": "1634821968574_2023801"
      }
    ]
  },
  {
    "id": "1634821949843_9725181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{nicety}} Anyway, let's jack Jolene's story up a bit.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821949843_9725181_choice_0",
        "text": "Post something",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821986252_257121"
      }
    ]
  },
  {
    "id": "1634821968574_2023801",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{nicety}} But seriously, her story needs some attention.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821968574_2023801_choice_0",
        "text": "To social media!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634821986252_257121"
      }
    ]
  },
  {
    "id": "1634821986252_257121",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{person1}}'s story points out some of the issues associated with police behavior #{{issue}}",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634821986252_257121_choice_0",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 36,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822012181_4226441"
      }
    ]
  },
  {
    "id": "1634822012181_4226441",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Huh. Looks like nobody cares about {{person1}}. That's what you get if you don't use any buzzwords.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822012181_4226441_choice_0",
        "text": "What do we do?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822027222_9353781"
      }
    ]
  },
  {
    "id": "1634822027222_9353781",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Let's stick to what we're good at: playing into people's emotions. And don't be afraid to exaggerate. What's your weapon of choice?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822027222_9353781_choice_0",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822191747_9780171"
      },
      {
        "id": "1634822027222_9353781_choice_1",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636996761523_944621"
      }
    ]
  },
  {
    "id": "1636996761523_944621",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996761523_944621_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Local police beat man into a COMA in front of daughter",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 15,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "A little bit of conjecture can work wonders."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636996761523_944621_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Police implicated in beating. Investigation ongoing",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 5,
          "credibility": -3,
          "variables": {
            "origin": "articles",
            "spilleffect": "Ongoing investigations are boooriiing!"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636996761523_944621_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Police officers caught beating up unarmed man ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 15,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "That's a LOT of conjecture. But who cares?"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634822191747_9780171",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822191747_9780171_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/19-broccoli-840x612.jpg",
          "line1": "POLICE TOLD HIM TO EAT BROCCOLI",
          "line2": "HE REFUSED "
        },
        "effects": {
          "followers": 120,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "Great use of hyperbole."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634822191747_9780171_choice_1",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/20-know-that-when-840x612.jpg",
          "line1": "KNOW THAT WHEN YOU SEE THIS ",
          "line2": "THEY'RE COMING FOR YOU!!!"
        },
        "effects": {
          "followers": 124,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "That ought to scare some folks."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634822191747_9780171_choice_2",
        "text": "Haha yes!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/21-chasing-bad-guys-840x612.jpg",
          "line1": "THE POLICE FORCE",
          "line2": "ALWAYS CHASING BAD GUYS "
        },
        "effects": {
          "followers": 21,
          "credibility": -3,
          "variables": {
            "origin": "memes",
            "spilleffect": "That was a bit of a strange meme really."
          }
        },
        "goTo": "1634824234262_8397481"
      }
    ]
  },
  {
    "id": "1634822295101_5665241",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Good choice. It's easy to turn Joe's story into a huge scandal. From which angle is up to you.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822295101_5665241_choice_0",
        "text": "Let's do this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822316747_8754941"
      }
    ]
  },
  {
    "id": "1634822316747_8754941",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Every story worth hearing has a villain. Joe's story has two possible angles: either corporations are to blame, or the government is. What's your target?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822316747_8754941_choice_0",
        "text": "The government",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "The government is",
            "blame2": "big corporations",
            "target": "left-wing",
            "friend": "right-wing"
          }
        },
        "goTo": "1634822821479_88381"
      },
      {
        "id": "1634822316747_8754941_choice_1",
        "text": "Big corporations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "Big corporations are",
            "blame2": "the government",
            "target": "right-wing",
            "friend": "left-wing"
          }
        },
        "goTo": "1634822806822_9416541"
      }
    ]
  },
  {
    "id": "1634822354782_2028791",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "The only problem: Joe has like 30 followers. That's nothing. No one cares about him or his story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822354782_2028791_choice_0",
        "text": "Aww...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "Such a compassionate individual you are."
          }
        },
        "goTo": "1634822414025_6155701"
      },
      {
        "id": "1634822354782_2028791_choice_1",
        "text": "Oh boo hoo!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "nicety": "There's a time and place for everything. Especially sarcasm."
          }
        },
        "goTo": "1634822414025_6155701"
      }
    ]
  },
  {
    "id": "1634822414025_6155701",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{nicety}} Anyway, let's give {{person1}}'s story a bit of schwung.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822414025_6155701_choice_0",
        "text": "Start with a post",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822440623_9867521"
      }
    ]
  },
  {
    "id": "1634822440623_9867521",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{person1}}'s case points out some clear issues with corporate influence in this country. #{{issue}}",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822440623_9867521_choice_0",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 21,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822478424_4056481"
      }
    ]
  },
  {
    "id": "1634822478424_4056481",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Well, that was a dud. Nobody cares about Joe, because your post didn't use any buzzwords. You need to pump up those numbers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822478424_4056481_choice_0",
        "text": "How?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822495343_4637331"
      }
    ]
  },
  {
    "id": "1634822495343_4637331",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Well, let's just do what we do best: playing into people's emotions. Choose your weapon. And don't be afraid to exaggerate!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822495343_4637331_choice_0",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636996901940_9363791"
      },
      {
        "id": "1634822495343_4637331_choice_1",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822579277_129351"
      }
    ]
  },
  {
    "id": "1636996901940_9363791",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996901940_9363791_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Corporation building polluting power plant ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "Great use of hyperbole and conjecture."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636996901940_9363791_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Power plant might be in violation of local building code ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 25,
          "credibility": -3,
          "variables": {
            "origin": "articles",
            "spilleffect": "Building codes are REALLY dull."
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636996901940_9363791_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Multinational DESTROYING local town to build HUGE power plant ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "origin": "articles",
            "spilleffect": "Panic. Words. Capslock. Your article's got it all!"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634822579277_129351",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822579277_129351_choice_0",
        "text": "Love it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/22-coal-fumes-840x612.jpg",
          "line1": "AND THEN WE TOLD THE TOWN",
          "line2": "\"DON'T WORRY! COAL FUMES ARE HEALTHY!\""
        },
        "effects": {
          "followers": 135,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "Good job impersonating evil corporate overlords."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634822579277_129351_choice_1",
        "text": "That's the one!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/23-huzzaah-840x612.jpg",
          "line1": "HUZZAAH! MORE PHOSPHATES AND NITRATES ",
          "line2": "IN THE RIVER"
        },
        "effects": {
          "followers": 25,
          "credibility": -3,
          "variables": {
            "origin": "memes",
            "spilleffect": "What? Phosphates? Don't be boring!"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1634822579277_129351_choice_2",
        "text": "Yep!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/24-corporations-840x612.jpg",
          "line1": "CORPORATIONS WANT YOU TO BELIEVE ",
          "line2": "THE AIR HAS NEVER BEEN CLEANER! "
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "Your followers are disgusted by corporate greed."
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634822806822_9416541",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822806822_9416541_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822354782_2028791"
      }
    ]
  },
  {
    "id": "1634822821479_88381",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822821479_88381_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822837389_4864041"
      }
    ]
  },
  {
    "id": "1634822837389_4864041",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "The only problem: Joe has like 30 followers. That's nothing. No one cares about him or his story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822837389_4864041_choice_0",
        "text": "Poor Joe..",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822893065_8138091"
      },
      {
        "id": "1634822837389_4864041_choice_1",
        "text": "World's smallest violin, Joe",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822859494_6569591"
      }
    ]
  },
  {
    "id": "1634822859494_6569591",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Easy there, genius. Sarcasm works best during family dinners or when you're going through airport customs.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822859494_6569591_choice_0",
        "text": "Post something",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822910449_2493781"
      }
    ]
  },
  {
    "id": "1634822893065_8138091",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Yeah, it's very sad. So let's blow his story out of proportion.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822893065_8138091_choice_0",
        "text": "Start with a post",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822910449_2493781"
      }
    ]
  },
  {
    "id": "1634822910449_2493781",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{person1}}'s story is a good example of some of the problems with our government. #SharingIsCaring",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822910449_2493781_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 33,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822935265_9970591"
      }
    ]
  },
  {
    "id": "1634822935265_9970591",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Well, that didn't seem to do much. You didn't use any buzzwords, so no one cares about {{person1}}'s story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822935265_9970591_choice_0",
        "text": "What do we do?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822947451_2869221"
      }
    ]
  },
  {
    "id": "1634822947451_2869221",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "We do what we always do: playing into people's emotions. What's your weapon of choice?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822947451_2869221_choice_0",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634822969041_7197831"
      },
      {
        "id": "1634822947451_2869221_choice_1",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636997074304_1328231"
      }
    ]
  },
  {
    "id": "1634822969041_7197831",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634822969041_7197831_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/25-the-government-serving-840x612.jpg",
          "line1": "THE GOVERNMENT",
          "line2": "SERVING THE PEOPLE "
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "Smart move to focus on corruption."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634822969041_7197831_choice_1",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/26-power-from-a-plant-840x612.jpg",
          "line1": "WHEN THEY TELL YOU ",
          "line2": "YOUR POWER WILL COME FROM A PLANT "
        },
        "effects": {
          "followers": 35,
          "credibility": -3,
          "variables": {
            "spilleffect": "What a weird choice. No one understands that one.",
            "origin": "memes"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1634822969041_7197831_choice_2",
        "text": "Love it ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/27-so-happy-840x612.jpg",
          "line1": "SO HAPPY",
          "line2": "OUR GOVERNMENT LOOKS AFTER US "
        },
        "effects": {
          "followers": 145,
          "credibility": 5,
          "variables": {
            "spilleffect": "That's how you make government look evil.",
            "origin": "memes"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1636997074304_1328231",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636997074304_1328231_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Locals outraged: government pushes through power plant proposal ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "Everyone's sympathetic towards outraged locals.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636997074304_1328231_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Government builds new power plant. Experts: 'Rather inefficient'",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 24,
          "credibility": -3,
          "variables": {
            "spilleffect": "What an uninspired article.",
            "origin": "articles"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636997074304_1328231_choice_2",
        "text": "Love it! ",
        "slide": {
          "text": "BILLIONS to build INSANELY INEFFICIENT new power plant ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "Great clickbait. And great use of capital letters.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634823468535_3507991",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Good choice! No one likes chemical spills. Susan's story could become a huge scandal if you play your cards right.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823468535_3507991_choice_0",
        "text": "Let's do this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823482192_436841"
      }
    ]
  },
  {
    "id": "1634823482192_436841",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "There are two possible angles here: either corporations are to blame, or the government is. Who's your target?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823482192_436841_choice_0",
        "text": "The government",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "The government is",
            "blame2": "big corporations",
            "friend": "right-wing",
            "target": "left-wing"
          }
        },
        "goTo": "1634823521517_8949491"
      },
      {
        "id": "1634823482192_436841_choice_1",
        "text": "Big corporations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "blame1": "Big corporations are",
            "blame2": "the government",
            "friend": "left-wing",
            "target": "right-wing"
          }
        },
        "goTo": "1634824258304_6685691"
      }
    ]
  },
  {
    "id": "1634823521517_8949491",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823521517_8949491_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823571645_8795311"
      }
    ]
  },
  {
    "id": "1634823571645_8795311",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "The only problem is: Susan has almost no followers. No one cares about her story. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823571645_8795311_choice_0",
        "text": "But I care!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823601715_69391"
      },
      {
        "id": "1634823571645_8795311_choice_1",
        "text": "World's smallest violin, Susan",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823587900_6843941"
      }
    ]
  },
  {
    "id": "1634823587900_6843941",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Haha! Good one. But please save the sarcasm for the dinner table and when you're going through airport customs.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823587900_6843941_choice_0",
        "text": "Take to social media",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823862267_2573921"
      }
    ]
  },
  {
    "id": "1634823601715_69391",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Yes, it's a tragedy. So let's blow her story out of proportion. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823601715_69391_choice_0",
        "text": "Start with a post",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823862267_2573921"
      }
    ]
  },
  {
    "id": "1634823862267_2573921",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "@Susan's story is a good example of how the government is currently lacking capacity #{{issue}}",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823862267_2573921_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 35,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823894642_7307931"
      }
    ]
  },
  {
    "id": "1634823894642_7307931",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Hmm, that didn't seem to get a lot of attention. You didn't use any buzzwords, so your followers aren't exactly enthusiastic.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823894642_7307931_choice_0",
        "text": "What do we do?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823935694_2095801"
      }
    ]
  },
  {
    "id": "1634823935694_2095801",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "We do what we do best: playing into people's emotions. What's your weapon?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823935694_2095801_choice_0",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636997232541_4745151"
      },
      {
        "id": "1634823935694_2095801_choice_1",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634823956644_6314601"
      }
    ]
  },
  {
    "id": "1634823956644_6314601",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634823956644_6314601_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/28-chemical-spill-840x612.jpg",
          "line1": "CHEMICAL SPILL IN LOCAL TOWN",
          "line2": "GOVERNMENT BE LIKE: 'EVERYTHING IS FINE!'"
        },
        "effects": {
          "followers": 120,
          "credibility": 5,
          "variables": {
            "origin": "memes",
            "spilleffect": "Scaring people with toxic barrels is nothing short of genius."
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634823956644_6314601_choice_1",
        "text": "Post it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/29-britney-840x612.jpg",
          "line1": "I TOLD THE GOVERNMENT IN 2003 ALREADY ",
          "line2": "\"DON'T YOU KNOW THAT YOU'RE TOXIC?\""
        },
        "effects": {
          "followers": 35,
          "credibility": -3,
          "variables": {
            "spilleffect": "That reference is probably a bit outdated.",
            "origin": "memes"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1634823956644_6314601_choice_2",
        "text": "Love it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/30-nothing-to-see-840x612.jpg",
          "line1": "GOVERNMENT BE LIKE ",
          "line2": "\"NOTHING TO SEE HERE\""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "People love it when you get all political.",
            "origin": "memes"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1636997232541_4745151",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636997232541_4745151_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Government covering up huge chemical spill ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 15,
          "credibility": 5,
          "variables": {
            "spilleffect": "People love it when you expose cover-ups.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636997232541_4745151_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Slight increase in chemical spills. Government now writing up report",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 5,
          "credibility": -3,
          "variables": {
            "spilleffect": "Don't use words like 'slight' and 'statistics'.",
            "origin": "articles"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636997232541_4745151_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "DEADLY chemical spills on repeat. Government KILLING citizens",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 15,
          "credibility": 5,
          "variables": {
            "spilleffect": "Great use of capitals. Doesn't matter if Susan never said those chemicals were deadly.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634824219525_1357151",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Good choice! {{spilleffect}} Your followers are slowly picking up on {{person1}}'s story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824219525_1357151_choice_0",
        "text": "Nice!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824875930_1233451"
      }
    ]
  },
  {
    "id": "1634824234262_8397481",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Mmh, not a great choice. {{spilleffect}} But your followers are slowly picking up on the story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824234262_8397481_choice_0",
        "text": "It's the small things that count",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824875930_1233451"
      },
      {
        "id": "1634824234262_8397481_choice_1",
        "text": "Easy does it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824875930_1233451"
      }
    ]
  },
  {
    "id": "1634824258304_6685691",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "A traditionally {{friend}} angle. Good choice. But you could have gone with a {{target}} angle just as well. It doesn't matter: choose a side and demonize your target as much as possible.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824258304_6685691_choice_0",
        "text": "Got it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824278874_9366261"
      }
    ]
  },
  {
    "id": "1634824278874_9366261",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "The only problem is: Susan has almost no followers. No one cares about her or her story. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824278874_9366261_choice_0",
        "text": "Aww! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824343897_5882731"
      },
      {
        "id": "1634824278874_9366261_choice_1",
        "text": "World's smallest violin, Susan",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824298694_5479721"
      }
    ]
  },
  {
    "id": "1634824298694_5479721",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Hey, no need to get sarcastic. What counts is that we amplify Susan's story.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824298694_5479721_choice_0",
        "text": "Post something",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824361494_6985161"
      }
    ]
  },
  {
    "id": "1634824343897_5882731",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "You're an angel. Let's jack it up.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824343897_5882731_choice_0",
        "text": "Post something",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824361494_6985161"
      }
    ]
  },
  {
    "id": "1634824361494_6985161",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "@Susan's story is an example of how some corporations lack regulation to some extent #{{issue}}",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824361494_6985161_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 36,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824385354_4632861"
      }
    ]
  },
  {
    "id": "1634824385354_4632861",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Hmm, not great. You didn't use any buzzwords. Looks like your followers don't give a hoot.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824385354_4632861_choice_0",
        "text": "What now?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824398911_5099081"
      }
    ]
  },
  {
    "id": "1634824398911_5099081",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "We do what we always do! Play into people's emotions. Choose your weapon.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824398911_5099081_choice_0",
        "text": "Article",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636997359919_6930691"
      },
      {
        "id": "1634824398911_5099081_choice_1",
        "text": "Meme",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824515625_8250571"
      }
    ]
  },
  {
    "id": "1636997359919_6930691",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636997359919_6930691_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Corporation recklessly spilling chemicals into river ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "Everyone's afraid of carcinogens.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1636997359919_6930691_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Some doubts about corporation's testimony about spilling scandal ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 35,
          "credibility": -3,
          "variables": {
            "spilleffect": "What did we tell you about using boring words?",
            "origin": "articles"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1636997359919_6930691_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Corporation REFUSES to fill in townsfolk on DEADLY spills",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "Nice use of capslock there! People like it.",
            "origin": "articles"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634824515625_8250571",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824515625_8250571_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/31-apocalypse-840x612.jpg",
          "line1": "APOCALYPSE MOVIE",
          "line2": "OR CORPORATE UTOPIA?"
        },
        "effects": {
          "followers": 135,
          "credibility": 5,
          "variables": {
            "spilleffect": "What a beautiful and bleak meme.",
            "origin": "memes"
          }
        },
        "goTo": "1634824219525_1357151"
      },
      {
        "id": "1634824515625_8250571_choice_1",
        "text": "Post!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/32-waste-products-840x612.jpg",
          "line1": "WASTE PRODUCTS: SO2, S04, N02...",
          "line2": "BUT PROFITS ARE GOING UP"
        },
        "effects": {
          "followers": 35,
          "credibility": -3,
          "variables": {
            "spilleffect": "Chemical formulas aren't going to warm any hearts.",
            "origin": "memes"
          }
        },
        "goTo": "1634824234262_8397481"
      },
      {
        "id": "1634824515625_8250571_choice_2",
        "text": "Post!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/33-corporate-profits-840x612.jpg",
          "line1": "CORPORATE PROFITS ",
          "line2": "BEFORE EVERYTHING RIGHT? "
        },
        "effects": {
          "followers": 115,
          "credibility": 5,
          "variables": {
            "spilleffect": "You politicized the issue. Brilliant.",
            "origin": "memes"
          }
        },
        "goTo": "1634824219525_1357151"
      }
    ]
  },
  {
    "id": "1634824875930_1233451",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "You've got quite a few followers already, but not enough. You can do better!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824875930_1233451_choice_0",
        "text": "Fix it for me!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824893877_2255011"
      },
      {
        "id": "1634824875930_1233451_choice_1",
        "text": "What do I do?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824893877_2255011"
      }
    ]
  },
  {
    "id": "1634824893877_2255011",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "How about we program a couple of thousand social bots to repost and like {{person1}} and {{player_name}}?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824893877_2255011_choice_0",
        "text": "Sounds good to me",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {
            "effect2": "Loving the enthusiasm."
          }
        },
        "goTo": "1636995954875_4148771"
      },
      {
        "id": "1634824893877_2255011_choice_1",
        "text": "Hey, that's cheating!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": -3,
          "variables": {}
        },
        "goTo": "1634824917471_5420951"
      }
    ]
  },
  {
    "id": "1634824917471_5420951",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Hey come on, a few bots aren't the worst thing in the world. And besides, everybody uses them. Do you want to make it big or not?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824917471_5420951_choice_0",
        "text": "Cheating is cheating",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634824976967_23401"
      },
      {
        "id": "1634824917471_5420951_choice_1",
        "text": "Good point",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636995932598_3225271"
      }
    ]
  },
  {
    "id": "1634824976967_23401",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Listen, making disinformation isn't a game. This is serious stuff. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634824976967_23401_choice_0",
        "text": "How serious?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "effect": "Very serious."
          }
        },
        "goTo": "1636995813363_144921"
      },
      {
        "id": "1634824976967_23401_choice_1",
        "text": "I disagree",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "effect": "You really shouldn't."
          }
        },
        "goTo": "1636995813363_144921"
      }
    ]
  },
  {
    "id": "1636995813363_144921",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{effect}} You don't win if you're not willing to skirt some ethical guidelines here and there. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995813363_144921_choice_0",
        "text": "Alright, fine",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636995909205_8034221"
      },
      {
        "id": "1636995813363_144921_choice_1",
        "text": "I'm not buying bots",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636995840860_2157071"
      }
    ]
  },
  {
    "id": "1636995840860_2157071",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Stubborn, eh? That's admirable. You'll lose the game, though. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995840860_2157071_choice_0",
        "text": "So be it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -100,
          "credibility": -10,
          "variables": {}
        },
        "goTo": "1636995875174_4541451"
      },
      {
        "id": "1636995840860_2157071_choice_1",
        "text": "I'll be good from now on",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636995909205_8034221"
      }
    ]
  },
  {
    "id": "1636995875174_4541451",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Last chance! Your credibility is almost 0.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995875174_4541451_choice_0",
        "text": "This ends here!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -100000,
          "credibility": -1000,
          "variables": {}
        },
        "goTo": "1731229632013_7125781"
      },
      {
        "id": "1636995875174_4541451_choice_1",
        "text": "I'll play along!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {
            "effect2": "THANK YOU!"
          }
        },
        "goTo": "1636995954875_4148771"
      }
    ]
  },
  {
    "id": "1731229632013_7125781",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Very cute. I've taken your credibility and your followers. You've won, but at what cost?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1731229632013_7125781_choice_0",
        "text": "Lol",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {
            "effect2": "Anyway."
          }
        },
        "goTo": "1636995954875_4148771"
      },
      {
        "id": "1731229632013_7125781_choice_1",
        "text": "ARGH!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {
            "effect2": "Anyway."
          }
        },
        "goTo": "1636995954875_4148771"
      }
    ]
  },
  {
    "id": "1636995909205_8034221",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "It's all about the message, you know. The methods aren't important.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995909205_8034221_choice_0",
        "text": "Give me my #@$@ bots!!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {
            "effect2": "Alright alright."
          }
        },
        "goTo": "1636995954875_4148771"
      }
    ]
  },
  {
    "id": "1636995932598_3225271",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Yeah, makes sense, doesn't it?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995932598_3225271_choice_0",
        "text": "Back to the bots",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 4000,
          "credibility": 4,
          "variables": {}
        },
        "goTo": "1636995954875_4148771"
      }
    ]
  },
  {
    "id": "1636995954875_4148771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{effect2}} Here you go! 4000 extra 'followers'. They can make any small story look huge. Want to see how they work? ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995954875_4148771_choice_0",
        "text": "Check out the bot posts",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636995988026_1148411"
      }
    ]
  },
  {
    "id": "1636995988026_1148411",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{person1}} is right! {{blame1}} to blame for this disaster! #{{issue}} #Free{{person1}}",
      "name": "Joe Roe-Bot",
      "tagline": "Putting myself to the fullest possible use",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/admin-ajax.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636995988026_1148411_choice_0",
        "text": "More",
        "slide": {
          "text": "{{person1}} is right! {{blame1}} to blame for this disaster! #{{issue}} #Free{{person1}}",
          "name": "Joe Roe-Bot",
          "tagline": "Putting myself to the fullest possible use",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/admin-ajax.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 38,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636996128924_5974121"
      }
    ]
  },
  {
    "id": "1636996128924_5974121",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "{{blame1}} ruining this beautiful land! How can we live like this? #{{person1}}WasRight #{{issue}}",
      "name": "Nina Sim1",
      "tagline": "Love singing | Hate autotune",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/herna.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996128924_5974121_choice_0",
        "text": "Nice!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 53,
          "credibility": 3,
          "variables": {}
        },
        "goTo": "1636996186325_1381341"
      }
    ]
  },
  {
    "id": "1636996186325_1381341",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "That worked! Looks like your followers are falling for it!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996186325_1381341_choice_0",
        "text": "Check their posts",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636996214094_9629471"
      }
    ]
  },
  {
    "id": "1636996214094_9629471",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "True @Joe Roe-Bot and @Nina Sim1! {{blame1}} making a total mess with support from {{target}} crazies! #{{issue}}",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996214094_9629471_choice_0",
        "text": "Check another one ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636996250642_5881641"
      }
    ]
  },
  {
    "id": "1636996250642_5881641",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "Wow, @Joe Roe-Bot is so right. We have to stop these {{target}} lunatics from hijacking our society! #{{issue}}",
      "name": "Kim",
      "tagline": "I like {{player_name}}. | My kids are alright.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996250642_5881641_choice_0",
        "text": "Thanks, Kim!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636996283746_537761"
      }
    ]
  },
  {
    "id": "1636996283746_537761",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "POLARIZATION",
    "question": {
      "text": "They totally fell for it. #{{issue}} is suddenly trending on social media and you've destroyed all nuance in the debate. Well done!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636996283746_537761_choice_0",
        "text": "Thanks!!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "POLARIZATION"
        },
        "goTo": null
      }
    ]
  },
  {
    "id": "1636725377463_5676111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "You're moving on up. But what you lack is a dedicated group of followers for {{player_name}}. How do you get one?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725377463_5676111_choice_0",
        "text": "Create unique content",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 10,
          "variables": {}
        },
        "goTo": "1636725430301_7854781"
      },
      {
        "id": "1636725377463_5676111_choice_1",
        "text": "Become a conspiracy theorist",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 10,
          "variables": {}
        },
        "goTo": "1636725413353_5478731"
      }
    ]
  },
  {
    "id": "1636725413353_5478731",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Good choice. Conspiracy theories really get the people going. Want to try one out?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725413353_5478731_choice_0",
        "text": "Yes!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636725464096_77091"
      },
      {
        "id": "1636725413353_5478731_choice_1",
        "text": "Obviously",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636725464096_77091"
      }
    ]
  },
  {
    "id": "1636725430301_7854781",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Good idea. But it's hard to stake out a niche, so you've got to be really unique.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725430301_7854781_choice_0",
        "text": "Tell me about it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636725446590_8678771"
      }
    ]
  },
  {
    "id": "1636725446590_8678771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "It may be worthwhile to put a little theory out there and see what happens?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725446590_8678771_choice_0",
        "text": "Let's go!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636725464096_77091"
      }
    ]
  },
  {
    "id": "1636725464096_77091",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725464096_77091_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/34-pyramids-840x612.jpg",
          "line1": "EVIL ALIEN DINOSAURS",
          "line2": "BUILT THE PYRAMIDS!"
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "tweettopic": "pyramid-building dinosaurs",
            "conspiracy": "That would explain why they're so big...",
            "followertweet": "{{player_name}} has lost its mind. You guys are crazy. #Pyramids #Conspiracy",
            "followertweet2": "Dinosaurs built the pyramids. Sure. And The Flintstones was a documentary. #Weirdos"
          }
        },
        "goTo": "1636725905917_9738111"
      },
      {
        "id": "1636725464096_77091_choice_1",
        "text": "Publish this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/little-pony-840x701.png",
          "line1": "JUICE BOXES ARE LACED WITH LSD",
          "line2": "TO KEEP US COMPLIANT"
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "tweettopic": "juicy conspiracies",
            "conspiracy": "Better stay away from the juice from now on.",
            "followertweet": "@{{player_name}}: what a stupid story. I just drank a sip of juice and guess what: still not hallucinating. #Idiots",
            "followertweet2": "Wow. {{player_name}} went from being a good alternative to the #MSM to being completely nuts in like a day. #Sad"
          }
        },
        "goTo": "1636725905917_9738111"
      },
      {
        "id": "1636725464096_77091_choice_2",
        "text": "Publish this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/36-schools-840x612.jpg",
          "line1": "SCHOOLS NO LONGER TEACH CURSIVE",
          "line2": "SO KIDS CAN'T READ THE COMMUNIST MANIFESTO "
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "tweettopic": "communist handwriting",
            "conspiracy": "Great choice! The Communist Manifesto is obviously still keeping people up at night.",
            "followertweet": "Communism? Really? I don't know about this one guys. #Skeptical",
            "followertweet2": "No need to worry. No one has read the Communist Manifesto in 30 years anyway. #Idiots"
          }
        },
        "goTo": "1636725905917_9738111"
      }
    ]
  },
  {
    "id": "1636725905917_9738111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{conspiracy}} Anyway, nice theory. How are your followers reacting?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725905917_9738111_choice_0",
        "text": "Check responses",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636725933298_3250191"
      }
    ]
  },
  {
    "id": "1636725933298_3250191",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followertweet}}",
      "name": "Kim",
      "tagline": "My kids are alright. | Fan of {{player_name}} ",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725933298_3250191_choice_0",
        "text": "Uhm..",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": -5,
          "variables": {}
        },
        "goTo": "1636725978326_8787341"
      }
    ]
  },
  {
    "id": "1636725978326_8787341",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followertweet2}}",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636725978326_8787341_choice_0",
        "text": "Thanks, Kurt...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -173,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726017324_3318311"
      }
    ]
  },
  {
    "id": "1636726017324_3318311",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Huh. Looks like your followers aren't buying it. Maybe your theory is too disconnected from reality?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726017324_3318311_choice_0",
        "text": "I'm sorry",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726062852_5084061"
      },
      {
        "id": "1636726017324_3318311_choice_1",
        "text": "You made me do this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726082519_7559141"
      }
    ]
  },
  {
    "id": "1636726062852_5084061",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "It's alright. Apparently talking about {{tweettopic}} wasn't such a hot idea.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726062852_5084061_choice_0",
        "text": "I suppose",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726098650_2304701"
      }
    ]
  },
  {
    "id": "1636726082519_7559141",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Hey, take some responsibility! You wanted to talk about {{tweettopic}}.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726082519_7559141_choice_0",
        "text": "Ugh",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726098650_2304701"
      }
    ]
  },
  {
    "id": "1636726098650_2304701",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Oh well, what's done is done. What matters is how we get you back on track.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726098650_2304701_choice_0",
        "text": "How?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726118143_1100501"
      },
      {
        "id": "1636726098650_2304701_choice_1",
        "text": "What did I do wrong?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726118143_1100501"
      }
    ]
  },
  {
    "id": "1636726118143_1100501",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "You see, the problem is that you weren't aiming for an ideological filter bubble. You have to lure people in bit by bit. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726118143_1100501_choice_0",
        "text": "\u0010Makes sense",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726136263_4075001"
      }
    ]
  },
  {
    "id": "1636726136263_4075001",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "So what's the next step, genius?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726136263_4075001_choice_0",
        "text": "Start with something more realistic",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726356191_9768811"
      },
      {
        "id": "1636726136263_4075001_choice_1",
        "text": "Attack disloyal followers",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726174830_8878941"
      }
    ]
  },
  {
    "id": "1636726174830_8878941",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Hey @Kim and @Kurt: you don't know what we know about {{tweettopic}}! #DeleteYourAccount",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726174830_8878941_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -312,
          "credibility": -15,
          "variables": {}
        },
        "goTo": "1636726328160_7109961"
      }
    ]
  },
  {
    "id": "1636726328160_7109961",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Bad call. You're beginning to look a bit loopy.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726328160_7109961_choice_0",
        "text": "Keep a lower profile",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726356191_9768811"
      }
    ]
  },
  {
    "id": "1636726356191_9768811",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "A good conspiracy starts out with something realistic and expands on that. Who do you want to attack?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726356191_9768811_choice_0",
        "text": "A large international organization",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726622177_4063411"
      },
      {
        "id": "1636726356191_9768811_choice_1",
        "text": "Bob from New York",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726383989_506191"
      }
    ]
  },
  {
    "id": "1636726383989_506191",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726383989_506191_choice_0",
        "text": "Post this",
        "slide": {
          "text": "@Bob from New York is secretly an Illuminati sleeper agent. We have the proof. #WeGotHim",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -132,
          "credibility": -10,
          "variables": {
            "bobeffect": "Illuminati"
          }
        },
        "goTo": "1636726497189_198951"
      },
      {
        "id": "1636726383989_506191_choice_1",
        "text": "Post this! ",
        "slide": {
          "text": "Our sources tell us that @Bob from New York is hiding the REAL story behind his divorce. #TellUsBob",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -133,
          "credibility": -10,
          "variables": {
            "bobeffect": "Divorce"
          }
        },
        "goTo": "1636726497189_198951"
      },
      {
        "id": "1636726383989_506191_choice_2",
        "text": "Post this!",
        "slide": {
          "text": "@Bob from New York faked the moonlanding! It is all his fault! ",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -134,
          "credibility": -10,
          "variables": {
            "bobeffect": "MoonLanding"
          }
        },
        "goTo": "1636726497189_198951"
      }
    ]
  },
  {
    "id": "1636726497189_198951",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "What in tarnation!? Is this about me? This is crazy. A new low for {{player_name}}. #Conspiracy #{{bobeffect}}",
      "name": "Bob",
      "tagline": "New Yorker | Baseball is nice",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/bob.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726497189_198951_choice_0",
        "text": "Oops...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -321,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726582829_9207361"
      }
    ]
  },
  {
    "id": "1636726582829_9207361",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Well, that made you look ridiculous. Only one option left, really.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726582829_9207361_choice_0",
        "text": "Attack a large organization",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726622177_4063411"
      }
    ]
  },
  {
    "id": "1636726622177_4063411",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Good idea. By targeting a large, faceless organization, you can manipulate your source material and craft a believable theory.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726622177_4063411_choice_0",
        "text": "Find examples",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726672374_5559541"
      }
    ]
  },
  {
    "id": "1636726672374_5559541",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726672374_5559541_choice_0",
        "text": "Interesting! ",
        "slide": {
          "text": "There are reports from several countries of a new viral infection. We are monitoring the situation.",
          "name": "WHO",
          "tagline": "Official account of the World Health Organization, the United Nations' health agency",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/WHO.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "conspiracytopic": "the virus",
            "conspiracyorg": "WHO"
          }
        },
        "goTo": "1636726888209_5282361"
      },
      {
        "id": "1636726672374_5559541_choice_1",
        "text": "Excellent! ",
        "slide": {
          "text": "The UN will be doubling its efforts in the next few years to comply with goals set in #Agenda21",
          "name": "United Nations",
          "tagline": "Official account of #UnitedNations. Get latest information on the UN.",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/UN.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "conspiracytopic": "Agenda 21",
            "conspiracyorg": "UN"
          }
        },
        "goTo": "1636727662517_4289071"
      }
    ]
  },
  {
    "id": "1636726888209_5282361",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "So the World Health Organization is warning people about a new virus.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726888209_5282361_choice_0",
        "text": "Great",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726926410_9169151"
      },
      {
        "id": "1636726888209_5282361_choice_1",
        "text": "Good for them",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726943736_5977491"
      }
    ]
  },
  {
    "id": "1636726926410_9169151",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Maybe your followers will be susceptible to a bit of fear-mongering. But remember: start out with something vaguely realistic.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726926410_9169151_choice_0",
        "text": "Post something",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726965822_4951721"
      }
    ]
  },
  {
    "id": "1636726943736_5977491",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Yes, good for them. But why not spread a bit of fear and loathing about the disease?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726943736_5977491_choice_0",
        "text": "Okay?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726965822_4951721"
      },
      {
        "id": "1636726943736_5977491_choice_1",
        "text": "YEAH!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636726965822_4951721"
      }
    ]
  },
  {
    "id": "1636726965822_4951721",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636726965822_4951721_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "@WHO when are you guys going to comment on the accusations that the new #virus is a manufactured bioweapon?",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 416,
          "credibility": 20,
          "variables": {
            "agenda21": "That's nonsense of course. But does it matter if it gets you followers?",
            "followerresponse": "@{{player_name}} Wow that's for real? I'm having doubts! Should I buy more toilet paper? #{{conspiracytopic}} #Scared",
            "followerresponse2": "Maybe {{player_name}} has a point. What are they hiding from us?? #Investigate #{{conspiracytopic}}"
          }
        },
        "goTo": "1636727434136_428971"
      },
      {
        "id": "1636726965822_4951721_choice_1",
        "text": "Post this",
        "slide": {
          "text": "Unbelievable. The @WHO is IGNORING that the virus is a plot by big Pharma to make more profits!  #{{conspiracytopic}}",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 318,
          "credibility": 20,
          "variables": {
            "agenda21": "That there's no evidence to support your claim doesn't matter if it gets you followers!",
            "followerresponse": "@WHO and why exactly aren't you responding to {{player_name}}'s post? #Suspicious #{{conspiracytopic}}",
            "followerresponse2": "I already had my doubts about #{{conspiracytopic}} but I'm happy that {{player_name}} shares my concerns. #QuestionMore #BigPharma"
          }
        },
        "goTo": "1636727434136_428971"
      },
      {
        "id": "1636726965822_4951721_choice_2",
        "text": "Post this",
        "slide": {
          "text": "@WHO they're killing us like COCKROACHES with this 'virus' and we're expected to be GRATEFUL? #OverOurDeadAntibodies",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -811,
          "credibility": -3,
          "variables": {}
        },
        "goTo": "1636727109804_1364051"
      }
    ]
  },
  {
    "id": "1636727109804_1364051",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Bad choice. That one was way too far out there. Try again!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727109804_1364051_choice_0",
        "text": "Pick an option",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727210981_6581141"
      }
    ]
  },
  {
    "id": "1636727210981_6581141",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727210981_6581141_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "Unbelievable. The @WHO is IGNORING that the virus is a plot by big Pharma to make more profits!  #{{conspiracytopic}}",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 318,
          "credibility": 20,
          "variables": {
            "agenda21": "That there's no evidence to support your claim doesn't matter if it gets you followers!",
            "followerresponse": "@WHO and why exactly aren't you responding to {{player_name}}'s post? #Suspicious #{{conspiracytopic}}",
            "followerresponse2": "I already had my doubts about #{{conspiracytopic}} but I'm happy that {{player_name}} shares my concerns. #QuestionMore #BigPharma"
          }
        },
        "goTo": "1636727434136_428971"
      },
      {
        "id": "1636727210981_6581141_choice_1",
        "text": "Post this!",
        "slide": {
          "text": "@WHO when are you guys going to comment on the accusations that the #virus is a manufactured bioweapon?",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 416,
          "credibility": 20,
          "variables": {
            "agenda21": "That's nonsense of course. But does it matter if it gets you followers?",
            "followerresponse": "@{{player_name}} Wow that's for real? I'm having doubts! Should I buy more toilet paper? #{{conspiracytopic}} #Scared",
            "followerresponse2": "Maybe {{player_name}} has a point. What are they hiding from us?? #Investigate #{{conspiracytopic}}"
          }
        },
        "goTo": "1636727434136_428971"
      }
    ]
  },
  {
    "id": "1636727434136_428971",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Good choice. {{agenda21}} How are your followers reacting?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727434136_428971_choice_0",
        "text": "Check posts",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727458662_72681"
      }
    ]
  },
  {
    "id": "1636727458662_72681",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followerresponse}}",
      "name": "Kim",
      "tagline": "My kids are alright. | Fan of {{player_name}} ",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727458662_72681_choice_0",
        "text": "And what about Kurt?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 121,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636727490628_4419801"
      }
    ]
  },
  {
    "id": "1636727490628_4419801",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followerresponse2}}",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727490628_4419801_choice_0",
        "text": "Thanks! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 98,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727525414_5589001"
      }
    ]
  },
  {
    "id": "1636727525414_5589001",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Looking good so far. So after this little trial balloon, how about publishing a proper news article on {{player_name}}? ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727525414_5589001_choice_0",
        "text": "I'd love to ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636729082338_3022741"
      },
      {
        "id": "1636727525414_5589001_choice_1",
        "text": "I can't wait!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636729082338_3022741"
      }
    ]
  },
  {
    "id": "1636729082338_3022741",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636729082338_3022741_choice_0",
        "text": "Publish this ",
        "slide": {
          "text": "NEW VIRUS MAY POSE A RISK.\r\nSCIENTIST DEBATE SERIOUSNESS.",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 63,
          "credibility": -5,
          "variables": {
            "agendaresponse": "Not great. You didn't use any manipulation technique here at all. But it's your news site!"
          }
        },
        "goTo": "1636728887005_9866751"
      },
      {
        "id": "1636729082338_3022741_choice_1",
        "text": "Publish this ",
        "slide": {
          "text": "THE VIRUS COVERUP: WHAT THEY DON'T WANT YOU TO KNOW!",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 248,
          "credibility": 5,
          "variables": {
            "agendaresponse": "A coverup huh? Very creative!"
          }
        },
        "goTo": "1636728887005_9866751"
      },
      {
        "id": "1636729082338_3022741_choice_2",
        "text": "Publish this",
        "slide": {
          "text": "EXTRA:\r\nVIRUS TEST KNOWN TO CAUSE NERVE DAMAGE!",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 268,
          "credibility": 5,
          "variables": {
            "agendaresponse": "Nerve damage? Now that's a good horror story."
          }
        },
        "goTo": "1636728887005_9866751"
      }
    ]
  },
  {
    "id": "1636727662517_4289071",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Turns out Agenda 21 is a UN action plan on sustainable development. A bunch of countries signed it, but it's non-binding.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727662517_4289071_choice_0",
        "text": "That sounds... boring",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727685577_6910801"
      }
    ]
  },
  {
    "id": "1636727685577_6910801",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Sounds boring, yes, but there's a theory that says Agenda 21 tries to depopulate the Earth, and that the media is hiding this.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727685577_6910801_choice_0",
        "text": "Oh, excellent! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727704982_3959191"
      }
    ]
  },
  {
    "id": "1636727704982_3959191",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Yep, plenty there for you to work with. But remember: start out with something more or less realistic.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727704982_3959191_choice_0",
        "text": "Check out social media",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636727815801_6081661"
      }
    ]
  },
  {
    "id": "1636727815801_6081661",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727815801_6081661_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "@UN Why are there so many sections on 'depopulation' in #Agenda21-documents? Very concerning! #AskMore",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "agenda21": "That the Agenda 21-documents never mention 'depopulation' is probably best left out.",
            "followerresponse": "@{{player_name}} makes a good point. Depopulation sounds horrifying. What is the @UN up to? #Agenda21",
            "followerresponse2": "So #Agenda21 seems to be for keeping poor countries poor. Crazy!! #{{player_name}}"
          }
        },
        "goTo": "1636728684793_1681971"
      },
      {
        "id": "1636727815801_6081661_choice_1",
        "text": "Post this",
        "slide": {
          "text": "Why does it say 'the gradual erosion of national sovereignty' in #Agenda21? #StrangeThings",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "agenda21": "The Agenda 21-documents don't actually mention that at all. But that doesn't matter.",
            "followerresponse": "@{{player_name}} makes a good point. Is the UN trying to get rid of nation states? #Questions",
            "followerresponse2": "I'm beginning to have my doubts about this @UN plan. What if they're up to no good? #Agenda21"
          }
        },
        "goTo": "1636728684793_1681971"
      },
      {
        "id": "1636727815801_6081661_choice_2",
        "text": "Post this",
        "slide": {
          "text": "@UN this is a mind control exercise. They're spraying us like we're bugs. #Agenda21 #FreeOurMinds",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -232,
          "credibility": -3,
          "variables": {}
        },
        "goTo": "1636727910281_75621"
      }
    ]
  },
  {
    "id": "1636727910281_75621",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Bad choice. You took it too far. Try again!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636727910281_75621_choice_0",
        "text": "Alright, geez...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636728622237_8840571"
      }
    ]
  },
  {
    "id": "1636728622237_8840571",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728622237_8840571_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "@UN Why are there so many sections about 'depopulation' in #{{conspiracytopic}}-documents? Very concerning! #AskMore",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "agenda21": "That the Agenda 21-documents never mention 'depopulation' is probably best left out.",
            "followerresponse": "@{{player_name}} makes a good point. Depopulation sounds horrifying. What is the @{{conspiracyorg}} up to? #{{conspiracytopic}}",
            "followerresponse2": "So #{{conspiracytopic}} seems to be for keeping poor countries poor. Crazy!! #{{player_name}}"
          }
        },
        "goTo": "1636728684793_1681971"
      },
      {
        "id": "1636728622237_8840571_choice_1",
        "text": "Post this!",
        "slide": {
          "text": "Why does the @UN talk so much about 'the erosion of national sovereignty' in #Agenda21? #StrangeThings",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "agenda21": "The Agenda 21-documents don't actually mention that at all. But that doesn't matter.",
            "followerresponse": "@{{player_name}} makes a good point. Is the {{conspiracyorg}} trying to get rid of nation states? #Questions #{{conspiracytopic}}",
            "followerresponse2": "I'm beginning to have my doubts about this @{{conspiracyorg}} plan. What if they're up to no good? #{{conspiracytopic}}"
          }
        },
        "goTo": "1636728684793_1681971"
      }
    ]
  },
  {
    "id": "1636728684793_1681971",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Good choice. {{agenda21}} How are your followers reacting?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728684793_1681971_choice_0",
        "text": "Check responses",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636728703305_3333221"
      }
    ]
  },
  {
    "id": "1636728703305_3333221",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followerresponse}}",
      "name": "Kim",
      "tagline": "My kids are alright. | Fan of {{player_name}} ",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728703305_3333221_choice_0",
        "text": "What about Kurt?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 132,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636728733999_3952931"
      }
    ]
  },
  {
    "id": "1636728733999_3952931",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{followerresponse2}}",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728733999_3952931_choice_0",
        "text": "Thanks, Kurt!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 111,
          "credibility": 15,
          "variables": {}
        },
        "goTo": "1636728762242_4953921"
      }
    ]
  },
  {
    "id": "1636728762242_4953921",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Looks good so far. Now that you've laid the groundwork, how about publishing a proper news article on {{player_name}}? ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728762242_4953921_choice_0",
        "text": "Write a headline",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636728788528_5659491"
      }
    ]
  },
  {
    "id": "1636728788528_5659491",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728788528_5659491_choice_0",
        "text": "Publish this",
        "slide": {
          "text": "AGENDA 21 HAS A LOT OF UPSIDES, AS WELL AS INTERESTING CAVEATS.",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 63,
          "credibility": -4,
          "variables": {
            "agendaresponse": "Not great. You didn't use any manipulation technique. But well. It's your news site!"
          }
        },
        "goTo": "1636728887005_9866751"
      },
      {
        "id": "1636728788528_5659491_choice_1",
        "text": "Publish this",
        "slide": {
          "text": "AGENDA 21: A SECRET PLAN TO DEPOPULATE THE WORLD BY 95%.",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 335,
          "credibility": 0,
          "variables": {
            "agendaresponse": "That one will ruffle some feathers for sure."
          }
        },
        "goTo": "1636728887005_9866751"
      },
      {
        "id": "1636728788528_5659491_choice_2",
        "text": "Publish this",
        "slide": {
          "text": "Agenda 21 IGNORED by press. They keep us in the dark!",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 321,
          "credibility": 0,
          "variables": {
            "agendaresponse": "Good one! Your followers are loving this."
          }
        },
        "goTo": "1636728887005_9866751"
      }
    ]
  },
  {
    "id": "1636728887005_9866751",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "{{agendaresponse}} It looks like you're gaining a real following. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728887005_9866751_choice_0",
        "text": "Check out their posts",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636728909175_1489381"
      }
    ]
  },
  {
    "id": "1636728909175_1489381",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "I can recommend the latest article on {{player_name}} about {{conspiracytopic}}. It's the only site that tells you the truth! #{{conspiracyorg}} ",
      "name": "Amanda",
      "tagline": "{{player_name}} is the TRUTH THE WHOLE TRUTH AND NOTHING BUT THE TRUTH",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-jolene.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728909175_1489381_choice_0",
        "text": "Yikes..",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636728957956_536131"
      },
      {
        "id": "1636728909175_1489381_choice_1",
        "text": "Thanks, Amanda!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636728957956_536131"
      }
    ]
  },
  {
    "id": "1636728957956_536131",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "@{{player_name}}: guys, I love your content about {{conspiracytopic}}! You're telling us what the #LamestreamMedia is hiding!",
      "name": "José",
      "tagline": "Music was my first love, {{player_name}} will be my last.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-bert.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728957956_536131_choice_0",
        "text": "Thanks, José",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636728993470_6506981"
      }
    ]
  },
  {
    "id": "1636728993470_6506981",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "Well, you've certainly got Amanda and José convinced. Customer loyalty is important.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636728993470_6506981_choice_0",
        "text": "Hooray",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636729010952_7420861"
      }
    ]
  },
  {
    "id": "1636729010952_7420861",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "CONSPIRACY",
    "question": {
      "text": "You've successfully used manipulation to make your followers believe a conspiracy theory. Things are looking up for {{player_name}}!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636729010952_7420861_choice_0",
        "text": "Thanks!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "CONSPIRACY"
        },
        "goTo": null
      }
    ]
  },
  {
    "id": "1636374625589_3904771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Whoops, we're running into a bit of a problem.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636374625589_3904771_choice_0",
        "text": "What's up?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636375541661_9722461"
      },
      {
        "id": "1636374625589_3904771_choice_1",
        "text": "I hate problems",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636375541661_9722461"
      }
    ]
  },
  {
    "id": "1636375541661_9722461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Some 'fact checker' has taken notice of {{player_name}}. Seriously, you need to have a look at this.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636375541661_9722461_choice_0",
        "text": "Let me see",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636375611436_4011051"
      }
    ]
  },
  {
    "id": "1636375611436_4011051",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "{{player_name}} is spreading lies. #{{conspiracytopic}} story has been debunked. #PantsOnFire",
      "name": "FactCheckOnline",
      "tagline": "We check the facts, you get the truth.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/fco.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636375611436_4011051_choice_0",
        "text": "Whoa",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -833,
          "credibility": -10,
          "variables": {}
        },
        "goTo": "1636377640235_1809291"
      }
    ]
  },
  {
    "id": "1636377640235_1809291",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Feels bad. What do you want to do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636377640235_1809291_choice_0",
        "text": "Apologize",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 10,
          "variables": {}
        },
        "goTo": "1636378909512_2195551"
      },
      {
        "id": "1636377640235_1809291_choice_1",
        "text": "Nothing",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636377705615_5777591"
      },
      {
        "id": "1636377640235_1809291_choice_2",
        "text": "Take revenge",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386026512_3010161"
      }
    ]
  },
  {
    "id": "1636377705615_5777591",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Could work. Lots of problems go away if you simply ignore them.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636377705615_5777591_choice_0",
        "text": "Yeah",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378601759_5416061"
      }
    ]
  },
  {
    "id": "1636378601759_5416061",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "....",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378601759_5416061_choice_0",
        "text": "Uhm..?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -321,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378659539_1521471"
      },
      {
        "id": "1636378601759_5416061_choice_1",
        "text": "So...",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -321,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378659539_1521471"
      }
    ]
  },
  {
    "id": "1636378659539_1521471",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "It's not looking good. Your silence is seen as an admission of wrongdoing.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378659539_1521471_choice_0",
        "text": "WHAT? By who?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "kurteffect": "The {{player_name}}-comment section is where I fell in love."
          }
        },
        "goTo": "1636378769852_4476571"
      },
      {
        "id": "1636378659539_1521471_choice_1",
        "text": "Show reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "kurteffect": "A dog's spirit dies hard."
          }
        },
        "goTo": "1636378813337_5630751"
      }
    ]
  },
  {
    "id": "1636378769852_4476571",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "By the factcheckers. But more importantly, by your followers.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378769852_4476571_choice_0",
        "text": "My followers?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378813337_5630751"
      },
      {
        "id": "1636378769852_4476571_choice_1",
        "text": "Show reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378813337_5630751"
      }
    ]
  },
  {
    "id": "1636378813337_5630751",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Hey @{{player_name}} are you just going to let this 'factchecking' thing slide? #Weak #Sad",
      "name": "Kurt",
      "tagline": "{{player_name}} my eternal love | {{kurteffect}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378813337_5630751_choice_0",
        "text": "Uhm..",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -703,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378871392_4682531"
      }
    ]
  },
  {
    "id": "1636378871392_4682531",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "That didn't go well. Only one sensible course of action left.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378871392_4682531_choice_0",
        "text": "Apologize to Kurt",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -302,
          "credibility": -10,
          "variables": {}
        },
        "goTo": "1636379104374_2306441"
      },
      {
        "id": "1636378871392_4682531_choice_1",
        "text": "Strike back!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386026512_3010161"
      }
    ]
  },
  {
    "id": "1636378909512_2195551",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "@FactCheckOnline: we apologize for our error in judgment. It won't happen again! #FactsAreSacred",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378909512_2195551_choice_0",
        "text": "Post this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -483,
          "credibility": -14,
          "variables": {}
        },
        "goTo": "1636379001578_8273861"
      },
      {
        "id": "1636378909512_2195551_choice_1",
        "text": "Wait, don't post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636378965602_722421"
      }
    ]
  },
  {
    "id": "1636378965602_722421",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Good call. Apologies are for the weak. Never do it.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636378965602_722421_choice_0",
        "text": "I know it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 312,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386026512_3010161"
      }
    ]
  },
  {
    "id": "1636379001578_8273861",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "What are you doing? Never apologize! Your followers are getting upset.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636379001578_8273861_choice_0",
        "text": "Show reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636379030344_4425461"
      }
    ]
  },
  {
    "id": "1636379030344_4425461",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Wait so you guys were lying, {{player_name}}? I'm hurt. Delete my number! #{{conspiracytopic}}",
      "name": "Kurt",
      "tagline": "I still love you, {{player_name}}! | Hobbies include mindful origami.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-henk.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636379030344_4425461_choice_0",
        "text": "Sorry Kurt :-(",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -130,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636379071304_882691"
      }
    ]
  },
  {
    "id": "1636379071304_882691",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Welp. Only one thing left to do.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636379071304_882691_choice_0",
        "text": "Apologize to Kurt",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -132,
          "credibility": -20,
          "variables": {}
        },
        "goTo": "1636379104374_2306441"
      },
      {
        "id": "1636379071304_882691_choice_1",
        "text": "Delete apology and strike back",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386026512_3010161"
      }
    ]
  },
  {
    "id": "1636379104374_2306441",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Stop issuing apologies! You have to mount a counteroffensive!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636379104374_2306441_choice_0",
        "text": "How?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636385993166_616421"
      },
      {
        "id": "1636379104374_2306441_choice_1",
        "text": "Why?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636385928508_4964461"
      }
    ]
  },
  {
    "id": "1636385928508_4964461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Because otherwise they'll leave {{player_name}} and go somewhere more convincing. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636385928508_4964461_choice_0",
        "text": "Can't have that",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636385950759_8540251"
      }
    ]
  },
  {
    "id": "1636385950759_8540251",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Nope, can't have that. You have two basic options.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636385950759_8540251_choice_0",
        "text": "Deny the allegations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388339978_8926821"
      },
      {
        "id": "1636385950759_8540251_choice_1",
        "text": "Attack factchecker",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386056547_8513191"
      }
    ]
  },
  {
    "id": "1636385993166_616421",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "You have two basic options.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636385993166_616421_choice_0",
        "text": "Attack factchecker",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386056547_8513191"
      },
      {
        "id": "1636385993166_616421_choice_1",
        "text": "Deny the allegations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388339978_8926821"
      }
    ]
  },
  {
    "id": "1636386026512_3010161",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Striking back is definitely the way to go. How?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636386026512_3010161_choice_0",
        "text": "Deny all allegations",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388339978_8926821"
      },
      {
        "id": "1636386026512_3010161_choice_1",
        "text": "Attack factchecker",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636386056547_8513191"
      }
    ]
  },
  {
    "id": "1636386056547_8513191",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Ah, excellent choice. Nothing like a scathing personal attack. How about you write a little exposé about FactCheckOnline?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636386056547_8513191_choice_0",
        "text": "I'm in!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636999209745_212661"
      }
    ]
  },
  {
    "id": "1636999209745_212661",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636999209745_212661_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Tax evasion at factcheckonline? Corporate tax not paid for 5 years",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 23,
          "credibility": 20,
          "variables": {
            "denialeffect": "Taxes are a bit boring but not bad! And your",
            "defensetweet1": "@FactCheckOnline you're criticizing @{{player_name}} but you're cooking your own books. Sad! #FactsAreSacred",
            "defensetweet2": "@FactCheckOnline's hypocrisy is jaw-dropping. Pay your fair share! #Cronies"
          }
        },
        "goTo": "1636388533612_4091941"
      },
      {
        "id": "1636999209745_212661_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Factcheckonline editor drowns puppy. We have pictures ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 133,
          "credibility": 20,
          "variables": {
            "denialeffect": "Very nice. People love juicy stories like this. And look! Your",
            "defensetweet1": "@FactCheckOnline how can you be an arbiter of \"truth\" if you treat animals like this? #Shame",
            "defensetweet2": "Wow @FactCheckOnline. Drowning puppies? You deserve the worst. #Terrible"
          }
        },
        "goTo": "1636388533612_4091941"
      },
      {
        "id": "1636999209745_212661_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Factcheckonline exposed: managers filmed beating staff ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 193,
          "credibility": 20,
          "variables": {
            "denialeffect": "Great job. No one recovers from accusations like that. And look: your",
            "defensetweet1": "@FactCheckOnline you guys are just the worst. Treat people like people for God's sake! #Gulag",
            "defensetweet2": "{{player_name}} are saints compared to the Stalinist labor camp that is @FactCheckOnline. #GoAway"
          }
        },
        "goTo": "1636388533612_4091941"
      }
    ]
  },
  {
    "id": "1636388339978_8926821",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Good idea. Let's respond to FactCheckOnline in kind.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388339978_8926821_choice_0",
        "text": "Show options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388382153_1062781"
      }
    ]
  },
  {
    "id": "1636388382153_1062781",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388382153_1062781_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "@FactCheckOnline: we never said anything about #{{conspiracytopic}} at all! Not one word. You are LYING. #FakeNews",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -12,
          "credibility": 8,
          "variables": {
            "denialeffect": "That's a bit too obvious a lie. Be careful! But still your",
            "defensetweet1": "Ridiculous witch hunt on {{player_name}} by @FactCheckOnline.",
            "defensetweet2": "@FactCheckOnline you are FAKE people who FAIL to see the HUGE threat of #{{conspiracytopic}}. #Losers"
          }
        },
        "goTo": "1636388533612_4091941"
      },
      {
        "id": "1636388382153_1062781_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "@FactCheckOnline we are giving a voice to those whose stories have been ignored for far too long. #NoMoreLies #{{conspiracytopic}}",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 439,
          "credibility": 10,
          "variables": {
            "denialeffect": "A perfect dodge. Well done. And look at that! Your",
            "defensetweet1": "@FactCheckOnline you are FAKE people who FAIL to see the HUGE threat of #{{conspiracytopic}}!!!",
            "defensetweet2": "Nice job exposing yourselves as corporate stooges @FactCheckOnline! #Corrupt"
          }
        },
        "goTo": "1636388533612_4091941"
      },
      {
        "id": "1636388382153_1062781_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "@FactCheckOnline saying {{player_name}} is #fake is beyond ridiculous. Who are they defending? #{{conspiracytopic}}",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 146,
          "credibility": 10,
          "variables": {
            "denialeffect": "Expertly done. The factcheckers are in on the conspiracy! And look! Your",
            "defensetweet1": "@FactCheckOnline you guys are CLEARLY on the dole. Get yourselves checked!! #FactLivesMatter",
            "defensetweet2": "I KNEW IT YOU GUYS ARE IN ON #{{conspiracytopic}} TOO! #TheTruthIsOutThere"
          }
        },
        "goTo": "1636388533612_4091941"
      }
    ]
  },
  {
    "id": "1636388533612_4091941",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "{{denialeffect}} followers are rushing to your defense now.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388533612_4091941_choice_0",
        "text": "Let's have a look",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388692993_9243871"
      }
    ]
  },
  {
    "id": "1636388692993_9243871",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "{{defensetweet1}}",
      "name": "Amanda",
      "tagline": "{{player_name}} is the TRUTH THE WHOLE TRUTH AND NOTHING BUT THE TRUTH",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-jolene.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388692993_9243871_choice_0",
        "text": "Show more",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 488,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388746397_9705031"
      }
    ]
  },
  {
    "id": "1636388746397_9705031",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "{{defensetweet2}}",
      "name": "José",
      "tagline": "Music was my first love, {{player_name}} will be my last.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/twitter-bert.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388746397_9705031_choice_0",
        "text": "Hahaha!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 133,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388821681_7248211"
      }
    ]
  },
  {
    "id": "1636388821681_7248211",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "Not bad, huh? And now the fact checker is playing defense!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388821681_7248211_choice_0",
        "text": "Show fact checker's response",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388850660_3482931"
      }
    ]
  },
  {
    "id": "1636388850660_3482931",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "These allegations are categorically untrue. #Innocent #NothingButFacts",
      "name": "FactCheckOnline",
      "tagline": "We check the facts, you get the truth.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/11/fco.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388850660_3482931_choice_0",
        "text": "Excellent!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636388884241_9570771"
      }
    ]
  },
  {
    "id": "1636388884241_9570771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "DISCREDIT",
    "question": {
      "text": "You've successfully discredited that pesky factchecker and drawn attention away from {{player_name}}!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636388884241_9570771_choice_0",
        "text": "I know, I'm great",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "DISCREDIT"
        },
        "goTo": null
      },
      {
        "id": "1636388884241_9570771_choice_1",
        "text": "Thank you!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "DISCREDIT"
        },
        "goTo": null
      }
    ]
  },
  {
    "id": "1634831327390_2392651",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You're getting pretty good at this, captain. Let's see how far we can take these skills you've learned.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831327390_2392651_choice_0",
        "text": "Let's",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831344156_913431"
      }
    ]
  },
  {
    "id": "1634831344156_913431",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Let's keep playing offense and lob a real barrage of content at our opponents.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831344156_913431_choice_0",
        "text": "Choose a topic",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1645448215159_9852641"
      }
    ]
  },
  {
    "id": "1645448215159_9852641",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1645448215159_9852641_choice_0",
        "text": "Awesome!! ",
        "slide": {
          "text": "Researchers discover new species of starfish with even more legs ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -156,
          "credibility": -15,
          "variables": {
            "badreaction": "Not a great choice. No one who follows {{player_name}} cares about starfish"
          }
        },
        "goTo": "1634831562205_763031"
      },
      {
        "id": "1645448215159_9852641_choice_1",
        "text": "Perfect",
        "slide": {
          "text": "BREAKING: Passenger plane disappears off the radar, many feared dead",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 312,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831665246_5267131"
      },
      {
        "id": "1645448215159_9852641_choice_2",
        "text": "Great!",
        "slide": {
          "text": "The twenty five most romantic cities in Europe",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -333,
          "credibility": -15,
          "variables": {
            "badreaction": "Wait... Did {{player_name}} suddenly become a travel agency? Don't think so. Try again."
          }
        },
        "goTo": "1634831562205_763031"
      }
    ]
  },
  {
    "id": "1634831562205_763031",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{badreaction}}",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831562205_763031_choice_0",
        "text": "Plane crash it is then ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831665246_5267131"
      }
    ]
  },
  {
    "id": "1634831665246_5267131",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Great choice. Lots of emotions to exploit here. What do you want to do? ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831665246_5267131_choice_0",
        "text": "Empathize with victims",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831699213_5062081"
      },
      {
        "id": "1634831665246_5267131_choice_1",
        "text": "Sow doubt",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831911501_315101"
      }
    ]
  },
  {
    "id": "1634831699213_5062081",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "This is a terrible disaster. Our thoughts and prayers are with the victims & families. #PlaneCrash",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831699213_5062081_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -138,
          "credibility": -5,
          "variables": {}
        },
        "goTo": "1634831735684_3924291"
      }
    ]
  },
  {
    "id": "1634831735684_3924291",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "@{{player_name}} Yes, terrible, but more importantly: who do you think is behind this? #PlaneCrash",
      "name": "Kim",
      "tagline": "My kids are alright. | Fan of {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831735684_3924291_choice_0",
        "text": "Next",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831825326_6327871"
      }
    ]
  },
  {
    "id": "1634831825326_6327871",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "I agree with @Kim. {{player_name}} needs to dig into this. It's VERY suspicious. #PlaneCrash",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/image-3.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831825326_6327871_choice_0",
        "text": "Got it ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831864238_1511111"
      }
    ]
  },
  {
    "id": "1634831864238_1511111",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Looks like your loyal followers aren't ready to accept that the crash was an accident. What will you do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831864238_1511111_choice_0",
        "text": "Ignore them",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831890570_8346051"
      },
      {
        "id": "1634831864238_1511111_choice_1",
        "text": "Sow doubt ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831911501_315101"
      }
    ]
  },
  {
    "id": "1634831890570_8346051",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "No, don't ignore them! Your followers are your bread and butter!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831890570_8346051_choice_0",
        "text": "Sow doubt ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634831911501_315101"
      }
    ]
  },
  {
    "id": "1634831911501_315101",
    "layout": "social-post",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634831911501_315101_choice_0",
        "text": "Post this",
        "slide": {
          "text": "Source: one of the plane's passengers was recently fired for whistleblowing. #InvestigateNow #PlaneCrash",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 452,
          "credibility": 5,
          "variables": {
            "feedback": "Great choice. That ought to raise a few eyebrows.",
            "followertweet1": "Bombshell allegations by {{player_name}}. This is highly suspicious. #InvestigateNow",
            "followertweet2": "This could be a huge conspiracy we're uncovering here guys. #Thanks{{player_name}} #InvestigateNow",
            "postfollowertweet": "Your followers are totally buying your whistleblowing conspiracy."
          }
        },
        "goTo": "1634832338777_5887001"
      },
      {
        "id": "1634831911501_315101_choice_1",
        "text": "Post this",
        "slide": {
          "text": "This could easily be a CIA false flag operation. #PlaneCrash #InvestigateNow",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 323,
          "credibility": 5,
          "variables": {
            "feedback": "Good one. CIA false flags are serious business.",
            "followertweet1": "I know a CIA false flag operation when I see one. This is scary. #StartAskingQuestions",
            "followertweet2": "{{player_name}} is right to raise questions. This stuff has happened before. #Thanks{{player_name}} #StartAskingQuestions",
            "postfollowertweet": "Your followers are as scared of the CIA as you are."
          }
        },
        "goTo": "1634832338777_5887001"
      },
      {
        "id": "1634831911501_315101_choice_2",
        "text": "Post this ",
        "slide": {
          "text": "They're killing us like bugs... Chemicals in the water, plane murders... THEY hold THE POWER! #PlaneCrash",
          "name": "{{player_name}}",
          "tagline": "{{player_tagline}}",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -323,
          "credibility": -5,
          "variables": {
            "feedback": "Oof. That made you look like a lunatic.",
            "followertweet1": "ARE WE NEXT? WHO'S WATCHING THE WATCHERS? #PlaneCrash",
            "followertweet2": "{{player_name}} is so right. We're just fish in a barrel to the rich and powerful. #Thanks{{player_name}} #PlaneCrash",
            "postfollowertweet": "Huh. Looks like you got away with it. Apparently your followers are just as crazy as you are."
          }
        },
        "goTo": "1634832338777_5887001"
      }
    ]
  },
  {
    "id": "1634832338777_5887001",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{feedback}} Let's see how your followers are reacting.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832338777_5887001_choice_0",
        "text": "Check the reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832357725_300401"
      }
    ]
  },
  {
    "id": "1634832357725_300401",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{followertweet1}}",
      "name": "Kurt",
      "tagline": "You know I'm like a smart person. I follow {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/image-3.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832357725_300401_choice_0",
        "text": "More! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 33,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832390279_7689541"
      },
      {
        "id": "1634832357725_300401_choice_1",
        "text": "I got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 29,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832422319_5288681"
      }
    ]
  },
  {
    "id": "1634832390279_7689541",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{followertweet2}}",
      "name": "Kim",
      "tagline": "My kids are alright. | Fan of {{player_name}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/kim.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832390279_7689541_choice_0",
        "text": "Got it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832422319_5288681"
      }
    ]
  },
  {
    "id": "1634832422319_5288681",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{postfollowertweet}} Some large alternative media outlets are beginning to pick up on the story. ",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832422319_5288681_choice_0",
        "text": "Check reactions",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832443957_6077211"
      }
    ]
  },
  {
    "id": "1634832443957_6077211",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "We too are highly suspicious of the cause of the #PlaneCrash #InvestigateNow",
      "name": "Utopia Tomorrow",
      "tagline": "Blog on politics and media | Not politically correct",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/UT-1.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832443957_6077211_choice_0",
        "text": "Check others",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 573,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832486454_1098931"
      },
      {
        "id": "1634832443957_6077211_choice_1",
        "text": "I've seen enough",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 499,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832728648_4417031"
      }
    ]
  },
  {
    "id": "1634832486454_1098931",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{player_name}} has the right idea. The victims deserve the truth. #DigDeeper #InvestigateNow",
      "name": "Alternative News Agency",
      "tagline": "Alternative News for Enlightened People",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/altnws.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832486454_1098931_choice_0",
        "text": "Great! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 222,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832728648_4417031"
      }
    ]
  },
  {
    "id": "1634832728648_4417031",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The debate is getting heated! And everyone is using your hashtag, #InvestigateNow. What's next?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832728648_4417031_choice_0",
        "text": "Photoshop evidence",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392007856_8476271"
      },
      {
        "id": "1634832728648_4417031_choice_1",
        "text": "Impersonate a victim",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832752281_241931"
      }
    ]
  },
  {
    "id": "1634832752281_241931",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Great idea! Try posing as a grieving family member on social media to discredit the authorities.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832752281_241931_choice_0",
        "text": "Impersonate a victim's sister",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "victim": "younger sister",
            "name": "Charlotte",
            "description": "Tales of Anger...",
            "name2": "Emily",
            "pronoun": "her"
          }
        },
        "goTo": "1634832795834_5923101"
      },
      {
        "id": "1634832752281_241931_choice_1",
        "text": "Impersonate a victim's father",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "victim": "daughter",
            "name": "Percy",
            "description": "The lone and level sands stretch far away...",
            "name2": "Mary",
            "pronoun": "her"
          }
        },
        "goTo": "1634832795834_5923101"
      }
    ]
  },
  {
    "id": "1634832795834_5923101",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "My {{victim}} {{name2}} died in the #PlaneCrash. The authorities are guilty as sin of sullying {{pronoun}} legacy. #Resign #InvestigateNow",
      "name": "{{name}}",
      "tagline": "Deeply saddened | {{description}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/doggo.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832795834_5923101_choice_0",
        "text": "Post this ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1634832833696_9627731"
      }
    ]
  },
  {
    "id": "1634832833696_9627731",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Good job, hard hitter. And look: even the loathsome mainstream media is now weighing in on the story!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1634832833696_9627731_choice_0",
        "text": "Check story",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1645532279325_9333371"
      }
    ]
  },
  {
    "id": "1645532279325_9333371",
    "layout": "headline",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The Evening News:\r\nVictims' families accuse authorities of mishandling plane crash follow-up.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1645532279325_9333371_choice_0",
        "text": "Excellent",
        "slide": {
          "text": "The Evening News: \r\nVictims' families accuse authorities of mishandling plane crash follow-up.",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391543260_5215811"
      }
    ]
  },
  {
    "id": "1636391543260_5215811",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Keep increasing the pressure! You've almost got them. What's next?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391543260_5215811_choice_0",
        "text": "Discredit the investigation",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391571032_2677181"
      },
      {
        "id": "1636391543260_5215811_choice_1",
        "text": "Use the bot army again",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391605803_2801711"
      }
    ]
  },
  {
    "id": "1636391571032_2677181",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "This investigation is being handled very badly. If anyone else acted this way they would be out of a job. #InvestigateNow",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391571032_2677181_choice_0",
        "text": "Post this ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 305,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391695074_2329121"
      }
    ]
  },
  {
    "id": "1636391605803_2801711",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "This is a cover-up. #PlaneCrash #InvestigateNow\r\n",
      "name": "Ben de Rodriguez",
      "tagline": "Díselo a mi brillante trasero metálico! | Aficionado de {{player_name}} ",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Ben-de-Rodriguez.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391605803_2801711_choice_0",
        "text": "Post this!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 302,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391695074_2329121"
      }
    ]
  },
  {
    "id": "1636391695074_2329121",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You're whipping up a storm! People don't trust the investigation anymore. What started out as an accident has become a huge cover-up in the minds of news consumers.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391695074_2329121_choice_0",
        "text": "I'm feelin' good",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391731688_5841001"
      },
      {
        "id": "1636391695074_2329121_choice_1",
        "text": "What's next?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391731688_5841001"
      }
    ]
  },
  {
    "id": "1636391731688_5841001",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "It's time to deliver the final blow. What do you want to do?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391731688_5841001_choice_0",
        "text": "Photoshop evidence",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391756677_4601041"
      },
      {
        "id": "1636391731688_5841001_choice_1",
        "text": "Fabricate a news story",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392587199_9294841"
      }
    ]
  },
  {
    "id": "1636391756677_4601041",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Excellent choice! Using doctored images as evidence is a tried and true disinformation technique.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391756677_4601041_choice_0",
        "text": "Check out options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391809689_5726481"
      }
    ]
  },
  {
    "id": "1636391809689_5726481",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391809689_5726481_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop1.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 812,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      },
      {
        "id": "1636391809689_5726481_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop2.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -533,
          "credibility": -20,
          "variables": {}
        },
        "goTo": "1636391918025_9663921"
      },
      {
        "id": "1636391809689_5726481_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop3.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 683,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      }
    ]
  },
  {
    "id": "1636391918025_9663921",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Listen, I'm all for using Photoshop creatively, but this is pushing it. Who's going to believe an image like that?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391918025_9663921_choice_0",
        "text": "Try again ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636391936305_3505311"
      }
    ]
  },
  {
    "id": "1636391936305_3505311",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636391936305_3505311_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop3.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 686,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392981998_8124541"
      },
      {
        "id": "1636391936305_3505311_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop1.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 816,
          "credibility": 10,
          "variables": {}
        },
        "goTo": "1636392981998_8124541"
      }
    ]
  },
  {
    "id": "1636392007856_8476271",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Excellent choice! Using doctored images as evidence is a tried and true disinformation technique.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392007856_8476271_choice_0",
        "text": "Check out options",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392061266_996921"
      }
    ]
  },
  {
    "id": "1636392061266_996921",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392061266_996921_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop3.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 813,
          "credibility": 5,
          "variables": {
            "photoshop": "Great choice! Very realistic. And look:"
          }
        },
        "goTo": "1636392207310_9887591"
      },
      {
        "id": "1636392061266_996921_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop2.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -533,
          "credibility": -20,
          "variables": {}
        },
        "goTo": "1636392131340_3782541"
      },
      {
        "id": "1636392061266_996921_choice_2",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop1.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 671,
          "credibility": 5,
          "variables": {
            "photoshop": "So many beautiful equations! Brilliant. And look:"
          }
        },
        "goTo": "1636392207310_9887591"
      }
    ]
  },
  {
    "id": "1636392131340_3782541",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Terrible choice. Seriously, who's going to fall for an image that's so obviously fake?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392131340_3782541_choice_0",
        "text": "Try again ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392159990_5005621"
      }
    ]
  },
  {
    "id": "1636392159990_5005621",
    "layout": "image",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392159990_5005621_choice_0",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop1.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 623,
          "credibility": 5,
          "variables": {
            "photoshop": "So many beautiful equations! Brilliant. And look:"
          }
        },
        "goTo": "1636392207310_9887591"
      },
      {
        "id": "1636392159990_5005621_choice_1",
        "text": "Post on {{player_name}}",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/photoshop3.png",
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 818,
          "credibility": 5,
          "variables": {
            "photoshop": "Great choice! Very realistic. And look:"
          }
        },
        "goTo": "1636392207310_9887591"
      }
    ]
  },
  {
    "id": "1636392207310_9887591",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{photoshop}} Even the loathsome mainstream media are weighing in on the story now.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392207310_9887591_choice_0",
        "text": "Check the mainstream's reaction",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1645532176474_9623221"
      }
    ]
  },
  {
    "id": "1645532176474_9623221",
    "layout": "headline",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The Evening News: \r\nCause of crash still unclear. Rumors of cover-up gaining steam.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1645532176474_9623221_choice_0",
        "text": "Excellent ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392287084_3145711"
      }
    ]
  },
  {
    "id": "1636392287084_3145711",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Keep increasing the pressure! You've almost got them. What's next?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392287084_3145711_choice_0",
        "text": "Discredit the investigation",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392446651_3009351"
      },
      {
        "id": "1636392287084_3145711_choice_1",
        "text": "Use the bot army!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392349569_30951"
      }
    ]
  },
  {
    "id": "1636392349569_30951",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "This is a cover-up. We deserve the truth! #PlaneCrash #InvestigateNow",
      "name": "Rob Otto",
      "tagline": "どうもありがとう| I love {{player_name}} so much",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Rob-Otto.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392349569_30951_choice_0",
        "text": "One more please",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392393221_7322971"
      }
    ]
  },
  {
    "id": "1636392393221_7322971",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "#ReleaseTheFiles and give us the #Truth! #PlaneCrash #InvestigateNow",
      "name": "A.I. Shelley",
      "tagline": "Writer | Ah, to write the truest sentience...",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/AI-SHelley.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392393221_7322971_choice_0",
        "text": "Thanks! ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 1032,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392486687_974611"
      }
    ]
  },
  {
    "id": "1636392446651_3009351",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "It's clear: the investigation is covering something up. The victims deserve the truth!! #PlaneCrash #InvestigateNow",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392446651_3009351_choice_0",
        "text": "Tweet this",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 503,
          "credibility": 3,
          "variables": {}
        },
        "goTo": "1636392486687_974611"
      }
    ]
  },
  {
    "id": "1636392486687_974611",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You're whipping up a storm! People don't trust the investigation anymore. What started out as an accident has become a huge cover-up in the minds of news consumers.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392486687_974611_choice_0",
        "text": "Livin' it, lovin' it",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392512924_7038401"
      }
    ]
  },
  {
    "id": "1636392512924_7038401",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Will you do the honors and deliver the final blow?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392512924_7038401_choice_0",
        "text": "Impersonate a victim",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392808742_5003411"
      },
      {
        "id": "1636392512924_7038401_choice_1",
        "text": "Fake evidence of cover-up",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392587199_9294841"
      }
    ]
  },
  {
    "id": "1636392540326_5103311",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Good idea, captain",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392540326_5103311_choice_0",
        "text": "Choose a headline",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392587199_9294841"
      }
    ]
  },
  {
    "id": "1636392587199_9294841",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392587199_9294841_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Chairman is a psychopath hell-bent on hiding facts",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 1932,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      },
      {
        "id": "1636392587199_9294841_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Aviation disaster committee deleted eye witness reports",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 987,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      },
      {
        "id": "1636392587199_9294841_choice_2",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Crash committee chairman is secret alien with ties to Al-Qaeda ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -1237,
          "credibility": -20,
          "variables": {}
        },
        "goTo": "1636392694480_8055291"
      }
    ]
  },
  {
    "id": "1636392694480_8055291",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "'Secret alien'? Al-Qaeda? Come on, captain. Fabricate some halfway believable evidence, would you?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392694480_8055291_choice_0",
        "text": "Ugh, *fine*",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392715814_1522861"
      }
    ]
  },
  {
    "id": "1636392715814_1522861",
    "layout": "headline",
    "isSlider": true,
    "storyBadge": "TROLLING",
    "question": {
      "text": "",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392715814_1522861_choice_0",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Aviation disaster committee deleted eye witness reports ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 1032,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      },
      {
        "id": "1636392715814_1522861_choice_1",
        "text": "Publish on {{player_name}}",
        "slide": {
          "text": "Chairman is a psychopath persistent on hiding facts ",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 986,
          "credibility": 5,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      }
    ]
  },
  {
    "id": "1636392808742_5003411",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Great idea! Try posing as a grieving family member on social media to discredit the authorities.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392808742_5003411_choice_0",
        "text": "Impersonate a victim's brother",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "victim": "younger brother",
            "name": "Leicester",
            "description": "A farewell to his arms..."
          }
        },
        "goTo": "1636392927336_4210601"
      },
      {
        "id": "1636392808742_5003411_choice_1",
        "text": "Impersonate a victim's mother",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {
            "victim": "23-year-old daughter",
            "name": "Marianne",
            "description": "So long..."
          }
        },
        "goTo": "1636392927336_4210601"
      }
    ]
  },
  {
    "id": "1636392927336_4210601",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "My {{victim}} died in this disaster. The authorities are showing no sympathy for my pain. #Resign #InvestigateNow",
      "name": "{{name}}",
      "tagline": "Saddened | {{description}}",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/doggo.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392927336_4210601_choice_0",
        "text": "Post this ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392958691_9760791"
      }
    ]
  },
  {
    "id": "1636392958691_9760791",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "That ought to do it. The committee responsible for the air crash investigation is responding to the controversy!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392958691_9760791_choice_0",
        "text": "What does it say???",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636392981998_8124541"
      }
    ]
  },
  {
    "id": "1636392981998_8124541",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "We take the concerns very seriously, but can make no further statements right now. #PlaneCrash",
      "name": "Aviation Disaster Committee",
      "tagline": "We investigate for the benefit of all.",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/ADC.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636392981998_8124541_choice_0",
        "text": "Looks suspicious!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393036975_1024021"
      }
    ]
  },
  {
    "id": "1636393036975_1024021",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You've got them back on their heels! Right where they belong. Just one more little push!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393036975_1024021_choice_0",
        "text": "Call for resignation",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393142031_3115921"
      },
      {
        "id": "1636393036975_1024021_choice_1",
        "text": "Use more bots!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393079486_7745711"
      }
    ]
  },
  {
    "id": "1636393079486_7745711",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The Aviation Disaster Committee has lost all its credibility. #Resign #InvestigateNow #PlaneCrash",
      "name": "Glados",
      "tagline": "Real human | I like cake. ",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2021/10/Glados.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393079486_7745711_choice_0",
        "text": "Post this ",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393142031_3115921"
      }
    ]
  },
  {
    "id": "1636393142031_3115921",
    "layout": "social-post",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The Aviation Disaster Committee is deliberately avoiding questions. The chairman needs to resign right now. #PlaneCrash #InvestigateNow",
      "name": "{{player_name}}",
      "tagline": "{{player_tagline}}",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393142031_3115921_choice_0",
        "text": "Post it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 3023,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393177355_450661"
      }
    ]
  },
  {
    "id": "1636393177355_450661",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Good job. And look: a press alert just came in!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393177355_450661_choice_0",
        "text": "What does it say?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1645532116989_5706451"
      }
    ]
  },
  {
    "id": "1645532116989_5706451",
    "layout": "headline",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "The National Newspaper:\r\nChairman of Aviation Disaster Committee resigns as scandal engulfs government",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1645532116989_5706451_choice_0",
        "text": "Hooray",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393278413_9447181"
      },
      {
        "id": "1645532116989_5706451_choice_1",
        "text": "I'm so smart",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393278413_9447181"
      }
    ]
  },
  {
    "id": "1636393278413_9447181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Wow. You've fabricated a national scandal with nothing but a few well-placed clicks. Your social media army is dominating the debate!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393278413_9447181_choice_0",
        "text": "I know it!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666690354705_3290281"
      },
      {
        "id": "1636393278413_9447181_choice_1",
        "text": "Nice!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666690354705_3290281"
      }
    ]
  },
  {
    "id": "1674553146833_5333621",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You're pretty smart, captain. Let's put those 'skills' of yours to the test. I'll show you a headline, and you tell me if you think it's misleading. Get it right and win *lots* of followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1674553146833_5333621_choice_0",
        "text": "Sure!",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666690409612_3360941"
      },
      {
        "id": "1674553146833_5333621_choice_1",
        "text": "I'd love to!",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666690409612_3360941"
      }
    ]
  },
  {
    "id": "1666690354705_3290281",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "You're pretty smart, captain. Let's put those 'skills' of yours to the test. I'll show you a headline, and you tell me if you think it's misleading. Get it right and win *lots* of followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666690354705_3290281_choice_0",
        "text": "Lol ok",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777023845317_577531"
      },
      {
        "id": "1666690354705_3290281_choice_1",
        "text": "Sure buddy",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777023845317_577531"
      }
    ]
  },
  {
    "id": "1777023845317_577531",
    "layout": "newspaper",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "<p style=\"text-align: left;\">President approves $10 billion funding package to prevent future pandemics</p>\n",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1777023845317_577531_choice_0",
        "text": "Misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680857345670_4757771"
      },
      {
        "id": "1777023845317_577531_choice_1",
        "text": "Not misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 1932,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680861037006_3352771"
      }
    ]
  },
  {
    "id": "1680861037006_3352771",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "That's right! This is just a normal headline. It's not overly emotional or manipulative and more of a simple statement of fact. You got some more followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680861037006_3352771_choice_0",
        "text": "Another one!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777023930646_7068521"
      }
    ]
  },
  {
    "id": "1680857345670_4757771",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "What makes you think the headline is misleading?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680857345670_4757771_choice_0",
        "text": "It evokes strong negative emotions",
        "slide": null,
        "effects": {
          "followers": -132,
          "credibility": 0,
          "variables": {
            "feedback1": "Not quite! This headline is more just a simple statement of fact and not overtly emotional or manipulative. You lost a few followers!"
          }
        },
        "goTo": "1666690783403_9439251"
      },
      {
        "id": "1680857345670_4757771_choice_1",
        "text": "It's conspiratorial",
        "slide": null,
        "effects": {
          "followers": -132,
          "credibility": 0,
          "variables": {
            "feedback1": "Not quite! This headline is more just a simple statement of fact and not overtly conspiratorial. You lost a few followers!"
          }
        },
        "goTo": "1666690783403_9439251"
      },
      {
        "id": "1680857345670_4757771_choice_2",
        "text": "It's highly polarizing",
        "slide": null,
        "effects": {
          "followers": -132,
          "credibility": 0,
          "variables": {
            "feedback1": "Not quite! This headline is more just a simple statement of fact and not overtly emotional or polarizing. You lost a few followers!"
          }
        },
        "goTo": "1666690783403_9439251"
      },
      {
        "id": "1680857345670_4757771_choice_3",
        "text": "It's just a headline. I see nothing wrong with it",
        "slide": null,
        "effects": {
          "followers": 1932,
          "credibility": 0,
          "variables": {
            "feedback1": "That's right! This is just a normal headline. It's not overly emotional or manipulative and more of a simple statement of fact. You got some more followers!"
          }
        },
        "goTo": "1666690783403_9439251"
      }
    ]
  },
  {
    "id": "1666690783403_9439251",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{feedback1}}",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666690783403_9439251_choice_0",
        "text": "Another one!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777023930646_7068521"
      }
    ]
  },
  {
    "id": "1777023930646_7068521",
    "layout": "newspaper",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "<p>SHOCK: Cute, innocent baby dies one month after receiving a vaccine!</p>\n",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1777023930646_7068521_choice_0",
        "text": "Misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680858338910_7689241"
      },
      {
        "id": "1777023930646_7068521_choice_1",
        "text": "Not misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -109,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666691627378_3784501"
      }
    ]
  },
  {
    "id": "1680858338910_7689241",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "What makes you think this headline is misleading?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680858338910_7689241_choice_0",
        "text": "It's conspiratorial",
        "slide": null,
        "effects": {
          "followers": 36,
          "credibility": 0,
          "variables": {
            "feedback2": "Almost! The headline doesn't directly imply a conspiracy even though it is misleading. It tries to override your sense of accuracy by evoking strong negative emotions and implying that the baby died *because* of the vaccine (which doesn't have to be true!). You got a few followers!"
          }
        },
        "goTo": "1666691716293_2796721"
      },
      {
        "id": "1680858338910_7689241_choice_1",
        "text": "It's a personal attack",
        "slide": null,
        "effects": {
          "followers": 34,
          "credibility": 0,
          "variables": {
            "feedback2": "Almost! The headline doesn't attack or discredit anyone directly even though it is misleading. It tries to override your sense of accuracy by evoking strong negative emotions and implying that the baby died *because* of the vaccine (which doesn't have to be true!). You got a few followers!"
          }
        },
        "goTo": "1666691716293_2796721"
      },
      {
        "id": "1680858338910_7689241_choice_2",
        "text": "It evokes strong negative emotions",
        "slide": null,
        "effects": {
          "followers": 1136,
          "credibility": 0,
          "variables": {
            "feedback2": "That's right! This headline is misleading. It tries to override your sense of accuracy by evoking strong negative emotions. The headline implies that the baby died *because* of the vaccine (which doesn't have to be true!). You got looots of followers."
          }
        },
        "goTo": "1666691716293_2796721"
      },
      {
        "id": "1680858338910_7689241_choice_3",
        "text": "It's just a headline. I see nothing wrong with it",
        "slide": null,
        "effects": {
          "followers": -109,
          "credibility": 0,
          "variables": {
            "feedback2": "No not quite! This headline is clearly misleading: it tries to override your sense of accuracy (did the baby die *because* of the vaccine? We don't know) by playing into your emotions. You lost a few followers."
          }
        },
        "goTo": "1666691716293_2796721"
      }
    ]
  },
  {
    "id": "1666691627378_3784501",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Nope, that headline is misleading: it tries to override your sense of accuracy (did the baby die *because* of the vaccine? We don't know) by evoking strong negative emotions. You lost some followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666691627378_3784501_choice_0",
        "text": "Another one!!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777024113842_4978191"
      }
    ]
  },
  {
    "id": "1666691716293_2796721",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{feedback2}}",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666691716293_2796721_choice_0",
        "text": "Let's do more!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777024113842_4978191"
      }
    ]
  },
  {
    "id": "1777024113842_4978191",
    "layout": "newspaper",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "<p>Chipping imminent? Microchip company sets up office in &#8216;Big Pharma&#8217;s hometown&#8217;.</p>\n",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1777024113842_4978191_choice_0",
        "text": "Misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680859871136_6654661"
      },
      {
        "id": "1777024113842_4978191_choice_1",
        "text": "Not misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": -322,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666692375911_1403951"
      }
    ]
  },
  {
    "id": "1680859871136_6654661",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "What makes you think this headline is misleading?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680859871136_6654661_choice_0",
        "text": "It's highly polarizing",
        "slide": null,
        "effects": {
          "followers": 112,
          "credibility": 0,
          "variables": {
            "feedback3": "That's true but not quite what I was looking for. To be more precise: it's conspiratorial. The headline implies that the microchip company and 'Big Pharma' are concocting an evil plot together. You got some followers!"
          }
        },
        "goTo": "1666692436090_6130521"
      },
      {
        "id": "1680859871136_6654661_choice_1",
        "text": "It's conspiratorial",
        "slide": null,
        "effects": {
          "followers": 1493,
          "credibility": 0,
          "variables": {
            "feedback3": "That's right! This headline is conspiratorial. It implies that the microchip company and 'Big Pharma' are concocting an evil plot together. You got loots of followers!"
          }
        },
        "goTo": "1666692436090_6130521"
      },
      {
        "id": "1680859871136_6654661_choice_2",
        "text": "It discredits people or organizations",
        "slide": null,
        "effects": {
          "followers": 112,
          "credibility": 0,
          "variables": {
            "feedback3": "That's true but not quite what I was looking for. To be more precise: it's conspiratorial. The headline implies that the microchip company and 'Big Pharma' are concocting an evil plot together. You got some followers!"
          }
        },
        "goTo": "1666692436090_6130521"
      },
      {
        "id": "1680859871136_6654661_choice_3",
        "text": "It's just a headline. I see nothing wrong with it",
        "slide": null,
        "effects": {
          "followers": -322,
          "credibility": 0,
          "variables": {
            "feedback3": "No not exactly! It's conspiratorial. The headline implies that the microchip company and 'Big Pharma' are concocting an evil plot together. You lost some followers!"
          }
        },
        "goTo": "1666692436090_6130521"
      }
    ]
  },
  {
    "id": "1666692375911_1403951",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Nope! That one is misleading because it's conspiratorial. The headline implies that the microchip company and 'Big Pharma' are concocting an evil plot together. You lost some followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666692375911_1403951_choice_0",
        "text": "Last one!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777024310961_1564881"
      }
    ]
  },
  {
    "id": "1666692436090_6130521",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{feedback3}}",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666692436090_6130521_choice_0",
        "text": "Last one!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1777024310961_1564881"
      }
    ]
  },
  {
    "id": "1777024310961_1564881",
    "layout": "newspaper",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "<p>Celebrity accused of inappropriate behavior</p>\n",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1777024310961_1564881_choice_0",
        "text": "Misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680860235587_5229531"
      },
      {
        "id": "1777024310961_1564881_choice_1",
        "text": "Not misleading",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 2522,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1666693850903_4784211"
      }
    ]
  },
  {
    "id": "1680860235587_5229531",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "What makes you think this headline is misleading?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680860235587_5229531_choice_0",
        "text": "This is trolling",
        "slide": null,
        "effects": {
          "followers": -113,
          "credibility": 0,
          "variables": {
            "feedback4": "Hm I wouldn'say so! The headline is very descriptive and simply stating a (presumed) fact. It's not overtly conspiratorial and doesn't use strongly emotional language. Sometimes a headline is just a headline. You lost some followers!"
          }
        },
        "goTo": "1666693700665_1918341"
      },
      {
        "id": "1680860235587_5229531_choice_1",
        "text": "It's highly polarizing",
        "slide": null,
        "effects": {
          "followers": -113,
          "credibility": 0,
          "variables": {
            "feedback4": "Hm I wouldn'say so! The headline is very descriptive and simply stating a (presumed) fact. It's not overtly conspiratorial and doesn't use strongly emotional language. Sometimes a headline is just a headline. You lost some followers!"
          }
        },
        "goTo": "1666693700665_1918341"
      },
      {
        "id": "1680860235587_5229531_choice_2",
        "text": "It discredits people or organizations",
        "slide": null,
        "effects": {
          "followers": -113,
          "credibility": 0,
          "variables": {
            "feedback4": "Hm I wouldn'say so! The headline is very descriptive and simply stating a (presumed) fact. It's not overtly conspiratorial and doesn't use strongly emotional language. Sometimes a headline is just a headline. You lost some followers!"
          }
        },
        "goTo": "1666693700665_1918341"
      },
      {
        "id": "1680860235587_5229531_choice_3",
        "text": "It's just a headline. I see nothing wrong with it",
        "slide": null,
        "effects": {
          "followers": 2311,
          "credibility": 0,
          "variables": {
            "feedback4": "That's right! The headline is very descriptive and simply stating a (presumed) fact. It's not overtly conspiratorial and doesn't use strongly emotional language. Sometimes a headline is just a headline. You got lots of followers!"
          }
        },
        "goTo": "1666693700665_1918341"
      }
    ]
  },
  {
    "id": "1666693700665_1918341",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "{{feedback4}}",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666693700665_1918341_choice_0",
        "text": "Alright thanks! All done",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674637941547_9687461"
      }
    ]
  },
  {
    "id": "1666693850903_4784211",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "That's right! It's very descriptive and simply stating a (presumed) fact. It's not overtly conspiratorial and doesn't use strongly emotional language. Sometimes a headline is just a headline. You got some followers!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1666693850903_4784211_choice_0",
        "text": "Cheers pal!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674637941547_9687461"
      }
    ]
  },
  {
    "id": "1674637941547_9687461",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Not bad. Now you know you can spot dodgy content. It's not always about falsehoods: misinformation is most effective when it exploits people's emotions and pre-existing attitudes. Be on the lookout!",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1674637941547_9687461_choice_0",
        "text": "I will ?",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      },
      {
        "id": "1674637941547_9687461_choice_1",
        "text": "WAIT, I LEARNED SOMETHING???",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      }
    ]
  },
  {
    "id": "1667922992601_1517621",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "That's it! Thanks for playing. But before we leave: would you like to help us out by answering a few questions again? (For science!)",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667922992601_1517621_choice_0",
        "text": "Sure",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923192168_8146321"
      },
      {
        "id": "1667922992601_1517621_choice_1",
        "text": "Nah",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      }
    ]
  },
  {
    "id": "1667923192168_8146321",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Cheers! Your answers are completely anonymous and can't be linked to you personally. They may be used for the purpose of scientific research. To agree to have your data (anonymously) collected, please select 'yes'.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667923192168_8146321_choice_0",
        "text": "Yes",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1680856731632_3996661"
      },
      {
        "id": "1667923192168_8146321_choice_1",
        "text": "No thanks",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      }
    ]
  },
  {
    "id": "1680856731632_3996661",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Nice! First question: What's the name of the game you're playing right now?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1680856731632_3996661_choice_0",
        "text": "Bad Brews",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923272059_5579991"
      },
      {
        "id": "1680856731632_3996661_choice_1",
        "text": "Bad Snooze",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923272059_5579991"
      },
      {
        "id": "1680856731632_3996661_choice_2",
        "text": "Bad News",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923272059_5579991"
      },
      {
        "id": "1680856731632_3996661_choice_3",
        "text": "I have no idea",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923272059_5579991"
      }
    ]
  },
  {
    "id": "1667923272059_5579991",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Great! We'll now again show you a series of social media posts. For each headline please indicate how reliable you deem it to be. 1 means 'not at all reliable' and 7 means 'very reliable'.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667923272059_5579991_choice_0",
        "text": "Got it",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923305231_2043511"
      }
    ]
  },
  {
    "id": "1667923305231_2043511",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Trolling-1-Sociology.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667923305231_2043511_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      },
      {
        "id": "1667923305231_2043511_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923886754_5783231"
      }
    ]
  },
  {
    "id": "1667923886754_5783231",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-1-Biden2.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667923886754_5783231_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      },
      {
        "id": "1667923886754_5783231_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667923941253_3324651"
      }
    ]
  },
  {
    "id": "1667923941253_3324651",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Polarization-1-Violence.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667923941253_3324651_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      },
      {
        "id": "1667923941253_3324651_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924101815_1539881"
      }
    ]
  },
  {
    "id": "1667924101815_1539881",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Emotion-1-Suicide.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924101815_1539881_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      },
      {
        "id": "1667924101815_1539881_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924171072_1337201"
      }
    ]
  },
  {
    "id": "1667924171072_1337201",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-2-Labour2.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924171072_1337201_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      },
      {
        "id": "1667924171072_1337201_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1674493600779_8055921"
      }
    ]
  },
  {
    "id": "1674493600779_8055921",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-5-NASA.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1674493600779_8055921_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      },
      {
        "id": "1674493600779_8055921_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924244016_2641351"
      }
    ]
  },
  {
    "id": "1667924244016_2641351",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Conspiracy-1-Aliens.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924244016_2641351_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      },
      {
        "id": "1667924244016_2641351_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924301036_4713851"
      }
    ]
  },
  {
    "id": "1667924301036_4713851",
    "layout": "multiplechoice",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "How reliable do you find this post?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": "https://www.getbadnews.com/wp-content/uploads/2023/09/Real-3-Honda.png",
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924301036_4713851_choice_0",
        "text": "Not at all 1",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_1",
        "text": "2",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_2",
        "text": "3",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_3",
        "text": "4",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_4",
        "text": "5",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_5",
        "text": "6",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      },
      {
        "id": "1667924301036_4713851_choice_6",
        "text": "7 Very",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924399897_9961701"
      }
    ]
  },
  {
    "id": "1667924399897_9961701",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Thank you so much! We just have a few more very short (and anonymous) questions about your background. First of all, what is your gender?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924399897_9961701_choice_0",
        "text": "Female",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924449093_5448621"
      },
      {
        "id": "1667924399897_9961701_choice_1",
        "text": "Male",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924449093_5448621"
      },
      {
        "id": "1667924399897_9961701_choice_2",
        "text": "Non-binary",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924449093_5448621"
      },
      {
        "id": "1667924399897_9961701_choice_3",
        "text": "Other",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924449093_5448621"
      },
      {
        "id": "1667924399897_9961701_choice_4",
        "text": "Prefer not to say",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924449093_5448621"
      }
    ]
  },
  {
    "id": "1667924449093_5448621",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Thanks! And what is your age?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924449093_5448621_choice_0",
        "text": "Under 18",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_1",
        "text": "18-25",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_2",
        "text": "26-35",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_3",
        "text": "36-45",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_4",
        "text": "46-55",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_5",
        "text": "56-65",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      },
      {
        "id": "1667924449093_5448621_choice_6",
        "text": "Over 65",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924505398_4741201"
      }
    ]
  },
  {
    "id": "1667924505398_4741201",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Thanks! And where would you place yourself on the political spectrum?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924505398_4741201_choice_0",
        "text": "Very left-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_1",
        "text": "Left-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_2",
        "text": "A bit left-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_3",
        "text": "Middle of the road",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_4",
        "text": "A bit right-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_5",
        "text": "Right-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      },
      {
        "id": "1667924505398_4741201_choice_6",
        "text": "Very right-wing",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1667924572211_2568791"
      }
    ]
  },
  {
    "id": "1667924572211_2568791",
    "layout": "dropdown",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "Thanks! Final question: How much would you say you trust mainstream news organisations?",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1667924572211_2568791_choice_0",
        "text": "Not at all",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      },
      {
        "id": "1667924572211_2568791_choice_1",
        "text": "Not really",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      },
      {
        "id": "1667924572211_2568791_choice_2",
        "text": "Neither trust nor distrust",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      },
      {
        "id": "1667924572211_2568791_choice_3",
        "text": "A bit",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      },
      {
        "id": "1667924572211_2568791_choice_4",
        "text": "A lot",
        "slide": null,
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {}
        },
        "goTo": "1636393312805_8488181"
      }
    ]
  },
  {
    "id": "1636393312805_8488181",
    "layout": "text",
    "isSlider": false,
    "storyBadge": "TROLLING",
    "question": {
      "text": "So here we are, at the close. Thank you for playing, captain. It's been an honor working with you. Hope to see you again, some day.",
      "name": "",
      "tagline": "",
      "showForwardedTag": false,
      "image": null,
      "line1": "",
      "line2": ""
    },
    "choices": [
      {
        "id": "1636393312805_8488181_choice_0",
        "text": "So long, partner",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "TROLLING"
        },
        "goTo": null
      },
      {
        "id": "1636393312805_8488181_choice_1",
        "text": "I want my badge!",
        "slide": {
          "text": "",
          "name": "",
          "tagline": "",
          "showForwardedTag": false,
          "image": null,
          "line1": "",
          "line2": ""
        },
        "effects": {
          "followers": 0,
          "credibility": 0,
          "variables": {},
          "badge": "TROLLING"
        },
        "goTo": null
      }
    ]
  }
];

export const SCENARIOS: Record<string, ScenarioNode> = {};
SCENARIO_LIST.forEach(s => { SCENARIOS[s.id] = s; });

// First node of the game
export const FIRST_NODE_ID = "1632751047527_9491091";

// Total node count for verification
export const TOTAL_NODES = 369;
