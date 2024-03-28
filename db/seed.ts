import { db, Post, Categories } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Post).values([
		{
			id: "ffeefefefe",
			content: "519eazadfff",
			isVisible: true,
			category: "Bourse",
			userId: "agentheo0@gmail.com",
			userImg: "dzdzd",
			userName: "ceezcec",
		},
		{
			id: "ffeefefefe",
			content: "Bo",
			isVisible: true,
			category: "Bourse",
			userId: "agentheo0@gmail.com",
			userImg: "dzdzd",
			userName: "ceezcec",
		},
		{
			id: "ffeefefefe",
			content: "Bobob",
			isVisible: true,
			category: "Bourse",
			userId: "agentheo0@gmail.com",
			userImg: "dzdzd",
			userName: "ceezcec",
		},
	]
	)
}
