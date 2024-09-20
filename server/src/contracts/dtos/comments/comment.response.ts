import { UserResponseDto } from "../users";

class CommentResponseDto{
    id: string;
    userId: string;
    user: Pick<UserResponseDto, 'name' | 'email' | 'scope'>;
    text: string;
    starshipId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    constructor(
        id: string,
        userId: string,
        user: Pick<UserResponseDto, 'name' | 'email' | 'scope'>,
        text: string,
        starshipId: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ){
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.text = text;
        this.starshipId = starshipId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    
    
    public static Create(
        id: string,
        userId: string,
        user: Pick<UserResponseDto, 'name' | 'email' | 'scope'>,
        text: string,
        starshipId: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    ): CommentResponseDto{
        return new CommentResponseDto(
            id,
            userId,
            user,
            text,
            starshipId,
            createdAt,
            updatedAt,
            deletedAt
        );
    }
}

export { CommentResponseDto };