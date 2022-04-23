import logo from "./logo.svg";
import "./App.css";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

function App() {
  return (
      <ThemeConfig>
        <GlobalStyles />

        <Router />
      </ThemeConfig>
  );
}

export default App;
