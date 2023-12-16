import { getServerSession } from 'next-auth'

export default async function Home() {
  const user = await getServerSession();
  console.log(user);

  if(!user) return (
    <div>
      <p>Iniciar sesión</p>
      <form action="">
        <input type="text" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  return (
   <main>
    hola
   </main>
  )
}
