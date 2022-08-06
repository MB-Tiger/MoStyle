import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const dashboardHome = () => {
  const at = useSelector((state) => state.Tokens.at)
  const router = useRouter()
  
  useEffect(() => {
    console.log(at)
    if (!at) router.push("/admin/login")
  }, [])

  return (
    <div className='w-full min-h-screen py-8'>
      <div className='container'></div>
    </div>
  )
}

export default dashboardHome