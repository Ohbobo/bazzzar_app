import { type IPostRepository } from "../../domain/repository/postRepository"
import { type IPost } from "../../domain/entities/postEntities"
import { db, Post } from 'astro:db';
import { PostDto } from "../../domain/dto/post.dto";

export class DbRepository implements IPostRepository {

    async getAllPosts(): Promise<IPost[]> {
        try {
            return await db.select().from(Post);
        } catch (error) {
            console.error("Impossible de récupérer les données pour le moment", error);
            throw error;       
        }
    }

    async createPost(postDto: PostDto): Promise<IPost> {
        try {
            const insertedPost: any = await db.insert(Post)
            .values(postDto)

            const newPost: IPost = {
                id: insertedPost.id,
                content: insertedPost.content,
                isVisible: insertedPost.isVisible,
                category: insertedPost.category,
                userId: insertedPost.userId,
                userImg: insertedPost.userImg,
                userName: insertedPost.userName,
            }

            return newPost;
        } catch (error) {
            console.error("Impossible de créer le post", error);
            throw error;
        }
    }
} 