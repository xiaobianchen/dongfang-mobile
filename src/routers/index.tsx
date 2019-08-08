import { NotFound } from "@components/NotFound";
import App from "@views/App";
import Index from "@views/Index";
import OrderDetails from "@views/order/OrderDetails";
import OrderList from "@views/order/OrderList";
import UserCenter from "@views/user/UserCenter";
import { createBrowserHistory } from "history";
import { parse } from "qs";
import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { Paths, RoutePaths } from './const';

const history = createBrowserHistory();

const addLocationQuery = (nextHistory) => {
	nextHistory.location = {
		...nextHistory.location,
		query: parse(nextHistory.location.search.substr(1)),
	};
};

addLocationQuery(history);

history.listen(() => addLocationQuery(history));

const AppRouter = () => (
	<Router history={history}>
		<App>
			<Switch>
				<Route exact={true} path={RoutePaths[Paths.INDEX]} component={Index}/>
				<Redirect exact={true} from={"/"} to={RoutePaths[Paths.INDEX]}/>
				<Route exact={true} path={RoutePaths[Paths.USER_CENTER]} component={UserCenter}/>
				<Route exact={true} path={RoutePaths[Paths.ORDER_LIST]} component={OrderList}/>
				<Route exact={true} path={RoutePaths[Paths.ORDER_DETAILS]} component={OrderDetails}/>
				<Route path={"*"} component={NotFound}/>
			</Switch>
		</App>
	</Router>
);

export default AppRouter;