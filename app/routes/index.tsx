import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="text-center">
      <h1 className="text-5xl mt-4">Welcome to Remix</h1>
      <Link to="/posts">View posts</Link>
    </div>
  );
}
