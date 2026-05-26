import * as cheerio from "cheerio";

/**
 * Extracts and cleans HTML content into a token-efficient markdown-like format.
 * Strips all interactive, style, and media bloat.
 */
export function extractCleanMarkdown(html: string): string {
  if (!html) return "";

  try {
    const $ = cheerio.load(html);

    // Strip out unnecessary interactive, styling, and media tags
    $("script, style, noscript, iframe, img, svg, video, audio, canvas, button, nav, footer, header").remove();

    let cleanText = "";

    // Traverse the DOM to convert structural elements into pseudo-markdown
    $("*").each((_, el) => {
      if (el.type !== "tag") return;

      const tag = el.tagName.toLowerCase();
      const node = $(el);

      if (tag === "h1") {
        cleanText += `\n# ${node.text().trim()}\n\n`;
      } else if (tag === "h2") {
        cleanText += `\n## ${node.text().trim()}\n\n`;
      } else if (tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") {
        cleanText += `\n### ${node.text().trim()}\n\n`;
      } else if (tag === "p") {
        const text = node.text().trim();
        if (text) cleanText += `${text}\n\n`;
      } else if (tag === "a") {
        const text = node.text().trim();
        const href = node.attr("href");
        // Only preserve meaningful links, avoid self-referential or empty
        if (text && href && href.startsWith("http")) {
          // Replace the node with the markdown version to process it inline or we can just append it.
          // Since we are doing a flat extraction from all tags, doing it inline is tricky if we just iterate *
          // Let's modify the approach to process text nodes or use a robust reducer.
        }
      }
    });

    // To properly preserve links within paragraphs, a better approach is replacing tags first
    // then getting text. Let's do that instead of flat traversal.
    return fallbackExtraction($);
  } catch (error) {
    console.error("DOM Parser Error:", error);
    return "";
  }
}

function fallbackExtraction($: cheerio.CheerioAPI): string {
  // Replace links with markdown format [text](href) inline
  $("a").each((_, el) => {
    const node = $(el);
    const text = node.text().trim();
    const href = node.attr("href");
    if (text && href && href.startsWith("http")) {
      node.replaceWith(`[${text}](${href})`);
    } else {
      node.replaceWith(text);
    }
  });

  // Replace headers with markdown headers
  $("h1").each((_, el) => {
    $(el).replaceWith(`\n# ${$(el).text().trim()}\n\n`);
  });
  $("h2").each((_, el) => {
    $(el).replaceWith(`\n## ${$(el).text().trim()}\n\n`);
  });
  $("h3, h4, h5, h6").each((_, el) => {
    $(el).replaceWith(`\n### ${$(el).text().trim()}\n\n`);
  });

  // Replace paragraphs with newlines
  $("p").each((_, el) => {
    $(el).replaceWith(`\n${$(el).text().trim()}\n\n`);
  });

  $("li").each((_, el) => {
    $(el).replaceWith(`\n- ${$(el).text().trim()}`);
  });

  // Extract the text content
  let text = $("body").text() || $.text();

  // Clean up excessive newlines and spaces
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n\s*\n/g, "\n\n");
  
  text = text.trim();

  // Truncate to 8,000 characters to prevent LLM token crashes
  if (text.length > 8000) {
    text = text.substring(0, 8000) + "... [CONTENT TRUNCATED FOR LENGTH]";
  }

  return text;
}
