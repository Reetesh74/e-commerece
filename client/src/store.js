import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import rootrducers from "./components/redux/reducers/main";

const middleware=[thunk];
const store=createStore(
    rootrducers,
    composeWithDevTools(applyMiddleware(...middleware))

)
export default store;