import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import "@rainbow-me/rainbowkit/styles.css";
// import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { WagmiProvider } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

// const config = getDefaultConfig({
//   appName: "My RainbowKit App",
//   projectId: "YOUR_PROJECT_ID",
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

// const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sexy terapist chat",
  description: "Sexy terapist chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen bg-gray-950 text-primary">
          {/* <div className="absolute top-0 right-0 p-4">
                  <ConnectButton />
                </div> */}
          {children}
        </div>
        {/* <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider> */}
      </body>
    </html>
  );
}
