import React from 'react';
import './tooltip.scss';

const Tooltip = ({ tooltip, position, onClose }) => {
	if (!tooltip) return null;

	return (
		<React.Fragment>
			<div
				style={{ top: position.pageY, left: position.pageX }}
				className="nom-tooltip"
                onClick={() => onClose()}
			>
				<div className="nom-tooltip__header">
					<i className="fa fa-times" onClick={() => onClose()}></i>
				</div>
				<div>{tooltip}</div>
                <div className='nom-tooltip__arrow'></div>
			</div>
		</React.Fragment>
	);
};

export default Tooltip;
