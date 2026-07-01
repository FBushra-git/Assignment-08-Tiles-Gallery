import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const appUrl = process.env.BETTER_AUTH_URL ||
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

if (!uri) {
	throw new Error('MONGODB_URI is missing')
}

let client
let db

if (!global._mongoClient) {
	client = new MongoClient(uri)
	global._mongoClient = client
} else {
	client = global._mongoClient
}

db = client.db('tilesGalleryDB')

export const auth = betterAuth({
	baseURL: appUrl,
	trustedOrigins: [
		appUrl,
		'http://localhost:3000',
		'http://localhost:3001',
		'https://*.vercel.app',
	],

	database: mongodbAdapter(db, {
		client,
	}),

	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		},
	},
})
