"use client";

import { useMemo } from "react";
import { useRTL } from "@/components/shared/rtl-provider";
import DOMPurify from "dompurify";

/**
 * Lightweight markdown renderer for chat messages.
 * Supports: headings, bold, italic, lists, links, code blocks, inline code, blockquotes, horizontal rules.
 * No external dependencies — keeps bundle size minimal.
 */

interface MarkdownProps {
  content: string;
  isRTL?: boolean;
}

export function MarkdownRenderer({ content, isRTL }: MarkdownProps) {
  const html = useMemo(() => {
    const rawHtml = parseMarkdown(content);
    // Sanitize with DOMPurify to prevent XSS
    return typeof window !== "undefined" ? DOMPurify.sanitize(rawHtml) : rawHtml;
  }, [content]);

  return (
    <div
      className="md-rendered"
      dir={isRTL ? "rtl" : "ltr"}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ lineHeight: 1.75, wordBreak: "break-word" }}
    />
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseInline(text: string): string {
  let result = escapeHtml(text);

  // Bold + Italic: ***text*** or ___text___
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  result = result.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");

  // Bold: **text** or __text__
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic: *text* or _text_
  result = result.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, "<em>$1</em>");
  result = result.replace(/(?<!\w)_([^_]+?)_(?!\w)/g, "<em>$1</em>");

  // Inline code: `code`
  result = result.replace(/`([^`]+?)`/g,
    '<code style="background:rgba(139,92,246,0.1);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>'
  );

  // Links: [text](url)
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#8B5CF6;text-decoration:underline">$1</a>'
  );

  // Strikethrough: ~~text~~
  result = result.replace(/~~(.+?)~~/g, "<del>$1</del>");

  return result;
}

function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  const output: string[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLang = "";
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
        codeContent = [];
      } else {
        inCodeBlock = false;
        output.push(
          `<pre style="background:var(--bg-primary,#1a1a2e);border:1px solid var(--border-primary,#333);border-radius:10px;padding:14px 16px;overflow-x:auto;margin:8px 0;font-size:12.5px;line-height:1.6">` +
          `<code style="font-family:monospace;color:var(--text-primary,#e0e0e0)">${escapeHtml(codeContent.join("\n"))}</code></pre>`
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Close open list if line doesn't continue it
    const isUnorderedItem = /^(\s*)[*\-+]\s+/.test(line);
    const isOrderedItem = /^(\s*)\d+\.\s+/.test(line);
    if (inList && !isUnorderedItem && !isOrderedItem && line.trim() !== "") {
      output.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }

    // Empty line
    if (line.trim() === "") {
      if (inList) {
        output.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      continue;
    }

    // Headings: # ## ### #### 
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = parseInline(headingMatch[2]);
      const sizes = ["", "1.3em", "1.15em", "1.05em", "1em"];
      const weights = ["", "800", "700", "700", "600"];
      output.push(
        `<div style="font-size:${sizes[level]};font-weight:${weights[level]};margin:12px 0 6px;color:var(--text-primary)">${text}</div>`
      );
      continue;
    }

    // Horizontal rule: --- or ***
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      output.push('<hr style="border:none;border-top:1px solid var(--border-primary,#444);margin:12px 0" />');
      continue;
    }

    // Blockquote: > text
    const quoteMatch = line.match(/^>\s*(.*)$/);
    if (quoteMatch) {
      output.push(
        `<blockquote style="border-left:3px solid #8B5CF6;margin:8px 0;padding:6px 14px;color:var(--text-secondary);font-style:italic;background:rgba(139,92,246,0.05);border-radius:0 8px 8px 0">${parseInline(quoteMatch[1])}</blockquote>`
      );
      continue;
    }

    // Unordered list: - item, * item, + item
    if (isUnorderedItem) {
      const itemContent = line.replace(/^(\s*)[*\-+]\s+/, "");
      if (!inList || listType !== "ul") {
        if (inList) output.push("</ol>");
        output.push('<ul style="margin:4px 0;padding-left:20px;list-style:disc">');
        inList = true;
        listType = "ul";
      }
      output.push(`<li style="margin:3px 0">${parseInline(itemContent)}</li>`);
      continue;
    }

    // Ordered list: 1. item
    if (isOrderedItem) {
      const itemContent = line.replace(/^(\s*)\d+\.\s+/, "");
      if (!inList || listType !== "ol") {
        if (inList) output.push("</ul>");
        output.push('<ol style="margin:4px 0;padding-left:20px;list-style:decimal">');
        inList = true;
        listType = "ol";
      }
      output.push(`<li style="margin:3px 0">${parseInline(itemContent)}</li>`);
      continue;
    }

    // Regular paragraph
    output.push(`<p style="margin:4px 0">${parseInline(line)}</p>`);
  }

  // Close any open list
  if (inList) {
    output.push(listType === "ul" ? "</ul>" : "</ol>");
  }

  // Close unclosed code block
  if (inCodeBlock) {
    output.push(
      `<pre style="background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:10px;padding:14px 16px;overflow-x:auto;font-size:12.5px">` +
      `<code style="font-family:monospace">${escapeHtml(codeContent.join("\n"))}</code></pre>`
    );
  }

  return output.join("\n");
}
