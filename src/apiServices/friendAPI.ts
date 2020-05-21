import axios from "axios";

import { MainEndpoints } from "../shared/constants/api.contsnts";
import { ScrollDataType } from "../interfaces/common";

class FriendAPI {
    static addNewFriend = (userId: string) =>
        axios.get(`${ MainEndpoints.friend }/new-friend/${ userId }`);

    static removeFriend = (userId: string) =>
        axios.get(`${ MainEndpoints.friend }/remove-friend/${ userId }`);

    static getFriendsById = (data: ScrollDataType) =>
        axios.get(`${ MainEndpoints.friend }/friends/${ JSON.stringify(data) }`);

    static searchFriends = (userId: string, value: string) =>
        axios.post(`${ MainEndpoints.friend }/search`, { userId, value });
}

export default FriendAPI;