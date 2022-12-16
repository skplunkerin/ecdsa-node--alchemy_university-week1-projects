const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
require("dotenv").config();
const { toHex } = require("ethereum-cryptography/utils");
const {
  getAddress,
  hashMessage,
  recoverPublicKey,
} = require("./scripts/crypto.js");

app.use(cors());
app.use(express.json());

const balances = {};
// TODO: how am I supposed to initialize code on Express startup? (topher)
// these don't work, not sure how to initialize the project on start?
// app.init(); // nope
// app.init(() => {}); // nope
// Current solution is to call this in app.listen();
function initializeBalances() {
  console.log("initializing balances...");
  balances[`${process.env.KEY_CARD_ONE_ADDRESS}`] = 100;
  balances[`${process.env.KEY_CARD_TWO_ADDRESS}`] = 50;
  balances[`${process.env.KEY_CARD_THREE_ADDRESS}`] = 75;
  console.log("balances:", balances);
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { recipient, amount } = req.body;
  // NOTE: the signature header has the recoveryBit at the end.
  const { signature } = req.headers;
  const sig = signature.substr(0, signature.length - 1);
  const recoveryBit = parseInt(signature.substr(signature.length - 1));
  // get the publicKey from the signature
  const publicKey = await recoverPublicKey(
    // NOTE: this is how we verify that the sender did specify the recipient and
    //       amount in the POST payload.
    //       Any changes to the `hashMessage()` will cause a different publicKey
    //       and address than what actually belongs to the privateKey.
    //
    //       ie: hashMessage("ham" + JSON.stringify(req.body)),
    //
    // TODO: HOWEVER, what if by chance the address pulled from this is a valid
    //       address? (topher)
    //       - How can we verify the following:
    //         1. The POST payload was actually sent by the sender's privateKey
    //            (it isn't being replayed by someone else)
    //         2. The publicKey/address combo from `recoverPublicKey()` are
    //            correct?
    hashMessage(JSON.stringify(req.body)),
    sig,
    recoveryBit
  );

  // get the senders wallet address from the publicKey
  const sender = toHex(getAddress(publicKey));

  // verify the recipient address is different from sender address
  if (sender == recipient) {
    res.status(400).send({ message: "Can't send funds to self." });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);
  // verify that the sender address has the available funds to transfer
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    // transfer the funds
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  initializeBalances();
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
