import PocketBase from 'pocketbase'

// URL FIXA do Skip Cloud - SEMPRE usar esta
const BACKEND_URL = 'https://portal-promotor-sumire-f82ca.skip.cloud'

const pb = new PocketBase(BACKEND_URL)
pb.autoCancellation(false)

export default pb
