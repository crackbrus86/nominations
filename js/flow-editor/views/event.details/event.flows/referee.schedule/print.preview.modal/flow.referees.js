import RefereeRecord from './referee.record';

const FlowReferees = ({ referees }) => {
	return (
		<div className="container">
			<table className="table">
				<tbody>
					{referees.map((referee) => (
						<RefereeRecord
							key={referee.refereeId}
							referee={referee}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default FlowReferees;
