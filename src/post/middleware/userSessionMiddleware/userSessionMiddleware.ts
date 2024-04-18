import { getSession } from 'auth-astro/server';

type UserData = {
    email: string | undefined | null,
    name: string | undefined | null,
    image: string | undefined | null,
}

export class UserSessionMiddleware {
    constructor(private readonly req: Request) {}

    async getUserDataFromSession() {
        const userSession = await getSession(this.req);
    
        if(userSession) {
            const userData: UserData = {
                email: userSession.user?.email,
                image: userSession.user?.image,
                name: userSession.user?.name,
            }
            console.log(userData)
            return userData;
        }
    }
    
    private async getUserToken(){
        const userToken = this.req.headers.get('cookie')?.split('; ');
        if(userToken) {
            let tokenValue = null;
    
            for(let i = 0; i < userToken.length; i++) {
                const sessionToken = userToken[i].split('=');
    
                if(sessionToken[0].trim() === import.meta.env.TOKEN_ROUTE) {
                    tokenValue = sessionToken[1];
                    break;
                }
            }
            if(tokenValue) {
                return tokenValue;
            } else {
                console.error('Session non trouvé');
                return null;
            }
        }
    }

    async canActivate (): Promise<boolean> {
        const userData = await this.getUserDataFromSession();
        const userToken = await this.getUserToken();

        return userData && userToken ? true : false;
    }
}