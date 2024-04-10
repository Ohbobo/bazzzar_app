import {type IPost} from '../entities/postEntities';
import { PostDto } from '../dto/post.dto';

export interface IPostRepository {
    getAllPosts(): Promise<IPost[]>
    createPost(postDto: PostDto): Promise<IPost>
    deletePost(id: string | undefined): Promise<void>
}