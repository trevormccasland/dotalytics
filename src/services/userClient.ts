import config from '../config.json'
import { Config } from '../types'

export interface UserResponse {
  message?: string
  steamid?: string
  success: number
}

export const getUser = async (username: string): Promise<UserResponse> => {
  const projectConfig: Config = config
  const url = `http://${projectConfig.host}:${projectConfig.port}/user?username=${username}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`status ${response.status}`)
  }
  return await response.json()
}
