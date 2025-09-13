import { test, expect } from '@playwright/test';

test.describe('Register flow', () => {
  test('registration with invalid email shows error', async ({ page }) => {
    // test won't hit the API mock because client-side validation catches it first
    await page.goto('http://localhost:5173/auth/register/');

    await page.fill('input[name="name"]', 'testuser');
    await page.fill('input[name="email"]', 'test@gmail.com'); // Fails client-side
    await page.fill('input[name="password"]', 'password123');

    // Trigger validation by clicking submit or blurring field
    await page.click('button[type="submit"]');

    // Check for error in the EMAIL field error container
    await expect(page.locator('#email-error')).toContainText(
      'valid stud.noroff.no email',
    );
  });

  test('API error shows in register messages', async ({ page }) => {
    // Test actual API errors by using valid format and mocking server failure
    await page.route('*/**/auth/register', route => {
      route.fulfill({
        status: 400,
        json: {
          errors: [{ message: 'Email already exists' }],
        },
      });
    });

    await page.goto('http://localhost:5173/auth/register/');

    // Use valid format that passes client-side validation
    await page.fill('input[name="name"]', 'testuser');
    await page.fill('input[name="email"]', 'testuser@stud.noroff.no'); // Valid format
    await page.fill('input[name="password"]', 'password123');

    await page.click('button[type="submit"]');

    // Check where registration form actually displays API errors
    await expect(page.locator('#register-messages')).toContainText(
      'Email already exists',
    );
  });
});
