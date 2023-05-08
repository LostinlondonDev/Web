export interface HttpErrorResponse {
  errorCode: HttpError;
  errorResponse?: any;
  message?: MessagesError;
}
export enum HttpError {
  SERVER_ERROR = "SERVER_ERROR",
  RESOURCE_DUPLICATE = "RESOURCE_DUPLICATE",
  RESOURCE_NOT_EXIST = "RESOURCE_NOT_EXIST",
  PASSWORD_INCORRECT = "PASSWORD_INCORRECT",
  DATA_INVALID = "DATA_INVALID",
}

export enum MessagesError {
  NO_DATA = "Not Resouses find",
  DATA_INVALID = "Data Invalid",
}
