import { useState, Fragment, useEffect } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import './referee.busy.scss';

import { getFlowInfo } from '../../flow-editor/views/event.details/event.flows/referee.schedule/utils';

const RefereeBusy = ({ eventId, team, firstName, surname, middleName }) => {
	const refereeNameIsNotFull = !firstName || !surname || !middleName;
	const [loading, setLoading] = useState(false);
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
			`${flowsApiUrl}/GetRefereeUnavailabilitySchedule.php?` +
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
		const mappedFlows = result.data.flows
			.map((f) => ({
				...f,
				weightClasses: f.weight_classes.map((wc) => ({
					divisionId: wc.division_id,
					weightClassId: wc.weight_class_id,
				})),
			}))
			.map((f) => ({ ...f, info: getFlowInfo(f.weightClasses) }));
		console.log(mappedFlows);
		const nextFlows = mappedFlows.sort(
			(a, b) =>
				new Date(a.day_of_flow).getTime() -
				new Date(b.day_of_flow).getTime()
		);
		setFlows(nextFlows);
	};

	const updateRefereeStatus = async (flowId, value) => {
		if (pending) return;
		setPending(true);
		const request = {
			flowId,
			refereeId,
			refereeStatus: value,
		};
		await fetch(`${flowsApiUrl}/SaveRefereeRecord.php`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request),
		});
		setPending(false);
	};

	useEffect(() => {
		if (!refereeNameIsNotFull) onInitRefereeBusy();
	}, [firstName, surname, middleName]);

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
		const flowIndex =
			dayFlows.findIndex((f) => f.flow_id === flow.flow_id) + 1;
		return (
			<Fragment>
				<div className="flow-title">
					<div><b>{flowIndex} потік</b></div>
					<div>{flow.info.join(', ')}</div>
				</div>
			</Fragment>
		);
	};

	const showBusyTable = !!days.length && !!flows.length;
	const noFlows = !loading && (!days.length || !flows.length) && !refereeNameIsNotFull;

	return (
		<Fragment>
			<div>
				<p>
					<b>Вкажіть потоки які Ви НЕ ЗМОЖЕТЕ судити</b>
				</p>
			</div>
			{noFlows && (
				<div>На даний момент ці змагання не розбиті на потоки</div>
			)}
			{refereeNameIsNotFull && (
				<div>
					<p style={{ color: 'red' }}>
						<i>Спочатку вкажіть Прізвище, Ім'я та По-батькові</i>
					</p>
				</div>
			)}
			{showBusyTable && (
				<div id="referee-busy">
					{days.map((day, index) => {
						const flowsOfDay = getFlowsOfDay(day);
						return (
							<table
								className={classNames({
									loading: pending || loading,
									disabled: refereeNameIsNotFull,
								})}
							>
								<thead>
									<tr>
										<th colSpan={getColSpan(day)}>
											{moment(day).format('DD/MM/YY')}
										</th>
									</tr>
									<tr>
										{flowsOfDay.map((flow) => (
											<td key={flow.flow_id}>
												{getFlowTitle(flow)}
											</td>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										{flowsOfDay.map((flow) => (
											<td key={flow.flow_id}>
												<input
													type="checkbox"
													checked={flow.busy}
													onClick={() => {
														if (
															refereeNameIsNotFull
														)
															return;
														handleStatusCheckbox(
															flow.flow_id,
															flow.busy ? 1000 : 0
														);
													}}
												/>
											</td>
										))}
									</tr>
								</tbody>
							</table>
						);
					})}
				</div>
			)}
		</Fragment>
	);
};

export default RefereeBusy;
