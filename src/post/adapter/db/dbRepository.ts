import { type IPostRepository } from "../../domain/repository/postRepository"
import { type IPost } from "../../domain/entities/postEntities"
import { db, Post } from 'astro:db';

export class DbRepository implements IPostRepository {

    async getAllPosts(): Promise<IPost[]> {
        try {
            return await db.select().from(Post);
        } catch (error) {
            console.error("Impossible de récupérer les données pour le moment", error);
            throw error;       
        }
    }
} 