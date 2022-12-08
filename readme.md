# Project - ECDSA Node

> **NOTE:** the base code for this project is cloned from the following repo:
> https://github.com/alchemyplatform/ecdsa-node

## Challenge Summary:

The best way to deeply understand blockchain is to put yourself into development mode. What would it be like to build your own blockchain? Let's start by applying our knowledge of hashes and digital signatures to our very first project: ECDSA Node.

In this project you'll have a simple react front-end which will communicate with a single server. This server will be responsible for transferring balances between accounts. Since it's a single server, it is centralized, so we'll need to trust that the server operator is not malicious for this exercise (more on this later!).

### 🏁 Your Goal: ECDSA

This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate **private key** can create a signature that will allow them to move funds from one account to the other. Then, the server can **verify** the signature to move funds from one account to another.

1. Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
2. The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

> 🤔 While you're working through this project consider the security implications of your implementation decisions. What if someone intercepted a valid signature, would they be able to replay that transfer by sending it back to the server?

---

## ECDSA Node

This project is an example of using a client and server to facilitate transfers
between different addresses. Since there is just a single server on the back-end
handling transfers, this is clearly very centralized. We won't worry about
distributed consensus for this project.

However, something that we would like to incorporate is Public Key Cryptography.
By using Elliptic Curve Digital Signatures ([ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm))
we can make it so the server only allows transfers that have been signed for by
the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check
out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Project setup:

#### Client

The `client/` folder contains a [react app](https://reactjs.org/) using
[vite](https://vitejs.dev/).

**To get started, follow these steps:**

1. Open up a terminal in the `./client` folder

2. Run `npm install` to install all the dependencies

3. Run `npm run dev` to start the application

4. Now you should be able to visit the app at http://localhost:5173/

#### Server

The `server/` folder contains a `node.js` server using
[express](https://expressjs.com/).

**To run the server, follow these steps:**

1. Open a terminal within the `./server` folder

2. Run `npm install` to install all the dependencies

3. Run `node index` to start the server

4. The application should connect to the default server port `3042`
   automatically!
   _(http://127.0.0.1:3042/)_

> _**Hint** - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of_\
> _`node` to automatically restart the server on any changes:_
>
> 1. In the terminal, run `npm i --save-dev nodemon`
> 2. Update `./server/package.json` scripts to have the following:
>    `"dev": "nodemon index.js"`
> 3. In the terminal, run `npm run dev`
