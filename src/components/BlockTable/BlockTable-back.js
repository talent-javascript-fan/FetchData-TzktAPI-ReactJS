import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import '../../styles/style.scss'

const BlockTable = () => {
	const [blockList, setBlockList] = useState([]);
	const data = [
		{ value: 5, label: '5' },
		{ value: 10, label: '10' },
		{ value: 20, label: '20' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' }
	];
	const [rowNum, setRowNum] = useState(5);
	const [currentpage, setPage] = useState(0);
	const indexOfLastRow = (currentpage + 1) * rowNum;
	const indexOfStartRow = indexOfLastRow - rowNum;
	const currentBlockRows = blockList?.slice(indexOfStartRow, indexOfLastRow);
	const lastPage = Math.ceil(blockList?.length / rowNum);

	useEffect(() => {
		getBlockList();
	}, []);

	const getBlockList = async () => {
		const blockEdp = "https://api.tzkt.io/v1/blocks/";
		const trxCountEdp = "https://api.tzkt.io/v1/operations/transactions/count";
		const response = await axios.get(blockEdp);
		const blocks = response.data;
		blocks.sort(function (a, b) { return b.level - a.level });
		blocks.map(block => {
			let params = new URLSearchParams([['level', block.level]]);
			axios.get(trxCountEdp, { params })
				.then(res => {
					// console.log(_block.level, response.data);
					block.trxCount = res.data;
					setBlockList(JSON.parse(JSON.stringify(blocks)));
					// setBlockList(blocks);
				});

		});
	};

	const handleRowNum = (e) => {
		setRowNum(e.value);
	}

	const handlePrevClick = () => {
		if (currentpage !== 0) {
			setPage(currentpage - 1);
		}
	};
	const handleNextClick = () => {
		if (currentpage !== lastPage - 1) {
			setPage(currentpage + 1);
		}
	};

	return (
		<div className="block-contents">
			<Select
				className="rowNum"
				value={data.find(obj => obj.value === rowNum)}
				options={data}
				onChange={handleRowNum}
			/>
			<div className="table-row header">
				<div className="table-col">
					<span className="col-info">Level</span>
				</div>
				<div className="table-col">
					<span className="col-info">Proposer</span>
				</div>
				<div className="table-col">
					<span className="col-info">Timestamp</span>
				</div>
				<div className="table-col">
					<span className="col-info"># Of TRX</span>
				</div>
			</div>
			{currentBlockRows?.map((block, i) => (
				<a className="table-row" href={`/blocks/${block.level}`} key={i} >
					<div className="table-col col-level">
						<span className="col-info">{block.level}</span>
					</div>
					<div className="table-col col-proposer">
						<span className="col-info">{block.proposer?.alias}</span>
						<br />
						<span className="col-info">{block.proposer?.address}</span>
					</div>
					<div className="table-col col-timestamp">
						<span className="col-info">{block.timestamp.replace('T', ' ').replace('Z', '')}</span>
					</div>
					<div className="table-col col-trxnum">
						<span className="col-info">{block.trxCount}</span>
					</div>
				</a>
			))}

			<div className="pagination-row">
				<div className="table-col col-prev-btn">
					<span>
						<a onClick={() => handlePrevClick()}>&larr; Prev</a>
					</span>
				</div>
				<div className="table-col col-page">
					<span>
						Page <strong>{currentpage + 1}&nbsp; </strong> of{" "}
						<strong>{lastPage}</strong>
					</span>
				</div>
				<div className="table-col col-next-btn">
					<span>
						<a onClick={() => handleNextClick()}>Next &rarr;</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default BlockTable;
