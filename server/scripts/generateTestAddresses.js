const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { getPublicKey, getAddress } = require("./crypto.js");

function main() {
  console.log("\ninitiating main process...");

  // to generate and log a new private/public key card:
  // logNewKeyCard();

  // to test a key cards address:
  //
  // const address = "95fa3fdb7c3cf6962b88d7473860c875e4431fdd";
  // const pubKey =
  //   "04c8efe67c9415e03dcd2bc6b8ddd11bf4b7d1fab252f2e978caad60620427538fe30535232eff3d7c1da8d6e66f5f62942f60add83d03c0c87be001538abb5681";
  // const address = "bbdf95f4d36ceab57d518ae7753fdb9c998bcba4";
  // const pubKey =
  //   "04c8efe67c9415e03dcd2bc6b8ddd11bf4b7d1fab252f2e978caad60620427538fe30535232eff3d7c1da8d6e66f5f62942f60add83d03c0c87be001538abb5681";
  // testAddress();

  // to log out the 3 key cards hardcoded in `server/index.js`:
  generateServerKeyCards();

  console.log("shutting down...\n");
}

function generateServerKeyCards() {
  console.log("\n  function generateServerKeyCards() processing...");
  // generate three key cards:
  const keyCards = [];
  for (let i = 0; i < 3; i++) {
    // const { privateKey, publicKey, address } = getNewKeyCard();
    keyCards.push(getNewKeyCard());
  }
  // Log key cards:
  for (let i = 0; i < 3; i++) {
    let label = "";
    if (i == 0) {
      label = "ONE";
    } else if (i == 1) {
      label = "TWO";
    } else {
      label = "THREE";
    }
    console.log(`
  ╭┄┄┄┄┄PRIVATE/PUBLIC KEY CARD ${label}┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\\
  ┊
  ┊ - privateKey:  ${keyCards[i].privateKey}
  ┊ - publicKey:   ${keyCards[i].publicKey}
  ┊ - address:     ${keyCards[i].address}
  ┊
  ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/
  `);
  }
  console.log("  function completed\n");
}

// Returns a 32-byte number private key as a Uint8Array.
//
// Use `toHex()` to convert it to a 64 character hex string.
function generateRandomPrivateKey() {
  console.log("\n  running generateRandomPrivateKey()...");
  return secp.utils.randomPrivateKey();
}

function logNewKeyCard() {
  console.log("\n  function logNewKeyCard() processing...");
  const privKey = generateRandomPrivateKey();
  const pubKey = getPublicKey(privKey);
  const address = getAddress(pubKey);

  // NOTE: text formatting pulled (then modified) from the MintDefense Discord.
  console.log("");
  console.log(`
  ╭┄┄┄┄┄NEW PRIVATE/PUBLIC KEY CARD┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\\
  ┊
  ┊ - privateKey:\t${toHex(privKey)}
  ┊ - publicKey:\t${toHex(pubKey)}
  ┊ - address:\t${toHex(address)}
  ┊
  ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/
  `);
  console.log("");
  console.log("  function completed\n");
}

function getNewKeyCard() {
  console.log("\n  running getNewKeyCard()...");
  const privKey = generateRandomPrivateKey();
  const pubKey = getPublicKey(privKey);
  const address = getAddress(pubKey);
  return {
    privateKey: toHex(privKey),
    publicKey: toHex(pubKey),
    address: toHex(address),
  };
}

// ╭┄┄┄┄┄TEST PRIVATE/PUBLIC KEY CARD┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\
// ┊
// ┊ - privateKey:  eb57a378e65561ecb834ce3215a5bae0d8ca2e26c38b9fa2e4121dba48c2afd3
// ┊ - publicKey:   04c15a84b85fc74317c0ea05db6863cb7efd7356b73697dda7670473450617325182c2ef1005196f5634acc54751d4987dd72e0cd180d94212f694f1a6631c60e9
// ┊ - address:     bbdf95f4d36ceab57d518ae7753fdb9c998bcba4
// ┊
// ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/
function testAddressValidityFromPublicKey(address, publicKey) {
  console.log("\n  running testAddressValidityFromPublicKey()...");
  // convert hex publicKey to Uint8Array
  const pubKey = hexToBytes(publicKey);
  const keyAddress = toHex(getAddress(pubKey));
  return address === keyAddress;
}
function testAddress(address, pubKey) {
  console.log("\n  function testAddress() processing...");
  console.log("");
  console.log("╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄");
  console.log(
    "┊ Does address match pubKey?\t",
    testAddressValidityFromPublicKey(address, pubKey)
  );
  console.log("╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄");
  console.log("");
  console.log("  function completed\n");
}

main();
