
//  here create a compiled reducer ,and create all
//  reducer in one object

import {getproductsreducer} from './Productsreducers'
import {combineReducers} from "redux"


const rootrducers=combineReducers({
    getproductsdata:getproductsreducer,
});
export default rootrducers;