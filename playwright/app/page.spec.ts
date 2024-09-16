import { test, expect } from '@playwright/test';

test.describe('<Page />', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:3000/');
  });

  test('landing page renders', async ({ page }) => {
    // Assertions use the expect API.
    const heroDiv = page.getByTestId('hero-div');
    await expect(heroDiv).toContainText(
      'Communication made simple for fixers and musicians.'
    );
  });
});

test.describe('<Page />', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:3000/');
  });

  test('landing page renders', async ({ page }) => {
    // Assertions use the expect API.
    const heroDiv = page.getByTestId('hero-div');
    await expect(heroDiv).toContainText(
      'Communication made simple for fixers and musicians.'
    );
  });
  test('if session, calendar renders', async ({ page }) => {
    await expect(page).toHaveTitle('Calendar');
  });
});
