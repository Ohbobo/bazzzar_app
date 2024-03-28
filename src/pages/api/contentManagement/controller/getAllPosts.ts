import type { APIRoute } from "astro";
import { getAllPosts } from "../../../../post/domain/useCases/getAllPostsUseCase";
import { DbRepository } from "../../../../post/adapter/db/dbRepository";

export const GET: APIRoute = async ({ request }) => {
    try {
        const allPostsServices = await getAllPosts(new DbRepository());

        if(!allPostsServices) {
            return new Response(
                "Pas de données",
                { status: 404 }
            )
        }
        const response = JSON.stringify(allPostsServices);

        return new Response(response, {
            status: 200,
            headers: {
                "Content-type": "application/json",
            }
        })

    } catch (error) {
        console.error('Problème lors de la récupération des données', error);
        return new Response(
            "Internal Server Error",
            { status: 500 }
        );
    }
}