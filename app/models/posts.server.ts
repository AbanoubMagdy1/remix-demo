import { generateId } from "~/utils";

export interface PostI{
    id: string,
    title: string,
    body: string
}

const POSTS: PostI[] = [
    {id: "1", title: 'Post 1', body: 'This is my first post'},
    {id: "2", title: 'Post 2', body: 'This is my second post'},
] 

export async function getPosts(): Promise<PostI[]>{
    return await POSTS;
}

export async function getPost(id: string): Promise<PostI | undefined>{
    return await POSTS.find(post => post.id === id);
}

export async function createPost(post: Omit<PostI, 'id'>): Promise<PostI>{
    const newPost : PostI = {
        title: post.title,
        body: post.body,
        id: generateId()
    }
    await POSTS.push(newPost);
    console.log(POSTS);
    return newPost;
}