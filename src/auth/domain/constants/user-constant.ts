export const USER_VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 32,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

export const USER_ERROR_MESSAGES = {
  INVALID_EMAIL: 'The email format is invalid.',
  PASSWORD_TOO_SHORT: `Password must be at least ${USER_VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long.`,
  USER_ALREADY_EXISTS: 'A user with this email already exists.',
} as const;

export const USER_DI_TOKENS = {
  USER_REPOSITORY: 'IUserRepository',
} as const;
