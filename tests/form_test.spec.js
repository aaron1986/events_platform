import { test, expect } from '@playwright/test';

test.describe("Content Page", () => {
  test.beforeEach(async ({page}) =>{
    await page.goto('https://playful-lebkuchen-6de85c.netlify.app/')
  })

test("Form Validation", async ({page}) => {
  await page.click('button[type="submit"]');

await expect(page.locator('p.error-message')).toContainText([
  'Name is required.',
  'Address is required.',
  'Email is required.',
  'Password is required.',
  'Please confirm your password.'
]);

  
  })
test("Form submit test", async ({ page }) => {
  await page.fill('#fname', 'Aaron Smith');
  await page.fill('#email', 'aaron@example.com');

  // Target the input inside the Mapbox SearchBox
  const searchBoxInput = page.locator('input[placeholder="Enter your address..."]');
  await searchBoxInput.fill('47 Somerton Avenue, Lowestoft, NR32 4EZ, United Kingdom');

  await page.fill('input[name="password"]', '12345678');
  await page.fill('input[name="repeatPassword"]', '12345678');

  await page.click('button[type="submit"]');
  await expect(page.locator('text=Your message has been sent successfully!')).toBeVisible();
});


})