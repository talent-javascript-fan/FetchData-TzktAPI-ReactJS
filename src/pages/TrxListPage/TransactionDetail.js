import React from "react";
import TrxDetail from "../../components/TrxDetail"

const TransactionDetail = (level) => {
	return (
		<>
			<header className="App-header">
				<h2>List of Transactions</h2>
			</header>
			<div className="block-full jcc space-wrap">
				<div className="inner-wrapper">
					<TrxDetail {...level} />
				</div>
			</div>
		</>
	);
};

export default TransactionDetail;
