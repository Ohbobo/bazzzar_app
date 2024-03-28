// import type { APIRoute } from 'astro';
// import { db, Post } from 'astro:db';
// import { v4 as uuidv4 } from 'uuid';
// import { getSession } from 'auth-astro/server';

// const getUserIdFromSession = async (req: Request) => {
//     const session = await getSession(req);
//     return session?.user?.email ?? null;
// }

// export const POST: APIRoute = async ({ request, redirect }) => {
//     const formData = await request.formData();
//     const content = formData.get('content');

//     try {
//         if(typeof content === 'string' && content !== "" ) {
//             const userId = await getUserIdFromSession(request)
//             if(!userId) {
//                 return new Response("Vous devez être connecté pour ajouter un post", { status: 401 });
//             }
//             const id = uuidv4();
//             await db.insert(Post).values({
//                 content,
//                 id,
//                 isVisible: true,
//                 userId: userId,
//             })
//         }
//     } catch (error) {
//         return new Response("Something went wrong" + error, {
//             status: 500,
//         });
//     }
//     return redirect("/")
// }