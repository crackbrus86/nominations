import React from 'react';

import { useFlowForm } from './flow.form.context';

const DivisionSelector = () => {
	const { divisions, flow, onChangeFlow } = useFlowForm();

	const onSelectDivision = (e) => {
		onChangeFlow('divisionId', e.target.value);
	};

	return (
		<div className="mb-3">
			<label htmlFor="division" className="form-label">
				Дивізіон
			</label>
			<select
				className="form-control"
				id="division"
				value={flow.divisionId}
				onChange={(e) => onSelectDivision(e)}
			>
				{divisions.map((division) => (
					<option key={division.value} value={division.value}>
						{division.text}
					</option>
				))}
			</select>
		</div>
	);
};

export default DivisionSelector;
