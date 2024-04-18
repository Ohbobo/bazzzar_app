import { useState } from 'react';
import { type IPost } from '../../domain/entities/postEntities';
import InfiniteScroll from 'react-infinite-scroll-component';

type CategoriesProps = {
    name: string, 
    id: string,
}

export const AllPostsContent = ( { 
    posts,
    categorieArr,
    } : { 
        posts: IPost[],
        categorieArr: CategoriesProps[], 
}) => {

    const [postState, setPostState] = useState<IPost[]>(posts);
    const [categories, setCategories] = useState<CategoriesProps[]>(categorieArr);

    const handleFilterContent = (categoryName: string) => {
        const filteredPosts = posts.filter(post => post.category === categoryName);
        const resultFilteredPosts = setPostState(filteredPosts);
        
        categoryName === "Tous" ? setPostState(posts) : resultFilteredPosts
    }

    return (
    <div className='border'>
        <div className='flex items-center gap-5 mb-10'>
            {categories.map(cat => (
                <span onClick={() => handleFilterContent(cat.name)} className='border p-5 rounded-lg cursor-pointer' key={cat.id}>{cat.name}</span>
            ))}
        </div>
        
        <div className='flex justify-between'>
            {
                postState.length > 0 ? (
                    postState.map(post => (
                        <div key={post.id} className='border rounded-lg w-[300px] h-[300px]'>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun post trouvé.</p>
                )
            }
        </div>
    </div>
  )
}
