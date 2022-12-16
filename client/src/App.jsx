import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        /*
         * WARNING:
         * NEVER EVER SHARE YOUR PRIVATE KEY INFO WITH ANYONE;
         * This project is a representation of what an actual wallet would do,
         * DO NOT paste your own private key in here.
         *
         * This project takes a mock private key to sign a fake transaction,
         * that is why the project is asking for a private key.
         * IDEALLY the signing process would happen elsewhere so the private key
         * is never shared.
         */
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer privateKey={privateKey} setBalance={setBalance} />
    </div>
  );
}

export default App;
