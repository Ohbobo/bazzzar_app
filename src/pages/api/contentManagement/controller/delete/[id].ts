import type { APIRoute } from "astro";
import { db, Post, eq } from 'astro:db';
import { getSession } from 'auth-astro/server';

type UserData = {
    email?: string,
    name?: string,
    image?: string,
}

const getUserIdFromSession = async (req: Request) => {
  const userSession = await getSession(req);
  const userData: UserData = {
    email: userSession?.user?.email || "",
  }

  userSession?.user?.name ? userData.name = userSession?.user?.name : "";

  userSession?.user?.image ? userData.image = userSession?.user?.image : "";
  console.log(userData)
  return userData;
}


export const DELETE: APIRoute = async (context) => {
    const { request } = context;
    try {
        const userId = await getUserIdFromSession(request);
        if(!userId) {
            return new Response(
                "Vous devez être connecté pour supprimer votre code", 
                { status: 401 }
            );
        }
        const id: string | undefined = context.params.id;
        if (id) {
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
