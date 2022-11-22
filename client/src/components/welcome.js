import { useAuthContext } from "../hooks/useAuthContext"

export default function Welcome(name) {

  const { user } = useAuthContext()

  return (
    <div>
      {user ? <h2>Welcome {user.name}!</h2> : <h2>Welcome!</h2>}
    </div>
  )
}
