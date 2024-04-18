import type { APIRoute } from 'astro';
import { v4 as uuidv4 } from 'uuid';
import { DbRepository } from '../../../../../post/adapter/db/dbRepository';
import type { IPost } from '../../../../../post/domain/entities/postEntities';
import { CreatePost } from '../../../../../post/domain/useCases/createPost';
import { UserSessionMiddleware } from '../../../../../post/middleware/userSessionMiddleware/userSessionMiddleware';

const service = new CreatePost(new DbRepository());


export const POST: APIRoute = async({ request }) => {

    let data: IPost = await request.json();
    const { content, category } = data;
    try {
        const userSessionMiddleware = new UserSessionMiddleware(request);
        const userIsConnect = await userSessionMiddleware.canActivate();
        const userData = await userSessionMiddleware.getUserDataFromSession()
            if(!userIsConnect) {
                return new Response("Vous devez être connecté pour ajouter votre code", { status: 401 });
            }

            data = {
                content: content,
                userId: userData?.email || "",
                userImg: userData?.image || "",
                userName: userData?.name || "",
                category: category,
                id: uuidv4(),
                isVisible: true
            }

            const res = await service.createNewPost(data);
            if(res) {
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