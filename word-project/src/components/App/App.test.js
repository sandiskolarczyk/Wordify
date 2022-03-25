import { render, screen } from "@testing-library/react";
import App from "./App.js";
//import "jest-dom/extend-expect";

jest.mock("./App.js");

describe("App component", () => {
  test("whether the App component is being rendered", () => {
    render(<App />);
    expect(screen.getByTestId("app-component")).toBeInTheDocument();
  });
});

// const fetchWord = async () => {
//   const response = await fetch(`https://words-api-project.herokuapp.com/words`);
//   const data = await response.json();
//   return data;
// };

// const MOCK_WORDS = [
//   { id: 1, word: "sun" },
//   { id: 2, word: "happy" },
//   { id: 3, word: "spring" },
// ];

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(MOCK_WORDS),
//   })
// );

// describe("App component", () => {
//   test("whether API returns a word", async () => {
//     const data = await fetchWord();
//     expect(data).toBe(MOCK_WORDS);
//   });
// });
