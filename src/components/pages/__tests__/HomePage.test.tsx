import { setupMockFailedSearchMovies, setupMockSearchMovies } from "@/mock";
import { store } from "@/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../HomePage";

const mockNavigate = vi.fn();
const mockUseSearch = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  ...vi.importActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useSearch: () => mockUseSearch(),
}));

vi.mock("@/routes", () => ({
  Route: {
    useParams: () => ({ q: "batman" }),
    id: "root",
    path: "/",
  },
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearch.mockReturnValue({ q: "" });

    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
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

  it("navigates on search input", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const input = screen.getByTestId("input-autocomplete");
    fireEvent.change(input, { target: { value: "Batman" } });

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith({
          search: { q: "Batman" },
        });
      },
      { timeout: 1000 }
    );
  });

  it("fetches and displays movies when query is present in URL", async () => {
    mockUseSearch.mockReturnValue({ q: "Batman" });
    setupMockSearchMovies();

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Batman Begins")).toBeDefined();
    });
  });

  it("displays error message when movie search fails", async () => {
    mockUseSearch.mockReturnValue({ q: "Batman" });
    setupMockFailedSearchMovies();

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeDefined();
    });
  });

  it("opens movie poster dialog and navigates to movie details", async () => {
    mockUseSearch.mockReturnValue({ q: "Batman" });
    setupMockSearchMovies();

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Batman Begins")).toBeDefined();
    });

    const moviePoster = screen.getByText("Batman Begins").closest("div");
    fireEvent.click(moviePoster!);

    await waitFor(() => {
      expect(screen.getByText("Movie Details")).toBeDefined();
    });

    const detailsButton = screen.getByText("Movie Details");
    fireEvent.click(detailsButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/movie/$movieId",
      params: {
        movieId: "tt0372784",
      },
    });
  });
});
