// import 'reflect-metadata';
// import { Container } from 'inversify';
// import { TYPES } from './types';
// import { JwtService } from '@infrastructure/shared/jwt/jwt.service.impl';
// import { UserMapper, UserRepository } from '@infrastructure/users';

// import { HasherService } from '@infrastructure/shared/hasher/hasher.service';
// import { LikesController } from '@/web/rest/controllers';
// import { LoginUseCase } from '@application/auth/login/login.use-case';
// import { RegisterUsecase } from '@application/auth/register/register.use-case';
// import { DataSource } from 'typeorm';
// import { appDataSource } from '@infrastructure/shared/persistence/data-source';
// import { PostsController } from '@/web/rest/controllers/posts.controller';
// import { PostRepositoryImp } from '@infrastructure/posts';
// import { CreatePostUseCase } from '@application/post';
// import { FindAllPostUseCase } from '@application/post/find-all/find-all-post.usecase';

// const container = new Container();
// // Bind the extrernal dependencies
// container.bind(TYPES.IJwtService).to(JwtService);
// container.bind(TYPES.IHasherService).to(HasherService);
// container.bind(TYPES.IUserMapper).to(UserMapper);

// // Inject the repositories
// container.bind(TYPES.IUserRepository).to(UserRepository);
// container.bind(TYPES.IPostRepository).to(PostRepositoryImp);

// // Inject input ports
// container.bind(TYPES.ILoginInputPort).to(LoginUseCase);
// container.bind(TYPES.IRegisterInputPort).to(RegisterUsecase);

// container.bind(TYPES.ICreatePostInputPort).to(CreatePostUseCase);
// container.bind(TYPES.IFindAllPostInputPort).to(FindAllPostUseCase);

// // Bind the controllers
// container.bind(TYPES.IAuthController).to(LikesController);
// container.bind(TYPES.IPostController).to(PostsController);

// // Bind ApplicationRouter

// // bind the datastore
// container.bind<DataSource>(DataSource).toConstantValue(appDataSource);

// export { container };
