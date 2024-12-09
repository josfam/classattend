interface FetchWithTokenProps {
  url: string;
  options: RequestInit;
}

/**
 * Wrapper around fetch that adds the bearer token along with the fetch request
 */
const FetchWithToken = async ({ url, options = {} }: FetchWithTokenProps) => {
  const token = localStorage.getItem("jwtToken"); // token from local storage
  const headers = {
    ...options.headers, // existing headers
    Authorization: `Bearer ${token}`, // Add bearer token
  };

  // Merge options with the updated headers
  return fetch(url, { ...options, headers });
};

export default FetchWithToken;
