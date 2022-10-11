import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { useEffect } from "react";
import BlogItem from "@/components/BlogItem";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, BLOG.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > BLOG.postsPerPage;
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
    },
    revalidate: 1,
  };
}

const blog = ({ postsToShow, page, showNext }) => {

  return (
      <Container title={BLOG.title} description={BLOG.description}>
        <div className="grid md:grid-rows-3 grid-flow-row-dense grid-cols-3">
          {postsToShow.map((post, index) => {
            if (index % 7 === 0) {
              return (
                  <div className="md:col-span-2 col-span-3  blog-first border-r-none">
                    <BlogPost key={post.id} post={post} />
                  </div>
              );
            }
            if (index % 7 === 1) {
              return (
                  <div className="md:col-span-1 col-span-3 blog-first ">
                    <BlogPost key={post.id} post={post} />
                    {
                      postsToShow[index+1]&&<BlogPost
                            key={postsToShow[index + 1].id}
                            post={postsToShow[index + 1]}
                        />
                    }

                  </div>
              );
            }

            if (index % 7 == 3) {
              return (
                  <div className="col-span-3 blog-first ">
                    <BlogPost key={post.id} post={post} />
                  </div>
              );
            }
            if (index % 7 == 4) {
              return (
                  <div className="md:col-span-1 col-span-3 blog-first border-r-none">
                    <BlogPost key={post.id} post={post} />
                    {
                      postsToShow[index + 1]&& <BlogPost
                            key={postsToShow[index + 1].id}
                            post={postsToShow[index + 1]}
                        />
                    }

                  </div>
              );
            }
            if (index % 7 == 6) {
              return (
                  <div className="md:col-span-2 col-span-3 blog-first ">
                    <BlogPost key={post.id} post={post} />
                  </div>
              );
            }
          })}
        </div>

        {showNext && <Pagination page={page} showNext={showNext} />}
      </Container>
  );
};

export default blog;
