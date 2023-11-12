import classNames from 'classnames';

const PrintButton = ({ label, type, onClick }) => {
	const getIcon = () => {
		switch (type) {
			case 'print':
				return 'fa-print';
			case 'export-word':
				return 'fa-file-word-o';
			default:
				return null;
		}
	};
	let icon = getIcon();

	return (
		<button type="button" className="btn btn-primary" onClick={onClick}>
			{icon != null && <i className={classNames('fa', icon, 'me-2')}></i>}
			{label}
		</button>
	);
};
export default PrintButton;