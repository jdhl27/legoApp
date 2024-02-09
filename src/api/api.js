export async function makeRequest(method, endpoint, data) {
  const url =
    'https://1be9db56-c889-466d-9c12-cba178414901.mock.pstmn.io/' + endpoint;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(jsonResponse.message);
  }

  return jsonResponse;
}
