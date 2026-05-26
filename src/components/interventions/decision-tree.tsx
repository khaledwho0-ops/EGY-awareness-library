"use client";

import { useState, useCallback } from "react";
import { ChevronDown, ArrowRight, AlertTriangle, Heart, Phone } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * DECISION TREE NAVIGATOR — Q48
 * If/then action routing using Accordion UI
 * max-height:auto collapse/expand without exhausting vertical scroll
 * 
 * For MH + Religion Hub: "If distressed → stop → ground → read disclaimer → seek help"
 * Framework: §18 Mode 10
 */

export interface DecisionNode {
  id: string;
  condition: string;
  conditionAr?: string;
  icon?: React.ReactNode;
  actions: {
    label: string;
    labelAr?: string;
    description: string;
    descriptionAr?: string;
    type: "action" | "warning" | "resource" | "next";
    link?: string;
    nextNodeId?: string;
  }[];
}

// Pre-built decision trees for MH + Religion Hub
const MH_DISTRESS_TREE: DecisionNode[] = [
  {
    id: "mh-1",
    condition: "If you are feeling distressed while using this exercise...",
    icon: <AlertTriangle size={16} />,
    actions: [
      { label: "Stop the exercise", description: "Close this screen. You can return later. Your progress is saved.", type: "action" },
      { label: "Ground yourself", description: "Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.", type: "action" },
      { label: "Read the disclaimer", description: "This is educational content only — not diagnosis or treatment.", type: "warning" },
      { label: "Contact crisis support", description: "Egypt Mental Health Hotline: 08008880700 | Emergency: 123", type: "resource", link: "tel:08008880700" },
    ]
  },
  {
    id: "mh-2",
    condition: "If you recognize symptoms in yourself...",
    icon: <Heart size={16} />,
    actions: [
      { label: "This is normal", description: "Recognizing patterns is part of mental health literacy — it does NOT mean you have a diagnosis.", type: "action" },
      { label: "Do NOT self-diagnose", description: "Only qualified professionals can diagnose. This app provides education, never diagnosis.", type: "warning" },
      { label: "Consider talking to someone", description: "A trusted friend, family member, university counselor, or mental health professional.", type: "action" },
      { label: "Find professional help", description: "Use the Trusted Directory to find local services near you.", type: "resource", link: "/sources" },
    ]
  },
  {
    id: "mh-3",
    condition: "If someone you know seems to be struggling...",
    icon: <Phone size={16} />,
    actions: [
      { label: "Listen without judgment", description: "Ask 'How are you really doing?' and listen. Don't try to fix or diagnose.", type: "action" },
      { label: "Don't force", description: "You cannot force someone to seek help. You can share resources gently.", type: "warning" },
      { label: "Share resources", description: "Send them the crisis numbers or offer to go with them to a counselor.", type: "resource" },
      { label: "Take care of yourself too", description: "Supporting others is important, but you also deserve support.", type: "action" },
    ]
  },
];

const RELIGION_COPING_TREE: DecisionNode[] = [
  {
    id: "rh-1",
    condition: "If religious content triggers guilt or anxiety...",
    icon: <AlertTriangle size={16} />,
    actions: [
      { label: "Pause and breathe", description: "This exercise is about understanding, not judgment. Take a moment.", type: "action" },
      { label: "Remember the scope", description: "This is psychology of religion — reflection, not fatwa or religious ruling.", type: "warning" },
      { label: "Distinguish discomfort from danger", description: "Discomfort with new perspectives can be growth. Distress is different — stop if distressed.", type: "action" },
      { label: "Seek spiritual guidance", description: "For theological questions, consult a qualified religious scholar.", type: "resource" },
    ]
  },
  {
    id: "rh-2",
    condition: "If you notice negative coping patterns...",
    actions: [
      { label: "Awareness is the first step", description: "Noticing a pattern doesn't mean you're 'bad.' It means you're becoming aware.", type: "action" },
      { label: "Positive alternatives exist", description: "The exercises show how to shift from negative to positive coping — gently, not forcefully.", type: "action" },
      { label: "Professional support", description: "A therapist trained in spirituality-integrated care can help.", type: "resource" },
    ]
  },
];

interface DecisionTreeProps {
  mvp: "mental-health" | "religion-hub";
}

export function DecisionTreeAccordion({ mvp }: DecisionTreeProps) {
  const nodes = mvp === "mental-health" ? MH_DISTRESS_TREE : RELIGION_COPING_TREE;
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const toggle = useCallback((id: string) => {
    setOpenNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const accentColor = mvp === "mental-health" ? "var(--accent-mentalhealth)" : "var(--accent-religionhub)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h5 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 4 }}>
        🌳 {t({ en: "Decision Tree Navigator", ar: "ملاح شجرة القرارات", arEG: "ملاح شجرة القرارات" })}
      </h5>
      {nodes.map(node => {
        const isOpen = openNodes.has(node.id);
        return (
          <div
            key={node.id}
            style={{
              border: `1px solid ${isOpen ? accentColor : "var(--border-primary)"}`,
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              transition: "border-color 0.2s ease",
            }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggle(node.id)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: isOpen ? `color-mix(in srgb, ${accentColor} 8%, transparent)` : "var(--bg-card)",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-primary)",
                textAlign: "left",
              }}
            >
              {node.icon && <span style={{ color: accentColor }}>{node.icon}</span>}
              <span style={{ flex: 1 }}>{node.condition}</span>
              <ChevronDown
                size={16}
                style={{
                  color: "var(--text-muted)",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Accordion Body */}
            <div
              style={{
                maxHeight: isOpen ? 600 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div style={{ padding: "4px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                {node.actions.map((action, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 8,
                      background: action.type === "warning"
                        ? "rgba(245,158,11,0.08)"
                        : action.type === "resource"
                          ? "rgba(16,185,129,0.08)"
                          : "var(--bg-secondary)",
                      border: `1px solid ${action.type === "warning" ? "rgba(245,158,11,0.2)" : action.type === "resource" ? "rgba(16,185,129,0.2)" : "var(--border-subtle)"}`,
                    }}
                  >
                    <ArrowRight size={14} style={{ color: accentColor, marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: "var(--text-primary)" }}>{action.label}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{action.description}</div>
                      {action.link && (
                        <a href={action.link} style={{ fontSize: 12, color: accentColor, fontWeight: 600, marginTop: 4, display: "inline-block" }}>
                          {t({ en: "Go \u2192", ar: "← اذهب", arEG: "← اذهب" })}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
