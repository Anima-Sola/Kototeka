import useStore from "../store/store";

const store = useStore.getState();

const fetchAPI = async (url: string, options: any, returnData: boolean = true) => {
  try {
    const response = await fetch(url, options);
    if (!returnData) return;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    store.showErrorToast(" Error while receiving data");
  }
};

export default fetchAPI;
