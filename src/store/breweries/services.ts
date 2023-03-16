import { api } from "../../utils/api";
import { Brewery, GetBreweries } from "./models";

const BASE_URL = "https://api.openbrewerydb.org";
const ENDPOINT = "breweries";
const PER_PAGE = 100;

export const getBreweries: GetBreweries = async (params) => {
  const url = new URL(`${BASE_URL}/${ENDPOINT}`);
  const { breweryName, perPage = PER_PAGE } = params;

  url.searchParams.append("per_page", String(perPage));

  if (breweryName) url.searchParams.append("by_name", breweryName);

  const response = await api.get<Brewery[]>(url.href);

  return response;
};
