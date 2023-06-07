
const products=[]; // action value store in the array form every time
export const getproductsreducer=(state={products},action)=>{
    switch(action.type){
        case "SUCCESS_GET_PRODUCTS":
            return {products:action.payload}
        case "FAIL_GET_PRODUCTS":
            return {products:action.payload}

            default : return state
    }
}