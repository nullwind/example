import { Theme } from "nullwind";

const theme = {
  title: {
    h1: "text-3xl text-secondary-600",
    h2: "text-2xl text-secondary-600",
    h3: "text-secondary-600",
  },
  toggle: {
    checked: {
      on: "bg-purple-500",
    },
  },
  button: {
    color: {
      secondary:
        "text-secondary-500 border-secondary-200 bg-secondary-50 hover:bg-secondary-200 disabled:hover:bg-secondary-50",
    },
    active: {
      secondary: "bg-secondary-200",
    },
  },
};

export default theme as Theme;
