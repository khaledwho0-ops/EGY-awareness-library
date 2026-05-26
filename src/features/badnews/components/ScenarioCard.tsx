"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ScenarioNode, Choice, SlideContent } from "../data/scenarios";
import { interpolate, stripHtml } from "../utils";
import { User, CheckCircle2, Newspaper, Image as ImageIcon } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

interface Props {
  node: ScenarioNode;
  variables: Record<string, string>;
  onChoice: (choice: Choice) => void;
}

/**
 * ScenarioCard renders ALL 8 layout types from the Bad News game:
 *  text, social-post, headline, image, newspaper, dropdown, multiplechoice, avatar-picker
 *
 * For slider nodes, each choice's `slide` property contains
 * the content that the player is choosing between.
 */
export function ScenarioCard({ node, variables, onChoice }: Props) {
  const { t } = useRTL();
  const [selectedSlide, setSelectedSlide] = useState(0);
  const layout = node.layout;
  const isSlider = node.isSlider && node.choices.length > 1;

  const questionText = interpolate(stripHtml(node.question.text), variables);

  // ═══════════════════════════════════════════════════
  // SLIDER LAYOUTS — user swipes between content options
  // ═══════════════════════════════════════════════════
  if (isSlider) {
    return (
      <div className="bn-scenario">
        {/* Question / instruction text */}
        {questionText && <div className="bn-dm-text">{questionText}</div>}

        {/* Slide preview */}
        <SliderPreview
          layout={layout}
          slide={node.choices[selectedSlide]?.slide ?? null}
          variables={variables}
        />

        {/* Slide dots */}
        <div className="bn-slider-dots">
          {node.choices.map((_, i) => (
            <button
              key={i}
              className={`bn-slider-dot ${i === selectedSlide ? "bn-slider-dot-active" : ""}`}
              onClick={() => setSelectedSlide(i)}
              aria-label={`Option ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="bn-slider-nav">
          <button
            className="bn-slider-arrow"
            disabled={selectedSlide === 0}
            onClick={() => setSelectedSlide((p) => Math.max(0, p - 1))}
          >
            ←
          </button>
          <span className="bn-slider-counter">
            {selectedSlide + 1} / {node.choices.length}
          </span>
          <button
            className="bn-slider-arrow"
            disabled={selectedSlide === node.choices.length - 1}
            onClick={() => setSelectedSlide((p) => Math.min(node.choices.length - 1, p + 1))}
          >
            →
          </button>
        </div>

        {/* Confirm selection */}
        <button
          className="bn-btn-primary bn-slider-confirm"
          onClick={() => onChoice(node.choices[selectedSlide])}
        >
          {interpolate(node.choices[selectedSlide]?.text || "Choose this", variables)}
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // NON-SLIDER LAYOUTS
  // ═══════════════════════════════════════════════════
  return (
    <div className="bn-scenario">
      {/* Content card based on layout type */}
      <ContentCard layout={layout} node={node} variables={variables} />

      {/* Choice buttons */}
      <div className="bn-choices">
        {node.choices.map((choice, i) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bn-choice-btn"
            onClick={() => onChoice(choice)}
          >
            {interpolate(choice.text, variables)}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────
// ContentCard — renders the question/content for non-slider layouts
// ───────────────────────────────────────────────────
function ContentCard({
  layout,
  node,
  variables,
}: {
  layout: string;
  node: ScenarioNode;
  variables: Record<string, string>;
}) {
  const { t } = useRTL();
  const q = node.question;
  const text = interpolate(stripHtml(q.text), variables);

  switch (layout) {
    case "text":
    case "dropdown":
    case "multiplechoice":
    case "avatar-picker":
      return (
        <div className="bn-card bn-card-dm">
          {q.image && <img src={q.image} alt="" className="bn-card-image" />}
          {text && <div className="bn-dm-text">{text}</div>}
        </div>
      );

    case "social-post":
      return (
        <div className="bn-card bn-card-tweet">
          <div className="bn-tweet-header">
            {q.image ? (
              <img src={q.image} alt="" className="bn-tweet-avatar" />
            ) : (
              <div className="bn-tweet-avatar-placeholder">
                <User size={20} />
              </div>
            )}
            <div className="bn-tweet-author">
              <div className="bn-tweet-name">
                {interpolate(q.name, variables) || "Anonymous"}
                <CheckCircle2 size={14} className="bn-tweet-verified" />
              </div>
              {q.tagline && (
                <div className="bn-tweet-handle">
                  {interpolate(q.tagline, variables)}
                </div>
              )}
            </div>
          </div>
          {text && <div className="bn-tweet-body">{text}</div>}
          {q.showForwardedTag && (
            <div className="bn-tweet-forwarded">{t({ en: "↻ Forwarded", ar: "↻ معاد توجيهه", arEG: "↻ متحوّل" })}</div>
          )}
        </div>
      );

    case "headline":
      return (
        <div className="bn-card bn-card-headline">
          <div className="bn-headline-label">
            <Newspaper size={14} /> {t({ en: "NEWS HEADLINE", ar: "عنوان خبري", arEG: "عنوان خبري" })}
          </div>
          {text && <h2 className="bn-headline-text">{text}</h2>}
        </div>
      );

    case "newspaper":
      return (
        <div className="bn-card bn-card-newspaper">
          <div className="bn-newspaper-masthead">
            <Newspaper size={16} /> {t({ en: "THE DAILY MISINFORMER", ar: "المضلل اليومي", arEG: "المضلل اليومي" })}
          </div>
          <div className="bn-newspaper-divider" />
          {text && <h2 className="bn-newspaper-headline">{text}</h2>}
        </div>
      );

    case "image":
      return (
        <div className="bn-card bn-card-meme">
          <div className="bn-meme-label">
            <ImageIcon size={14} /> {t({ en: "IMAGE POST", ar: "منشور مصور", arEG: "بوست مصور" })}
          </div>
          {q.image && <img src={q.image} alt="" className="bn-meme-img" />}
          {(q.line1 || q.line2) && (
            <div className="bn-meme-captions">
              {q.line1 && (
                <div className="bn-meme-line1">{interpolate(q.line1, variables)}</div>
              )}
              {q.line2 && (
                <div className="bn-meme-line2">{interpolate(q.line2, variables)}</div>
              )}
            </div>
          )}
        </div>
      );

    default:
      return text ? <div className="bn-dm-text">{text}</div> : null;
  }
}

// ───────────────────────────────────────────────────
// SliderPreview — renders the current slide in a slider node
// ───────────────────────────────────────────────────
function SliderPreview({
  layout,
  slide,
  variables,
}: {
  layout: string;
  slide: SlideContent | null;
  variables: Record<string, string>;
}) {
  const { t } = useRTL();
  if (!slide) return null;

  const text = interpolate(stripHtml(slide.text), variables);
  const line1 = interpolate(slide.line1, variables);
  const line2 = interpolate(slide.line2, variables);
  const name = interpolate(slide.name, variables);
  const tagline = interpolate(slide.tagline, variables);

  switch (layout) {
    case "social-post":
      return (
        <div className="bn-card bn-card-tweet">
          <div className="bn-tweet-header">
            {slide.image ? (
              <img src={slide.image} alt="" className="bn-tweet-avatar" />
            ) : (
              <div className="bn-tweet-avatar-placeholder">
                <User size={20} />
              </div>
            )}
            <div className="bn-tweet-author">
              <div className="bn-tweet-name">{name || "Anonymous"}</div>
              {tagline && <div className="bn-tweet-handle">{tagline}</div>}
            </div>
          </div>
          {text && <div className="bn-tweet-body">{text}</div>}
          {slide.showForwardedTag && (
            <div className="bn-tweet-forwarded">{t({ en: "↻ Forwarded", ar: "↻ معاد توجيهه", arEG: "↻ متحوّل" })}</div>
          )}
        </div>
      );

    case "headline":
      return (
        <div className="bn-card bn-card-headline">
          <div className="bn-headline-label">
            <Newspaper size={14} /> {t({ en: "NEWS HEADLINE", ar: "عنوان خبري", arEG: "عنوان خبري" })}
          </div>
          <h2 className="bn-headline-text">{text}</h2>
        </div>
      );

    case "image":
      return (
        <div className="bn-card bn-card-meme">
          {slide.image && <img src={slide.image} alt="" className="bn-meme-img" />}
          {(line1 || line2) && (
            <div className="bn-meme-captions">
              {line1 && <div className="bn-meme-line1">{line1}</div>}
              {line2 && <div className="bn-meme-line2">{line2}</div>}
            </div>
          )}
        </div>
      );

    default:
      return text ? (
        <div className="bn-card bn-card-dm">
          <div className="bn-dm-text">{text}</div>
        </div>
      ) : null;
  }
}
