import { test, expect } from "@playwright/test";

const inputName = "Filter by name";
const selectName = "Filter by state";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test.describe("Brewery explorer", () => {
  test("should display the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Brewery Explorer/);
  });

  test("should display the icon and heading", async ({ page }) => {
    const icon = page.getByText("🍺");
    const heading = page.getByRole("heading", { name: "Brewery Explorer" });

    await expect(icon).toBeVisible();
    await expect(heading).toBeVisible();
  });

  test("should display the number of results", async ({ page }) => {
    const results = page.getByTestId("numberOfResults");
    await expect(results).toHaveText("Number of results: 100");
  });

  test("should display the copyright message", async ({ page }) => {
    const copyRightMessage = page.getByText("© 2023 Brewery Explorer Ltd");
    await expect(copyRightMessage).toBeVisible();
  });

  test("should filter by name", async ({ page }) => {
    // Arrange
    const searchText = "stripes";
    const input = page.getByPlaceholder(inputName);
    const breweryItems = page.getByTestId("brewery-item");
    const results = page.getByTestId("numberOfResults");

    // Act
    await input.fill(searchText);

    // Assert
    await expect(input).toBeVisible();
    await expect(results).toHaveText(/1/);
    await expect(breweryItems).toHaveCount(1);
  });

  test("should filter by state", async ({ page }) => {
    // Arrange
    const breweryItems = page.getByTestId("brewery-item");
    const results = page.getByTestId("numberOfResults");
    const select = page.getByRole("combobox", {
      name: selectName,
    });

    // Act
    await select.selectOption("California");

    // Assert
    await expect(select).toBeVisible();
    await expect(results).toHaveText(/11/);
    await expect(breweryItems).toHaveCount(11);
  });

  test("should reset the filters", async ({ page }) => {
    // Arrange
    const input = page.getByPlaceholder(inputName);
    const select = page.getByRole("combobox", {
      name: selectName,
    });
    const resetButton = page.getByRole("button", { name: "Reset" });

    await expect(resetButton).toBeVisible();

    // Act
    await input.fill("tavern");
    await select.selectOption("Arizona");

    // Wait for the input debounce
    await page.waitForTimeout(300);

    // Act
    await resetButton.click();

    // Assert
    await expect(select).toHaveValue("");
    await expect(input).toBeEmpty();
  });

  test("should display no results", async ({ page }) => {
    // Arrange
    const input = page.getByPlaceholder(inputName);
    const noResults = page.getByText("No results. Try another search.");

    // Assert
    await expect(noResults).not.toBeVisible();

    // Act
    await input.fill("zzww");

    // Assert
    await expect(noResults).toBeVisible();
  });

  test("should display the input validation error", async ({ page }) => {
    // Arrange
    const input = page.getByPlaceholder(inputName);
    const errorMessage = page.getByText("Only alphabet letters are allowed");

    // Assert
    await expect(errorMessage).not.toBeVisible();

    // Act
    await input.fill("#@!");

    // Assert
    await expect(errorMessage).toBeVisible();
  });
});
