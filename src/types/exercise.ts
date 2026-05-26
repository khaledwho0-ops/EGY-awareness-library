/**
 * EXERCISE TYPES + ZOD SCHEMAS
 * Framework: §13.2 Exercise Template (13 fields)
 * Framework: §10.2 MoSCoW per MVP
 *
 * DeepReal: 14 exercises (5 source + 5 detect + 4 bias)
 * Mental Health: 14 exercises (5 emotion + 4 stigma + 5 mixed)
 * Religion Hub: 14 exercises (7 positive + 4 threats + 3 boundaries)
 */
import { z } from "zod";
import { MVPEnum } from "./source";

export const DifficultyEnum = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof DifficultyEnum>;

// Exercise categories per MVP (§10.2 MoSCoW)
export const ExerciseCategoryEnum = z.enum([
  // DeepReal
  "source_credibility",
  "detection",
  "bias",
  "bias_identification",
  // Mental Health
  "emotional_awareness",
  "stigma_reduction",
  "mixed",
  "mixed_mh",
  // Religion Hub
  "positive_coping",
  "negative_coping_awareness",
  "threat_awareness",
  "boundaries",
]);
export type ExerciseCategory = z.infer<typeof ExerciseCategoryEnum>;

// Interactive task types
export const TaskTypeEnum = z.enum([
  "ranking",
  "matching",
  "multiple_choice",
  "true_false",
  "scenario_response",
  "source_evaluation",
  "claim_decomposition",
  "reflection",
  "decision_tree",
]);
export type TaskType = z.infer<typeof TaskTypeEnum>;

// COM-B Behaviour Change Target (§Template Non-Negotiable #4)
export const ComBTargetEnum = z.enum([
  "Capability/Psychological",
  "Capability/Physical",
  "Motivation/Reflective",
  "Motivation/Automatic",
  "Opportunity/Social",
  "Opportunity/Physical",
]);
export type ComBTarget = z.infer<typeof ComBTargetEnum>;

// §13.2 Exercise Template — EXACT 13 fields + COM-B extension
export const ExerciseSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  titleAr: z.string().optional(), // Arabic title
  mvp: MVPEnum,
  day: z.number().int().min(1).max(14),
  duration: z.number().int().min(5).max(20), // minutes (§10: 10-15 min per exercise)
  difficulty: DifficultyEnum,
  category: ExerciseCategoryEnum,

  // Learning Objective (§13.2: "After this exercise, the user will be able to...")
  learningObjective: z.string(),
  learningObjectiveAr: z.string().optional(),

  // Bloom's level (§8.1: Anderson & Krathwohl 2001)
  bloomLevel: z.enum(["remember", "understand", "apply", "analyze", "evaluate", "create"]),

  // Content
  content: z.object({
    scenario: z.string(), // Scenario or information block
    scenarioAr: z.string().optional(),
    task: z.object({
      type: TaskTypeEnum,
      instructions: z.string(),
      instructionsAr: z.string().optional(),
      items: z.array(z.object({
        id: z.string(),
        text: z.string(),
        textAr: z.string().optional(),
        isCorrect: z.boolean().optional(),
        explanation: z.string().optional(),
        explanationAr: z.string().optional(),
      })),
    }),
    feedback: z.object({
      correct: z.string(),
      correctAr: z.string().optional(),
      incorrect: z.string(),
      incorrectAr: z.string().optional(),
    }),
  }),

  // What Not To Do (§13.2)
  whatNotToDo: z.array(z.string()).min(1).max(3),
  whatNotToDoAr: z.array(z.string()).optional(),

  // KeyHunter reference (§7: linked entry)
  keyhunterId: z.string().nullable().optional(),

  // Evidence citation (§13.2)
  evidence: z.string(),

  // Safety note (§13.2, §6.3)
  safetyNote: z.string().nullable().optional(),
  safetyNoteAr: z.string().optional(),

  // Confidence tracking (§18 Mode 3, §23.1 #3)
  trackConfidence: z.boolean().default(true),

  // 8-Gate Check integration (§17.4)
  requiresEightGate: z.boolean().default(false),

  // COM-B Behaviour Change Target (Template Non-Negotiable #4)
  com_b_target: ComBTargetEnum.optional(),
  com_b_mechanism: z.string().optional(),

  // Expert Sign-Off Workflow (§23.1 #6 Addition)
  approvalState: z.enum(["draft", "reviewed", "approved"]).default("draft"),
  reviewedBy: z.string().optional(),
  approvedAt: z.string().optional(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;
