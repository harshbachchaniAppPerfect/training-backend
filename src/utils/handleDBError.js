const handleDatabaseError = (error) => {
  if (error.message) {
    return {
      success: false,
      message: error.message,
      error: error,
      statusCode: 400,
    };
  }
  let message = "Database error occurred.";
  if (error.code === "23505") {
    message = "Duplicate entry found.";
  } else if (error.code === "23503") {
    message = "Related record not found.";
  } else if (error.code === "23514") {
    message = "Invalid data provided.";
  }
  return {
    success: false,
    message,
    statusCode: 400,
    error: error,
  };
};
export { handleDatabaseError };
