import auth from '../services/auth'

const beforeEach = (to, from, next) => {
  auth.set(to.query)
  next()
}

export default beforeEach
