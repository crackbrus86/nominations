import React from 'react';

const RefereeTitle = ({ referee }) => {
	return (
		<React.Fragment>
			<td className="referee-schedule-item">
				{`${referee.surname} ${referee.firstName} ${referee.middleName} (${referee.regionShortName})`}
				{referee.refRemark && (
					<i
						className="fa fa-info-circle ms-2"
						title={referee.refRemark}
						style={{ cursor: 'pointer', color: '#003def' }}
					></i>
				)}
			</td>
			<td className="referee-schedule-category">
				{referee.refCategoryName}
			</td>
		</React.Fragment>
	);
};

export default RefereeTitle;
