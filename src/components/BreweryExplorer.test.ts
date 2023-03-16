import { render, fireEvent } from "@testing-library/vue";
import { breweries } from "../mocks/breweries";
import Component from "./BreweryExplorer.vue";

test("it should match snapshot", async () => {
  // Arrange
  const { container, findByText } = render(Component);

  // Assert
  expect(await findByText(breweries[0].name)).toBeTruthy();
  expect(container).toMatchSnapshot();
});

test("it should display the heading", async () => {
  // Arrange
  const { getByRole } = render(Component);
  const heading = getByRole("heading", { name: /Brewery Explorer/i });

  // Assert
  expect(heading).toBeTruthy();
});

test("it should filter by name", async () => {
  // Arrange
  const { getByRole, findByText } = render(Component);
  const input = getByRole("textbox", { name: "Filter by name" });

  // Act
  await fireEvent.update(input, "stripes");

  // Assert
  expect(input).toBeTruthy();
  expect(await findByText(breweries[0].name)).toBeTruthy();
});
