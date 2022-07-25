
import multer from 'multer'
import express from 'express'
import asyncHandler from "lib/utils/asyncHandler";
import adminAuth from 'lib/utils/adminAuth'
import AdminModel from 'admin/model'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (!req.user || !req.user._id) return

    cb(null, './src/public')
  },
  filename: function (req, file, cb) {

    const arr = file.originalname.split('.')

    const extension = arr[arr.length - 1]

    const fileName = `${new Date().getTime()}${String(Math.random()).slice(3,8)}.${extension}`

    req.fileName = fileName

    cb(null, fileName)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!req.user || !req.user._id) return cb(null, false)

    cb(null, true)
  }
})

const router = express.Router()

const authMiddleWare = async (req, res, next) => {
  try {
    const thisAdmin = await AdminModel.authorizeAdmin(req.admin)

    req.thisAdmin = thisAdmin
  
    next()
  } catch (error) {
    next(error)
  }
} 


router.post('/upload-reserve', asyncHandler(adminAuth), asyncHandler(authMiddleWare), upload.single('reserve'), async (req, res, next) => {
  try {

    if (!req.fileName) throw new Error('somethings wrong')

    return res.status(200).json({ name: req.fileName })

    
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})


export default router
