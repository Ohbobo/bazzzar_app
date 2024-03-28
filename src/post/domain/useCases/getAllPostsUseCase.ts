import { type IPostRepository } from "../repository/postRepository";

export const getAllPosts = async (repository: IPostRepository) => {
    const allPosts = await repository.getAllPosts();
    return [ ...allPosts ];
}

export const getFiveRandomPostsFromAll = async (repository: IPostRepository) => {
    const allPosts = await getAllPosts(repository);
    
    const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);
    const fiveRandomPosts = shuffledPosts.slice(0, 5);
    return [...fiveRandomPosts];
}