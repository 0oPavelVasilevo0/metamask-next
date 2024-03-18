import Display from "@/components/DisplayWallet/Display";
import { MetaMaskError } from "@/components/MetaMaskError";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";

export default function Home() {
  return (
    <MetaMaskContextProvider>
      <main className="container">
        <Display />
        <MetaMaskError />
      </main>
    </MetaMaskContextProvider>
  );
}
