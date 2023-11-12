import './breadcrumbs.scss';
import React from 'react';

import { useFlows } from '../../flows.context';

const BreadCrumbs = () => {
	const { onCloseEvent } = useFlows();

	const onBack = (e) => {
		e.preventDefault();
		onCloseEvent();
	};

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb event-flows-breadcrumbs">
				<li className="breadcrumb-item">
					<a href="#" onClick={onBack}>
						Змагання
					</a>
				</li>
				<li className="breadcrumb-item active" aria-current="page">
					Потоки
				</li>
			</ol>
		</nav>
	);
};

export default BreadCrumbs;
