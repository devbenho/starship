import { User } from '@domain/entities/users';
import {UserResponseDto} from "@dtos/users";

class AuthResponseDto {
  constructor(
    public token: string,
    public userDetails: UserResponseDto,
  ) { }
}

export { AuthResponseDto };
