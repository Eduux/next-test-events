import { test, expect } from "@playwright/test";

const nameFinder = "XXYYZZ12345";

test.describe("crud events", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/pt");
  });

  test("crud", async ({ page }) => {
    await page.getByTestId("name-field").click();
    await page.getByTestId("description-field").click();
    await page.getByTestId("submit-button").click();
    await page.getByTestId("error-name").click();
    await page.getByText("Data é obrigatório!").click();
    await page.getByText("Descrição é obrigatório!").click();
    await page.getByTestId("name-field").click();
    await page.getByTestId("name-field").fill(`${nameFinder}`);
    await page.getByTestId("date-field").fill("2024-03-13");
    await page.getByTestId("description-field").click();
    await page.getByTestId("description-field").fill("T");
    await page.getByTestId("description-field").fill("Test event");
    await page.getByTestId("submit-button").click();
    await page.getByTestId("error-comment").click();
    await page.getByTestId("description-field").fill("Test event event");
    await page.getByTestId("submit-button").click();
    expect(await page.getByTestId("success-form").textContent()).toBe(
      "Evento Adicionado!"
    );

    await page
      .getByTestId(`event-${nameFinder}`)
      .getByTestId("edit-button")
      .click();
    await page.getByTestId("description-field").fill("Test New Event For Test");
    await page.getByTestId("submit-button").click();
    await page.getByTestId("success-form").click();
    expect(await page.getByTestId("success-form").textContent()).toBe(
      "Evento Editado!"
    );

    await page
      .getByTestId(`event-${nameFinder}`)
      .getByTestId("delete-button")
      .click();
  });
});
