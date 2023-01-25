import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/blog.module.css'
import * as fs from 'fs'
import InfiniteScroll from "react-infinite-scroll-component";
const Blog = (props) => {
  const fetchMoreData = async () => {

  }

  const [blogs, setBlogs] = useState(props.allBlogs)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <div className={styles.blogItem}>
      <InfiniteScroll
      dataLength={blogs.length} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
    {blogs.map((blogItems) => {
      return <div key={blogItems.slug} >
        <Link href={`blog-post/${blogItems.slug}`}>
          <h3>{blogItems.title}</h3>
        </Link>
        <p >{blogItems.metadesc.substr(0, 200)}...</p>
        <button className={styles.button}><Link href={`blog-post/${blogItems.slug}`}>read more </Link></button>
      </div>
    })}
    </InfiniteScroll>
          
        </div>

      </main>
    </div>

  )
}


// export async function getServerSideProps(context) {

// const data = await fetch("http://localhost:3000/api/blogs")
// let myProps= await data.json()
// return {
//   props: {allBlogs:myProps}, // will be passed to the page component as props
// }
// }




export async function getStaticProps(context) {
  const data = await fs.promises.readdir("blogdata")
  let allBlogs = [];
  for (let i = 0; i < data.length; i++) {
    const d = await fs.promises.readFile((`blogdata/${data[i]}`), "utf-8")
    allBlogs.push(JSON.parse(d))
  }

  return {
    props: { allBlogs: allBlogs }, // will be passed to the page component as props
  }
}
export default Blog