import PocketBase from 'pocketbase'

// URL correta do backend
const pb = new PocketBase('https://backend-portal-promotor-sumire-f82ca.goskip.app')
pb.autoCancellation(false)

export default pb
