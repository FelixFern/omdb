import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AutoCompleteInput from "../AutoCompleteInput/index";

describe("AutoCompleteInput", () => {
  const mockOnChange = vi.fn();
  const mockOptions = [
    { value: "batman", label: "Batman" },
    { value: "superman", label: "Superman" },
  ];

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
        value={undefined}
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
    fireEvent.click(option);
    expect(mockOnChange).toHaveBeenCalledWith("batman");
  });
});
