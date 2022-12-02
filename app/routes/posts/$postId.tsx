import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant';
import { getPost } from '~/models/posts.server'

interface LoaderData {
    post: Awaited<ReturnType<typeof getPost>>;
}

export const loader: LoaderFunction = async ({params}) => {
    invariant(params.postId, 'postId is required')
    const post = await getPost(params.postId)
    invariant(post, 'post not found: ' + params.postId)
    return json<LoaderData>({ post })
}

function PostIndex() {
  const {post} = useLoaderData() as LoaderData;  

  return (
    <div className='m-4'>
        {post && (
            <>
            <h3 className='w-fit border-b-4 border-black text-3xl mb-4 pb-1'>
                {post.title}
            </h3>
            <p>{post.body}</p>
            </>
        )}

    </div>

  )
}

export default PostIndex