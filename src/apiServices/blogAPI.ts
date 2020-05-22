import axios from "axios";

import { MainEndpoints } from "../shared/constants/api.contsnts";
import { NewBlogData, GetBlogsData } from "../interfaces/blog";


class BlogAPI {
    static createBlog = (data: NewBlogData) => axios.post(`${ MainEndpoints.blog }`, data);

    static deleteBlog = (blogId: string) => axios.delete(`${ MainEndpoints.blog }/${ blogId }`);

    static getBlogs = (pagination: GetBlogsData) =>
        axios.get(`${ MainEndpoints.blog }/${ JSON.stringify(pagination) }`);
}

export default BlogAPI;