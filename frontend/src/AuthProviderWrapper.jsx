import SignupPage from "./routes/SignupPage"
import { AuthContext } from "./context/AuthContext"

function AuthProviderWrapper() {
  return (
    <AuthContext>
        <SignupPage/>
    </AuthContext>
  )
}

export default AuthProviderWrapper