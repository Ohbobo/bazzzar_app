import { type IPostRepository } from "../repository/postRepository";
import { type IPost } from "../entities/postEntities";
import { PostDto } from "../dto/post.dto";

export class CreatePost {
    constructor(private readonly repository: IPostRepository) {}

    async createNewPost(dto: PostDto): Promise<IPost> {
        const newPost: IPost = {
            ...dto
        }
        const createNewPost = await this.repository.createPost(newPost);
        return createNewPost;
    }
}