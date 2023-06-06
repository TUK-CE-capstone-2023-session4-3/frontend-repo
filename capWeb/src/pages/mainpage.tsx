import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import MessageModal from "../components/modal";
import styles from "./styles.css";
export default function Mainpage() {
  const [to, setTO] = useState("01034666927");
  const [from, setFrom] = useState("01034666927");
  const [text, setText] = useState("01034666927");
  const [dates, setDates] = useState(() => new Date());
  const [balance, setBalance] = useState("0");
  const [messages, setMessages] = useState<any>();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const timeId = setInterval(() => tick(), 1000);
    getMessage();
    getBalance();
    return () => {
      clearInterval(timeId);
    };
  });
  const tick = () => {
    setDates(new Date());
  };

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:8080", {
      params: {
        To: to,
        From: from,
        Text: text,
      },
    });
    console.log(response);
    console.log(response.data);
  };

  const getBalance = async () => {
    const response = await axios.get("http://localhost:8080/balance");
    // console.log(response);
    setBalance(response.data.balance);
  };
  const getMessage = async () => {
    const response = await axios.get("http://localhost:8080/messages");
    setMessages(response.data.messages);
  };
  const onClick = (e: any) => {
    //  sendRequest();
    getBalance();
  };
  const onChangeTo = (e: any) => {
    setTO(e.target.value);
  };
  const onChangeFrom = (e: any) => {
    setFrom(e.target.value);
  };
  const onChangeText = (e: any) => {
    setText(e.target.value);
  };
  const listClick = (e: any) => {
    getMessage();
    //    console.log(messages.messages.startKey);
    setModal((prev) => !prev);
  };

  return (
    <div className="flex flex-row  w-max h-max gap-10">
      <img
        className="w-2/6"
        src="http://127.0.0.1:5000/video_feed"
        alt="Video"
      />

      <div className="flex flex-col gap-5 items-center justify-items-center">
        <div>{dates.toLocaleTimeString()}</div>
        <div>{dates.toLocaleDateString()}</div>
        <div>{"balance : " + balance}</div>
        <input
          className="phoneTo"
          onChange={onChangeTo}
          placeholder="Phone-To"
        ></input>
        <input
          className="phoneFrom"
          onChange={onChangeFrom}
          placeholder="Phone-From"
        ></input>
        <textarea
          className="contnet"
          onChange={onChangeText}
          placeholder="Phone-Text"
        ></textarea>
        <button
          className="p-2 w-32 h-14 bg-red-600 rounded-xl"
          onClick={onClick}
        >
          응급상황 신고 버튼!
        </button>
        <button className="bg-white text-black" onClick={listClick}>
          메세지-리스트
        </button>
      </div>
      {messages ? modal && <MessageModal list={messages} /> : null}
    </div>
  );
}
