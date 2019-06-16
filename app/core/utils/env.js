import Constants from 'expo-constants'

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return true
  if (env.indexOf('dev') !== -1) return true
  if (env.indexOf('staging') !== -1) return true
  if (env.indexOf('prod') !== -1) return false
  return false
}

export default getEnvVars(Constants.manifest.releaseChannel)
