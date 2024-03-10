import { useState, useMemo } from 'react';

import './referee.busy.scss';

import * as divisionsJson from '../../divisions.json';
import * as weightClassesJson from '../../weightClasses.json';

const RefereeBusy = ({ competitionInfo, selectedWCBusy, onSelectWCBusy }) => {
	const [divisionId, setDivisionId] = useState(0);
	const divisions = [{ value: 0, text: '' }].concat(
		divisionsJson.divisions.map((d) => ({ value: d.id, text: d.flowTitle }))
	);

	const currentDivision = useMemo(() => {
		return divisionsJson.divisions.find((d) => d.id == divisionId);
	}, [divisionId]);

	const allWeightClasses = useMemo(() => {
		const isJuniorsCompetition = JSON.parse(competitionInfo.isJun);
		return weightClassesJson.weightClasses.filter((x) =>
			isJuniorsCompetition
				? x.division == 'subjuniors'
				: x.division == 'open'
		);
	}, [competitionInfo, weightClassesJson]);

	const weightClassOptions = useMemo(() => {
		return currentDivision
			? allWeightClasses.filter(
					(x) =>
						x.gender == currentDivision.gender &&
						!x.hide &&
						!selectedWCBusy.find(
							(w) =>
								w.weightClassId == x.id &&
								w.divisionId == currentDivision.id
						)
			  )
			: [];
	}, [currentDivision, allWeightClasses, selectedWCBusy]);

	const onSelectWeightClass = (v) => {
		const nextSelectedWClasses = selectedWCBusy.concat({
			weightClassId: v,
			divisionId: currentDivision.id,
		});
		onSelectWCBusy(nextSelectedWClasses);
	};

    const onUnSelectWeightClass = ({ weightClassId, divisionId }) => {
        const nextSelectedWClasses = selectedWCBusy.filter(x => x.divisionId != divisionId || x.weightClassId != weightClassId);
        onSelectWCBusy(nextSelectedWClasses);
    }

	const mappedSelectedWeightClasses = selectedWCBusy.map((x) => {
		const division = divisions.find((d) => d.value == x.divisionId);
		const weightClass = allWeightClasses.find(
			(w) => w.id == x.weightClassId
		);
		return {
			...x,
			wcName: weightClass ? weightClass.name : null,
			dName: division.text,
			sortOrder: weightClass.sortOrder
		};
	}).sort((a, b) => a.sortOrder - b.sortOrder);

	return (
		<div className="referee-busy">
			<div className='referee-busy__warning'>Вкажіть вагові категорії які Ви <strong>НЕ ЗМОЖЕТЕ</strong> судити</div>
			<table>
				<tbody>
					<tr>
						<td width={100}>
							<label>Дивізіон</label>
						</td>
						<td>
							<select
								value={divisionId}
								onChange={(v) => setDivisionId(v.target.value)}
							>
								{divisions.map((division) => (
									<option
										key={division.value}
										value={division.value}
									>
										{division.text}
									</option>
								))}
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<label>Вагова категорія</label>
						</td>
						<td>
							<select
								multiple
                                style={{ minWidth: 115 }}
								onChange={(v) =>
									onSelectWeightClass(v.target.value)
								}
							>
								{weightClassOptions.map((x) => (
									<option key={x.id} value={x.id}>
										{x.name}
									</option>
								))}
							</select>
						</td>
					</tr>
					<tr>
						<td colSpan={2} className='wc-selected'>
							{mappedSelectedWeightClasses.map((x) => (
								<span key={x.weightClassId + x.divisionId} className='wc-badge'>
									{x.dName}/{x.wcName}
                                    <i className='fa fa-times' onClick={() => onUnSelectWeightClass(x)}></i>
								</span>
							))}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default RefereeBusy;
