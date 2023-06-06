type props = {
  from: string;
  message: string;
  date: string;
};

export default function MessageCard({ message, from, date }: props) {
  return (
    <>
      <div className="flex flex-col">
        <div>{"From : " + from}</div>
        <div>{date}</div>
        <div>{"message : " + message}</div>
      </div>
    </>
  );
}
