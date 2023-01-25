import axios from 'axios'
import React, { useState } from 'react'
import styles from '../styles/contact.module.css'

const Contact = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "", query: "" })
  const inputHandler = (e) => {
    const { name, value } = e
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/api/postcontact", user)
    if (response.status == 200) {
      alert(response.data.message)
    }
  }
  return (
    <div className={styles.main}>
      <h1>Contact Us</h1>
      <div className={styles.form}>
        <div className={styles.inputgroup}>
          <label htmlFor="Name">Name</label>
          <input type="text" name="name" placeholder='name' value={user.name} onChange={(e) => inputHandler(e.target)} />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor="Email">Email</label>
          <input type="Email" name="email" placeholder="nome@email.com.br" value={user.email} onChange={(e) => inputHandler(e.target)} />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor="phone">Phone</label>
          <input type="phone" name="phone" placeholder="+91" value={user.phone} onChange={(e) => inputHandler(e.target)} />
        </div>
        <div className={styles.inputgroup}>
          <label htmlFor="query">Query and concern</label>
          <input type="text" name="query" placeholder="query" value={user.query} onChange={(e) => inputHandler(e.target)} />
        </div>
        <div className={styles.submitbutton}>
        <button  onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  )
}

export default Contact