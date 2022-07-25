

import { writeFileSync, readdirSync, existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import UID from 'lib/utils/UID'
import jwt from 'jsonwebtoken'
import validatePhoneNumber from 'lib/utils/validatePhoneNumber'

const dbDirectory = path.join(process.cwd(), '/src/admin/db')

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class AdminSchema {

  constructor() {
    this.cache = null
    this.doesCacheneedsUpdate = true
  }

  async create(data) {

    if (!data || !data.name || !data.phone) throw new Error('bad input')

    const allAdmins = await this.findAll()

    const doesExist = allAdmins.some(({ phone }) => phone == data.phone)

    if (doesExist) throw new Error('bad request: this phonenumber already exists in the database')
      
    const thisAdmin = {
      _id: UID('ECA'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
                    // path                                         // mohtawa                // options
    writeFileSync(path.join(dbDirectory, `${thisAdmin._id}.txt`), JSON.stringify(thisAdmin), "utf8")

    this.doesCacheneedsUpdate = true
  }

  async findAll() {
    try {

      if (!this.doesCacheneedsUpdate && this.cache) return this.cache

      const result = readdirSync(dbDirectory).map(item => {

        const thisAdmin = JSON.parse(readFileSync(path.join(dbDirectory, item), {
          encoding: "utf8",
        }))

        return thisAdmin
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
      const thisAdmin = JSON.parse(readFileSync(path.join(dbDirectory, `${_id}.txt`), {
        encoding: "utf8",
      }))

      return thisAdmin
    } catch (error) {
      return null
    }

  }

  async findByPhone(phone) {
    const validPhone = validatePhoneNumber(phone)

    const allAdmins = await this.findAll()

    const thisAdmin = allAdmins.find(admin => {

      return admin.phone == validPhone
    })


    if (!thisAdmin) throw new Error('bad request: no such admin exists in our database')

    return thisAdmin
  }

  async findByIdAndUpdate(_id, { name, authObj }) {
    
    try {


      const thisAdmin = await this.findById(_id)


      if (!thisAdmin) throw new Error('bad request: no such admin found')

      if (name) {
        thisAdmin.name = name
      }

      if (authObj) {
        thisAdmin.authObj = authObj
      }

      thisAdmin.updatedAt = new Date().toISOString()

      writeFileSync(path.join(dbDirectory, `${thisAdmin._id}.txt`), JSON.stringify(thisAdmin), "utf8");

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
      'ADMIN_SECRET'
    )
  }

  async generateAuthObject(phone) {

    const thisAdmin = await this.findByPhone(phone)


    if (!thisAdmin) throw new Error('bad request: no such admin exists in our database')

    const authObj = {
      code: '1111',
      date: new Date().toISOString()
    }

    await this.findByIdAndUpdate(thisAdmin._id, { authObj })
  
  }

  
  async removeAuthCode(phone) {

    const thisAdmin = deepClone(await this.findByPhone(phone))

    if (!thisAdmin) throw new Error('bad request: no such admin found')

    thisAdmin.authObj = null

    thisAdmin.updatedAt = new Date().toISOString()

    writeFileSync(path.join(dbDirectory, `${thisAdmin._id}.txt`), JSON.stringify(thisAdmin), "utf8");

    this.doesCacheneedsUpdate = true
  }

  async checkAuthCode({ phone, code }) {
    
    const thisAdmin = await this.findByPhone(phone)

    if (!thisAdmin) throw new Error('bad request: no such admin exists in our database')
    
    if (code !== thisAdmin.authObj.code) throw new Error('wrong code')

    if ((new Date().getTime() - new Date(thisAdmin.authObj.date).getTime) > 200000) throw new Error("time's up")
    
    this.removeAuthCode(phone)

    return thisAdmin
  }

  async authorizeAdmin(admin) {
    if (!admin || !admin._id) throw new Error('unathorized')

    const thisAdmin = await this.findById(admin._id)

    if (!thisAdmin) throw new Error('unathorized')

    return thisAdmin
  }
}

const AdminModel = new AdminSchema()

export default AdminModel

