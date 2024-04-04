'use client'
import Display from "@/components/DisplayWallet/Display";
import { ThemeContextProvider } from "@/components/theme/ThemeContext";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";
import { Container, CssBaseline } from "@mui/material";

export default function Home() {
  return (
    <MetaMaskContextProvider>
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
      </ThemeContextProvider>
    </MetaMaskContextProvider>
  );
}