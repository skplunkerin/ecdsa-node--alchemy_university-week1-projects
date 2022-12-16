const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { getAddress, hashMessage, signMessage } = require("./crypto.js");

// ╭┄┄┄┄┄TEST PRIVATE/PUBLIC KEY CARD 1┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\
// ┊
// ┊ - privateKey:  eb57a378e65561ecb834ce3215a5bae0d8ca2e26c38b9fa2e4121dba48c2afd3
// ┊ - publicKey:   04c15a84b85fc74317c0ea05db6863cb7efd7356b73697dda7670473450617325182c2ef1005196f5634acc54751d4987dd72e0cd180d94212f694f1a6631c60e9
// ┊ - address:     bbdf95f4d36ceab57d518ae7753fdb9c998bcba4
// ┊
// ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/
// ╭┄┄┄┄┄TEST PRIVATE/PUBLIC KEY CARD 2┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\
// ┊
// ┊ - privateKey:  ed59b13ddf5f5182be0f3450971b26571aa3a085d696b7b8b8e543eb176f891b
// ┊ - publicKey:   04551a608b9ee540467c4b2a4d46f7e31e2930c4f6ef3238405d3bde54592f89ccd8412a461ce76e9228596d5ba1c8289f9bec49815e59aec0ba90b96c7801911a
// ┊ - address:     a7e3d7f41e6a3a30a59a6d61380db15371fc8156
// ┊
// ╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄/
//
// What you can do with just a private key:
//   1. sign a message
//   2. get the publicKey from the signed message
//   3. get the address from the recovered publicKey
(async () => {
  console.log();
  const privKey =
    "eb57a378e65561ecb834ce3215a5bae0d8ca2e26c38b9fa2e4121dba48c2afd3";
  const data = {
    recipient: "a7e3d7f41e6a3a30a59a6d61380db15371fc8156",
    amount: 1,
  };
  const dataHash = hashMessage(JSON.stringify(data));
  const [signature, recoveryBit] = await signMessage(dataHash, privKey);
  console.log("signed transaction:", toHex(signature), recoveryBit);

  // get the publicKey from the signature
  const recoveredPublicKey = await secp.recoverPublicKey(
    dataHash,
    signature,
    recoveryBit
  );
  const address = getAddress(recoveredPublicKey);
  console.log("publicKey and address from signature:");
  console.log("publicKey:", toHex(recoveredPublicKey));
  console.log("address:", toHex(address));

  // Can you sign the same message, using the publicKey instead?
  // - NOPE
  // How can I confirm the contents of a signed message came from the
  // privateKey?
  //
  // console.log("\nCan you sign the same message, using the publicKey instead?");
  // const [pubSignature, pubRecoveryBit] = await signMessage(
  //   dataHash,
  //   recoveredPublicKey
  // );
  // console.log(
  //   "public signed transaction:",
  //   toHex(pubSignature),
  //   pubRecoveryBit
  // );
  console.log();
})();
