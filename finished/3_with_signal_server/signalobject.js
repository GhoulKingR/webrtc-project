class SignalServer {
  ready = false;

  constructor(channel) {    
    this.socket = new WebSocket("ws://localhost:80");

    this.socket.addEventListener("open", () => {
      this.postMessage({type: "join-channel", channel});
      this.ready == true;
    });

    this.socket.addEventListener("message", (e) => {
      const object = JSON.parse(e.data);
      if (object.type === "joined-channel") console.log("Joined channel: " + object.channel);
      else if (object.type === "connection-established") console.log("connection established");
      else this.onmessage({ data: object });
    });
  }
  
  onmessage(e) {}

  postMessage(data) {
    const jsonString = JSON.stringify(data);
    this.socket.send(jsonString);
  }
}