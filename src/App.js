import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlockList from "./pages/BlockListPage";
import TransactionDetail from "./pages/TrxListPage";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={BlockList} />
					<Route exact path="/blocks/:level" component={TransactionDetail} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
