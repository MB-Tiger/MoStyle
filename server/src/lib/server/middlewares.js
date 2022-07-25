import express from 'express'
import cors from 'cors'
import path from 'path'
// import decodeToken from '../lib/decode-token'
import userAuth from '../utils/userAuth'


export default app => {

  app.use(cors())

  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }));

  app.use(userAuth)

  app.use(express.static(path.join(process.cwd(), `/src/public/`)));

}