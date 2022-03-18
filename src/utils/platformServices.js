const authenticateUser = () => {
  try {
    return window.insights.chrome.auth.getUser();
  } catch (e) {
    throw new Error(`Error authenticating user: ${e.message}`);
  }
};

export { authenticateUser };
