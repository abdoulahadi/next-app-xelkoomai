/**
 * Custom error classes for better error handling
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, "VALIDATION_ERROR")
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Non autorisé") {
    super(message, 401, "UNAUTHORIZED")
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Accès interdit") {
    super(message, 403, "FORBIDDEN")
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Ressource introuvable") {
    super(message, 404, "NOT_FOUND")
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT")
  }
}

export class RateLimitError extends AppError {
  constructor(
    message: string = "Trop de tentatives. Veuillez réessayer plus tard.",
    public retryAfter?: number
  ) {
    super(message, 429, "RATE_LIMIT_EXCEEDED")
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Erreur interne du serveur") {
    super(message, 500, "INTERNAL_SERVER_ERROR")
  }
}

/**
 * Error response format
 */
export interface ErrorResponse {
  error: string
  code?: string
  field?: string
  statusCode: number
  timestamp: string
}

/**
 * Convert error to JSON response
 */
export function errorToJSON(error: unknown): ErrorResponse {
  const timestamp = new Date().toISOString()

  if (error instanceof ValidationError) {
    return {
      error: error.message,
      code: error.code,
      field: error.field,
      statusCode: error.statusCode,
      timestamp,
    }
  }

  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
      timestamp,
    }
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      statusCode: 500,
      timestamp,
    }
  }

  return {
    error: "Une erreur inattendue s'est produite",
    statusCode: 500,
    timestamp,
  }
}

/**
 * Handle error and return appropriate Response
 */
export function handleError(error: unknown): Response {
  const errorResponse = errorToJSON(error)

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error)
  }

  // Log critical errors in production
  if (errorResponse.statusCode >= 500) {
    console.error("Critical error:", {
      error: errorResponse,
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  return Response.json(errorResponse, {
    status: errorResponse.statusCode,
  })
}

/**
 * Async error handler wrapper for API routes
 */
export function asyncHandler(
  handler: (request: Request, context?: any) => Promise<Response>
) {
  return async (request: Request, context?: any): Promise<Response> => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleError(error)
    }
  }
}

/**
 * Server Action error handler
 */
export async function handleServerActionError(
  error: unknown
): Promise<{ success: false; error: string; code?: string }> {
  const errorResponse = errorToJSON(error)

  // Log error
  console.error("Server Action Error:", errorResponse)

  return {
    success: false,
    error: errorResponse.error,
    code: errorResponse.code,
  }
}

/**
 * Safe error message for client (hide sensitive info in production)
 */
export function getSafeErrorMessage(error: unknown): string {
  if (process.env.NODE_ENV === "development") {
    if (error instanceof Error) {
      return error.message
    }
    return String(error)
  }

  // In production, return generic message for non-AppError errors
  if (error instanceof AppError) {
    return error.message
  }

  return "Une erreur s'est produite. Veuillez réessayer."
}
