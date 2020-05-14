import io from "socket.io-client";

import { ENV, socketEvents } from "../assets/constants";

type SetUserStatusData = {
   userId: string,
   isOnline: boolean
}

type GetUserStatusData = (data: boolean) => void;

class Socket {
   socket = io( ENV.SERVER_URL );

   public setOnlineStatus = (data: SetUserStatusData) => this.socket.emit(socketEvents.isOnline, data);

   public getOnlineStatus = (getOnlineStatus: GetUserStatusData) =>
       this.socket.on(socketEvents.isOnline, (isOnline: boolean) => {
          getOnlineStatus(isOnline);
       });
}

export default new Socket();
