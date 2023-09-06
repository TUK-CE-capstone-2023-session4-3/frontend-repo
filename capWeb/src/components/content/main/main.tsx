import { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

import Toastify from "../../toastify";

import police_icon from "../../../assets/images/police.png";
import hospital_icon from "../../../assets/images/hospital.png";
import admin_icon from "../../../assets/images/admin.png";

export default function main() {
  const [dates, setDates] = useState(() => new Date());
  const [key, setKeys] = useState("");
  const [balance, setBalance] = useState("0");
  const emergence_boolean = true;

  const successNotify = () =>
    toast.success("신고가 완료되었습니다!", {
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
    toast.error("신고를 실패하였습니다!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const emergenceNotify = () =>
    toast.error(
      <>
        {dates.toLocaleDateString()} {dates.toLocaleTimeString()} <br />
        위험이 감지되었습니다
        <br />
        확인 부탁드립니다!
      </>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  useEffect(() => {
    if (emergence_boolean === true) {
      emergenceNotify();
    }

    const timeId = setInterval(() => tick(), 1000);
    getBalance();
    return () => {
      clearInterval(timeId);
    };
  }, [emergence_boolean]);

  const tick = () => {
    setDates(new Date());
  };

  const sendRequest = async () => {
    try {
      const response = await axios.get("http://localhost:8080", {
        params: {
          Id: key,
        },
      });
      console.log(response);
      console.log(response.data);
      //      successNotify();
    } catch (err) {
      errorNotify();
      console.log(err);
    }
  };

  const getBalance = async () => {
    const response = await axios.get("http://localhost:8080/balance");
    // console.log(response);
    setBalance(response.data.balance);
  };
  const onClick = (e: any) => {
    console.log(e.currentTarget);
    setKeys(e.currentTarget.value);
    sendRequest();
    getBalance();
  };
  console.log(key);
  return (
    <div className="w-fill mt-5 items-center">
      <div className="flex text-left gap-10">
        <div>{dates.toLocaleDateString()}</div>
        <div>{dates.toLocaleTimeString()}</div>
      </div>
      <br />
      <div className="flex h-max gap-20">
        <img
          className="w-4/6"
          src="http://127.0.0.1:5001/video_feed"
          alt="Video"
        />

        <div className="flex flex-col gap-1 items-center justify-items-center">
          <div>{"balance : " + balance}</div>
          {/* <input
            className="phoneTo"
            onChange={onChangeTo}
            placeholder="Phone-To"
          /> */}

          {/* <div className="  my-2 mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="  w-full">
              <input type="search" x-model="input1" className="phoneTo w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  onChange={onChangeTo} value={to} placeholder="Phone-To" />
            </div>
          </div> */}

          {/* <input
            className="phoneFrom"
            onChange={onChangeFrom}
            placeholder="Phone-From"
            /> */}

          {/* <div className="mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="  w-full">
              <input type="search" x-model="input2" className="phoneFrom w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  onChange={onChangeFrom} value={from} placeholder="Phone-From" />
            </div>
          </div> */}

          {/* <div className="mx-auto w-11/12 justify-center flex items-center rounded-md shadow-md">
            <div className="w-full">
              <textarea
                className="content w-full h-20 px-4 py-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                onChange={onChangeText}
                value={text}
                placeholder="Phone-Text"
              />
            </div>
          </div> */}

          {/* <button
            className="flex my-10 p-2 w-48 h-12 bg-light-red rounded-xl text-white items-center justify-center hover:border-transparent transition duration-500 ease-in-out hover:shadow-xl"
            onClick={onClick}
          >
            <div className="mx-2">
              <ExclamationTriangleFill/>
            </div>
            응급상황 신고 버튼!
          </button> */}
          <button
            className="flex my-10 w-56 h-16 bg-light-red rounded-xl text-white items-center justify-center hover:border-transparent transition duration-500 ease-in-out hover:shadow-xl"
            onClick={onClick}
            value="1"
          >
            <div className="flex gap-2.5">
              <img src={hospital_icon} className="h-7 mx-2 my-3" />
              <div className="my-2">
                병원에 신고! <br />
                To : 119
              </div>
            </div>
          </button>
          <button
            className="flex my-10 p-2 w-56 h-16 bg-blue-700 rounded-xl text-white items-center justify-center hover:border-transparent transition duration-500 ease-in-out hover:shadow-xl"
            onClick={onClick}
            value="2"
          >
            <div className="flex gap-2.5">
              <img src={police_icon} className="h-7 mx-2 my-3" />
              <div className="my-2">
                경찰에 신고! <br />
                To : 112
              </div>
            </div>
          </button>
          <button
            className="flex my-10 p-2 w-56 h-16 bg-slate-700 rounded-xl text-white items-center justify-center hover:border-transparent transition duration-500 ease-in-out hover:shadow-xl"
            onClick={onClick}
            value="3"
          >
            <div className="flex gap-2.5">
              <img src={admin_icon} className="h-7 mx-2 my-3" />
              <div className="my-2">
                관리자에 신고! <br />
                To : 010-xxxx-xxxx
              </div>
            </div>
          </button>
        </div>
      </div>
      <Toastify />
    </div>
  );
}
