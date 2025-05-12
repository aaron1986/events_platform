// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Content Page", () => {
  test.beforeEach(async ({page}) =>{
    await page.goto('https://playful-lebkuchen-6de85c.netlify.app/')
  })

test("TITLE PAGE", async({page, request}) => {
      //check title is correct
      await expect(page).toHaveTitle("Northcoders Event Platform");
})

test("API TEST", async({page, request}) => {
  const response = await request.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=FzhugPNAJdDZM7NJLZN1Pyh2FLwzPu2m&city=London');
  expect(response.status()).toBe(200);

  const data = await response.json();

  const events = data._embedded?.events;
  expect(Array.isArray(events)).toBe(true);
  expect(events.length).toBeGreaterThan(0);

  const event = events[0];
  expect(event).toHaveProperty('name');
  expect(event).toHaveProperty('dates');
  expect(event.dates).toHaveProperty('start');
  expect(event.dates.start).toHaveProperty('localDate');
})


})