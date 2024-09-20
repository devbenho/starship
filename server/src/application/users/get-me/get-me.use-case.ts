import {BaseUseCase, UseCase} from '@application/shared';
import {UserResponseDto} from '@contracts/dtos/users';
import { Types} from "mongoose";
import { GetMeRequest } from '@application/users/get-me/get-me.request';
import { UserModel } from '@/infrastructure';
import { ResourceNotFoundException } from '@web/rest/expections';

@UseCase()
class GetMeUseCase extends BaseUseCase<GetMeRequest, UserResponseDto> {

  constructor() {
    super();
  }

  public async performOperation(
    request: GetMeRequest,
  ): Promise<UserResponseDto> {

    const userId = new Types.ObjectId(request.triggeredBy.who).toString();

    const userExist = await UserModel.findById(userId).populate('scopeId') as any;
    if (!userExist) {
      throw new ResourceNotFoundException('User not found');
    }


    const result = UserResponseDto.Create(userExist._id, userExist.name, userExist.email, userExist.scopeId, userExist.scopeId.name);

    return result;
  }
}

export {GetMeUseCase};