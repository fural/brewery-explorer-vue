import { customRef } from "vue";

export const useDebouncedRef = (value: string, delay = 300) => {
  let timeout: ReturnType<typeof setTimeout>;

  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(
          () => {
            value = newValue;
            trigger();
          },
          !newValue ? 0 : delay
        );
      },
    };
  });
};
