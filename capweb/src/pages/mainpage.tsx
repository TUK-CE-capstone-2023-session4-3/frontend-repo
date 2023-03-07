import { useState, useEffect } from "react";
import RTCVideo from "../components/cam";

export default function Mainpage() {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return (
    <div>
      <RTCVideo mediaStream={localStream} />
      <h1>HI</h1>
    </div>
  );
}
