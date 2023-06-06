import MessageCard from "../message";
import "./styles.css";

export default function MessageModal(list: any) {
  ///console.log(list.list.messageList);
  let arr: any = [];
  for (let objKey in list.list?.messageList) {
    if (list.list.messageList.hasOwnProperty(objKey)) {
      arr.push(list.list.messageList[objKey]);
    }
  }
  let message = arr.map(
    (i: { text: string; from: string; dateCreated: string }) => {
      return (
        <MessageCard
          message={i.text}
          from={i.from}
          date={i.dateCreated}
        ></MessageCard>
      );
    }
  );

  return (
    <>
      <div className="container flex flex-col">{message}</div>
    </>
  );
}
