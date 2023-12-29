import { useState, Fragment, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import './referee.busy.scss';

const RefereeBusy = ({ eventId, team, firstName, surname, middleName }) => {
	const [loading, setLoading] = useState(false);
	const [showBusy, setShowBusy] = useState(false);
	const [pending, setPending] = useState(false);
	const [days, setDays] = useState([]);
	const [flows, setFlows] = useState([]);
	const flowsApiUrl = '../wp-content/plugins/nominations/api/flows';

	const refereeId = `${surname.toLowerCase()}/${firstName.toLowerCase()}/${middleName.toLowerCase()}/${team}`;

	const onInitRefereeBusy = async () => {
		setLoading(true);
		await loadRefereeBusy();
		setLoading(false);
	};

	const loadRefereeBusy = async () => {
		const response = await fetch(
			`${flowsApiUrl}/GetRefereeUnavailabilitySchedule?` +
				new URLSearchParams(
					{
						eventId,
						referee: refereeId,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
		);
		const result = await response.json();
		const availableDays = result.data.days.filter(
			(x) => !!result.data.flows.find((f) => f.day_of_flow === x)
		);
		setDays(availableDays);
		setFlows(result.data.flows);
	};

	const updateRefereeStatus = async (flowId, value) => {
		if(pending) return;
		setPending(true);
		const request = {
			flowId,
			refereeId,
			refereeStatus: value,
		};
		await fetch(`${flowsApiUrl}/SaveRefereeRecord`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		});
		setPending(false);
	};

	useEffect(() => {
		if (showBusy) onInitRefereeBusy();
	}, [showBusy]);

	const handleStatusCheckbox = async (flowId, value) => {
		await updateRefereeStatus(flowId, value);
		await loadRefereeBusy();
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

	const showBusyTable =
		showBusy && !loading && !!days.length && !!flows.length;
	const noFlows = showBusy && !loading && (!days.length || !flows.length);

	return (
		<Fragment>
			<div
				id="show-busy-switch"
				className={classNames({
					disabled: !firstName || !surname || !middleName,
				})}
			>
				<input
					type="checkbox"
					id="showBusySwitch"
					checked={showBusy}
					disabled={!firstName || !surname || !middleName}
					onClick={() => setShowBusy(!showBusy)}
				/>
				<label for="showBusySwitch">Показати графік зайнятості</label>
			</div>
			{loading && (
				<div id="referee-busy-preloader">
					Зачекайте. Йде завантаження...
				</div>
			)}
			{noFlows && (
				<div>На даний момент ці змагання не розбиті на потоки</div>
			)}
			{showBusyTable && (
				<div id="referee-busy">
					<table className={classNames({ loading: pending })}>
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
											onClick={() =>
												handleStatusCheckbox(
													flow.flow_id,
													flow.busy ? 1000 : 0
												)
											}
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
