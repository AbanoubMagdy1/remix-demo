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
        <Link className='text-center w-fit mx-auto text-xl my-3 block underline hover:text-blue-700' to="/posts/new">
            Create new post
        </Link>
        <div className='flex flex-col gap-6 mt-10'>      
        {posts.map(post => (
            <Link 
                className='shadow-md border-2 border-slate-700 w-2/3 mx-auto block p-2 rounded-md text-slate-600 text-2xl hover:text-blue-700'
                key={post.id}
                to={`/posts/${post.id}`}
            >
            {post.title}
        </Link>
        ))}
        </div>
    </div>

  )
}

export default PostIndex