import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
	throw new Error('MONGODB_URI is missing')
}

// global cache (VERY important in Vercel)
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
	database: mongodbAdapter(db, {
		client,
	}),

	emailAndPassword: {
		enabled: true,
	},
})
