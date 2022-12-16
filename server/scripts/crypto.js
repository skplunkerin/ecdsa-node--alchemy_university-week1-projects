const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

// Returns the publicKey for the given privateKey as a Uint8Array.
// Use `toHex()` to convert it to a 130 character hex string.
//
// @privateKey param must be a string (use `toHex()` before for Uint8Arrays)
function getPublicKey(privateKey) {
  return secp.getPublicKey(privateKey);
}

// Returns a valid wallet address from the given publicKey as a Uint8Array.
// Use `toHex()` to convert it to a 40 character hex string.
//
// @publicKey param must be a string (use `toHex()` before for Uint8Arrays)
function getAddress(publicKey) {
  // take the 1st byte off the public key to know the format of the key
  const firstByte = publicKey[0];
  const remainingKeyBytes = publicKey.slice(1, publicKey.length);
  // hash the publicKey bytes using keccak256
  const hashKey = keccak256(remainingKeyBytes);
  // return the last 20
  return hashKey.slice(hashKey.length - 20);
}

// hashMessage converts the string to an Uint8Array.
//
// @message param must be a string.
function hashMessage(message) {
  // turn string to array of bytes
  const msgBytes = utf8ToBytes(message);
  // return hash of message bytes using keccak256
  return keccak256(msgBytes);
}

// recoverPublicKey returns a Uint8Array publicKey from the hashedMessage,
// signature, and recoveryBit inputs.
//
// @msgHash param must be a Uint8Array hash (from hashMessage()).
//          (and must be the same hashed message used for creating the
//          @signature?)
// @signature param must be a hex string.
// @recoveryBit param must be an integer (0 or 1?).
async function recoverPublicKey(msgHash, signature, recoveryBit) {
  return secp.recoverPublicKey(msgHash, signature, recoveryBit);
}

// signMessage returns a secp256k1 signed [Uint8Array, number] combo.
//
// @msgHash param must be a Uint8Array hash (from hashMessage()).
// @privKey param must be a string.
async function signMessage(msgHash, privKey) {
  // return the signature and recovered bit
  return await secp.sign(msgHash, privKey, { recovered: true });
}

module.exports = {
  getPublicKey,
  getAddress,
  hashMessage,
  recoverPublicKey,
  signMessage,
};
