export enum ErrorCodes {
  BOOK_ALREADY_EXIST = 'BOOK_ALREADY_EXIST',
}

export type IErrorCodes = {
  [key in ErrorCodes]: { message: string; rawType: string };
};

export const errorList: IErrorCodes = {
  BOOK_ALREADY_EXIST: {
    rawType: 'BOOK_ERROR',
    message: 'error-codes.book.already-exist',
  },
};

export const getErrorCode = (errorName: ErrorCodes) => {
  return errorList[errorName];
};
