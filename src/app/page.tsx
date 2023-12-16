import Login from '@/components/login';
import { getServerSession } from 'next-auth'
import logo from '../../public/logo.png'

export const generateMetadata = async () => {
  const user = await getServerSession();
  if(!user) return {
    title: 'Sign in',
    description: 'Sign in page',
  }
  return {
    title: 'Chat',
    description: '',
  }
}

export default async function Home() {
  const user = await getServerSession();

  if(!user) return (
    <Login />
  )

  return (
   <main>
    You have logged in {user.user?.name}
   </main>
  )
}
