import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

interface Message {
    from: string
    to: string
    message: string
}
const DEFAULT_DATA: Message[] = [{from: '', to: '', message: ''}];

export default function message() {
    const [info, setInfo] = useState<Message[]>([]);
    const [records, setRecords] = useState<Message[]>([]);

    const columns = [
        {
            name: 'From',
            selector: (row: Message) => row.from,
            width: '300px'
        },
        {
            name: 'To',
            selector: (row: Message) => row.to,
            width: '300px'
        },
        {
            name: 'Message',
            selector: (row: Message) => row.message,
            width: '500px'
        },
    ];

    // 메시지 받아오기
    const listAPI = async () => {
        try {
            const response = await axios.get<any>('http://localhost:8080/messages');

            let outputData: Message[] = [];

            for (let messageId in response.data.messages.messageList) {
                let message = response.data.messages.messageList[messageId];

                outputData.push({
                    from: message.from,
                    to: message.to,
                    message: message.text,
                });
            }

            console.log("outputData: ", outputData);

            setInfo(outputData);
            setRecords(outputData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = info.filter(row => {
            return row.to.toLowerCase().includes(e.target.value.toLowerCase());
        })
        console.log("newData: ", newData);
        
        if(newData.length === 0) {
            setRecords(DEFAULT_DATA)
        } else {
            setRecords(newData);
        }
    }

    useEffect(() => {
        listAPI();
    }, []);

    return (
        <div className='w-full mt-5 items-center'>
            <div className='text-end'>
                <input type="text" onChange={handleFilter} />
            </div>
            <div className="text-end rounded-md">
                <input type="search" className="phoneTo h-12 px-3 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Search" onChange={handleFilter} />
            </div>
            <DataTable
                columns={columns}
                data={records}
                selectableRows
                fixedHeader
                pagination
            />
        </div>
    )
}