import "./App.css";
import { Route, Routes } from "react-router-dom";
import Form from "./CreateToken/Form";
import Navbar from "./Navbar";
import ShowingData from "./ShowingData/ShowingData";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { bsc, bscTestnet } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
function App() {
  const { provider, chains } = configureChains(
    [mainnet, goerli, bscTestnet, bsc],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http:
            chain.id === 5
              ? `https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353`
              : `https://data-seed-prebsc-1-s1.binance.org:8545`,
        }),
        // rpc: (chain) => ({
        //   http:
        //     chain.id === 5
        //       ? `https://data-seed-prebsc-1-s1.binance.org:8545`
        //       : `https://goerli.infura.io/v3/a50debb14c734109b08e35c65f591353`,
        // }),
      }),

      publicProvider(),
    ]
  );
  const wagmiClient = createClient({
    provider,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          shimChainChangedDisconnect: true,
          shimDisconnect: false,
          UNSTABLE_shimOnConnectSelectAccount: false,
        },
      }),
    ],
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/details" element={<ShowingData />} />
        </Routes>
      </WagmiConfig>
    </>
  );
}

export default App;
