import { IBlog } from "../interfaces/blog";
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

export const incrBlogReaction = (blog: IBlog, data: ReactionFromDB) => {
    if(blog._id === data.blogId) {
        const reactionIndex = blog.reactions.findIndex(reaction => reaction.author === data.author);
        if (reactionIndex === -1) {
            return {
                ...blog,
                reactions: [...blog.reactions, data]
            };
        } else {
            blog.reactions[reactionIndex] = data;
            return {
                ...blog,
                reactions: [...blog.reactions]
            };
        }
    }

    return blog;
};

export const decrBlogReaction = (blog: IBlog, data: ReactionFromDB) => {
    if(blog._id === data.blogId) {
        return {
            ...blog,
            reactions: blog.reactions.filter(reaction => reaction._id !== data._id)
        }
    }

    return blog;
};

