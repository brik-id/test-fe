export const useErrorHandler = (error: any) => {
  const message = error.response?.data?.message || error.message || 'An unknown error occurred';
  console.error(message);
  alert('Error: ' + message);
  return message;
};
