import "./App.css";
import { responsiveFontSizes } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Conversation from "./pages/Conversation";
import "./font.css";
import "./index.css";
const theme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    typography: {
      fontFamily: "Jokker-Regular",
      h1: {
        fontSize: "5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "3.5rem",
        fontStyle: "bold",
        fontWeight: 600,
      },
      h3: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
    },
    palette: {
      background: {
        default: "#FFEFE8", //lightplaster
      },
      primary: {
        main: "#09143A", //darkblue
      },
      secondary: {
        main: "#09143A", //yellow
      },
      error: {
        main: "#F06363", //red
      },
      warning: {
        main: "#FFEFE8", //lightplaster
      },
      info: {
        main: "#6B7D6A", //gray
      },
      success: {
        main: "#54C192", //green
      },
      backgroundWhite: {
        main: "#FFEFE8", //white
      },
      iconSecondary: {
        main: "#FFCD00", //yellow
      },
      text: {
        primary: "#09143A", //darkblue
        secondary: "#838190", //lightblue
        custom: "#fff", //white
      },
    },
  })
);
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Conversation />
                </>
              }
            />
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
