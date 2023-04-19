import { useContext } from "react";
import NotiContext from "../NotiContext";

const Notification = () => {
  const [noti, dispatch] = useContext(NotiContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (noti === null) return null;
  return <div style={style}>{noti}</div>;
};

export default Notification;
