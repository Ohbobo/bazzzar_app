import React, { useState } from 'react'
import { type IPost } from '../../domain/entities/postEntities'

export const UserPostsSection = ({ posts }: {posts: IPost[]}) => {
    
    const [post, setPost] = useState<IPost[]>(posts);

    const handleDelete = async(postId: string) => {
        try {
            const res = await fetch(`/api/contentManagement/controller/delete/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
            });
            if(res.ok) {
                console.log("ok");
            } else {
                console.log("probleme")
            }
        } catch (error) {
            console.error('Erreur lors de la suppression', error)
        }
    }

    return (
    <div className='border flex justify-around gap-3 rounded-lg h-[50vh] p-5'>
        {post.length !== 0 ? (
        post.map(post => (
            <article key={post.content} className='border w-1/4 h-fit rounded-md p-5 flex flex-col gap-6'>
                <div className='flex justify-between items-center'>
                    <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                        <p className="whitespace-nowrap text-sm">{post.category}</p>
                    </span>
                    {post.userImg !== "" ? (
                        <img className='rounded-full w-5 h-5' src={post.userImg} alt="profil utilisateur" />
                    ) : (
                        <span className='block w-5 h-5 bg-black rounded-full'></span>
                    )}
                </div>

                <div className='text-lg text-center'>
                    <span>{post.content}</span>
                </div>

                <div className='flex justify-end'>
                    <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                        <button
                            className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                            title="Edit Product"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                            </svg>
                        </button>

                        <button
                            className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                            title="Delete Product"
                            onClick={() => handleDelete(post.id)}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                            </svg>
                        </button>
                    </span>
                </div>
            </article>
        ))
    ) : (
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
            <p>Pas de posts pour le moment</p>
            <button className="bg-black text-white px-5 py-2 rounded-lg hover:shadow-lg">Ajouter un code de parrainage</button>
        </div>
    )}
    </div>
  )
}
