import { setupServer } from "msw/node";
import { rest } from "msw";
import { breweries } from "./mocks/breweries";

export const restHandlers = [
  rest.get("https://api.openbrewerydb.org/breweries", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(breweries));
  }),
];

const server = setupServer(...restHandlers);
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
//  Close server after all tests
afterAll(() => server.close());
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
