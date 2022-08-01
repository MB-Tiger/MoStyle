
import Admin from './model'

import validatePhoneNumber from 'lib/utils/validatePhoneNumber'

export default {
  createAdmin: async (req, res) => {

    try {
     
      if (!req.body.phone || !req.body.name) throw new Error('bad input')
  
      const validPhone = validatePhoneNumber(req.body.phone)
  
      await Admin.create({ name: req.body.name, phone: validPhone })
      
      return res.json({ msg: 'successfully created this admin, yeay!' })
      
    } catch (error) {
      res.status(500).json({msg: error.message})
    }
  },
  loginStepOne:  async (req, res) => {
    try {
      
      await Admin.generateAuthObject(req.body.phone)
  
      return res.json({ msg: 'ok' })
      
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
  loginStepTwo: async (req, res) => {
    try {
      
      const thisAdmin = await Admin.checkAuthCode({ phone: req.body.phone, code: req.body.code })
      const token = Admin.createToken(thisAdmin._id)
      return res.json({ token })
  
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  },
  me: async (req,res) => {

    try {

      const thisAdmin = await Admin.authorizeAdmin(req.admin)

      return res.status(200).json(thisAdmin) 

    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
}