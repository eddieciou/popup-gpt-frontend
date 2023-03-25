const API_SERVER = 'http://192.168.0.102:5001'

export const handleResponse = (response: Response) =>
  response.text().then((text: string) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      return Promise.reject(data)
    }
    return data
  })

export const fetchAPI = (path: string, method: string, body = {}) => {
  const apiURL = `${API_SERVER}${path}`
  const headers = {
    'Content-Type': ['POST', 'PUT', 'PATCH'].includes(method) ? 'application/json' : '',
  }
  const fetchOptions = {
    method,
    headers,
    body: method === 'GET' ? undefined : JSON.stringify(body),
  }

  return fetch(apiURL, fetchOptions).then(handleResponse)
}

export const signup = (body: { name: string; email: string; password: string; picture: string }) =>
  fetchAPI('/users', 'POST', body)

export const getRooms = () => fetchAPI('/rooms', 'GET')

export const logout = (userId: string) => {
  return fetchAPI('/logout', 'POST', { _id: userId })
}
