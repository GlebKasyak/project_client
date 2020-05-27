import { IBlog } from "../interfaces/blog";
import { IComment } from "../interfaces/comment";
import { ReactionFromDB } from "../interfaces/reaction";

type ReactionMethods = (reactions: Array<ReactionFromDB>, userId: string) => [number, number, boolean, boolean];

export const getReactions: ReactionMethods = (reactions, userId) => {
    let likes = 0;
    let dislikes = 0;
    let likeAction = false;
    let dislikeAction = false;

    reactions.forEach(item => {
        if(item.reaction) {
            if (!likeAction) {
                likeAction = item.author === userId;
            }
            likes += 1;
        } else {
            if (!dislikeAction) {
                dislikeAction = item.author === userId;
            }
            dislikes += 1
        }
    });

    return [likes, dislikes, likeAction, dislikeAction]
};

export const incrReaction = (itemId: "blogId" | "commentId", item: IBlog | IComment, data: ReactionFromDB) => {
    if(item._id === data[itemId]) {
        const reactionIndex = item.reactions.findIndex(reaction => reaction.author === data.author);
        if (reactionIndex === -1) {
            return {
                ...item,
                reactions: [...item.reactions, data]
            };
        } else {
            item.reactions[reactionIndex] = data;
            return {
                ...item,
                reactions: [...item.reactions]
            };
        }
    }

    return item as any;
};

export const decrReaction = (itemId: "blogId" | "commentId", item: IBlog | IComment, data: ReactionFromDB) => {
    if(item._id === data[itemId]) {
        return {
            ...item,
            reactions: item.reactions.filter(reaction => reaction._id !== data._id)
        }
    }

    return item as any;
};

