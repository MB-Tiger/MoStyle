
import path from 'path'
import { readdirSync, unlinkSync, existsSync, mkdirSync } from 'fs'

const dirs = [
  'admin',
  'cart',
  'category',
  'comment',
  'order',
  'product',
  'rate',
  'user'
]

process.cwd()

export default () => {
  dirs.forEach(dir => {
    const address = path.join(process.cwd(), 'src', dir, 'db')
    print('***************************')
    print(address)
    print('***************************')
    print('***************************')

    const arr = readdirSync(address)

    arr.forEach(item => {
      unlinkSync(path.join(address, item))
    })
  })
}