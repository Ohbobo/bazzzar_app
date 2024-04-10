import type { APIRoute } from 'astro';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from 'auth-astro/server';
import { DbRepository } from '../../../../post/adapter/db/dbRepository';
import { type IPost } from '../../../../post/domain/entities/postEntities';
import { CreatePost } from '../../../../post/domain/useCases/createPost';

const service = new CreatePost(new DbRepository());

type UserData = {
    email?: string,
    name?: string,
    image?: string,
}

const checkUserAuth = async(req: Request) => {
    
}

const getUserIdFromSession = async (req: Request) => {  
  const userSession = await getSession(req);
  const cookieHeader = req?.headers?.get('cookie');

  const userData: UserData = {
    email: userSession?.user?.email || "",
  }

  userSession?.user?.name ? userData.name = userSession?.user?.name : "";

  userSession?.user?.image ? userData.image = userSession?.user?.image : "";
  return userData;
}

export const POST: APIRoute = async({ request }) => {
    
    let data: IPost = await request.json();
    const { content, category } = data;
    console.log(request);
    try {
            const userId = await getUserIdFromSession(request)
            if(!userId) {
                return new Response("Vous devez être connecté pour ajouter votre code", { status: 401 });
            }

            data = {
                content: content,
                userId: userId.email || "",
                userImg: userId.image || "",
                userName: userId.name || "",
                category: category,
                id: uuidv4(),
                isVisible: true
            }

            const res = await service.createNewPost(data);
            if(res) {
                console.log(res)
                return new Response(
                    JSON.stringify({
                        message: "Post ajouté avec succés",
                        data: res,
                        success: true,
                    }),
                    {
                        status: 200
                    }
                )
            } else {
                throw new Error('There was a problem with the db response.');
            }

    } catch (error) {
        return new Response(
            "Création impossible" + error, 
            { status: 500 },
        )
    }
}