import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Homepage from "./components/homepage";

const queryClient = new QueryClient();

// Material UI in the portfolio colours; light or dark follows the device
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "media" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#8c2335" },
        background: { default: "#f8f4f5", paper: "#ffffff" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#f08da0" },
        background: { default: "#161012", paper: "#20181b" },
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Homepage />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
