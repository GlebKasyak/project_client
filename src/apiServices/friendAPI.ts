import axios, { CancelToken } from "axios";

import { FriendsEndPoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";

class FriendAPI {
    static addNewFriend = (userId: string) =>
        axios.get(`${ FriendsEndPoints.addNewFriend }/${ userId }`);

    static removeFriend = (userId: string) =>
        axios.get(`${ FriendsEndPoints.removeFriend }/${ userId }`);

    static getFriendsById = (data: ScrollDataType, token?: CancelToken) =>
        axios.get(`${ FriendsEndPoints.getFriends }/${ JSON.stringify(data) }`, { cancelToken: token });

    static searchFriends = (userId: string, value: string) =>
        axios.post(`${ FriendsEndPoints.search }`, { userId, value });
}

export default FriendAPI;