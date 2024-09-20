import {AuthRequest, AuthResponseDto} from '@contracts/dtos/auth';
import {BaseUseCase, UseCase} from '@application/shared';
import {HasherDomainService} from '@domain/shared/services';
import {TokenProviderDomainService} from '@domain/shared/services/token-provider.domain-service';
import {JwtPayload} from '@contracts/services/IJwt';
import {Logger} from '@domain/shared';
import {UserModel} from '@/infrastructure';
import {ScopeNames} from '@domain/entities/scopes/scope-enum';
import { UserResponseDto } from '@contracts/dtos/users';
import {UnauthorizedException} from "@web/rest/expections";

@UseCase()
class LoginUseCase extends BaseUseCase<AuthRequest, AuthResponseDto> {
  private readonly _jwtService: TokenProviderDomainService;
  constructor(
      jwtService: TokenProviderDomainService,
  ) {
    super();
    this._jwtService = jwtService;
  }

  public async performOperation(
      request: AuthRequest,
  ): Promise<AuthResponseDto> {
    const user = await UserModel
        .findOne({ email: request.login })
        .populate('scopeId')
        .exec() as any;
    if (!user) {
      throw new UnauthorizedException();
    }

    // Compare passwords using the HasherDomainService
    const isPasswordValid = await HasherDomainService.compare(
        request.password,
        user.password,
    );

    if (!isPasswordValid) {
      Logger.warn('Invalid password attempt for user', user.email);
      throw new UnauthorizedException();
    }

    // Create the JWT payload
    const payload: JwtPayload = {
      email: { value: user.email },
      scope: { value: ScopeNames.LIKER  }, 
      userUuid: { value: user.id as string },
    };

    // Create access token
    const token = this._jwtService.createAccessToken(payload);

  
    
    // Prepare the result DTO
    const result: AuthResponseDto = {
      token,
      userDetails: UserResponseDto.fromEntity(user),
    };

    return result;
  }
}

export { LoginUseCase };
