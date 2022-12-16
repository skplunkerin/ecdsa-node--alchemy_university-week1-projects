import { useState } from "react";
import server from "./server";
import { toHex } from "ethereum-cryptography/utils";
import { hashMessage, signMessage } from "./scripts/crypto";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      // Sign the data being sent
      let data = {
        recipient,
        amount: parseInt(sendAmount),
      };
      let [signature, recoveryBit] = await signMessage(
        hashMessage(JSON.stringify(data)),
        privateKey
      );
      const {
        data: { balance },
      } = await server.post(`send`, data, {
        headers: {
          // TODO: how do we tell the server the recovery bit info? There's
          // most likely a better way (or convention) for this. (topher)
          signature: `${toHex(signature)}${recoveryBit}`,
        },
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient Address
        <input
          placeholder="Type an address (valid addresses found in `./server/.env`)"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
