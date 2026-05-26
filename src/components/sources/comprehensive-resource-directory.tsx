"use client";

import { Globe, Layers3, Network, Users } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  COMPREHENSIVE_RESOURCE_CATEGORIES,
  type ResourceCategory,
} from "@/data/resources/comprehensive-resource-list";

function categoryIcon(categoryId: string) {
  if (categoryId.includes("communities")) return <Users size={18} />;
  if (categoryId.includes("websites")) return <Globe size={18} />;
  if (categoryId.includes("open-source")) return <Network size={18} />;
  return <Layers3 size={18} />;
}

function ResourceCategorySection({
  category,
  isRTL,
}: {
  category: ResourceCategory;
  isRTL: boolean;
}) {
  return (
    <section
      id={category.id}
      className="glass-card"
      style={{
        padding: "var(--space-xl)",
        scrollMarginTop: "calc(var(--navbar-height) + 20px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ color: "var(--accent-cta)" }}>{categoryIcon(category.id)}</div>
        <div>
          <h3 style={{ margin: 0 }}>{isRTL ? category.titleAr : category.titleEn}</h3>
        </div>
      </div>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16 }}>
        {isRTL ? category.summaryAr : category.summaryEn}
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {category.entries.map((entry) => (
          <article
            key={`${category.id}-${entry.name}`}
            className="glass-card"
            style={{ padding: "var(--space-lg)", background: "rgba(15,23,42,0.55)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              <div>
                <strong style={{ display: "block", marginBottom: 4 }}>{entry.name}</strong>
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  {entry.type} · {entry.country}
                </span>
              </div>
              <div className="badge" style={{ background: "rgba(59,130,246,0.12)", color: "var(--accent-cta)" }}>
                {entry.yearFounded} · {entry.status}
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 10 }}>
              {isRTL ? entry.descriptionAr : entry.descriptionEn}
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 10 }}>
              <strong>{isRTL ? "الصلة بالمشروع:" : "Project relevance:"}</strong>{" "}
              {isRTL ? entry.relevanceAr : entry.relevanceEn}
            </p>
            <a href={entry.url} target="_blank" rel="noreferrer" style={{ color: "var(--accent-cta)" }}>
              {entry.url}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ComprehensiveResourceDirectory() {
  const { isRTL } = useRTL();

  return (
    <div id="resource-directory" style={{ marginTop: "var(--space-2xl)" }}>
      <div className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-lg)" }}>
        <h2 style={{ marginBottom: 8 }}>
          {isRTL ? "الدليل الشامل للموارد" : "Comprehensive Resource Directory"}
        </h2>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>
          {isRTL
            ? "هذا هو تنفيذ CHUNK 5 داخل المنصة: مبادرات وألعاب وأدوات وجهات رسمية ومنظمات وباحثون ومشاريع مفتوحة ومواقع ومجتمعات مرتبطة مباشرة بالتضليل ومحو الأمية الإعلامية في السياق المصري والعربي والعالمي."
            : "This is the in-app implementation of CHUNK 5: initiatives, games, tools, official bodies, NGOs, researchers, open-source projects, websites, and communities directly relevant to misinformation and media literacy in Egyptian, Arab, and global contexts."}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {COMPREHENSIVE_RESOURCE_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="btn-secondary no-underline"
              style={{ padding: "10px 14px" }}
            >
              {isRTL ? category.titleAr : category.titleEn}
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {COMPREHENSIVE_RESOURCE_CATEGORIES.map((category) => (
          <ResourceCategorySection key={category.id} category={category} isRTL={isRTL} />
        ))}
      </div>
    </div>
  );
}
