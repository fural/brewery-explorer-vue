<template>
  <label class="sm:w-3/5 relative">
    <span class="sr-only">{{ name }}</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </span>

    <input
      @input="updateValue"
      :value="modelValue"
      :title="name"
      :placeholder="placeholder"
      :name="name"
      class="pl-9"
      type="text"
    />
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

defineProps<{
  modelValue: string;
  name?: string;
  placeholder?: string;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
