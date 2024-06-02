import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WordSpinner from "./WordSpinner";

// Mock requestAnimationFrame
beforeEach(() => {
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    setTimeout(() => {
      (cb as FrameRequestCallback)(0);
    }, 0);
    return 0;
  });
});

// Mock transition end event
const fireTransitionEnd = (element: HTMLElement) => {
  const event = new Event("transitionend", { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("WordSpinner component", () => {
  const words = ["apple", "banana", "cherry", "date", "elderberry"];

  test("renders WordSpinner with initial words", () => {
    render(<WordSpinner words={words} />);
    words.forEach((word, index) => {
      expect(screen.getByTestId(`text-item-${index}`)).toBeInTheDocument();
    });
  });

  test("starts spinning and calls onFinish with a word", async () => {
    const onFinish = jest.fn();
    const ref = React.createRef<{ startSpinning: () => void }>();

    // Mock Math.random to ensure predictable results
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    render(<WordSpinner ref={ref} words={words} onFinish={onFinish} />);

    await act(async () => {
      ref.current?.startSpinning();
    });

    const spinningText = screen.getByTestId("spinning-text");

    // Fire transitionend event manually
    act(() => {
      fireTransitionEnd(spinningText);
    });

    await waitFor(() => expect(onFinish).toHaveBeenCalled(), { timeout: 2000 });

    // Verify that the onFinish callback was called with a valid word
    const finalWord = onFinish.mock.calls[0][0];
    expect(words).toContain(finalWord);
  });

  test("resets spinner correctly", async () => {
    const ref = React.createRef<{ startSpinning: () => void }>();

    // Mock Math.random to ensure predictable results
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    render(<WordSpinner ref={ref} words={words} />);

    await act(async () => {
      ref.current?.startSpinning();
    });

    const spinningText = screen.getByTestId("spinning-text");

    // Wait for the spinner to finish animating and reset
    await waitFor(
      () => {
        fireTransitionEnd(spinningText);
        console.log(spinningText.className); // Add logging to check class name
        expect(spinningText).toHaveClass("is-animating");
      },
      { timeout: 2000 }
    );

    // Wait for the is-resetting class to be applied
    await waitFor(
      () => {
        console.log(spinningText.className); // Add logging to check class name
        expect(spinningText).toHaveClass("is-resetting");
      },
      { timeout: 2000 }
    );

    // Ensure the class is eventually removed
    await waitFor(
      () => {
        fireTransitionEnd(spinningText);
        console.log(spinningText.className); // Add logging to check class name
        expect(spinningText).not.toHaveClass("is-resetting");
      },
      { timeout: 2000 }
    );

    // Verify that the spinner has reset
    const textItems = screen.getAllByTestId(/text-item-/);
    expect(textItems.length).toBeGreaterThanOrEqual(words.length);
  });
});
