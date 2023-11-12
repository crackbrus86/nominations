import * as divisionsJson from '../../../../../divisions.json';
import * as weightClassesJson from '../../../../../weightClasses.json';
import * as refCategoriesJson from '../../refCategories.json';

const divisions = divisionsJson.divisions;
const weightClasses = weightClassesJson.weightClasses;

const getDivision = (divisionId) => {
	return divisions.find((d) => d.id == divisionId);
};

const getDivisionWeightClasses = (divisionId) => {
	const division = getDivision(divisionId);
	return weightClasses.filter(
		(wc) =>
			wc.division == division.weightClassDivision &&
			wc.gender == division.gender &&
			!wc.hide
	);
};

const getDivisionTitle = (divisionId) => {
	const division = getDivision(divisionId);
	return !!division ? division.flowShortTitle : divisionId;
};

const getWeightClassTitle = (weightClassId) => {
	const weightClass = weightClasses.find((wc) => wc.id == weightClassId);
	return !!weightClass
		? weightClass.name.replace('-', '').replace('kg', '')
		: weightClassId;
};

const groupWeightClassesByDivision = (weightClasses) => {
	return weightClasses.reduce((groups, weightClass) => {
		if (
			!groups.find((group) => group.divisionId == weightClass.divisionId)
		) {
			groups.push({
				divisionId: weightClass.divisionId,
				weightClassIds: [].concat(weightClass.weightClassId),
			});
		} else {
			const groupIndex = groups.findIndex(
				(group) => group.divisionId == weightClass.divisionId
			);
			groups[groupIndex].weightClassIds.push(weightClass.weightClassId);
		}
		return groups;
	}, []);
};

const turnToNumber = (val) => {
	return val.indexOf('+') >= 0 ? val.replace('+', '') + 1 : val;
};

const joinWeightClassTitles = (weightClassIds) => {
	return weightClassIds
		.map((wcId) => getWeightClassTitle(wcId))
		.sort((a, b) => turnToNumber(a) - turnToNumber(b))
		.join(', ');
};

const displayWeightClassIds = (divisionId, weightClassIds) => {
	const divisionWeightClasses = getDivisionWeightClasses(divisionId);
	return weightClassIds.length == divisionWeightClasses.length
		? ''
		: ` (${joinWeightClassTitles(weightClassIds)})`;
};

export const getFlowInfo = (weightClasses) => {
	const groupedWeightClasses = groupWeightClassesByDivision(weightClasses);
	return groupedWeightClasses.map(
		(gwc) =>
			`${getDivisionTitle(gwc.divisionId)}${displayWeightClassIds(
				gwc.divisionId,
				gwc.weightClassIds
			)}`
	);
};

export const getFlowsOfDay = (flows, day) => {
	return flows.filter(
		(flow) =>
			flow.dayOfFlow.setHours(0, 0, 0, 0) == day.setHours(0, 0, 0, 0)
	);
};

export const getRefereeStatus = (flow, referee) => {
	if (!flow) return null;
	const refereeRecord = flow.referees.find((r) => r.refereeId == referee.id);
	return !!refereeRecord ? refereeRecord.refereeStatus : REF_STATUS_NA;
};

export const REF_STATUS_NA = 1000;
export const REF_STATUS_BUSY = 0;
export const REF_STATUS_RESERVED = ['9', '10'];

export const mapReferee = (refereeResult) => {
	const category = refCategoriesJson.refCategories.find(
		(refCat) => refCat.value == refereeResult.ref_category
	);
	return {
		id: refereeResult.id,
		surname: refereeResult.surname,
		firstName: refereeResult.first_name,
		middleName: refereeResult.middle_name,
		team: refereeResult.team,
		refCategoryId: !!category ? category.id : 10,
		refCategory: refereeResult.ref_category,
		refCategoryName: !!category
			? category.text
			: refereeResult.ref_category,
		refRemark: refereeResult.ref_remark,
	};
};

export const mapFlow = (flowResult) => {
	const flowWeightClasses = flowResult.weight_classes.map((wc) => ({
		divisionId: wc.division_id,
		weightClassId: wc.weight_class_id,
	}));
	const refereeRecords = flowResult.referees.map((ref) => ({
		refereeId: ref.referee_id,
		refereeStatus: ref.referee_status,
	}));
	return {
		flowId: flowResult.flow_id,
		dayOfFlow: new Date(flowResult.day_of_flow),
		sortOrder: flowResult.sort_order,
		info: getFlowInfo(flowWeightClasses),
		weightClasses: flowWeightClasses,
		referees: refereeRecords,
	};
};
