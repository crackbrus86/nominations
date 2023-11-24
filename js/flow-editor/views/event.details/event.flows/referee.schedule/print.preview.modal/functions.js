import * as divisionsJson from '../../../../../../divisions.json';
import * as refStatusesJson from '../../../refStatuses.json';

const printArea = 'referee-schedule-display';

export const onExportToWord = () => {
	let fileName = 'referee-schedule-document';

	const preHtml =
		"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>\
        <head>\
            <meta charset='utf-8'>\
            <title>Export HTML To Doc</title>\
        </head>\
    <body>";
	const postHtml = '</body></html>';
	const html =
		preHtml + document.getElementById(printArea).innerHTML + postHtml;

	const blob = new Blob(['\ufeff', html], {
		type: 'application/msword',
	});

	const url =
		'data:application/vnd.ms-word;charset=utf-8,' +
		encodeURIComponent(html);

	fileName = fileName + '.doc';

	const downloadLink = document.createElement('a');
	document.body.appendChild(downloadLink);

	if (navigator.msSaveOrOpenBlob) {
		navigator.msSaveOrOpenBlob(blob, fileName);
	} else {
		downloadLink.href = url;
		downloadLink.download = fileName;
		downloadLink.click();
	}
	document.body.removeChild(downloadLink);
};

export const onPrint = () => {
	const printContent = document.getElementById(printArea).innerHTML;
	const winPrint = window.open(
		'',
		'',
		'left=0, top=0, width=800, height=900, toolbar=0, scrollbars=0, status=0'
	);
	winPrint.document.write(printContent);
	winPrint.document.close();
	winPrint.focus();
	winPrint.print();
	setTimeout(() => {
		winPrint.close();
	}, 1000);
};

export const formatFlowInfo = (flowInfo) => {
	return flowInfo
		.map((info) => {
			const partitions = info.split(' (');
			const divisionShortName = partitions[0].trim();
			const division = divisionsJson.divisions.find(
				(d) => d.flowShortTitle == divisionShortName
			);
			const divisionLongName =
				division != null ? division.title : divisionShortName;
			return `${divisionLongName} (${partitions[1]}`;
		})
		.join(' + ');
};

export const formatRefereeFullName = (refereeId, referees) => {
	const referee = referees.find((r) => r.id == refereeId);
	return !referee
		? '[Невідомий]'
		: `${referee.surname} ${referee.firstName[0]}.${referee.middleName[0]}.`;
};

export const formatRefereeStatus = (statusId) => {
	const status = refStatusesJson.statuses.find((s) => s.value == statusId);
	return !status ? '[Невідомий]' : status.name;
};

export const formatRefereeCategory = (refereeId, referees) => {
	const referee = referees.find((r) => r.id == refereeId);
	return !referee ? '[Невідома]' : referee.refCategoryName;
};
