export const REAL_WORLD_DATA = {
  misinformation: {
    global: {
      costBillion: 417,
      year: 2024,
      source: "Sopra Steria Study (2024)",
      breakdown: [
        { labelEn: "Consumer Fraud", labelAr: "احتيال المستهلكين", value: 227 },
        { labelEn: "Deepfakes & AI", labelAr: "التزييف العميق والذكاء الاصطناعي", value: 11 },
        { labelEn: "Crypto Scams", labelAr: "عمليات احتيال العملات المشفرة", value: 5.5 },
      ],
      inoculationEffectiveness: 21, // % reduction in susceptibility (Cambridge Bad News)
      inoculationSource: "Cambridge University 'Bad News' Game Research (2023-2024)",
    },
    egypt: {
      rate2024: 13.8,
      rate2025: 14.5,
      source: "Egyptian Cabinet Media Centre (2025)",
      sectors: [
        { labelEn: "Economy", labelAr: "الاقتصاد", value: 20.3 },
        { labelEn: "Education", labelAr: "التعليم", value: 11.4 },
        { labelEn: "Health", labelAr: "الصحة", value: 11.0 },
        { labelEn: "State Projects", labelAr: "مشاريع الدولة", value: 45.7 },
      ]
    }
  },
  mentalHealth: {
    global: {
      treatmentGapPercent: 75,
      source: "World Health Organization (WHO, 2024)",
    },
    egypt: {
      prevalencePercent: 25,
      treatmentGapPercent: 80, // Estimated WHO EMRO / CAPMAS
      source: "WHO EMRO / Ministry of Health National Survey",
      stigmaReductionGoal: 30, // Target reduction
    }
  },
  religion: {
    global: {
      positiveCopingPercent: 65,
      source: "Brief RCOPE Global Studies",
    },
    egypt: {
      religiousCopingPrevalence: 85,
      source: "Local Psychological Coping Surveys (Egypt)",
    }
  },
  fightBack: {
    global: {
      emotionalSharingPercent: 70,
      source: "MIT Study on Twitter/X Information Spread",
      description: "People share fake news due to emotional arousal, not just ignorance."
    }
  },
  prebunking: {
    global: {
      efficacyVsDebunking: 50,
      source: "Cambridge University Psychology Dept",
      description: "Prebunking (active inoculation) is 50% more effective at preventing belief in misinformation than passive debunking after the fact."
    }
  },
  gamification: {
    global: {
      retentionIncrease: 40,
      completionIncrease: 60,
      source: "EdTech Research Studies (2023)",
    }
  },
  scienceTrust: {
    global: {
      sourceRequirementGenZ: 80,
      source: "Edelman Trust Barometer (2024)",
    }
  },
  echoChambers: {
    global: {
      strictEchoChamberPercent: 8,
      source: "Reuters Institute Digital News Report (2023)",
      description: "Only 6-8% of users are in strict partisan echo chambers. The real issue is emotional manipulation in diverse feeds."
    }
  },
  digitalLiteracy: {
    egypt: {
      youthInternetPenetration: 89,
      generalPenetration: 72.2,
      source: "CAPMAS & OECD Digital Reports (2024)",
      description: "Youth connectivity is high, but digital cognitive resilience lags, necessitating targeted inoculation."
    }
  }
};
