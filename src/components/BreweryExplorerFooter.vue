<template>
  <div class="flex bg-blue-900 sticky bottom-0 h-16 mr-2 text-white text-sm">
    <div class="flex flex-1 items-center p-4">
      <div class="flex w-full justify-between text-center">
        <div data-testid="numberOfResults">Number of results: {{ total }}</div>
        <div>© 2023 Brewery Explorer Ltd</div>
      </div>
    </div>
    <div class="flex items-center justify-center w-20">
      <button
        @click="onBackToTop"
        data-testid="backToTopButton"
        class="flex items-center justify-center bg-blue-800 h-full w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  total: number;
};

withDefaults(defineProps<Props>(), {
  total: 0,
});

const emit = defineEmits(["backToTop"]);

const onBackToTop = () => {
  emit("backToTop");
};
</script>
