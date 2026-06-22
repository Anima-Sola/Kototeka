import useStore from "../store/store";

const fetchAPI = async (url: string, options: any, returnData: boolean = true) => {
  const store = useStore.getState();
  options.headers['x-api-key'] = store.apiKey;
  try {
    const response = await fetch(store.baseUrl + url, options);
    if (!returnData) return;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error)
    store.showErrorToast("Error while receiving data");
  }
};

export default fetchAPI;
