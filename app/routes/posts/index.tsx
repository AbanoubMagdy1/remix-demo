import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import React from 'react'

interface PostI{
    id: number,
    title: string,
    body: string
}

interface LoaderData {
    posts: PostI[]
}

const POSTS: PostI[] = [
    {id: 1, title: 'Post 1', body: 'This is my first post'},
    {id: 2, title: 'Post 2', body: 'This is my second post'},
] 

export const loader = async () => {
    return json<LoaderData>({
        posts: POSTS
    })

}

function PostIndex() {
  const {posts} = useLoaderData() as LoaderData;  

  return (
    <div className='ml-5'>
        <h2 className='text-center'>Posts</h2>
        {posts.map(post => (
            <Link 
                className='block underline text-slate-600 text-2xl'
                key={post.id} to={`/posts/${post.id}`}
            >
            {post.title}
        </Link>
        ))}
    </div>

  )
}

export default PostIndex