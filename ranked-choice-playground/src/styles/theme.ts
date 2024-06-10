import { createTheme, Theme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d436b",
      dark: "#094067",
      // bright #0098FA
    },
    secondary: {
      main: "#aa1634",
    },
    background: {
      default: "#f8f6f7",
    },
    divider: "#5F6C7B",
    //green #007D52
  },
  typography: {
    fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
    },
    caption: {
      fontSize: "0.8rem",
    },
    button: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: "90%",
          "@media (min-width: 1280px)": {
            maxWidth: 1600,
          },
        },
        maxWidthXl: {
          maxWidth: "95%",
          "@media (min-width: 1920px)": {
            maxWidth: 1800,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-active": {
            color: (theme: Theme) => theme.palette.secondary.main, // Reference secondary color
          },
          "&.Mui-completed": {
            color: (theme: Theme) => theme.palette.secondary.main, // Reference secondary color
          },
        },
      },
    },
  },
});

export default theme;
