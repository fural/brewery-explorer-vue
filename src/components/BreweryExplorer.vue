<template>
  <div class="md:max-w-[1000px] m-auto py-4 md:px-8">
    <div class="flex flex-col gap-2 px-4">
      <div class="sticky top-0 flex flex-col gap-4">
        <div class="flex items-center gap-2 text-3xl">
          <span>🍺</span>
          <h1 class="font-bold text-slate-700">Brewery Explorer</h1>
        </div>

        <div class="flex flex-col md:flex-row sm:items-center gap-4">
          <SearchInput
            v-model="breweryName"
            name="Filter by name"
            placeholder="Filter by name"
          />

          <div class="sm:w-1/3">
            <select
              title="Filter by state"
              v-model="filters.stateName"
              required
            >
              <option class="text-gray-400" value="">Filter by state</option>
              <option v-for="state in states" :key="state" :value="state">
                {{ state }}
              </option>
            </select>
          </div>

          <button
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            type="reset"
            @click="handleReset"
          >
            Reset
          </button>
        </div>
      </div>

      <div ref="listContainer" class="brewery__container scrollbar">
        <div v-if="loading" class="text-center">Loading...</div>

        <div
          v-else-if="isError"
          class="text-center text-red-500 font-semibold p-4"
        >
          {{ isError }}
        </div>

        <div v-else>
          <div
            v-if="breweries.length === 0"
            class="text-center text-gray-600 font-semibold p-7"
          >
            No results. Try another search.
          </div>
          <ul v-else>
            <BreweryItem
              v-for="brewery in breweries"
              :key="brewery.id"
              :brewery="brewery"
            />
          </ul>
        </div>
      </div>
      <BreweryExplorerFooter
        :total="breweries.length"
        @backToTop="resetScroll"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import { useBreweries } from "../store/breweries/breweries";
import { useDebouncedRef } from "../composables/useDebouncedRef";
import { isAlphabet } from "../utils/validations";
import BreweryItem from "./BreweryItem.vue";
import BreweryExplorerFooter from "./BreweryExplorerFooter.vue";
import SearchInput from "./SearchInput.vue";
import states from "../states";

const validationErrorMessage = "Only alphabet letters are allowed.";

const listContainer = ref<HTMLElement | null>(null);
const breweryName = useDebouncedRef("");
const inputError = ref("");

const { breweries, error, loading, filters, setSearchName, resetFilters } =
  useBreweries();

const isError = computed(() => error?.value || inputError.value);

watchEffect(() => {
  if (breweryName.value.length > 0 && !isAlphabet(breweryName.value)) {
    inputError.value = validationErrorMessage;
  } else {
    inputError.value = "";
    setSearchName(breweryName.value);
  }
});

const resetScroll = () => {
  listContainer.value?.scrollTo({ top: 0, behavior: "smooth" });
};

const handleReset = () => {
  breweryName.value = "";
  resetFilters();
  resetScroll();
};
</script>

<!-- removed the scoped attribute because it was generating different hashes for the data-v attr, which was causing the snapshot testing to break -->
<style>
.brewery__container {
  @apply overflow-y-scroll overflow-x-hidden pb-[20px];
  height: calc(100vh - 300px);
}

@media screen and (min-width: 640px) {
  .brewery__container {
    @apply pb-[100px];
    height: calc(100vh - 110px);
  }
}
</style>
