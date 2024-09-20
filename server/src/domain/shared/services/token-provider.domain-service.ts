import { JwtPayload } from '@contracts/services/IJwt';
import { Nullable } from '@domain/shared';


abstract class TokenProviderDomainService {
    // create JWT access token
    public abstract createAccessToken(
        payload: JwtPayload
    ): string;

    public abstract verifyAccessToken(token: string): Nullable<JwtPayload>;
}

export { TokenProviderDomainService };
