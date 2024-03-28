import {type IPost} from '../entities/postEntities'

export interface IPostRepository {
    getAllPosts(): Promise<IPost[]>
}