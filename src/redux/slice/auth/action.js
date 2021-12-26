import axios from "axios";
import { authActionTypes } from "./type";

//Api request example
const fetchData = async () =>
  await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => ({
      error: false,
      users: res.data,
    }))
    .catch(() => ({
      error: true,
      users: null,
    }));

export const signIn = (data) => async (dispatch) => {
  //   console.log(data);
  let response = await fetchData();
  if (response) {
    let userDetails = {
      access_token: "12dhbaj,b2bkbhk3jfkhksd,.sdnjaqne;i", // random var
      name: response.users[0].name,
      username: response.users[0].username,
      email: response.users[0].email,
    };
    return dispatch({
      type: authActionTypes.LOGIN_SUCCESS,
      payload: userDetails,
    });
  } else {
    return dispatch({
      type: authActionTypes.LOGIN_FAILURE,
      payload: { status: "failed", message: "error" },
    });
  }
};
