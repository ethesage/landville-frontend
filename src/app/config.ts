import { environment } from '../environments/environment';

function appConfig() {
  return {
    base_url: environment.api_url,
    facebookId: '1782833315349267',
    googleId:
      '315082406739-imasn7gsabthac3uaer84oqmp1g2780p.apps.googleusercontent.com'
  };
}

export enum HttpMethods {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch'
}

export const APPCONFIG = appConfig();
