import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  let data = {};
  if (req.method === 'POST') {
    // Process a POST request
    req.body.id = uuidv4()
    let configPath = `contactdata/userData.json`
    let key = req.body.email
    if (fs.existsSync(configPath)) {
      let data = fs.readFileSync(configPath, "utf8")
      data = JSON.parse(data)

      for (let i in data) {
        if (i == req.body.email) {
          res.status(200).json({ message: "user already exist", data: data })
        } else {
          data[key] = req.body
          fs.writeFileSync(configPath, JSON.stringify(data, null, 3))
        }
      }

    } else {
      data[key] = req.body
      console.log(data);
      fs.writeFileSync(configPath, JSON.stringify(data, null, 3))
      res.status(200).json({ message: "add successfully", data: data })
    }
   
  } else {
    // Handle any other HTTP method
    res.status(200).json({ message: "get api route" })
  }
}