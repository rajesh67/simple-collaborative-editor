
## How to run this project

Clone the repo on your machine:
 - `git clone https://github.com/rajesh67/simple-collaborative-editor.git`
 - go to the "simple-collaborative-editor" directory 
 - go to terminal and run `npm install`

## Run websocket server
Following command will start the websocket server
 - `node src/server.js`
 
## Run frontend
Following commands will start the frontend if using development environment
 - `npm start`
 - open `http://localhost:3000`
 
Using build
- Run `npm run-script build`. This will build the frontend project and output will be saved to the "build" directory
- Run `npm i -g serve` . This will install serve
- Run `serve -s build` .Will start serving the index.html output file

Note:- anyhow you have to start the server by running `node src/server.js` in both cases, because this is where our websockets will be listening

## Key Assumptions : Important to understand

Since we don't have any save button, because we don't save data on a real server. So it is important to keep in mind the following conditions:
 
 - If the mouse has entered in the textarea. Then the current user is considered to being editing something in there. Hence we lock the lock editor for all other users.
 - Once the current user click somewhere else other then the textarea, then the editor is unlocked and other users can start typing in the ediotr. for e.g.- you have to click somewhere outside the textarea to unlock the editor.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
