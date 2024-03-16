const { WebSocketServer } = require("ws");
const server = new WebSocketServer({ port: 80 });
server.on("connection", handleConnection);

const channels = {};

function handleConnection(ws) {
  console.log('New connection');
  ws.send(JSON.stringify({type: 'connection-established'}));

  let id;
  let channel = "";

  ws.on('message', message => {
    const object = JSON.parse(message);
    if (object.type === "join-channel") {
      channel = object.channel;
      if (channels[channel] === undefined) channels[channel] = [];
      id = channels[channel].length || 0;
      channels[channel].push(ws);
      ws.send(JSON.stringify({type: 'joined-channel', channel}));
    } else {
      channels[channel]?.filter((_, i) => i !== id).forEach((member) => {
        // all channel memebers except `ws`
        member.send(message.toString());
      });
    }
  });

  ws.on("error", () => console.log('websocket error'));
  ws.on('close', () => {
    console.log('Client has disconnected!');
    if (channel !== "") channels[channel] = channels[channel].filter((_, i) => i !== id);
  });
}
