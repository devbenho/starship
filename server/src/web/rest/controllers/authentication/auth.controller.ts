import { TriggeredByUser } from '@domain/shared/entities';
import { AuthRequest } from '@contracts/dtos/auth';
import { LoginUseCase } from '@application/auth/login/login.use-case';
import { RegisterUsecase } from '@application/auth/register/register.use-case';
import {
  Description,
  Example,
  Post,
  Returns,
  Status,
  Summary,
  Tags,
  Title,
} from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { BodyParams } from '@tsed/common';
import { RestController } from '@web/rest/infrastructure/rest-controller.decorator';
import { UserSuccessfullyAuthenticatedApiResponse } from './user-successfully-authenticated.api-response';
import { CreateUserDto } from '@contracts/dtos/users';

@RestController('/auth')
@Tags({ name: 'Authentication', description: 'Login and register users' })
class AuthController {
  private _loginUseCase: LoginUseCase;
  private _registerUseCase: RegisterUsecase;

  constructor(loginUseCase: LoginUseCase, registerUseCase: RegisterUsecase) {
    this._loginUseCase = loginUseCase;
    this._registerUseCase = registerUseCase;
  }

  @Post('/login')
  @Title('Login')
  @Summary('User login')
  @Description(
    'Endpoint to perform a user login to obtain access token and refresh token',
  )
  @Returns(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  public async authenticateUser(
    @Example('janedoe') @BodyParams('email') email: string,
    @Example('123456') @BodyParams('password') password: string,
  ): Promise<UserSuccessfullyAuthenticatedApiResponse> {
    let triggeredBy = new TriggeredByUser(email, "");
    const authenticatedUser = await this._loginUseCase.execute(
      AuthRequest.create(triggeredBy, email, password),
    );

    return UserSuccessfullyAuthenticatedApiResponse.Create(
        authenticatedUser.userDetails.id as string,
        authenticatedUser.userDetails.email,
        authenticatedUser.userDetails.scopeId,
        authenticatedUser.token,
    );
  }

  @Post('/register')
  @Title('Register')
  @Summary('User Register')
  @Description('Endpoint to register the user')
  @Returns(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAuthenticatedApiResponse)
  public async registerUser(
    @Example('Muhammad') @BodyParams('name') name: string,
    @Example('devbenho@benho.com') @BodyParams('email') email: string,
    @Example('123456') @BodyParams('password') password: string,
    @Example('1') @BodyParams('scope') scope: string,
    
  ): Promise<UserSuccessfullyAuthenticatedApiResponse> {
    let triggeredBy = new TriggeredByUser(email, "");
    const authenticatedUser = await this._registerUseCase.execute(
      CreateUserDto.create(
        triggeredBy,
        email,
        name,
        password,
        scope,
      ),
    );
    
    return UserSuccessfullyAuthenticatedApiResponse.Create(
      authenticatedUser.userDetails.id as string,
      authenticatedUser.userDetails.email,
      authenticatedUser.userDetails.scopeId,
      authenticatedUser.token,
    );
  }
}

export { AuthController };
