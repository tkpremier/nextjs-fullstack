const handleResponse = async (response: Awaited<Promise<Response>>) => {
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('e: ', e);
    throw Error(e);
  }
};

export default handleResponse;
