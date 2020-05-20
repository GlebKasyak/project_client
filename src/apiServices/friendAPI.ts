import axios, { CancelToken } from "axios";

import { MainEndpoints } from "../assets/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";

class FriendAPI {
    static addNewFriend = (userId: string) =>
        axios.get(`${ MainEndpoints.friend }/new-friend/${ userId }`);

    static removeFriend = (userId: string) =>
        axios.get(`${ MainEndpoints.friend }/remove-friend/${ userId }`);

    static getFriendsById = (data: ScrollDataType, token?: CancelToken) =>
        axios.get(`${ MainEndpoints.friend }/friends/${ JSON.stringify(data) }`, { cancelToken: token });

    static searchFriends = (userId: string, value: string) =>
        axios.post(`${ MainEndpoints.friend }/search`, { userId, value });
}

export default FriendAPI;