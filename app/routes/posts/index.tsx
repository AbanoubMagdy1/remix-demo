import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import React from 'react'
import { getPosts } from '~/models/posts.server'

interface LoaderData {
    posts: Awaited<ReturnType<typeof getPosts>>;
}

export const loader = async () => {
    return json<LoaderData>({
        posts: await getPosts()
    })

}

function PostIndex() {
  const {posts} = useLoaderData() as LoaderData;  

  return (
    <div className='ml-5'>
        <h2 className='text-center text-4xl'>Posts</h2>
        {posts.map(post => (
            <Link 
                className='block underline text-slate-600 text-2xl'
                key={post.id}
                to={`/posts/${post.id}`}
            >
            {post.title}
        </Link>
        ))}
    </div>

  )
}

export default PostIndex