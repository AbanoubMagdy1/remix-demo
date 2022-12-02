import { Outlet } from "@remix-run/react"

function posts() {
  return (
    <>
        <h1 className="text-5xl my-4 underline width-fit text-center">Posts</h1>
        <Outlet/>
    </>
  )
}

export default posts