import React, { FC, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Preloader } from "../../components";
import UserInfoPage from "./UserInfoPage";

import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { IUser } from "../../interfaces/user";
import { FriendAPI, UserAPI } from "../../apiServices";
import { getDataFromQueryUrl } from "../../shared/helpres";

type Props = {
    selfId: string
}

const UserInfoPageContainer: FC<Props> = ({ selfId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [isFriend, setIsFriend] = useState(false);
    const history = useHistory();

    const fetchData = useCallback(async (userId: string) => {
        const user = await UserAPI.getUserInfo(userId);
        const { data } = user.data;

        setUserInfo(data);
        setIsFriend(data.friends.some((id: string) => id === selfId));
        setIsLoading(false);
    },[selfId]);

    useEffect(() => {
        const { userId } = getDataFromQueryUrl(history.location.search);
        if(userId && !userInfo) fetchData(userId)
    }, [history.location.search, fetchData, userInfo]);

    const addNewFriend = async (userId: string) => {
        const res = await FriendAPI.addNewFriend(userId);

        if(res.data.success) {
            setUserInfo({ ...userInfo!, friends: [...userInfo!.friends, selfId] });
            setIsFriend(true);
        }
    };

    const removeFriend = async (userId: string) => {
        const res = await FriendAPI.removeFriend(userId);

        if(res.data.success) {
            setUserInfo({ ...userInfo!, friends: userInfo!.friends.filter(id => id !== selfId) });
            setIsFriend(false);
        }
    };

    const handleClick = (id: string) => isFriend ? removeFriend(id) : addNewFriend(id);

    if(isLoading || !userInfo) return <Preloader text="User is loading..." />;

    return <UserInfoPage
        selfId={ selfId }
        userInfo={ userInfo }
        isFriend={ isFriend }
        handleClick={ handleClick }
    />
}

export default connect<Props, {}, {}, AppStateType>(
    store => ({ selfId: UserSelectors.getUserId(store) })
)(UserInfoPageContainer);