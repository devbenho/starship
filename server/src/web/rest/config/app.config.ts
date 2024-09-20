import { sync as readPackageJsonSync } from 'read-pkg';

import {
  getEnvironmentNumber,
  getEnvironmentString,
} from '@infrastructure/shared/config/environment';

const AppInfo = Object.freeze({
  APP_VERSION: getEnvironmentString(
    'APP_VERSION',
    readPackageJsonSync().version,
  ),
  APP_NAME: getEnvironmentString(
    'APP_NAME',
    readPackageJsonSync().name || 'N/A',
  ),
  APP_DESCRIPTION: getEnvironmentString(
    'APP_DESCRIPTION',
    readPackageJsonSync().description || 'N/A',
  ),
  AUTHOR_NAME: getEnvironmentString(
    'AUTHOR_NAME',
    readPackageJsonSync().author?.name || 'N/A',
  ),
  AUTHOR_EMAIL: getEnvironmentString(
    'AUTHOR_EMAIL',
    readPackageJsonSync().author?.email || 'N/A',
  ),
  AUTHOR_WEBSITE: getEnvironmentString(
    'AUTHOR_WEBSITE',
    readPackageJsonSync().author?.url || 'N/A',
  ),
});

const AppConfig = Object.freeze({
  PORT: getEnvironmentNumber('PORT', 2707),
  BASE_PATH: getEnvironmentString('BASE_PATH', '/api'),
  LOGGER_PATH: getEnvironmentString(
    'LOGGER_PATH',
    '/Users/mbanhawy/dev/projects/bug-zone/server/logs',
  ),
  AUTHORIZATION_ACCESS_TOKEN_HEADER_NAME: 'authorization',
  ACCESS_TOKEN_HEADER_NAME: 'access-token',
  ACCESS_TOKEN_COOKIE_NAME: 'access-token',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh-token',
  REFRESH_TOKEN_HEADER_NAME: 'refresh-token',
  TRIGGERED_BY_CONTEXT_KEY: 'triggeredBy',
  AUTHENTICATION_CONTEXT_KEY: 'authentication',
  SCOPE_CONTEXT_KEY: 'scope',
});

export { AppConfig, AppInfo };
