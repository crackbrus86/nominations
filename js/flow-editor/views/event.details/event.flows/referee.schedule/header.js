import EventDays from './event.days';
import EventFlows from './event.flows';

const Header = () => {
	return (
		<thead>
			<tr>
				<th rowSpan={2} colSpan={2}></th>
				<EventDays />
			</tr>
			<EventFlows />
		</thead>
	);
};

export default Header;
