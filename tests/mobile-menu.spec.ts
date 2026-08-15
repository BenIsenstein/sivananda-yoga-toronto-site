import { test, expect } from '@playwright/test';

test.describe('Mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens as a full-screen panel that fills the viewport', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');

    // Hamburger is visible on mobile; menu starts hidden.
    await expect(toggle).toBeVisible();
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(menu).toBeVisible();

    // The panel must fill the full viewport WIDTH and reach the bottom.
    // (Regression guard for the backdrop-filter containing-block bug that
    // collapsed the old drawer to ~80px tall.)
    const viewport = page.viewportSize()!;
    const box = (await menu.boundingBox())!;

    expect(box.width).toBeGreaterThanOrEqual(viewport.width - 1);
    expect(box.x).toBeLessThanOrEqual(1);

    // Anchored under the sticky 64px header, filling the rest of the height.
    expect(box.y).toBeGreaterThanOrEqual(56);
    expect(box.y).toBeLessThanOrEqual(72);
    const bottom = box.y + box.height;
    expect(bottom).toBeGreaterThanOrEqual(viewport.height - 1);

    // Well beyond the old broken ~80px.
    expect(box.height).toBeGreaterThan(300);
  });

  test('locks background scroll while open', async ({ page }) => {
    await page.locator('#mobile-menu-btn').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });

  test('toggle switches to a close (X) state and restores aria', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-btn');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Close menu');
    await expect(toggle.locator('[data-icon="close"]')).toBeVisible();
    await expect(toggle.locator('[data-icon="open"]')).toBeHidden();
  });

  test('closes on Escape and restores scroll + focus', async ({ page }) => {
    const toggle = page.locator('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');
    await toggle.click();
    await expect(menu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('');
    await expect(toggle).toBeFocused();
  });

  test('closes when a nav link is tapped', async ({ page }) => {
    await page.locator('#mobile-menu-btn').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();

    // A top-level link without children (e.g. Workshops / Events).
    await menu.getByRole('link', { name: 'Workshops / Events' }).click();
    await expect(page).toHaveURL(/\/events\/?$/);
  });

  test('expands a section and reveals its overview link', async ({ page }) => {
    await page.locator('#mobile-menu-btn').click();
    const menu = page.locator('#mobile-menu');

    const about = menu.locator('details', { hasText: 'About Us' });
    await about.locator('summary').click();
    await expect(about.getByRole('link', { name: 'About Us overview' })).toBeVisible();
  });
});
