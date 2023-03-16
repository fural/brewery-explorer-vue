import { fireEvent, render } from "@testing-library/vue";
import component from "./BreweryExplorerFooter.vue";

test("it should match snapshot", async () => {
  // Arrange
  const { container, getByText, getByTestId } = render(component, {
    props: { total: 100 },
  });

  const backToTop = getByTestId("backToTopButton");

  // Assert
  expect(getByText(/Number of results: 100/i)).toBeTruthy();
  expect(backToTop).toBeTruthy();
  expect(getByText("© 2023 Brewery Explorer Ltd")).toBeTruthy();
  expect(container).toMatchSnapshot();
});

test("it should emit the back to top event", async () => {
  // Arrange
  const { getByTestId, emitted } = render(component, {
    props: { total: 100 },
  });

  const backToTop = getByTestId("backToTopButton");

  // Act
  await fireEvent.click(backToTop);

  // Assert
  expect(emitted("backToTop")).toBeTruthy();
});
