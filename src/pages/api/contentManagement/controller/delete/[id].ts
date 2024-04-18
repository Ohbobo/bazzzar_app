import { type APIRoute } from "astro";
import { db, Post, eq } from 'astro:db';
import { UserSessionMiddleware } from "../../../../../post/middleware/userSessionMiddleware/userSessionMiddleware";

export const DELETE: APIRoute = async (context) => {
    const { request } = context;
    try {
        const userSessionMiddleware = new UserSessionMiddleware(request);
        const userIsConnect = await userSessionMiddleware.canActivate();

        if(!userIsConnect) {
            return new Response(
                "Vous devez être connecté pour supprimer votre code", 
                { status: 401 }
            );
        }

        const id: string | undefined = context.params.id;
        if(id) {
            const post = Post.id;
            await db.delete(Post).where(eq(post, id));
            return new Response(null, { status: 204 });
          } else {
            return new Response(
                "ID du post non spécifié", 
                { status: 400 }
            );
        }

    } catch (error) {
        return new Response(
            "Suppression impossible" + error, 
            { status: 500 },
        )
    }
}
