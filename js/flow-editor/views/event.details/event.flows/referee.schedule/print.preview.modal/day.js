import Flow from './flow';

const Day = ({ day }) => {
	return (
		<div className="mt-3">
			<h3 className="text-center">{day.displayName}</h3>
			<div>
				{day.flows.map((flow) => (
					<Flow key={flow.flowId} flow={flow} />
				))}
			</div>
		</div>
	);
};

export default Day;
