const RefereeRecord = ({ referee }) => {
	return (
		<tr>
			<td width={200}>{referee.statusDisplayName}</td>
			<td className="text-uppercase" width={250}>
				{referee.refereeFullName}
			</td>
			<td width={100}>{referee.category}</td>
		</tr>
	);
};

export default RefereeRecord;
