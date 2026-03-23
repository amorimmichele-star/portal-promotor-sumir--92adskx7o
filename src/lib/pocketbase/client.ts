import PocketBase from 'pocketbase'

// URL CORRETA do backend (PocketBase)
const BACKEND_URL = 'https://backend-portal-promotor-sumire-f82ca.goskip.app'

const pb = new PocketBase(BACKEND_URL)
pb.autoCancellation(false)

export default pb
