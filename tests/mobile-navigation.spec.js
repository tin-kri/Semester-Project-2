import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test('mobile menu shows and hides when clicked', async ({ page }) => {
    await page.goto('/');

    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });

    // Mobile menu button should be visible
    const menuButton = page.locator('button[data-mobile-menu]');
    await expect(menuButton).toBeVisible();

    // Mobile menu should be hidden initially
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toBeVisible();

    // Click to open menu
    await menuButton.click();

    await expect(mobileMenu).toBeVisible();

    // Click again to close menu
    await menuButton.click();

    await expect(mobileMenu).not.toBeVisible();
  });

  test('mobile menu navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 390, height: 844 });

    // Open mobile menu
    const menuButton = page.locator('button[data-mobile-menu]');
    await menuButton.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Check navigation links are visible
    await expect(mobileMenu.locator('text=Auctions')).toBeVisible();
    await expect(mobileMenu.locator('text=Sell')).toBeVisible();
  });
});
