'use client'
import Display from "@/components/DisplayWallet/Display";
import { ThemeContextProvider } from "@/components/theme/ThemeContext";
import { customTheme } from "@/components/theme/theme";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";

export default function Home() {
  return (
    <MetaMaskContextProvider>
      {/* <main className="container"> */}
      {/* <ThemeProvider theme={customTheme}> */}
      <ThemeContextProvider>
        <CssBaseline />
      <Container sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Display />
      </Container>
      {/* </main> */}
      </ThemeContextProvider>
      {/* </ThemeProvider> */}
     </MetaMaskContextProvider>
  );
}

// min - height: 100vh;
// min - width: 100vw;
// display: flex;
// flex - direction: column;
// justify - content: center;
// align - items: center;