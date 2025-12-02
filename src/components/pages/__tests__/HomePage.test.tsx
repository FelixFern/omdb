import { setupMockSearchMovies } from "@/mock";
import { store } from "@/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../HomePage/index";

vi.mock("@tanstack/react-router", () => ({
  ...vi.importActual("@tanstack/react-router"),
  useNavigate: () => vi.fn(),
  useSearch: () => ({ q: "" }),
}));

vi.mock("@/routes", () => ({
  Route: {
    useParams: () => ({ q: "batman" }),
  },
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders initial state correctly", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(screen.getByText("OMDB Movie")).toBeDefined();
    expect(screen.getByTestId("input-autocomplete")).toBeDefined();
    expect(screen.getByText("Start typing to search for movies")).toBeDefined();
  });

  it("searches for movies", async () => {
    setupMockSearchMovies();
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Batman" } });

    await waitFor(
      () => {
        expect(screen.getByText("Batman Begins")).toBeDefined();
      },
      { timeout: 2000 }
    );
  });
});
