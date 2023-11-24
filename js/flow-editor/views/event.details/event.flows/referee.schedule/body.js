import { useRefereeSchedule } from './referee.schedule.context';
import RefereeTitle from './referee.title';
import RefereeStatus from './referee.status';
import { getRefereeStatus } from './utils';

const Body = () => {
	const { referees, flowsByDay, onChangeRefereeStatus } =
		useRefereeSchedule();

	return (
		<tbody>
			{referees.map((referee) => (
				<tr key={referee.id}>
					<RefereeTitle referee={referee} />
					{flowsByDay.map((flow, index) => {
						const status = getRefereeStatus(flow, referee);
						return (
							<RefereeStatus
								key={index}
								status={status}
								onChange={(statusValue) =>
									onChangeRefereeStatus(
										flow.flowId,
										referee.id,
										statusValue
									)
								}
							/>
						);
					})}
				</tr>
			))}
		</tbody>
	);
};

export default Body;
