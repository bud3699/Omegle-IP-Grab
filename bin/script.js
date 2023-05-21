const originalRTCPeerConnection = window.RTCPeerConnection || window.oRTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new originalRTCPeerConnection(...args);

  pc.originalAddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const candidateFields = iceCandidate.candidate.split(' ');

    if (candidateFields[7] === 'srflx') {
      console.log('Users IP:', candidateFields[4]);
    }
    return pc.originalAddIceCandidate(iceCandidate, ...rest);
  };

  return pc;
};
