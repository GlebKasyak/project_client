import io from "socket.io-client";
import { ENV } from "../assets/constants";

type UserStatusData = {
   userId: string,
   isOnline: boolean
}

class Socket {
   socket = io( ENV.SERVER_URL );

   public setOnlineStatus = (data: UserStatusData) => this.socket.emit("isOnline", data);
}

export default new Socket();
