import React, { FC } from "react";
import { connect } from "react-redux";
import cn from "classnames";

import { createReaction, remoteReaction, ThunkDispatchBlogsType } from "../../../store/actions/blog.action";
import icons from "../../../shared/icons";
import "./style.scss";

type HandleClickType = (reaction: boolean, action: boolean) => void;

type Props = {
    likeAction: boolean,
    dislikeAction: boolean,
    likes: number,
    dislikes: number,
    author: string,
    itemName: string,
    itemId: string,
    dispatch: ThunkDispatchBlogsType
}

const LikeDislike: FC<Props> = (
    {
        likeAction,
        dislikeAction,
        likes,
        dislikes,
        author,
        itemName,
        itemId,
        dispatch
    }) => {

    const handleClick: HandleClickType = (reaction, action) => {
        action
            ? dispatch(remoteReaction({ author, [itemName]: itemId, reaction }))
            : dispatch(createReaction({ author, [itemName]: itemId, reaction }))
    };

    return (
        <div className="like-dislike" >
            <div
                onClick={ handleClick.bind(null,true, likeAction) }
                className={ cn("like", { "is-active": likeAction }) }
                key="likes"
            >
                <icons.LikeOutlined />&nbsp;
                { likes }
            </div>
            <div
                onClick={ handleClick.bind(null,false, dislikeAction) }
                className={ cn("dislike", { "is-active": dislikeAction }) }
                key="dislikes"
            >
                <icons.DislikeOutlined />&nbsp;
                { dislikes }
            </div>
        </div>
    )
}

export default connect()(LikeDislike);