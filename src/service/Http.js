import axios from 'axios'

export default class Http {
  constructor () {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const { data } = error.response

        if (data.error) {
          alert(data.error)
        }

        return error
      }
    )
  }

  async get (url, params) {
    const { data } = await axios.get(url, {
      params
    })

    return data
  }

  async post (url, params) {
    const response = await axios.post(url, {
      ...params
    })

    if (response.code === 'ERR_BAD_REQUEST') {
      return {
        ...response,
        success: false
      }
    }

    return {
      ...response,
      success: true
    }
  }

  async put (url, params) {
    const response = await axios.put(url, {
      ...params
    })

    if (response.code === 'ERR_BAD_REQUEST') {
      return {
        ...response,
        success: false
      }
    }

    return {
      ...response,
      success: true
    }
  }

  async delete (url, params) {
    const response = await axios.delete(url, {
      ...params
    })

    if (response.code === 'ERR_BAD_REQUEST') {
      return {
        ...response,
        success: false
      }
    }

    return {
      ...response,
      success: true
    }
  }
}
