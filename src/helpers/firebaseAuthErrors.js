export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'User not found. Please check your email and try again.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please provide a valid email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please check your password and try again.';
      case 'auth/email-already-in-use':
        return 'Email address is already in use. Please choose a different email.';
      case 'auth/weak-password':
        return 'Weak password. Password should be at least 6 characters long.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact support for assistance.';
      default:
        return 'An error occurred during authentication. Please try again later.';
    }
  };
  