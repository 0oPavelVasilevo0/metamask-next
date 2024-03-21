import Display from "@/components/DisplayWallet/Display";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className="container">
        <Display />
      </main>
    </MetaMaskContextProvider>
  );
}
