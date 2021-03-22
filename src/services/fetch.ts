const baseUrl = 'http://localhost:3001'  

// https://www.carlrippon.com/fetch-with-async-await-and-typescript/
export const http = async <T>(url: string): Promise<T> => {
  const response = await fetch(baseUrl + url)
  return await response.json()
}
