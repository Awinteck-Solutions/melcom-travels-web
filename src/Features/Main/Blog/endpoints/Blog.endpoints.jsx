import { BASEURL } from "../../../../constants/api.constant"

export const BlogEndpoints = {
    // Blog Endpoints
    BLOGS: `${BASEURL}/blogs`,
    BLOG_BY_ID: (id) => `${BASEURL}/blogs/${id}`,
    
    BLOG_CATEGORIES: `${BASEURL}/blogs-categories`,
    
}
