import { reactive } from "vue";
import { useBreweries } from "./breweries";
import { State } from "./models";

const store = reactive<State>({
  breweries: [],
  filters: {
    breweryName: "",
    stateName: "",
    perPage: 100,
  },
  loading: true,
  fetching: false,
  error: undefined,
});

export { store, useBreweries };
