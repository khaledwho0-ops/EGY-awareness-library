import { test, expect } from '@playwright/test';

// Common mock data
const successResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    confidence_score: 95,
    negative_science_violation: "Appeal to Emotion",
    egyptian_vector_hit: "This rumor exploits local fears.",
    truth_sandwich: {
      fact_1: "Fact 1",
      myth: "Myth",
      fact_2: "Fact 2"
    },
    citations: [
      { title: "WHO Report 2023", url: "https://who.int" },
      { title: "Egyptian Ministry of Health", url: "https://mohp.gov.eg" }
    ]
  }
};

const emptyCitationsResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    confidence_score: 80,
    negative_science_violation: "None",
    egyptian_vector_hit: "Safe",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    citations: []
  }
};

const errorResponse = {
  status: 'error',
  message: 'API Failure'
};

const s1MedicalResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    confidence_score: 99,
    negative_science_violation: "Appeal to Emotion",
    egyptian_vector_hit: "This is a widespread medical rumor affecting public health.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    citations: [
      { title: "Med Source 1", url: "https://med1.org" },
      { title: "Med Source 2", url: "https://med2.org" }
    ]
  }
};

const s3LongResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    confidence_score: 88,
    negative_science_violation: "Gish Gallop",
    egyptian_vector_hit: "Overwhelming volume of false data.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    citations: []
  }
};

const s4EdgeCaseResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    confidence_score: 50,
    negative_science_violation: "edge_case_science_violation",
    egyptian_vector_hit: "Violates specific edge-case rules.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    citations: []
  }
};

// Hydration-aware helper for filling and submitting
async function fillAndSubmit(page, text = 'Test claim') {
  await expect(async () => {
    await page.getByRole('textbox').clear();
    await page.getByRole('textbox').fill(text);
    await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeEnabled({ timeout: 1000 });
  }).toPass({ timeout: 15000 });
  await page.getByRole('button', { name: /Launch Strike Teams/i }).click();
}

test.describe('The Angry Debunkers - Tier 1: Core Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.goto('/angry-debunkers');
  });

  test.describe('F1: Claim Submission', () => {
    test('1. Valid standard claim', async ({ page }) => {
      await fillAndSubmit(page, 'This is a standard valid claim.');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('2. Valid short claim', async ({ page }) => {
      await fillAndSubmit(page, 'Short claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('3. Empty claim validation', async ({ page }) => {
      // Empty claim makes the button disabled
      await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeDisabled();
    });

    test('4. Valid long claim', async ({ page }) => {
      const longClaim = 'A'.repeat(500);
      await fillAndSubmit(page, longClaim);
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('5. Mixed language/special characters claim', async ({ page }) => {
      await fillAndSubmit(page, 'Claim with Arabic ادعاء and symbols @#$!');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });
  });

  test.describe('F2: Visualizer', () => {
    test('1. Appears immediately on submit', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('1. Stripping Emotion...')).toBeVisible();
    });

    test('2. Displays sequential steps', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 8000));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      
      const expectedLayers = [
        "1. Stripping Emotion...",
        "2. Identifying Claim...",
        "3. Isolating Variables...",
        "4. Cross-Referencing 10 Global Databases...",
        "5. Verifying Context...",
        "6. Detecting Fallacies...",
        "7. Formatting Truth Sandwich..."
      ];
      
      for (const layer of expectedLayers) {
        await expect(page.getByText(new RegExp(layer, 'i'))).toBeVisible({ timeout: 2000 });
      }
    });

    test('3. Hides completely upon API completion', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
      await expect(page.getByText('1. Stripping Emotion...')).toBeHidden();
      await expect(page.getByText('2. Identifying Claim...')).toBeHidden();
    });

    test('4. Handles extremely fast API response cleanly', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('5. Reverts to IDLE on API failure', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ status: 500, json: errorResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('1. Stripping Emotion...')).toBeVisible();
      // On failure, reverting to IDLE means button text comes back to "Launch Strike Teams"
      await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('1. Stripping Emotion...')).toBeHidden();
    });
  });

  test.describe('F3: Threat Dashboard', () => {
    test('1. Dashboard appears post-response', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('2. Displays Logical Fallacy Detected', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Negative Science Violation')).toBeVisible();
      await expect(page.getByText('Appeal to Emotion')).toBeVisible();
    });

    test('3. Displays Egyptian Contextual Mapping', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Egyptian Vector Hit')).toBeVisible();
      await expect(page.getByText('This rumor exploits local fears.')).toBeVisible();
    });

    test('4. Features explicitly required dynamic copy', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      // Assert dynamic content INSIDE the dashboard upon completion, not a static global header
      await expect(page.getByText('Truth Sandwich Protocol')).toBeVisible();
      await expect(page.getByText(successResponse.data.truth_sandwich.fact_1)).toBeVisible();
    });

    test('5. Responsive layout does not overflow horizontally', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(320);
    });
  });

  test.describe('F4: Citations UI', () => {
    test('1. Rendered as link elements', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link', { name: /WHO Report 2023/i })).toBeVisible();
    });

    test('2. Hover states trigger visually', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      const link = page.getByRole('link', { name: /WHO Report 2023/i });
      const initialBg = await link.evaluate((el) => window.getComputedStyle(el).backgroundColor);
      await link.hover();
      // Assert that hover changes the background color
      await expect(link).not.toHaveCSS('background-color', initialBg);
    });

    test('3. Click interaction verified', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      const link = page.getByRole('link', { name: /WHO Report 2023/i });
      await expect(link).toHaveAttribute('href', 'https://who.int');
      await expect(link).toHaveAttribute('target', '_blank');
    });

    test('4. Wraps correctly for multiple pills', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        const manyCitations = Array.from({length: 10}, (_, i) => ({title: `Cit ${i}`, url: `http://cit${i}.com`}));
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, citations: manyCitations } } });
      });
      await fillAndSubmit(page, 'Test claim');
      const container = page.getByText('Verified Database Citations').locator('..').locator('div').last();
      await expect(container).toBeVisible();
      const cssDisplay = await container.evaluate(el => window.getComputedStyle(el).flexWrap);
      expect(['wrap', 'wrap-reverse']).toContain(cssDisplay);
    });

    test('5. Gracefully handles responses with zero citations', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: emptyCitationsResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link')).toHaveCount(0);
      await expect(page.getByText('Verified Database Citations')).toBeVisible();
    });
  });
});

test.describe('The Angry Debunkers - Tier 2: Boundary Value Analysis', () => {
  const MAX_CHARS = 1000;

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.goto('/angry-debunkers');
  });

  test.describe('F1 Boundary', () => {
    test('Exactly max allowed characters', async ({ page }) => {
      await fillAndSubmit(page, 'A'.repeat(MAX_CHARS));
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('1 character over max allowed', async ({ page }) => {
      await page.getByRole('textbox').clear();
      await page.getByRole('textbox').fill('A'.repeat(MAX_CHARS + 1));
      
      const val = await page.getByRole('textbox').inputValue();
      if (val.length === MAX_CHARS) {
        // App correctly truncated the input
        expect(val.length).toBe(MAX_CHARS);
      } else {
        // App allowed > MAX_CHARS, assert that it shows an explicit validation error
        await expect(page.getByText(/character limit exceeded|too long|maximum/i)).toBeVisible({ timeout: 1000 });
      }
    });

    test('1 character total', async ({ page }) => {
      await fillAndSubmit(page, 'A');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('Whitespace-only submission', async ({ page }) => {
      await fillAndSubmit(page, '   ');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('Double-click submission deduplication', async ({ page }) => {
      let reqCount = 0;
      await page.route('**/api/defense/angry-debunkers', async route => {
        reqCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.fulfill({ json: successResponse });
      });
      // We must rapidly dblclick to test deduplication genuinely
      await expect(async () => {
        await page.getByRole('textbox').clear();
        await page.getByRole('textbox').fill('Test claim');
        await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeEnabled({ timeout: 1000 });
      }).toPass({ timeout: 30000 });
      
      const btn = page.getByRole('button', { name: /Launch Strike Teams/i });
      await btn.click();
      await btn.click({ force: true }); // Ensure second click is dispatched even if disabled
      
      // Wait for loader state then check button is disabled
      await expect(page.getByRole('button', { name: /Initiating/i })).toBeDisabled();
      await expect(reqCount).toBe(1);
    });
  });

  test.describe('F2 Boundary', () => {
    test('0ms API response time', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('Exactly 8000ms response time', async ({ page }) => {
      test.setTimeout(15000); // increase test timeout
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 8000));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible({ timeout: 10000 });
    });

    test('8001ms (timeout error expected)', async ({ page }) => {
      test.setTimeout(15000);
      await page.route('**/api/defense/angry-debunkers', async route => {
        // Fake Timeout Injection: delay network request > 8000ms instead of route.abort()
        await new Promise(resolve => setTimeout(resolve, 8500));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // The frontend must enforce a timeout and display an error gracefully
      await expect(page.getByText(/timeout|took too long|failed to fetch/i)).toBeVisible({ timeout: 10000 });
    });

    test('Network disconnect mid-animation', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.abort('failed');
      });
      await fillAndSubmit(page, 'Test claim');
      // Should revert to IDLE
      await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible();
    });
  });

  test.describe('F3 Boundary', () => {
    test('Missing optional API fields', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { confidence_score: 95, truth_sandwich: {} } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('320px mobile viewport width', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });
  });

  test.describe('F4 Boundary', () => {
    test('Exactly 1 citation', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, citations: [{title: "Cit", url: "http://cit.com"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link', { name: /Cit/i })).toHaveCount(1);
    });

    test('Max expected citations (20)', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        const citations = Array.from({length: 20}, (_, i) => ({title: `Cit ${i}`, url: `http://cit${i}.com`}));
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, citations } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link')).toHaveCount(20);
    });

    test('Malformed citation API object', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, citations: [{bad: "data"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText('Verification Confidence')).toBeVisible();
    });

    test('Citation without a valid URL', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, citations: [{title: "Cit", url: "javascript:alert(1)"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      
      const link = page.getByRole('link', { name: /Cit/i });
      const href = await link.getAttribute('href');
      // Asserting the URL is sanitized by Next.js or our application layer to prevent XSS
      expect(href).not.toContain('javascript:');
    });
  });
});

test.describe('The Angry Debunkers - Tier 3: Pairwise Interaction Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/angry-debunkers');
  });

  test('P1: Arabic Medical Claim / Desktop / Success', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'ادعاء طبي: شرب الماء الساخن يعالج كل الأمراض');
    await expect(page.getByText('Verification Confidence')).toBeVisible();
  });

  test('P2: Arabic Demographic Claim / Mobile / API Error', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ status: 500, json: errorResponse });
    });
    await page.setViewportSize({ width: 375, height: 667 });
    await fillAndSubmit(page, 'ادعاء ديموغرافي');
    await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible();
  });

  test('P3: English Demographic Claim / Mobile / Success', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 375, height: 667 });
    await fillAndSubmit(page, 'English demographic claim about population.');
    await expect(page.getByText('Verification Confidence')).toBeVisible();
  });

    test('P4: English Medical Claim / Desktop / Timeout Error', async ({ page }) => {
    test.setTimeout(15000);
    await page.route('**/api/defense/angry-debunkers', async route => {
      await new Promise(resolve => setTimeout(resolve, 8500));
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'Medical claim about curing diseases fast.');
    await expect(page.getByText(/timeout|took too long|failed to fetch/i)).toBeVisible({ timeout: 10000 });
  });

  test('P5: Cross-interaction: Resizing viewport while visualizer is active', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'Test claim');
    
    // Resize during visualizer
    await expect(page.getByText('1. Stripping Emotion...')).toBeVisible();
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Ensure dashboard eventually appears and layout is OK
    await expect(page.getByText('Verification Confidence')).toBeVisible();
  });
});

test.describe('The Angry Debunkers - Tier 4: Real-World Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/angry-debunkers');
  });

  test('S1: widely circulated medical rumor yields Threat Analysis and citations', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s1MedicalResponse });
    });
    await fillAndSubmit(page, 'Drinking bleach cures the virus instantly according to internet sources.');
    await expect(page.getByText('Verification Confidence')).toBeVisible();
    await expect(page.getByText('Appeal to Emotion')).toBeVisible();
    await expect(page.getByRole('link')).toHaveCount(2);
  });

  test('S2: empty claim yields validation error', async ({ page }) => {
    // Empty claim just prevents submission button from being enabled.
    await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeDisabled();
  });

  test('S3: copypasta very long text tests boundary limits', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s3LongResponse });
    });
    const copypasta = 'This is a long copypasta. '.repeat(100);
    await fillAndSubmit(page, copypasta);
    await expect(page.getByText('Verification Confidence')).toBeVisible();
    await expect(page.getByText('Gish Gallop')).toBeVisible();
  });

  test('S4: claim triggering specific Edge-case Negative Science Category', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s4EdgeCaseResponse });
    });
    await fillAndSubmit(page, 'Specific edge case claim that triggers rare tags.');
    await expect(page.getByText('Verification Confidence')).toBeVisible();
    await expect(page.getByText('edge_case_science_violation')).toBeVisible();
  });

  test('S5: application gracefully handles API failure during debunking', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ status: 502, body: 'Bad Gateway' });
    });
    await fillAndSubmit(page, 'Test claim causing failure');
    // reverts to idle
    await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible();
  });
});
