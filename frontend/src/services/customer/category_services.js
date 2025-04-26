import { apiGet } from "../backend_service/apiservice";
import API_ENDPOINTS from "../backend_service/constants";

// Your getCategories function
export const getCategories = async (user) => {

  try {
    const response = await apiGet(
      API_ENDPOINTS.CATEGORY.GET_ALL,
      {},
      {},
      user.email,
      user.plainPassword
    );
    // console.dir(response.data); // Check the response data here
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching categories:", error); // Log the error
    return []; // Return an empty array if there is an error
  }
};
