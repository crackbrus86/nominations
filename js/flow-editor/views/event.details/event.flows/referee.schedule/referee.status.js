import classNames from 'classnames';

import RefereeStatusSelector from './referee.status.selector';
import { REF_STATUS_BUSY, REF_STATUS_NA, REF_STATUS_RESERVED } from './utils';

const RefereeStatus = ({ status, onChange }) => {
	const statusValue = !!status ? status.status : null;
	return (
		<td
			className={classNames('referee-cell', {
				busy: statusValue == REF_STATUS_BUSY,
				engaged:
					statusValue != null &&
					statusValue != REF_STATUS_BUSY &&
					!REF_STATUS_RESERVED.includes(statusValue) &&
					statusValue != REF_STATUS_NA,
				reserved: REF_STATUS_RESERVED.includes(statusValue),
			}, { 'refereeBusy': statusValue == REF_STATUS_BUSY && status.source == 'referee' })}
		>
			<div className="referee-status">
				{statusValue !== null ? (
					<RefereeStatusSelector
						status={statusValue}
						onChange={onChange}
					/>
				) : null}
			</div>
		</td>
	);
};

export default RefereeStatus;
