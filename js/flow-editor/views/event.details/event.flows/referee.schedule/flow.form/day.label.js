import moment from 'moment';

import { useFlowForm } from './flow.form.context';

const DayLabel = () => {
	const { flow } = useFlowForm();

	return (
		<div className="mb-3">
			<label className="form-label">
				День: {moment(flow.dayOfFlow).format('ll')}
			</label>
		</div>
	);
};

export default DayLabel;
