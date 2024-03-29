type UserData = {
    email?: string,
    name?: string,
    image?: string,
}

export const getUserDataFromSession = async (
    req: Request, 
    session: (req: Request) => any
) => {
    const userSession = await session(req);
    const userData: UserData = {
        email: userSession?.user?.email ?? null
    }

    userSession?.user?.name ? userData.name = userSession?.user?.name : "";

    userSession?.user?.image ? userData.image = userSession?.user?.image : "";

    return userData;
}