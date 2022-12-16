import server from "./server";
import { toHex } from "ethereum-cryptography/utils";
import { getPublicKey, getAddress } from "./scripts/crypto";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    let clear = false;
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    // TODO: clean up this mess. (topher)
    if (privateKey) {
      let publicKey = Uint8Array;
      try {
        publicKey = getPublicKey(privateKey);
      } catch (error) {
        alert("privateKey invalid:", error.message);
      }
      if (publicKey) {
        let address = "";
        try {
          address = toHex(getAddress(publicKey));
        } catch (error) {
          alert("publicKey invalid:", error.message);
        }
        setAddress(address);
        if (address) {
          const {
            data: { balance },
          } = await server.get(`balance/${address}`);
          setBalance(balance);
        } else {
          clear = true;
        }
      } else {
        clear = true;
      }
    } else {
      clear = true;
    }
    if (clear) {
      setAddress("");
      setBalance(0);
    }
  }

  /*
   * TODO: find a better way of formatting the below WARNING so VSCode doesn't
   * make it completely unreadable. (topher)
   */
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <code>
        ╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
        <br />┊ <b>WARNING:</b>
        <br />┊{" "}
        <b>
          <u>NEVER EVER SHARE YOUR PRIVATE KEY INFO WITH ANYONE;</u>
        </b>
        <br />
        ┊ This project is a representation of what an actual wallet would do,
        <br />
        ┊ DO NOT paste your own private key in here.
        <br />
        ┊<br />
        ┊ This project takes a mock private key to sign a fake transaction,
        <br />
        ┊ that is why the project is asking for a private key.
        <br />
        ┊ IDEALLY the signing process would happen elsewhere so the private key
        <br />
        ┊ is never shared.
        <br />
        ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
        <br />
      </code>
      <label>
        Private Key
        <input
          placeholder="Type one of the mock private keys (found in `./server/.env`)"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <p>Address: {address}</p>
      <p className="balance">Balance: {balance}</p>
    </div>
  );
}

export default Wallet;
