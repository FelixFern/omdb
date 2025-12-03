import {
  mockMovieDetail,
  setupMockFailedMovieDetail,
  setupMockMovieDetail,
} from "@/mock";
import { store } from "@/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MovieDetailPageContent from "../MovieDetailPage";

const mockNavigate = vi.fn();
const mockHistoryBack = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  ...vi.importActual("@tanstack/react-router"),
  useNavigate: () => mockNavigate,
  useRouter: () => ({
    history: {
      back: mockHistoryBack,
      canGoBack: () => true,
    },
  }),
  createFileRoute: () => ({
    useParams: () => ({ movieId: "tt0372784" }),
  }),
}));

vi.mock("@/routes/movie.$movieId", () => ({
  Route: {
    useParams: () => ({ movieId: "tt0372784" }),
  },
}));

describe("MovieDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie details correctly", async () => {
    setupMockMovieDetail();
    render(
      <Provider store={store}>
        <MovieDetailPageContent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockMovieDetail.Title)).toBeDefined();
    });

    expect(screen.getByText(mockMovieDetail.Year)).toBeDefined();
    expect(screen.getByText(mockMovieDetail.Plot)).toBeDefined();
    expect(screen.getByText(mockMovieDetail.Director)).toBeDefined();
  });

  it("renders error state/not found", async () => {
    setupMockFailedMovieDetail();
    render(
      <Provider store={store}>
        <MovieDetailPageContent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Movie not found")).toBeDefined();
    });
  });

  it("navigates back when clicking the back button", async () => {
    setupMockMovieDetail();
    render(
      <Provider store={store}>
        <MovieDetailPageContent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockMovieDetail.Title)).toBeDefined();
    });

    const backButton = screen.getByText("Back to Search");
    fireEvent.click(backButton);

    expect(mockHistoryBack).toHaveBeenCalledTimes(1);
  });
});
