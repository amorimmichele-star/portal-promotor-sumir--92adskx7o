import PocketBase from 'pocketbase'

const getBackendUrl = () => {
  const envUrl = import.meta.env.VITE_POCKETBASE_URL
  // If the provided environment URL is an internal cluster address,
  // we default to the current window origin. This prevents DNS/CORS errors
  // in the browser and ensures seamless API communication in both preview
  // and public domains without needing cross-origin policies.
  if (envUrl && !envUrl.includes('.internal.')) {
    return envUrl
  }
  return typeof window !== 'undefined' ? window.location.origin : '/'
}

const pb = new PocketBase(getBackendUrl())
pb.autoCancellation(false)

export default pb
