const localVideo = document.querySelector("video#local");
const remoteVideo = document.querySelector("video#remote");
const startButton = document.querySelector("button#start");
const sendButton = document.querySelector("button#send");

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  localVideo.srcObject = stream;
});

sendButton.addEventListener("click", async () => {
  sendButton.disabled = true;
  const videoStream = localVideo.srcObject;
  const peerConnection1 = new RTCPeerConnection();
  const peerConnection2 = new RTCPeerConnection();

  peerConnection1.addEventListener("icecandidate", (e) =>
    onIceCandidate(peerConnection2, e),
  );
  peerConnection2.addEventListener("icecandidate", (e) =>
    onIceCandidate(peerConnection1, e),
  );
  peerConnection2.addEventListener("track", (e) => {
    remoteVideo.srcObject = e.streams[0];
  });
  for (let track of videoStream.getTracks()) {
    peerConnection1.addTrack(track, videoStream);
  }

  const offer = await peerConnection1.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  });
  await peerConnection1.setLocalDescription(offer);
  await peerConnection2.setRemoteDescription(offer);

  const answer = await peerConnection2.createAnswer();
  await peerConnection2.setLocalDescription(answer);
  await peerConnection1.setRemoteDescription(answer);
});

function onIceCandidate(peerConnection, event) {
  peerConnection.addIceCandidate(event.candidate);
}
