import { db, Post, Categories } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Post).values([
		{
			id: "1",
			content: "519eazadfff",
			isVisible: true,
			category: "Boursorama",
			userId: "agentheo0@gmail.com",
			userImg: "",
			userName: "ceezcec",
		},
		{
			id: "2",
			content: "Bo",
			isVisible: true,
			category: "Boursorama",
			userId: "agentheo0@gmail.com",
			userImg: "",
			userName: "ceezcec",
		},
		{
			id: "3",
			content: "Bobob",
			isVisible: true,
			category: "HelloBank",
			userId: "agentheo0@gmail.com",
			userImg: "",
			userName: "ceezcec",
		},
	]
	)

	await db.insert(Categories).values([
		{
			name: "Tous",
			id: "0"
		},
		{
			name: "Boursorama",
			id: "123"
		},
		{
			name: "HelloBank",
			id: "124"
		}
	])
}
