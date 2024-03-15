import { Display } from "@/components/Display";
import { MetaMaskError } from "@/components/MetaMaskError";
import { Navigation } from "@/components/Navigation";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";
import Image from "next/image";

export default function Home() {
  return (
    <MetaMaskContextProvider>
    {/* <main className="flex min-h-screen flex-col items-center justify-center p-24"> */}
<main className="container">
      {/* <div className="mb-32 flex text-center lg:max-w-xl  lg:mb-0 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group items-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Metamask{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Wallet
          </p>
        </a>
      </div> */}
      <Navigation />
      <Display />
      <MetaMaskError />
    </main>
    </MetaMaskContextProvider>
  );
}
