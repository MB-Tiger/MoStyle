
import { getTimeDifference } from 'lib/date'
import UserModel from './model'
import validatePhoneNumber from 'lib/utils/validatePhoneNumber'

const userTemp = {}

export default {
  signup_stepOne: async (req, res, next) => {

    try {
      
      if (!req.body.phone || !req.body.name) throw new Error('bad request: bad inputs')
      const validPhone = validatePhoneNumber(req.body.phone)

      const doesExist = await UserModel.checkIfUserExists(validPhone)

      if (doesExist) throw new Error('this user already exists in the database')

      const thisData = {
        name: req.body.name,
        phone: validPhone
      }

      thisData.code = '1111'
      thisData.date = new Date().toISOString()
      
      userTemp[thisData.phone] = thisData

      print(userTemp)
      setTimeout(() => delete userTemp[thisData.phone], 200 * 1000)

      return res.json({ msg: 'ok' })
      
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },
  signup_stepTwo: async (req,res,next) => {
    try {
      
      if (!req.body.phone || !req.body.code) throw new Error('bad request')
      const validPhone = validatePhoneNumber(req.body.phone)

      print(userTemp)
      print(validPhone)

      if (!(validPhone in userTemp)) throw new Error("time's up")

      const thisUser = deepClone(userTemp[validPhone])

      if (thisUser.code !== req.body.code) throw new Error('wrong code')

      if (getTimeDifference(thisUser.date, new Date().toISOString()) > 200000) throw new Error('time\'s up')

      delete userTemp[validPhone] 

      const thisUserB = await UserModel.create({
        name: thisUser.name,
        phone: thisUser.phone
      })

      const token = UserModel.createToken(thisUserB._id)

      res.status(200).json({
        token
      })

    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
  },
  login_stepOne: async (req,res,next) => {
    try {
      if (!req.body.phone) throw new Error('bad request: bad inputs')
      const validPhone = validatePhoneNumber(req.body.phone)

      await UserModel.generateAuthObject(validPhone)

      return res.status(200).json({ msg: 'ok' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  login_stepTwo: async (req,res,next) => {
    try {
      if (!req.body.phone || !req.body.code) throw new Error('bad request: bad inputs')
      const validPhone = validatePhoneNumber(req.body.phone)

      const thisUser = await UserModel.checkAuthCode({ code: req.body.code, phone: validPhone })

      const token = UserModel.createToken(thisUser._id)
      
      return res.status(200).json({ token })
      
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  me: async (req, res, next) => {

    try {
      
      const thisUser = await UserModel.authorizeUser(req.user)

      return res.status(200).json(thisUser)

    } catch (error) {
      throw error
    }
  },
  userEdit: async (req, res) => {
    try {

      const thisUser = await UserModel.authorizeUser(req.user)

      if (!req.body.name) throw new Error('bad input')

      const name = req.body.name

      await UserModel.findByIdAndUpdate(thisUser._id, {name})

      return res.status(200).json({ msg: 'user edited' })
      
    } catch (error) {
      throw error
    }
  }

}