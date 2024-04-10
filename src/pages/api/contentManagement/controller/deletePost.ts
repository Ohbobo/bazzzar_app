import type { APIRoute } from "astro";
import { DbRepository } from "../../../../post/adapter/db/dbRepository";
import { DeletePost } from "../../../../post/domain/useCases/deletePost";
import { getSession } from 'auth-astro/server';

const service = new DeletePost(new DbRepository());

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
  return userData;
}

export const DELETE: APIRoute = async ({ request, params }) => {
    try {

        console.log('bobo')
        const id = params?.id?.toString();
        console.log(id)
        if(!id) {
            return new Response(
                JSON.stringify({
                    message: "Post introuvable",
                    success: false
                }),
                {
                    status: 404,
                }
            )
        }

        const userId = await getUserIdFromSession(request)
        if(!userId) {
            return new Response("Vous devez être connecté pour ajouter votre code", { status: 401 });
        }

        await service.deletePost(id);
        console.log('Supprimé')
        throw new Response(null, { status: 204 });
        
    } catch (error) {
        console.error(error)
        return new Response(
            JSON.stringify({
                message: error,
                success: false
            }),
            {
                status: 500
            }
        )
    }
}


