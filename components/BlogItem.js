import BLOG from "@/blog.config";
import Link from "next/link";
import formatDate from "@/lib/formatDate";

const BlogItem=({post})=>{
    return  <Link href={`${BLOG.path}/${post.slug}`} >
        <a>
            <div
                key={post.id}
                className="mb-4 mt-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 blog-item">
                <div>
                    <h3 className={'mb-4 flex justify-between font-bold'}>
                        <span> {post.title}</span>
                        <span>              {formatDate(post?.date?.start_date || post.createdTime, BLOG.lang)}
</span>
                    </h3>
                </div>
                <img src={post.thumbnail} alt={post.title} className="rounded-t-lg" />
                <div className="p-5">

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">              {post.summary}
                    </p>

                </div>
            </div>
        </a>

    </Link>
}
export default BlogItem