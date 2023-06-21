import { useState } from "react";
import control from "../../../assets/images/control.png";
import logo from "../../../assets/images/Logo.png";

import {WebcamFill, ChatText} from 'react-bootstrap-icons';

import Main from '../../content/main';
import Message from '../../content/message';

export default function sidebar() {
    const [open, setOpen] = useState(false);
    const [select, setSelect] = useState('CCTV');

    const Menus = [
        {title: "CCTV", src: <WebcamFill/>},
        {title: "Message List", src: <ChatText/>},
    ]

    const handleClick = (title: string) => {
        setSelect(title);
    }

    return(
        <div className="flex">
            <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-4 pt-8 bg-dark-purple relative`}>
                <img
                    src={control}
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img src={logo}
                        className={`w-12 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                    />
                    <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>Security</h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((menu, index) => (
                        <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2  ${select === menu.title ? "bg-light-white": ""}`} onClick={() => handleClick(menu.title)}>
                            <div>
                                {menu.src}
                            </div>
                            <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-7 text-l font-semibold flex-1 h-screen">
                {
                    select === 'CCTV'
                    ? <Main/>
                    : select === 'Message List'
                      ? <Message/>
                      : 'none'
                }
            </div>
        </div>
    )
}