import Link from "next/link";
import BLOG from "@/blog.config";
import formatDate from "@/lib/formatDate";

const BlogPost = ({ post }) => {
  return (
      <Link href={`${BLOG.path}/${post.slug}`}>
        <a className={"grid grid-cols-1  gap-4 mb-6 md:mb-8 post"}>
          <article key={post.id} className=" col-span-3">
            <header className="flex flex-col justify-between md:flex-row md:items-baseline ">
              <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                {post.title}
              </h2>
              <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                {formatDate(
                    post?.date?.start_date || post.createdTime,
                    BLOG.lang
                )}
              </time>
            </header>
            <figure className={"col-span-1"}>
              <img
                  src={post.thumbnail}
                  alt={post.title}
                  width={100}
                  height={100}
                  style={{ width: "100%" }}
              />
            </figure>
            <main>
              <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
                {post.summary}
              </p>
            </main>
          </article>
        </a>
      </Link>
  );
};

export default BlogPost;
