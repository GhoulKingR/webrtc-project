class SignalServer {
  constructor(channel) {    
    this.socket = new WebSocket("ws://localhost:80");

    this.socket.addEventListener("open", () => {
      this.postMessage({ type: "join-channel", channel });
    });

    this.socket.addEventListener("message", (e) => {
      const object = JSON.parse(e.data);
      if (object.type === "connection-established") console.log("connection established");
      else if (object.type === "joined-channel") console.log("Joined channel: " + object.channel);
      else this.onmessage({ data: object });
    });
  }
  
  onmessage(e) {}

  postMessage(data) {
    this.socket.send( JSON.stringify(data) );
  }
}