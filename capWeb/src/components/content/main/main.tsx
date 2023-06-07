import { useState, useEffect } from "react";
import axios from "axios";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ExclamationTriangleFill} from 'react-bootstrap-icons';

import Toastify from "../../toastify";

export default function main() {
  const [to, setTO] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [dates, setDates] = useState(() => new Date());
  const [balance, setBalance] = useState("0");

  const successNotify = () => 
      toast.success('신고가 완료되었습니다!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  const errorNotify = () => 
      toast.error('신고를 실패하였습니다!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });

  useEffect(() => {
    const timeId = setInterval(() => tick(), 1000);
    getBalance();
    return () => {
      clearInterval(timeId);
    };
  }, []);
  
  const tick = () => {
    setDates(new Date());
  };

  const sendRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8080", {
        params: {
          To: to,
          From: from,
          Text: text,
        },
      });
      console.log(response);
      console.log(response.data);
      
      successNotify()
      setFrom("");
      setTO("");
      setText("");
    } catch (err) {
      errorNotify()
      console.log(err);
    }
  };

  const getBalance = async () => {
    const response = await axios.get("http://localhost:8080/balance");
    // console.log(response);
    setBalance(response.data.balance);
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

  return (
    <div className="w-fill mt-5 items-center">
      <div className="flex text-left gap-10">
        <div>{dates.toLocaleDateString()}</div>
        <div>{dates.toLocaleTimeString()}</div>
      </div>
      <br/>
      <div className="flex h-max gap-20">
        <img
          className="w-4/6"
          src="http://127.0.0.1:5001/video_feed"
          alt="Video"
        />

        <div className="flex flex-col gap-4 items-center justify-items-center">
          <div>{"balance : " + balance}</div>
          {/* <input
            className="phoneTo"
            onChange={onChangeTo}
            placeholder="Phone-To"
          /> */}

          <div className="  my-2 mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="  w-full">
              <input type="search" x-model="input1" className="phoneTo w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  onChange={onChangeTo} value={to} placeholder="Phone-To" />
            </div>
          </div>

          {/* <input
            className="phoneFrom"
            onChange={onChangeFrom}
            placeholder="Phone-From"
            /> */}

          <div className="mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="  w-full">
              <input type="search" x-model="input2" className="phoneFrom w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  onChange={onChangeFrom} value={from} placeholder="Phone-From" />
            </div>
          </div>

          <div className="mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="w-full">
              <textarea
                className="content w-full h-20 px-4 py-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                onChange={onChangeText}
                value={text}
                placeholder="Phone-Text"
              />
            </div>
          </div>

          <button
            className="flex my-10 p-2 w-48 h-12 bg-light-red rounded-xl text-white items-center justify-center hover:border-transparent transition duration-500 ease-in-out hover:shadow-xl"
            onClick={onClick}
          >
            <div className="mx-2">
              <ExclamationTriangleFill/>
            </div>
            응급상황 신고 버튼!
          </button>
        </div>
      </div>
      <Toastify/>
    </div>
  );
}
