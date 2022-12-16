# Server

## Project setup:

1. Install dependencies

   ```sh
   npm i
   ```

2. Duplicate `.env-sample` to `.env` and setup the ENV variables:

   ```sh
   cp .env-sample .env
   node scripts/generateTestAddresses.js
   ```

   - Copy the outputs from `generateTestAddresses.js` to the correct `.env`
     variables

3. Run the project locally:

   ```sh
   npm run dev
   ```
