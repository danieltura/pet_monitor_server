# GraphQL Server

## To start the server for devlopment

1. Check if Node is downloaded on your system.
   - `node -v`
   - If node is not on your system [Download Node](https://nodejs.org/en/download/)
2. Open prefered terminal and locate this server folder
3. run `npm i`
4. create `.env` file in the root folder
5. Add your firebase database keys in to env file
   - FIREBASE_API_KEY = <key>
   - FIREBASE_AUTH_DOMAIN = <domain>
   - FIREBASE_DATABASE_URL = <url>
   - FIREBASE_PROJECT_ID = <project id>
6. run `npm run dev`

## To start the server for production

- follow the steps from development section up to **step 5**
- run `npm start`