import { useRouter } from 'next/router'
import { useInput } from '../../hooks/useInput'
import axios from 'axios'

const Login = () => {
  const username = useInput('')
  const password = useInput('')
  const router = useRouter()

  async function send() {
    if (username.value && password.value) {
      axios
        .post('https://sleepy-crag-49787.herokuapp.com/login', {
          username: username.value,
          password: password.value,
        })
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token)
          router.push('/auth/user')
        })
        .catch((e) => alert('Something wrong!'))
    } else alert('Пустые поля.')
  }

  return (
    <>
      <h1>Login</h1>
      <input
        {...username}
        placeholder="Enter a profile name"
        type="name"
        maxLength={30}
        minLength={5}
        pattern="[a-Z]{1,15}"
      />
      <input
        maxLength={30}
        {...password}
        minLength={5}
        placeholder="password"
        type="password"
        pattern="[a-Z]{1,15}"
      />

      <button type="button" onClick={send}>
        Login
      </button>
    </>
  )
}

export default Login
