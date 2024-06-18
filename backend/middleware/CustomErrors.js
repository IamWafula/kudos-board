class ValidationErrors extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationErrors';
    }
  }

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = "Page not found";
  }
}

class ExistingUserError extends Error {
  constructor(message) {
    super(message);
    this.message = "User already exists";
  }
}


module.exports = { ValidationErrors, NotFoundError, ExistingUserError };
