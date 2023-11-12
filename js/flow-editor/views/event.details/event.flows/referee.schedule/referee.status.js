import classNames from 'classnames';

import RefereeStatusSelector from './referee.status.selector';
import { REF_STATUS_BUSY, REF_STATUS_NA, REF_STATUS_RESERVED } from './utils';

const RefereeStatus = ({ status, onChange }) => {
	return (
		<td
			className={classNames('referee-cell', {
				busy: status == REF_STATUS_BUSY,
				engaged:
					status != null &&
					status != REF_STATUS_BUSY &&
					!REF_STATUS_RESERVED.includes(status) &&
					status != REF_STATUS_NA,
				reserved: REF_STATUS_RESERVED.includes(status),
			})}
		>
			<div className="referee-status">
				{status !== null ? (
					<RefereeStatusSelector
						status={status}
						onChange={onChange}
					/>
				) : null}
			</div>
		</td>
	);
};

export default RefereeStatus;
