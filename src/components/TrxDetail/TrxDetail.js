import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/style.scss'


const TrxDetail = (props) => {
	const [transactionList, setTransactionList] = useState([]);
	const level = props.match.params.level;

	useEffect(() => {
		getTransactionList();
	});

	const getTransactionList = async () => {
		const trsCountUrl = "https://api.tzkt.io/v1/operations/transactions/";
		const params = new URLSearchParams([['level', level]]);
		const res = await axios.get(trsCountUrl, { params });
		setTransactionList(res.data);
	};

	return (
		<div className="transaction-contents">
			<div className="table-row header">
				<div className="table-col">
					<span className="col-info">Sender</span>
				</div>
				<div className="table-col">
					<span className="col-info">Target</span>
				</div>
				<div className="table-col">
					<span className="col-info">Amount</span>
				</div>
				<div className="table-col">
					<span className="col-info">Status</span>
				</div>
			</div>
			{transactionList?.map((trx, i) => (
				<div className="table-row" key={i}>
					<div className="table-col col-level">
						<div className="col-inner-seller">
							<span className="col-info"> {trx.sender.address}</span>
						</div>
					</div>
					<div className="table-col col-edition">
						<span className="col-info">{trx.target?.alias}</span>
						<br />
						<span className="col-info">{trx.target?.address}</span>
					</div>
					<div className="table-col col-edition">
						<span className="col-info"> {trx.amount}</span>
					</div>
					<div className="table-col col-remaining">
						<span className="col-info"> {trx.status}</span>
					</div>
				</div>))}
		</div>);
};

export default TrxDetail;
