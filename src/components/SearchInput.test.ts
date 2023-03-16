import { fireEvent, render } from "@testing-library/vue";
import component from "./SearchInput.vue";

const defaultProps = {
  placeholder: "test-search",
  name: "test-search",
  modelValue: "test-model-value",
};

test("it should match snapshot", async () => {
  // Arrange
  const { container, getByRole } = render(component, {
    props: defaultProps,
  });

  // Assert
  expect(getByRole("textbox", { name: "test-search" })).toBeTruthy();
  expect(container).toMatchSnapshot();
});

test("it should emitt the input event", async () => {
  // Arrange
  const { emitted, getByRole } = render(component, {
    props: defaultProps,
  });

  const input = getByRole("textbox", { name: "test-search" });

  // Act
  await fireEvent.update(input, "testing str");

  // Assert
  //@ts-ignore
  expect(input.value).toBe("testing str");
  expect(emitted("update:modelValue")).toBeTruthy();
});
