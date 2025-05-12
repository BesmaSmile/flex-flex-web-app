const handleGeneralError = (error: any) => {
  switch (error.response?.data?.errorCode) {
    case 'NOT_FOUND':
      throw new Error('Resource not found');
    case 'SERVER_ERROR':
      throw new Error('Something went wrong');
    default:
      throw new Error('Unknown error');
  }
};

const handleUserErrors = (error: any) => {
  switch (error.response?.data?.errorCode) {
    case 'EXISTING_USERNAME':
      throw new Error('Username already exists');
    case 'INVALID_CREDENTIALS':
      throw new Error('Wrong username or password');
    default:
      handleGeneralError(error);
  }
};

const handleMovieErrors = (error: any) => {
  switch (error.response?.data?.errorCode) {
    case 'NOT_FOUND':
      throw new Error('Movie not found');
    default:
      handleGeneralError(error);
  }
};

const handleTvShowErrors = (error: any) => {
  switch (error.response?.data?.errorCode) {
    case 'NOT_FOUND':
      throw new Error('TV Show not found');
    default:
      handleGeneralError(error);
  }
};

const errorsHandler = {
  handleGeneralError,
  handleUserErrors,
  handleMovieErrors,
  handleTvShowErrors
};

export default errorsHandler