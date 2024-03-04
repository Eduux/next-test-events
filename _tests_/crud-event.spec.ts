import { test } from "@playwright/test";

test("create", async ({ page }) => {
  await page.goto("http://localhost:3000/en");
  await page.getByRole("heading", { name: "Events" }).click();
  await page.getByLabel("EnglishPortuguese").selectOption("pt");
  await page.getByRole("heading", { name: "Eventos" }).click();
  await page.getByTestId("name-field").click();
  await page.getByTestId("description-field").click();
  await page.getByTestId("submit-button").click();
  await page.getByTestId("error-name").click();
  await page.getByText("Data é obrigatório!").click();
  await page.getByText("Descrição é obrigatório!").click();
  await page.getByTestId("name-field").click();
  await page.getByTestId("name-field").fill("Test New Event For Test xx");
  await page.getByTestId("date-field").fill("2024-03-13");
  await page.getByTestId("description-field").click();
  await page.getByTestId("description-field").press("CapsLock");
  await page.getByTestId("description-field").fill("T");
  await page.getByTestId("description-field").press("CapsLock");
  await page.getByTestId("description-field").fill("Test event");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("error-comment").click();
  await page.getByTestId("description-field").click();
  await page.getByTestId("description-field").fill("Test event event");
  await page.getByTestId("submit-button").click();
  await page.getByText("Test New Event").first().click();
  await page.getByRole("button", { name: "Ver detalhes" }).first().click();
  await page.getByText("Test event event").click();
  await page.getByText("Mar 13,").click();
});

test("edit", async ({ page }) => {
  await page.goto("http://localhost:3000/pt");
  await page
    .locator("div")
    .filter({
      hasText: /^Nome:Test New Event For Test xxVer detalhesEditarDeletar$/,
    })
    .getByRole("button")
    .nth(1)
    .click();
  await page.getByTestId("name-field").click();
  await page.getByTestId("name-field").fill("Test New Event For Test");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("success-form").click();
});

test("delete", async ({ page }) => {
  await page.goto("http://localhost:3000/pt");
  await page
    .locator("div")
    .filter({
      hasText: /^Nome:Test New Event For TestVer detalhesEditarDeletar$/,
    })
    .getByRole("button")
    .nth(2)
    .click();
});
