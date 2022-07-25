import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";
import jwt from 'jsonwebtoken'
import validatePhoneNumber from 'lib/utils/validatePhoneNumber'
import { getTimeDifference } from 'lib/date'

const dbDirectory = path.join(process.cwd(), "/src/user/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class UserSchema {

  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async create(data) {

    if (!data || !data.name || !data.phone) throw new Error('bad input')

    const allUsers = await this.findAll()

    const doesExist = allUsers.some(({ phone }) => phone == data.phone)

    if (doesExist) throw new Error('bad request: this phonenumber already exists in the database')
      
    const thisUser = {
      _id: UID('ecu'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
                 // path                                      // mohtawa              // options
    writeFileSync(path.join(dbDirectory, `${thisUser._id}.txt`), JSON.stringify(thisUser), "utf8")

    this.doesCacheneedsUpdate = true

    return thisUser
  }

  async findAll() {
    try {

      if (!this.doesCacheneedsUpdate && this.cache) return this.cache

      const result = readdirSync(dbDirectory).map(item => {

        return JSON.parse(readFileSync(path.join(dbDirectory, item), {
          encoding: "utf8",
        }))

      })

      // const result = JSON.parse(y);
      
      this.cache = result
      this.doesCacheneedsUpdate = false
      
      return result

    } catch (error) {
      console.log('error in find all')
      console.log(error)
      return []
    }
  }

  
  async findById(_id) {

    try {
      return JSON.parse(readFileSync(path.join(dbDirectory, `${_id}.txt`), {
        encoding: "utf8",
      }))

    } catch (error) {
      return null
    }

  }

  async findByPhone(phone) {
    const validPhone = validatePhoneNumber(phone)

    const allUsers = await this.findAll()

    const thisUser = allUsers.find(user => {

      return user.phone == validPhone
    })


    if (!thisUser) throw new Error('bad request: no such user exists in our database')

    return thisUser
  }

  async findByIdAndUpdate(_id, { name, authObj }) {
    
    try {


      const thisUser = await this.findById(_id)


      if (!thisUser) throw new Error('bad request: no such user found')

      let updated = false
      if (name) {
        thisUser.name = name
        updated= true
      }
      
      if (authObj) {
        thisUser.authObj = authObj
        updated= true
      }

      if (updated) thisUser.updatedAt = new Date().toISOString()

      writeFileSync(path.join(dbDirectory, `${thisUser._id}.txt`), JSON.stringify(thisUser), "utf8");

      this.doesCacheneedsUpdate = true

      return 'ok'

    } catch (error) {
      throw error
    }
    
  }

  createToken(_id) {
    return jwt.sign(
      {
        _id,
      },
      'USER_SECRET'
    )
  }

  async checkIfUserExists(phone) {
    try {
      const thisUser = await this.findByPhone(phone)
      if (!thisUser) return false
      return true
    } catch (error) {
      return false
    }
  }

  async generateAuthObject(phone) {

    const thisUser = deepClone(await this.findByPhone(phone))

    if (!thisUser) throw new Error('bad request: no such user exists in our database')

    const authObj = {
      code: '1111',
      date: new Date().toISOString()
    }

    await this.findByIdAndUpdate(thisUser._id, { authObj })

    this.doesCacheneedsUpdate = true
    
  }

  async removeAuthCode(phone) {

    const thisUser = deepClone(await this.findByPhone(phone))

    if (!thisUser) throw new Error('bad request: no such user found')

    thisUser.authObj = null

    thisUser.updatedAt = new Date().toISOString()

    writeFileSync(path.join(dbDirectory, `${thisUser._id}.txt`), JSON.stringify(thisUser), "utf8");

    this.doesCacheneedsUpdate = true
  }

  async checkAuthCode({ phone, code }) {
    
    const thisUser = await this.findByPhone(phone)

    if (!thisUser) throw new Error('bad request: no such user exists in our database')
    
    if (code !== thisUser.authObj.code) throw new Error('wrong code')

    if (getTimeDifference(thisUser.authObj.date, new Date().toISOString()) > 200000) throw new Error("time's up")

    this.removeAuthCode(phone)

    return thisUser
  }

  async authorizeUser(user) {
    console.log(user)
    
    if (!user || !user._id) throw new Error('unathorized')

    const thisUser = await this.findById(user._id)

    if (!thisUser) throw new Error('unathorized')

    return thisUser
  }

}



const UserModel = new UserSchema()

export default UserModel
