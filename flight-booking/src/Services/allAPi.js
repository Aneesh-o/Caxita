import commonApi from "./commonApi";
import serverUrl from "./serverUrl";

export const addFlightDetailsApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/addFlight`, reqBody);
};

export const getFlightDetailsApi = async (query = '') => {
    return await commonApi("GET", `${serverUrl}/getDetails?${query}`);
};
