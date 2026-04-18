type AuthAction = "login" | "signup" | "generic";

const FALLBACK_MESSAGE: Record<AuthAction, string> = {
  login: "We couldn't sign you in. Please check your email and password and try again.",
  signup: "We couldn't create your account right now. Please try again in a moment.",
  generic: "Something went wrong. Please try again.",
};

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled. Please contact support.",
  "auth/user-not-found": "No account found with this email. Please sign up first.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Your email or password is incorrect.",
  "auth/invalid-login-credentials": "Your email or password is incorrect.",
  "auth/too-many-requests": "Too many attempts detected. Please wait a minute and try again.",
  "auth/network-request-failed": "Network issue detected. Please check your internet connection and try again.",
  "auth/email-already-in-use": "This email is already registered. Please sign in instead.",
  "auth/weak-password": "Password is too weak. Please use at least 6 characters.",
  "auth/operation-not-allowed": "This sign-in method is not available right now. Please try later.",
  "auth/requires-recent-login": "For security, please log in again and retry.",
};

const extractErrorCode = (error: unknown): string | null => {
  if (error && typeof error === "object") {
    const maybeCode = (error as { code?: unknown }).code;
    if (typeof maybeCode === "string" && maybeCode.trim()) {
      return maybeCode.toLowerCase();
    }

    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string") {
      const match = maybeMessage.toLowerCase().match(/auth\/[a-z0-9-]+/);
      if (match?.[0]) {
        return match[0];
      }
    }
  }

  if (typeof error === "string") {
    const match = error.toLowerCase().match(/auth\/[a-z0-9-]+/);
    if (match?.[0]) {
      return match[0];
    }
  }

  return null;
};

export const getFriendlyAuthErrorMessage = (
  error: unknown,
  action: AuthAction = "generic",
): string => {
  const code = extractErrorCode(error);

  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  if (code === "permission-denied" || code === "firestore/permission-denied") {
    return "You don't have permission to perform this action. Please log in again.";
  }

  return FALLBACK_MESSAGE[action];
};
