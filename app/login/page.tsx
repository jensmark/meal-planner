import { getSession } from "@/lib/session"


const LoginForm = () => (
  <form action="/auth/login" method="post">
    <label htmlFor="email">Email</label>
    <input name="email" />
    <label htmlFor="password">Password</label>
    <input type="password" name="password" />
    <button>Sign In</button>
  </form>
)

export default async function Login() {
  const session = await getSession()

  return session ? null : <LoginForm/>
}