import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function Mainpage() {
  const sendRequest = async () => {
    const response = await axios.get("http://localhost:8080");
    console.log(response);
    console.log(response.data);
  };
  const onClick = (e: any) => {
    sendRequest();
  };

  return (
    <div className="flex flex-row  w-max h-max gap-10">
      <img
        className="w-2/6"
        src="http://127.0.0.1:8000/video_feed"
        alt="Video"
      />
      <div className="flex items-center justify-items-center">
        <button className="w-32 h-14 bg-red-600 rounded-xl" onClick={onClick}>
          응급상황 신고 버튼!
        </button>
      </div>
    </div>
  );
}
