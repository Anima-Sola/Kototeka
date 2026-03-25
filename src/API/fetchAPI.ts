const fetchAPI = async ( url: string, options: any, returnData: boolean = true) => {
  try {
    const response = await fetch(url, options);
    if(!returnData) return;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default fetchAPI;
