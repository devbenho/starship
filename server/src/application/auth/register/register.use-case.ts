import 'reflect-metadata';
import { AuthResponseDto } from '@contracts/dtos/auth';
import {CreateUserDto, UserResponseDto} from '@contracts/dtos/users';
import { BaseUseCase, UseCase } from '@application/shared';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { User } from '@domain/entities';
import { JwtPayload } from '@contracts/services/IJwt';
import { HasherDomainService } from '@domain/shared/services';
import { UserModel } from '@infrastructure/users/user.model';
import {ScopeModel} from "@infrastructure/scopes/scope.model";
import { BadRequestException, ResourceNotFoundException } from '@web/rest/expections';
import { Logger } from '@domain/shared';
import { Types } from 'mongoose';
import { InvalidParameterException } from '@domain/shared/exceptions';

@UseCase()
class RegisterUsecase extends BaseUseCase<CreateUserDto, AuthResponseDto> {
  private _jwtService: TokenProviderDomainService;

  constructor(
    jwtService: TokenProviderDomainService,
  ) {
    super();
    this._jwtService = jwtService;
  }

  public async performOperation(
    request: CreateUserDto,
  ): Promise<AuthResponseDto> {
    const user = await this.createUser(request);
    const scopeName = await this.validateScope(user.scopeId);
    const payload = this.generatePayload(user);
    const token = this.generateJwtToken(payload);
    const userDTO = UserResponseDto.fromEntity(user);
    return {
      token,
      userDetails: userDTO,
    };
  }

  private async createUser(request: CreateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(request.scopeId)) {
      throw new InvalidParameterException('Invalid ID');
    }

    const scope = await ScopeModel.findById(request.scopeId);
    if (!scope) {
      throw new ResourceNotFoundException('Scope not found');
    }

    // CHECK if the user already exists
    const userExist = await UserModel.findOne({ email: request.email });
    if (userExist) {
      throw new BadRequestException('User already exists');
    }
    const user = User.create(
      null,
      request.email,
      request.name,
      request.password,
      request.scopeId,
      new Date(),
      request.triggeredBy.who,
    );

    user.password = await HasherDomainService.hash(user.password);
    const createdUser = await UserModel.create(user);
    await createdUser.save();
    user.id = createdUser._id.toString();
    return user
  }

  private async validateScope(scopeId: string): Promise<any> {
    const scopeName = await ScopeModel.findById(scopeId);
    if (!scopeName) {
      Logger.error('Scope not found');
      throw new ResourceNotFoundException('Scope not found');
    }
    return scopeName;
  }

  private generatePayload(user: User): JwtPayload {
    return {
      email: { value: user.email },
      userUuid: { value: user.id as string },
      scope: { value: user.scopeId },
    } as JwtPayload;
  }

  private generateJwtToken(payload: JwtPayload): string {
    return this._jwtService.createAccessToken(payload);
  }
}

export { RegisterUsecase };
