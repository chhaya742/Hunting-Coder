import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/blog.module.css'
import axios from 'axios'
const Blog = (props) => {
  // console.log(props.allBlogs);
  const [blogs, setBlogs] = useState(props.allBlogs)
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Popular Blogs</h2>
        {blogs.map((blogItems) => {
          return <div key={blogItems.title} className={styles.blogItem}>
            <Link href={`blog-post/${blogItems.slug}`}>
              <h3>{blogItems.title}</h3>
            </Link>
            <p >{ blogItems.content.substr(0,200)}...</p>
          </div>
        })}
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
  const data = await fetch("http://localhost:3000/api/blogs")
  let myProps= await data.json()
  return {
    props: {allBlogs:myProps}, // will be passed to the page component as props
  }
}
export default Blog