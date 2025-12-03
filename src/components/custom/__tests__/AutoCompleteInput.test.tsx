import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AutoCompleteInput from "../AutoCompleteInput/index";

describe("AutoCompleteInput", () => {
  const mockOnChange = vi.fn();
  const mockOptions = [
    { value: "batman", label: "Batman" },
    { value: "superman", label: "Superman" },
    { value: "spiderman", label: "Spiderman" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("renders correctly with initial value", () => {
    render(
      <AutoCompleteInput
        value="test"
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    expect(screen.getByDisplayValue("test")).toBeDefined();
  });

  it("calls onChange when typing", () => {
    render(
      <AutoCompleteInput
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.change(input, { target: { value: "bat" } });
    expect(mockOnChange).toHaveBeenCalledWith("bat");
  });

  it("shows options when focused", () => {
    render(
      <AutoCompleteInput
        value="bat"
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);
    expect(screen.getByText("Batman")).toBeDefined();
    expect(screen.getByText("Superman")).toBeDefined();
  });

  it("hides options when blurred", () => {
    render(
      <AutoCompleteInput
        value="bat"
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);
    expect(screen.getByText("Batman")).toBeDefined();

    fireEvent.blur(input);
    expect(screen.queryByText("Batman")).toBeNull();
  });

  it("calls onChange when clicking an option", () => {
    render(
      <AutoCompleteInput
        value="bat"
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);
    const option = screen.getByText("Batman");
    fireEvent.mouseDown(option);
    fireEvent.click(option);
    expect(mockOnChange).toHaveBeenCalledWith("batman");
  });

  it("navigates options with ArrowDown and ArrowUp", () => {
    render(
      <AutoCompleteInput
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const supermanOption = screen.getByText("Superman");
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const spidermanOption = screen.getByText("Spiderman");
    expect(spidermanOption.className).toContain("bg-accent");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(spidermanOption.className).toContain("bg-accent");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(supermanOption.className).toContain("bg-accent");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    const batmanOption = screen.getByText("Batman");
    expect(batmanOption.className).toContain("bg-accent");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(batmanOption.className).toContain("bg-accent");
  });

  it("selects option with Enter key", () => {
    render(
      <AutoCompleteInput
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnChange).toHaveBeenCalledWith("batman");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnChange).toHaveBeenCalledWith("superman");
  });

  it("selects option with Tab key", () => {
    render(
      <AutoCompleteInput
        value=""
        onChange={mockOnChange}
        options={mockOptions}
      />
    );
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: "Tab" });
    expect(mockOnChange).toHaveBeenCalledWith("batman");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Tab" });
    expect(mockOnChange).toHaveBeenCalledWith("superman");
  });

  it("handles empty options gracefully", () => {
    render(<AutoCompleteInput value="" onChange={mockOnChange} options={[]} />);
    const input = screen.getByTestId("input-autocomplete");
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
