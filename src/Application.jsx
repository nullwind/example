import Nullstack from "nullstack";
import { useTheme, Title, Button } from "nullwind";

import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Sidebar from "./layouts/Sidebar";

import "../tailwind.css";

class Application extends Nullstack {
  prepare({ page }) {
    page.locale = "en-US";
  }

  initiate(context) {
    const theme = {
      title: {
        h1: "text-3xl text-secondary-600",
        h2: "text-2xl text-secondary-600",
        h3: "text-secondary-600",
      },
    };

    context.useTheme = useTheme(theme);

    context.settings = {
      name: "My Application",
      locale: "en-US",
      notifications: true,
      analytics: true,
    };
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    );
  }

  render(context) {
    // if (!context.useTheme) return false;

    return (
      <body class="bg-slate-50">
        <Head />
        <div class="flex min-h-screen">
          <Sidebar />
          <div class="w-full">
            <main class="max-w-7xl mx-auto px-6 bg-white py-8 mt-10 rounded-lg shadow-sm">
              <Users route="/" />
              <Settings route="/settings" />
            </main>
          </div>
        </div>
      </body>
    );
  }
}

export default Application;
