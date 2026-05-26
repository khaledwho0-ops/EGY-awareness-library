import { test, expect } from '@playwright/test';

// Correct mock data matching page.tsx expected schema
const successResponse = {
  type: 'SYNTHESIS_COMPLETE',
  data: {
    confidence_score: 95,
    logical_fallacy_detected: 'Strawman Argument',
    egyptian_contextual_mapping: 'This aligns with common local myths.',
    truth_sandwich_ar: {
      fact_1: 'Fact 1: Validated baseline truth.',
      myth: 'Myth: The false claim.',
      fact_2: 'Fact 2: Reaffirming truth.'
    },
    citations: [
      { title: 'WHO Report 2023', url: 'https://who.int' },
      { title: 'Egyptian Ministry of Health', url: 'https://mohp.gov.eg' }
    ]
  }
};

const emptyCitationsResponse = {
  type: 'SYNTHESIS_COMPLETE',
  data: {
    confidence_score: 80,
    logical_fallacy_detected: 'None',
    egyptian_contextual_mapping: 'Safe',
    truth_sandwich_ar: {
      fact_1: 'Fact',
      myth: 'Myth',
      fact_2: 'Fact'
    },
    citations: []
  }
};

const errorResponse = {
  status: 'error',
  message: 'API Failure'
};

test.describe('The Angry Debunkers - Core Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept correct API endpoint
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    // Correct route path
    await page.goto('/angry-debunkers'); 
  });

  test.describe('F1: Claim Submission', () => {
    test('1. Valid standard claim', async ({ page }) => {
      const textarea = page.getByPlaceholder(/Paste the rumor/i);
      await textarea.fill('This is a standard valid claim.');
      
      const submitBtn = page.getByRole('button', { name: /Launch Strike Teams/i });
      await submitBtn.click();
      
      // Verify Dashboard appears
      await expect(page.getByText('Truth Sandwich Protocol')).toBeVisible({ timeout: 10000 });
    });

    test('2. Empty claim validation (button disabled)', async ({ page }) => {
      const submitBtn = page.getByRole('button', { name: /Launch Strike Teams/i });
      await expect(submitBtn).toBeDisabled();
    });
  });

  test.describe('F2: Visualizer (Loading Matrix)', () => {
    test('1. Displays sequential scanning text and hides upon completion', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        // Delay response to check loading state
        await new Promise(resolve => setTimeout(resolve, 1500));
        await route.fulfill({ json: successResponse });
      });

      await page.getByPlaceholder(/Paste the rumor/i).fill('Test claim');
      await page.getByRole('button', { name: /Launch Strike Teams/i }).click();

      // Check SCANNING state
      await expect(page.getByText('PINGING GLOBAL DATABASES...')).toBeVisible();

      // Check COMPLETE state (Loading hidden)
      await expect(page.getByText('PINGING GLOBAL DATABASES...')).toBeHidden({ timeout: 10000 });
      await expect(page.getByText('Truth Sandwich Protocol')).toBeVisible();
    });

    test('2. Reverts to IDLE on API failure', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ status: 500, json: errorResponse });
      });

      await page.getByPlaceholder(/Paste the rumor/i).fill('Test claim');
      await page.getByRole('button', { name: /Launch Strike Teams/i }).click();

      // The app catches error and reverts to IDLE
      const submitBtn = page.getByRole('button', { name: /Launch Strike Teams/i });
      await expect(submitBtn).toBeVisible({ timeout: 10000 });
      await expect(submitBtn).not.toBeDisabled();
      // Ensure results are not visible
      await expect(page.getByText('Truth Sandwich Protocol')).toBeHidden();
    });
  });

  test.describe('F3: Threat Dashboard Results', () => {
    test('1. Dashboard renders truth sandwich and confidence score', async ({ page }) => {
      await page.getByPlaceholder(/Paste the rumor/i).fill('Test claim');
      await page.getByRole('button', { name: /Launch Strike Teams/i }).click();

      await expect(page.getByText('95%')).toBeVisible();
      await expect(page.getByText('Strawman Argument')).toBeVisible();
      await expect(page.getByText('Fact 1: Validated baseline truth.')).toBeVisible();
    });
  });

  test.describe('F4: Citations UI', () => {
    test('1. Rendered as anchor tags', async ({ page }) => {
      await page.getByPlaceholder(/Paste the rumor/i).fill('Test claim');
      await page.getByRole('button', { name: /Launch Strike Teams/i }).click();

      // Verify citations appeared
      await expect(page.getByText('Verified Database Citations')).toBeVisible();
      const citations = page.locator('a[target="_blank"]');
      await expect(citations).toHaveCount(2);
      await expect(citations.first()).toHaveAttribute('href', 'https://who.int');
    });

    test('2. Gracefully handles zero citations', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: emptyCitationsResponse });
      });

      await page.getByPlaceholder(/Paste the rumor/i).fill('Test claim');
      await page.getByRole('button', { name: /Launch Strike Teams/i }).click();

      await expect(page.getByText('Truth Sandwich Protocol')).toBeVisible();
      const citations = page.locator('a[target="_blank"]');
      await expect(citations).toHaveCount(0);
    });
  });
});
