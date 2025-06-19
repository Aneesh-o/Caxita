import commonApi from "./commonApi"
import serverUrl from "./serverUrl"


// seeker-registration
export const addFlightDetailsApi = async (reqBody) => {
    return await commonApi("POST", `${serverUrl}/addFlight`, reqBody)
}