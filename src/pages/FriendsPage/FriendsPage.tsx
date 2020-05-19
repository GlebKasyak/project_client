import React, { FC } from "react";
import { History } from "history";
import { Button, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import cn from "classnames";

import { Filters } from "./FriendsPageContainer";
import { EmptyComponent, Preloader, UserList } from "../../components";
import "./style.scss";

import { IUser } from "../../interfaces/user";

type Props = {
    friends: Array<IUser>,
    history: History,
    hasMore: boolean,
    page: number,
    filter: Filters
    setNextPage: () => Promise<void>,
    getAllFriends: (filter: Filters) => void,
    onSearchFriends: (value: string) => Promise<void>,
}

const FriendsPage: FC<Props> = (
    {
        friends,
        history,
        hasMore,
        setNextPage,
        page ,
        getAllFriends,
        filter,
        onSearchFriends
    }) => (
    <div className="container" >
        <div className="friends-page" >
            <div className="friends-page__header" >
               <div className="friends-page__buttons" >
                   <Btn currentFilter={ filter } getAllFriends={ getAllFriends } selfFilter={ Filters.all } text="All friends" />
                   <Btn currentFilter={ filter } getAllFriends={ getAllFriends } selfFilter={ Filters.online } text="Friends online" />
               </div>
                <div>
                    <Input.Search
                        placeholder="Friends search"
                        onSearch={ value => onSearchFriends(value) }
                    />
                </div>
            </div>
            { !!friends.length
                ? (
                    <InfiniteScroll
                        next={ setNextPage }
                        hasMore={ hasMore }
                        loader={ page !== 1 && <Preloader text="Loading..." modifier="bottom-scroll-loader" /> }
                        dataLength={ friends.length }
                    >
                        <UserList users={ friends } history={ history } />
                    </InfiniteScroll>)
                : <EmptyComponent description="Friends list is empty" />
            }
        </div>
    </div>
)

type BtnProps = {
    currentFilter: Filters,
    getAllFriends: (filter: Filters) => void,
    selfFilter: Filters,
    text: string
}

const Btn: FC<BtnProps> = ({ currentFilter, getAllFriends, selfFilter, text }) => (
    <Button
        onClick={ getAllFriends.bind(null, selfFilter) }
        className={ cn(
            "friends-page__header-btn",
            { "friends-page__header-btn--isActive": currentFilter === selfFilter })
        }
    >
        { text }
    </Button>
)

export default FriendsPage;