import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import BLOG from '@/blog.config'
import BlogItem from "@/components/BlogItem";

const Page = ({ postsToShow, page, showNext }) => {
  return (
    <Container>
      <div className="grid md:grid-rows-3 grid-flow-row-dense grid-cols-3">
        {postsToShow.map((post,index) => {
          if (index%7 === 0) {
            return         <div className="md:col-span-2 col-span-3  blog-first border-r-none">
              <BlogItem key={post.id} post={post}/>
            </div>
          }
          if(index%7===1){
            return  <div className="md:col-span-1 col-span-3 blog-first ">
              <BlogItem key={post.id} post={post}/>
              <BlogItem key={postsToShow[index+1].id} post={postsToShow[index+1]}/>

            </div>
          }

          if(index%7==3){
            return   <div className="col-span-3 blog-first ">
              <BlogItem key={post.id} post={post}/>
            </div>
          }
          if(index%7==4){
            return <div className="md:col-span-1 col-span-3 blog-first border-r-none">
              <BlogItem key={post.id} post={post}/>
              <BlogItem key={postsToShow[index+1].id} post={postsToShow[index+1]}/>

            </div>
          }
          if(index%7==6){
            return <div className="md:col-span-2 col-span-3 blog-first ">
              <BlogItem key={post.id} post={post}/>
            </div>
          }
        })}







      </div>

      <Pagination page={page} showNext={showNext} />
    </Container>
  )
}

export async function getStaticProps (context) {
  const { page } = context.params // Get Current Page No.
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  )
  const totalPosts = posts.length
  const showNext = page * BLOG.postsPerPage < totalPosts
  return {
    props: {
      page, // Current Page
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: false })
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage)
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

export default Page
