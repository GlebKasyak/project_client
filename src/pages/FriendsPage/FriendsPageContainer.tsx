import React, { FC, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Preloader } from "../../components";
import FriendsPage from "./FriendsPage";

import { IUser } from "../../interfaces/user";
import { FriendAPI } from "../../apiServices";
import { getDataFromQueryUrl } from "../../shared/helpres";

export enum Filters {
    all = "all",
    online = "online"
}

const FriendsPageContainer: FC = () => {
    const history = useHistory();
    const limit = 10;

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [filter, setFilter] = useState<Filters>(Filters.all);
    const [friends, setFriends] = useState<Array<IUser>>([]);

    const fetchData = useCallback(async (userId: string) => {
        setIsLoading(true);

        const res = await FriendAPI.getFriendsById({ userId, limit, page, filter });
        const { success, data } = res.data;

        if(success) {
            setFriends(data);
            data.length < limit && setHasMore(false);
            setPage(1)
        }
        setIsLoading(false);
    }, [page, filter]);

    useEffect(() => {
        const { userId } = getDataFromQueryUrl(history.location.search);
        if(userId && !friends.length && !page) {
            fetchData(userId)
        };
        setId(userId);
    }, [history.location.search, fetchData, friends.length, friends, page]);

    const handleScroll = async () => {
        const res = await FriendAPI.getFriendsById({ userId: id, limit, page, filter });
        const { success, data } = res.data;

        if(success) {
            setFriends(prevState => [...prevState, ...data]);
            setPage(prevPage => prevPage + 1);
            data.length < limit && setHasMore(false);
        }
    };

    const getAllFriends = (filter: Filters) => {
        setHasMore(true);
        setFriends([]);
        setFilter(filter);
        setPage(0);
    };

    const handleSearchFriends = async (value: string) => {
        setIsLoading(true);

        const res = await FriendAPI.searchFriends(id, value);
        setFriends(res.data.data);

        setIsLoading(false);
        setHasMore(false);
    };

    if(isLoading) return <Preloader text="Friends are loading..." />;

    return (
        <FriendsPage
            friends={ friends }
            history={ history }
            hasMore={ hasMore }
            page={ page }
            filter={ filter }
            setNextPage={ handleScroll }
            getAllFriends={ getAllFriends }
            onSearchFriends={ handleSearchFriends }
        />
    )
}

export default FriendsPageContainer;