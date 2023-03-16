import { render } from "@testing-library/vue";
import { breweries } from "../mocks/breweries";
import component from "./BreweryItem.vue";

const [brewery] = breweries;

test("it should match snapshot", async () => {
  // Arrange
  const { container, getByText, getByRole } = render(component, {
    props: { brewery },
  });

  // Assert
  expect(getByText(`${brewery.city}, ${brewery.state}`)).toBeTruthy();
  expect(getByRole("link", { name: brewery.website_url! })).toBeTruthy();

  expect(container).toMatchSnapshot();
});
