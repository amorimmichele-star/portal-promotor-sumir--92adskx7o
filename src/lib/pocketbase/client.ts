import PocketBase from 'pocketbase'

// Initializes the PocketBase instance using the production URL from environment variables
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL)

// Disables auto-cancellation to prevent request drops during concurrent operations
pb.autoCancellation(false)

export default pb
