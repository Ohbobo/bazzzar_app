import type { IPostRepository } from "../repository/postRepository";

export class DeletePost {
    constructor(private readonly repository: IPostRepository) {}

    async deletePost(id: string | undefined) {
        await this.repository.deletePost(id);
    }
}