import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WordSpinner from "./WordSpinner.component"; // Adjust the import path as necessary

const words = ["apple", "banana", "cherry", "date", "elderberry"];

jest.useFakeTimers();

describe("WordSpinner", () => {
  test("renders the component with provided words", () => {
    render(<WordSpinner words={words} />);

    // Check if all words are in the document
    words.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });

  test("starts scrolling when the button is clicked", () => {
    render(<WordSpinner words={words} />);

    const button = screen.getByText("Generate Pairing");
    fireEvent.click(button);

    // Advance timers to simulate scrolling
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check if currentIndex has increased
    const scrollingText = screen.getByText(words[0]).closest("div");
    expect(scrollingText).toHaveStyle(`transform: translateY(-20em)`);
  });

  test("final word after scrolling matches a word from the list", () => {
    render(<WordSpinner words={words} />);

    const button = screen.getByText("Generate Pairing");
    fireEvent.click(button);

    // Advance timers to simulate the full scroll including slow transition
    act(() => {
      jest.advanceTimersByTime(words.length * 2 * 100 + 1000); // Full scroll + slow transition time
    });

    // Check if the final word is in the list
    const finalWord = screen.getByText(words[0]).closest("div");
    const transformStyle = finalWord?.style.transform;
    const finalTranslateY = Number(
      transformStyle?.match(/translateY\(-(\d+)em\)/)?.[1]
    );

    expect(finalTranslateY).toBeLessThanOrEqual(
      (words.length * 2 + words.length - 1) * 2
    );
  });
});
