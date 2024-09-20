import { CacheConfig } from '@infrastructure/shared/config';
import { AppConfig, AppInfo } from './config';
import { importProviders } from '@tsed/components-scan';

class Configurationg {
  public static async getConfiguration(): Promise<Partial<TsED.Configuration>> {
    const baseConfiguration: Partial<TsED.Configuration> = {
      rootDir: __dirname,
      acceptMimes: ['application/json'],
      httpPort: AppConfig.PORT,
      httpsPort: false,
    };

    const providersConfiguration: Partial<TsED.Configuration> =
      await importProviders({
        mount: {
          [AppConfig.BASE_PATH]: [
            `${__dirname}/controllers/**/*.controller.ts`,
          ],
        },
        imports: [
          `${__dirname}/../../infrastructure/**/*.domain-service.ts`,
          `${__dirname}/../../infrastructure/**/*.repository.ts`,
        ],
      });

    const swaggerConfiguration: Partial<TsED.Configuration> = {
      swagger: [
        {
          path: `${AppConfig.BASE_PATH}/docs`,
          specVersion: '3.0.3',
          spec: {
            info: {
              title: AppInfo.APP_NAME,
              description: AppInfo.APP_DESCRIPTION,
              version: AppInfo.APP_VERSION,
              contact: {
                name: AppInfo.AUTHOR_NAME,
                email: AppInfo.AUTHOR_EMAIL,
                url: AppInfo.AUTHOR_WEBSITE,
              },
              license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
              },
            },
            components: {
              securitySchemes: {
                Bearer: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                  description: `A valid *Access Token* is required to access protected resources. To obtain one, simply authenticate to the API through the authentication endpoint. If the authentication is successful, an Access Token and a Refresh Token will be returned.
              \n
              The *Access Token* can be attached to requests using one of the headers \`Authorization: Bearer <access_token>\` and \`access-token: <access-token>\` or a cookie called \`access-token\`.
              \n
              The *Refresh Token* can be sent using the header \`refresh-token: <refresh-token>\` or the cookie \`refresh-token\`.
              \n
              🧐 *The headers override the cookies, so if both are sent, the value of the headers will be used. In the case of the Access Token, the header with the highest priority is the one corresponding to the Authorization Bearer scheme.*
              \n
              **Sample username and password to use on \`/api/auth/login\` endpoint**: \`janedoe\` / \`123456\``,
                },
              },
            },
          },
        },
      ],
    };

    const ioredisConfiguration: Partial<TsED.Configuration> = {
      ioredis: [
        {
          name: 'default',
          cache: false,
          host: CacheConfig.CACHE_HOST,
          port: CacheConfig.CACHE_PORT,
          password: CacheConfig.CACHE_PASSWORD,
          db: CacheConfig.CACHE_DB,
        },
      ],
    };

    const loggerConfiguration: Partial<TsED.Configuration> | any = {
      logger: {
        level: 'off',
        disableRoutesSummary: true,
        logRequest: true,
      },
    };

    return {
      ...baseConfiguration,
      ...providersConfiguration,
      ...swaggerConfiguration,
      ...ioredisConfiguration,
      ...loggerConfiguration,
    };
  }
}
