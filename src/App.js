import React, {useEffect} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'
import {Home} from "./pages/Home";
import {ProductDetails} from "./pages/product_details";
import './App.css';
import 'antd/dist/antd.css';
import {Loader} from "./components/loader/loader";
import {useDispatch, useSelector} from "react-redux";
import {getLoaderStatus} from "./redux/selectors/get_loader_status";
import {SearchResults} from "./pages/search_results";
import {Auth} from "./pages/Auth";
import {getMe, login, logoutUser} from "./redux/actions/auth/login";
import {Button} from "antd";

function App() {
    const dispatch = useDispatch()
    const isPending = useSelector(getLoaderStatus)
    const isAuth = useSelector(state => state.user.isAuth)
    const history = useHistory()
    useEffect(() => {
        dispatch(getMe()).then((res) => {
            if(res) {
                history.push('/home')
            } else {
                history.push('/login')
            }

        })
    }, [history,dispatch, isAuth])

    const onLogout = () => {
        dispatch(logoutUser())
        dispatch(login({status: false}))
        history.push('/login')
    }
  return (
    <div className="App">
        {isPending && <Loader />}
        {(isAuth || localStorage.access_token) && <Button type={'primary'} onClick={onLogout}>Logout</Button>}
        <Switch>
            <Route exact path={'/login'} component={Auth}/>
            <Route exact path={'/home'} component={Home}/>
            <Route exact path={'/product_details/:product_id'} component={ProductDetails}/>
            <Route exact path={'/search'} component={SearchResults}/>
        </Switch>
    </div>
  );
}

export default App;
