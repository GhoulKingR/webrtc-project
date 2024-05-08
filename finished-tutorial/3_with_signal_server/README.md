# Step 3: with signal server

In this step, there are four essential files: _client.html_, _streamer.html_, _signalserverclass.js_, and _server/index.js_.

_streamer.html_ represents a streamer. It allows a user to create a live broadcast. _client.html_ represents a viewer. It allows a user to view the live broadcast from the streamer. _server/index.js_ is a signal server. It allows the _client.html_ and _streamer.html_ pages to interact with each other.

> Note: The _index.html_ page from the tutorial is renamed to _client.html_. Renaming the file stops the browser from converting the route to a slash (i.e http://localhost:3000/index.html -> http://localhost:3000), which causes issues with finding JS scripts.

## Running this step
To get this step running, you must run the signal server and host the HTML scripts. To do that, you'll need to have Node.js and npm installed on your system.

To host the HTML scripts, run this command in this `3_with_signal_server` directory:

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

After running the command, open the URL hosting the files in your browser. Unlike the second step, You don't need to open these two pages in the same browser to function correctly.
