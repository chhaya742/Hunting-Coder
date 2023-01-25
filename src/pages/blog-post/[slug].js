
import React, { useEffect, useState } from 'react'
import styles from '../../styles/blogPost.module.css'
import { useRouter } from 'next/router'
import * as fs from 'fs'
const Slug = (props) => {
  function createMarkup(c) {
    return {__html: c};
  }
  const [blog, setblog] = useState(props.myBlog)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        {blog && <div style={{ fontSize: "larger" }} dangerouslySetInnerHTML={createMarkup(blog.content)} ></div>}
      </main>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query

//   const data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   let myProps= await data.json()
//   return {
//     props: {myBlog:myProps}
//   }
// }


export async function getStaticPaths(context) {
  return {
    paths: [
      { params: { slug: 'how-to-learn-javascript' } },
      { params: { slug: 'how-to-learn-python' } },
      { params: { slug: 'how-to-learn-nextjs' } }
    ],
    fallback: true
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const myBlogs = await fs.promises.readFile((`blogdata/${slug}.json`), "utf-8")

  return {
    props: { myBlog: JSON.parse(myBlogs) }
  }
}

export default Slug
