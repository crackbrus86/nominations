import FlowReferees from './flow.referees';

const Flow = ({ flow }) => {
	return (
		<div className="mb-2">
			<div className="container bg-primary-subtle">
				<table className="table">
					<tbody>
						<tr>
							<td width="25%">
								<strong>{flow.flowDisplayName}</strong>
							</td>
							<td width="*">
								<strong>{flow.flowDivisionsDisplayName}</strong>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<FlowReferees referees={flow.referees} />
		</div>
	);
};

export default Flow;