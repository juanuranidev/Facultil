import axios from "axios";

export const request = async ({ method, url, params, data }: any) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      params: params,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
