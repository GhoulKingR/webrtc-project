# Step 3: with signal server
This directory has a _streamer.html_ page that represents a streamer, an _index.html_ page that represents a viewer, and a _server_ folder that contains the signal server.

## Running the project
To get the project running, you must run the signal server and host the HTML scripts.

To host the HTML scripts, run this command in this directory:
```bash
npx serve .
```

When you run this command, it will let you know what URL is hosting the files.

To run the signal server, open another terminal window and run these commands in the _server_ folder:
```bash
# install dependencies
npm install

# run the server
node index.js
```

After running the command, open the URL hosting the files in your browser.

Unlike step 2, You don't need to open these two pages in the same browser for it to function correctly.
