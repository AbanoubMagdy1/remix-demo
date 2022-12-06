import type { ActionFunction} from '@remix-run/node';
import { redirect} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react'
import invariant from 'tiny-invariant';
import { createPost } from '~/models/posts.server';

import Loader from '~/components/loader'

type FormErrors = {
    title: string | null;
    body: string | null;
} | undefined;

export const action: ActionFunction = async ({ request }) => {
    //To be removed when we have a better way to handle form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    const form = await request.formData();
    const title = form.get('title');
    const body = form.get('body');

    const formErrors: FormErrors = {
        title: title ? null : 'Title is required',
        body: body ? null : 'Body is required'
    };

    const hasErrors = Object.values(formErrors).some(error => error !== null);

    if (hasErrors) {
        return json<FormErrors>( formErrors , { status: 422 });
    }

    invariant(typeof title === "string", "title must be a string");
    invariant(typeof body === "string", "body must be a string");

    await createPost({title, body})
    return redirect('/posts?success=true');
}

const inputClasses = 'block w-full border border-gray-300 rounded-md shadow-md p-2 focus:outline-none'
const labelClasses = 'block text-xl text-gray-700 mb-2';

function NewPost() {
  const formErrors = useActionData() as FormErrors  
  const {submission} = useTransition()

  return (
    <Form method='post' className='flex flex-col gap-8 w-80 max-w-full mx-auto mt-10'>
        <div>
            <label className={labelClasses} htmlFor='title'>Title</label>
            <input className={inputClasses} type='text' name='title' id='title' placeholder='title'/>
            {formErrors?.title && <small className='text-red-500 text-sm'>{formErrors.title}</small>}
        </div>
        <div>
            <label className={labelClasses} htmlFor='body'>Body</label>
            <textarea className={inputClasses}name='body' id='body' placeholder='title'/>
            {formErrors?.body && <small className='text-red-500 text-sm'>{formErrors.body}</small>}

        </div>
        {submission && <Loader/>}
        <button className='bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600'>
            Create
        </button>
    </Form>
  )
}

export default NewPost