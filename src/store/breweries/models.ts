type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  street: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state: string;
  county_province: string | null;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string;
  website_url: string | null;
  updated_at: string;
  created_at: string;
}

export type GetBreweries = (params: BreweryFilters) => Promise<Brewery[]>;

export type BreweryApiFilters = {
  breweryName: string;
  perPage?: number;
};

export type BreweryUiFilters = {
  stateName: string;
};

export type BreweryFilters = BreweryApiFilters & BreweryUiFilters;

export interface State {
  breweries: Brewery[];
  filters: BreweryFilters;
  fetching: boolean;
  loading: boolean;
  error?: string;
}
