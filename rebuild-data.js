const fs = require('fs');
const path = require('path');
const rawData = JSON.parse(fs.readFileSync('badnews-raw.json', 'utf8'));

// ──────────────────────────────────────────────────────────
// 1. BADGES
// ──────────────────────────────────────────────────────────
const badges = rawData.stories.map(story => ({
  id: story.badge_name,
  name: story.badge_name,
  description: story.badge_description || '',
  expandedDescription: story.badge_description_expanded || '',
  icon: Array.isArray(story.badge_image) ? story.badge_image[0] : null
}));

// ──────────────────────────────────────────────────────────
// 2. SCENARIOS — faithful extraction of every card
// ──────────────────────────────────────────────────────────
const scenarios = [];

rawData.stories.forEach((story) => {
  story.cards.forEach(card => {
    const layout = card.acf_fc_layout;
    const isSlider = card.slider === true;

    // Base node
    const node = {
      id: card.tag,
      layout: layout,
      isSlider: isSlider,
      storyBadge: story.badge_name,
      question: {
        text: '',
        name: '',
        tagline: '',
        showForwardedTag: false,
        image: null,
        line1: '',
        line2: ''
      },
      choices: []
    };

    // ── Parse question ──
    if (card.question) {
      node.question = {
        text: card.question.text || '',
        name: card.question.name || '',
        tagline: card.question.tagline || '',
        showForwardedTag: card.question.show_forwarded_tag || false,
        image: Array.isArray(card.question.image) ? card.question.image[0] : (card.question.image || null),
        line1: card.question.line_1 || '',
        line2: card.question.line_2 || ''
      };
    }

    // ── Avatar picker special case ──
    if (layout === 'avatar-picker') {
      node.question = {
        text: 'Choose your avatar',
        name: '',
        tagline: '',
        showForwardedTag: false,
        image: null,
        line1: '',
        line2: ''
      };
      node.choices.push({
        id: card.tag + '_choice_0',
        text: card.confirm_button || 'Choose',
        slide: null,
        effects: parseVariables(''),
        goTo: card.go_to || null
      });
      scenarios.push(node);
      return;
    }

    // ── Parse answers/choices ──
    if (card.answers) {
      card.answers.forEach((answer, index) => {
        const choice = {
          id: card.tag + '_choice_' + index,
          text: answer.text || '',
          slide: null,
          effects: parseVariables(answer.variables || ''),
          goTo: answer.go_to === 'None' ? null : (answer.go_to || null)
        };

        // If this is a slider, the answer's slide IS the content being chosen
        if (answer.slide) {
          choice.slide = {
            text: answer.slide.text || '',
            name: answer.slide.name || '',
            tagline: answer.slide.tagline || '',
            showForwardedTag: answer.slide.show_forwarded_tag || false,
            image: Array.isArray(answer.slide.image) ? answer.slide.image[0] : null,
            line1: answer.slide.line_1 || '',
            line2: answer.slide.line_2 || ''
          };
        }

        // If goTo is null, this choice ends the story → award badge
        if (!choice.goTo) {
          choice.effects.badge = story.badge_name;
        }

        node.choices.push(choice);
      });
    }

    scenarios.push(node);
  });
});

// ──────────────────────────────────────────────────────────
// 3. Helper: parse the variables string
// ──────────────────────────────────────────────────────────
function parseVariables(varsStr) {
  const result = {
    followers: 0,
    credibility: 0,
    variables: {}
  };
  if (!varsStr) return result;

  const parts = varsStr.split(',').map(s => s.trim());
  parts.forEach(part => {
    if (!part) return;
    const eqIndex = part.indexOf('=');
    if (eqIndex === -1) return;
    const key = part.substring(0, eqIndex).trim();
    const val = part.substring(eqIndex + 1).trim();

    if (key === 'score' || key === 'followers') {
      result.followers = parseInt(val.replace('+', '')) || 0;
    } else if (key === 'credibility' || key === 'credibilty' || key === 'trust') {
      result.credibility = parseInt(val.replace('+', '')) || 0;
    } else if (key) {
      result.variables[key] = val;
    }
  });

  return result;
}

// ──────────────────────────────────────────────────────────
// 4. Write output
// ──────────────────────────────────────────────────────────
const output = { badges, scenarios };
fs.writeFileSync('badnews-full.json', JSON.stringify(output, null, 2));
console.log('Wrote badnews-full.json');
console.log('  Badges:', badges.length);
console.log('  Scenarios:', scenarios.length);
console.log('  Slider nodes:', scenarios.filter(s => s.isSlider).length);

// Verify connectivity
const nodeMap = {};
scenarios.forEach(s => nodeMap[s.id] = s);
let broken = 0;
scenarios.forEach(s => {
  s.choices.forEach(c => {
    if (c.goTo && !nodeMap[c.goTo]) {
      broken++;
    }
  });
});
console.log('  Broken links:', broken);
