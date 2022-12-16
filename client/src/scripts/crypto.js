import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes } from "ethereum-cryptography/utils";

// Returns the publicKey for the given privateKey as a Uint8Array.
// Use `toHex()` to convert it to a 130 character hex string.
//
// @privateKey param must be a string (use `toHex()` before for Uint8Arrays)
function getPublicKey(privateKey) {
  // console.log("\n  running getPublicKey()...");
  return secp.getPublicKey(privateKey);
}

// Returns a valid wallet address from the given publicKey as a Uint8Array.
// Use `toHex()` to convert it to a 40 character hex string.
//
// @publicKey param must be a string (use `toHex()` before for Uint8Arrays)
function getAddress(publicKey) {
  // console.log("\n  running getAddress()...");
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

// signMessage returns a secp256k1 signed [Uint8Array, number] combo.
//
// @msgHash param must be a Uint8Array hash (from hashMessage()).
// @privKey param must be a string.
async function signMessage(msgHash, privKey) {
  // return the signature and recovered bit
  return await secp.sign(msgHash, privKey, { recovered: true });
}

export { getPublicKey, getAddress, hashMessage, signMessage };
