import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test('mobile menu shows and hides when clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });

    // Mobile menu button should be visible
    const menuButton = page.locator('button[data-mobile-menu]');
    await expect(menuButton).toBeVisible();

    // Mobile menu should be hidden initially
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveClass(/hidden/);

    // Click to open menu
    await menuButton.click();

    // Menu should no longer have 'hidden' class
    await expect(mobileMenu).not.toHaveClass(/hidden/);

    // Click again to close menu
    await menuButton.click();

    // Menu should be hidden again
    await expect(mobileMenu).toHaveClass(/hidden/);
  });

  test('mobile menu navigation links work', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.setViewportSize({ width: 390, height: 844 });

    // Open mobile menu
    const menuButton = page.locator('button[data-mobile-menu]');
    await menuButton.click();

    // Check navigation links are visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu.locator('text=Auctions')).toBeVisible();
    await expect(mobileMenu.locator('text=Sell')).toBeVisible();
  });
});
