export const getProducts = () => async (dispatch) => {
  try {
    // fetch in readmy file for better understanding
    const data = await fetch("/getproducts", {
      method: "GET",
      headers: {
        "Content-Type": "applicaton/json",
      },
    });
    const res = await data.json();
    // console.log(res);

    dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: res });
  } catch (error) {
    dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response });
  }
};

//call api this page
