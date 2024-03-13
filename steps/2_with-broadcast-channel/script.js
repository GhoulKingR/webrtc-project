const localVideo = document.querySelector("video#local");
const remoteVideo = document.querySelector("video#remote");
const startButton = document.querySelector("button#start");
const sendButton = document.querySelector("button#send");
let stream;
let peerConnection;

const channel = new BroadcastChannel("webrtc-tutorial-vid");
channel.onmessage = async (e) => {
  if (e.data.type === "icecandidate") {
    peerConnection?.addIceCandidate(e.data.candidate)
  } else if (e.data.type === "offer") {
    createPeerConnection();
    await peerConnection.setRemoteDescription(e.data);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    channel.postMessage({
      type: "answer",
      sdp: answer.sdp,
    });
  } else if (e.data.type === "answer") {
    await peerConnection.setRemoteDescription(e.data);
  }
}

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  sendButton.disabled = false;
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  localVideo.srcObject = stream;
});

function createPeerConnection() {
  console.log("Creating peer connection");
  peerConnection = new RTCPeerConnection();
  peerConnection.addEventListener("icecandidate", (e) => {
    let candidate = null;
    if (e.candidate !== null) {
      candidate = {
        candidate: e.candidate.candidate,
        sdpMid: e.candidate.sdpMid,
        sdpMLineIndex: e.candidate.sdpMLineIndex,
      }
    }
    channel.postMessage({
      type: "icecandidate",
      candidate
    })
  });
  peerConnection.addEventListener("track", (e) => {
    remoteVideo.srcObject = e.streams[0];
  });
  for (let track of stream.getTracks()) {
    peerConnection.addTrack(track, stream);
  }
}

sendButton.addEventListener("click", async () => {
  sendButton.disabled = true;
  createPeerConnection();

  const offer = await peerConnection.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  });
  await peerConnection.setLocalDescription(offer);
  channel.postMessage({
    type: "offer",
    sdp: offer.sdp,
  });
  
});
