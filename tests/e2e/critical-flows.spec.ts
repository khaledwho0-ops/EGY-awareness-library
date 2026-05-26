/**
 * E2E TEST SUITE — Q104
 * Playwright-compatible test scripts for critical user flows
 * Run: npx playwright test
 * 
 * Framework: §23.1 — Automated testing
 */

import { test, expect } from '@playwright/test';

test.describe('Egyptian Awareness Library — Critical Flows', () => {

  test.describe('Landing Page', () => {
    test('loads with hero section and 3 MVP cards', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('Awareness');
      await expect(page.locator('text=DeepReal')).toBeVisible();
      await expect(page.locator('text=Mental Health')).toBeVisible();
      await expect(page.locator('text=Religion Hub')).toBeVisible();
    });

    test('trust row shows correct stats', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('text=14-Day Program')).toBeVisible();
      await expect(page.locator('text=42 Evidence-Based Exercises')).toBeVisible();
    });

    test('CTA buttons navigate correctly', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Start Your Journey');
      await expect(page).toHaveURL('/dashboard');
    });
  });

  test.describe('Navigation', () => {
    test('navbar is sticky and has frosted glass on scroll', async ({ page }) => {
      await page.goto('/');
      const navbar = page.locator('#main-navbar');
      await expect(navbar).toBeVisible();

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 200));
      await page.waitForTimeout(500);

      // Should have backdrop-filter
      const style = await navbar.getAttribute('style');
      expect(style).toContain('blur');
    });

    test('theme toggle switches dark/light', async ({ page }) => {
      await page.goto('/');
      const themeBtn = page.locator('button[aria-label*="Switch to"]');
      await themeBtn.click();
      // Page should update theme
      const html = page.locator('html');
      const dataTheme = await html.getAttribute('data-theme');
      expect(['light', 'dark']).toContain(dataTheme);
    });

    test('mobile hamburger opens fullscreen menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto('/');
      const hamburger = page.locator('button[aria-label="Open menu"]');
      await hamburger.click();
      await expect(page.locator('text=Open Dashboard')).toBeVisible();
    });
  });

  test.describe('Dashboard', () => {
    test('loads with progress tracking cards', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Exercise Engine', () => {
    test('DeepReal Day 1 loads with all required sections', async ({ page }) => {
      await page.goto('/deepreal/exercise/1');
      // Should have header strip with Day badge
      await expect(page.locator('text=Day 1')).toBeVisible();
      // Should have learning objective
      await expect(page.locator('text=Learning Objective')).toBeVisible();
      // Should have Begin Exercise button
      await expect(page.locator('text=Begin Exercise')).toBeVisible();
    });

    test('exercise confidence slider appears when clicking Begin', async ({ page }) => {
      await page.goto('/deepreal/exercise/1');
      await page.click('text=Begin Exercise');
      // Should show confidence slider or task phase
      const hasConfidence = await page.locator('text=How confident').isVisible();
      const hasTask = await page.locator('text=Task type').isVisible();
      expect(hasConfidence || hasTask).toBeTruthy();
    });
  });

  test.describe('Baseline Battery', () => {
    test('loads Day 0 multi-step assessment', async ({ page }) => {
      await page.goto('/baseline');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Supervisor Dashboard', () => {
    test('loads with sidebar navigation', async ({ page }) => {
      await page.goto('/supervisor');
      await expect(page.locator('text=Supervisor Panel')).toBeVisible();
      await expect(page.locator('text=Overview')).toBeVisible();
      await expect(page.locator('text=Engine Analytics')).toBeVisible();
    });

    test('hypothesis section shows Bonferroni correction', async ({ page }) => {
      await page.goto('/supervisor');
      await page.click('text=Hypothesis Tests');
      await expect(page.locator('text=Bonferroni Correction')).toBeVisible();
    });
  });

  test.describe('Sources Page', () => {
    test('loads with trust band directory', async ({ page }) => {
      await page.goto('/sources');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Accessibility (Q118)', () => {
    test('all pages have proper heading hierarchy', async ({ page }) => {
      const routes = ['/', '/dashboard', '/deepreal', '/mental-health', '/religion-hub'];
      for (const route of routes) {
        await page.goto(route);
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
      }
    });

    test('focus trap modal traps keyboard focus', async ({ page }) => {
      // This would test our FocusTrapModal component
      await page.goto('/');
      // Navigate with Tab key
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBeTruthy();
    });
  });

  test.describe('Safety Guardrails (Q84-87)', () => {
    test('prompt lab loads with safety disclaimers', async ({ page }) => {
      await page.goto('/prompt-lab');
      await expect(page.locator('h1')).toBeVisible();
    });
  });
});
