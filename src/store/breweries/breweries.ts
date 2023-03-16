import { toRefs, watchEffect } from "vue";
import { store } from ".";
import { BreweryFilters } from "./models";
import { getBreweries } from "./services";

export const useBreweries = () => {
  const fetchBreweries = async (filters: BreweryFilters) => {
    try {
      store.fetching = true;
      const { stateName } = filters;
      const breweries = await getBreweries(filters);

      store.breweries = stateName
        ? breweries.filter((brewery) => brewery.state === stateName)
        : breweries;
    } catch (error) {
      store.error = "Something bad happened. Please try again.";
    } finally {
      store.fetching = false;
      store.loading = false;
    }
  };

  watchEffect(() =>
    fetchBreweries({
      breweryName: store.filters.breweryName,
      stateName: store.filters.stateName,
    })
  );

  const setSearchName = (name: string) => {
    store.filters.breweryName = name;
  };

  const resetFilters = () => {
    store.filters.breweryName = "";
    store.filters.stateName = "";
  };

  return {
    ...toRefs(store),
    setSearchName,
    resetFilters,
  };
};
