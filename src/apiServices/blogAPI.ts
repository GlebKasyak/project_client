import axios from "axios";

import { MainEndpoints } from "../shared/constants/api.contsnts";
import { NewBlogData, GetBlogsData } from "../interfaces/blog";


class BlogAPI {
    static createBlog = (data: NewBlogData) => axios.post(`${ MainEndpoints.blog }`, data);

    static getBlogs = (pagination: GetBlogsData) =>
        axios.get(`${ MainEndpoints.blog }/${ JSON.stringify(pagination) }`);
}

export default BlogAPI;