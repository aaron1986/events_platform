// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Content Page", () => {
  test.beforeEach(async ({page}) =>{
    await page.goto('https://playful-lebkuchen-6de85c.netlify.app/')
  })

test("TITLE PAGE", async({page, request}) => {
      await expect(page).toHaveTitle("Northcoders Event Platform");
})

test.describe('Ticketmaster API', () => {
  const apiKey = process.env.VITE_TICKETMASTER_API_KEY;
  const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

  test('should return a valid list of events for London', async ({ request }) => {
    expect(apiKey, 'API key must be set in VITE_TICKETMASTER_API_KEY').toBeTruthy();

    const response = await request.get(`${baseUrl}?apikey=${apiKey}&city=London`);
    expect(response.status(), 'API response status should be 200').toBe(200);

    const data = await response.json();
    const events = data._embedded?.events;

    expect(events, 'Events array should exist').toBeTruthy();
    expect(Array.isArray(events), 'Events should be an array').toBe(true);
    expect(events.length, 'Events array should not be empty').toBeGreaterThan(0);
    
    const event = events[0];
    expect(event).toMatchObject({
      name: expect.any(String),
      dates: {
        start: {
          localDate: expect.any(String)
        }
      }
    });
  });
});


test("Form Validation", async ({page}) => {
  await page.click('button[type="submit"]');

  await expect(page.locator('p.error-message')).toHaveText([
    'Name is required.',
    'Email is required.',
    'Message is required.'
  ]);
  
  })

  test("Form submit test", async({page}) => {
    await page.fill('#fname', 'Aaron Smith');
    await page.fill('#email', 'aaron@example.com');
    await page.fill('#message', 'This is a test message.');
  
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Your message has been sent successfully!')).toBeVisible();
  })
})