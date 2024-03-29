import type { APIRoute } from 'astro';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from 'auth-astro/server';
import { DbRepository } from '../../../../post/adapter/db/dbRepository';
import { type IPost } from '../../../../post/domain/entities/postEntities';
import { PostDto
 } from '../../../../post/domain/dto/post.dto';
import { CreatePost } from '../../../../post/domain/useCases/createPost';
import { getUserDataFromSession } from '../../../../post/middleware/getUserData/getUserData';

const service = new CreatePost(new DbRepository());

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

export const POST: APIRoute = async({ request, redirect }) => {
    const formData = await request.formData();
    const content = formData.get('content');
    try {
        if(typeof content === 'string' && content !== "" ) {    
            const userId = await getUserIdFromSession(request)
            if(!userId) {
                return new Response("Vous devez être connecté pour ajouter votre code", { status: 401 });
            }

            const postData: IPost = {
                content: content,
                userId: userId.email || "",
                userImg: userId.image || "",
                userName: userId.name || "",
                category: "Boursorama",
                id: uuidv4(),
                isVisible: true
            }

            await service.createNewPost(postData);
        }
    } catch (error) {
        return new Response(
            "Création impossible" + error, 
            { status: 500 },
        )
    }
    return redirect("/")
}