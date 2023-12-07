import { useState, Fragment } from 'react';
import moment from 'moment';

import './referee.busy.scss';

const RefereeBusy = ({ eventId, team, firstName, surname, middleName }) => {
	const [loading, setLoading] = useState(false);
	const [days, setDays] = useState([]);
	const [flows, setFlows] = useState([]);
	const flowsApiUrl = '../wp-content/plugins/nominations/api/flows';

	const loadRefereeBusy = async () => {
		setLoading(true);
		const response = await fetch(
			`${flowsApiUrl}/GetRefereeUnavailabilitySchedule?` +
				new URLSearchParams(
					{
						eventId,
						referee: `${surname.toLowerCase()}/${firstName.toLowerCase()}/${middleName.toLowerCase()}/${team}`,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
		);
		const result = await response.json();
		setDays(result.data.days);
		setFlows(result.data.flows);
		console.log(result.data);
		setLoading(false);
	};

	const getFlowsOfDay = (day) => {
		return flows.filter((flow) => flow.day_of_flow === day);
	};

	const getColSpan = (day) => {
		const dayFlows = getFlowsOfDay(day);
		return !!dayFlows ? dayFlows.length : 1;
	};

	const getFlowTitle = (flow) => {
		const dayFlows = getFlowsOfDay(flow.day_of_flow).sort(
			(a, b) => a.sort_order - b.sort_order
		);
		return dayFlows.findIndex((f) => f.flow_id === flow.flow_id) + 1;
	};

	const showBusyTable = !loading && !!days.length && !!flows.length;

	return (
		<Fragment>
			<button
				type="button"
				disabled={!firstName || !surname || !middleName}
				onClick={loadRefereeBusy}
			>
				Не можу судити
			</button>
			{loading && <div>Loading...</div>}
			{showBusyTable && (
				<div id="referee-busy">
					<table>
						<thead>
							<tr>
								{days.map((day, index) => (
									<th key={index} colSpan={getColSpan(day)}>
										{moment(day).format('DD/MM/YY')}
									</th>
								))}
							</tr>
							<tr>
								{flows.map((flow) => (
									<td key={flow.flow_id}>
										{getFlowTitle(flow)}
									</td>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{flows.map((flow) => (
									<td key={flow.flow_id}>
										<input
											type="checkbox"
											checked={flow.busy}
										/>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</Fragment>
	);
};

export default RefereeBusy;
