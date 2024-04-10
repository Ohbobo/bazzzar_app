export interface IPost {
    id: string,
    content: string,
    isVisible: boolean,
    category: string,
    userId: string,
    userImg: string,
    userName: string, 
}

export interface IPosts {
    posts: IPost[]
}

export interface ICategory {
    id: string,
    name: string,
}

export interface ICategories {
    category: ICategory[], 
}