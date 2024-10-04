import "./TicketOverviewPage.less"
import {Link} from "react-router-dom";
import Ticket, {TicketStatus} from "../../api/models/Ticket.ts";
import {useState} from "react";
import {ButtonBase, IconButton, InputBase, Paper, Stack, Typography} from "@mui/material";
import {Search} from "@mui/icons-material";

export default function TicketOverviewPage() {
	const [tickets, setTickets] = useState<Ticket[]>([
		{
			id: 1,
			title: "Ticket Test 1",
			status: TicketStatus.OPEN,
			messages: []
		},
		{
			id: 2,
			title: "Ticket Test 2",
			status: TicketStatus.CLOSED,
			messages: []
		},
		{
			id: 3,
			title: "Ticket Test 3",
			status: TicketStatus.OPEN,
			messages: []
		}
	]);

	const handleSearch = () => {

	}

	return (
		<Stack direction="row" sx={{margin: "20px", justifyContent: "center"}}>
			<Stack direction="column" gap="20px" sx={{width: "100%", maxWidth: "800px"}}>
				<Paper sx={{padding: "5px 10px"}}>
					<Stack direction="row" gap={2}>
						<InputBase placeholder="Search..." fullWidth />
						<IconButton onClick={handleSearch}>
							<Search />
						</IconButton>
					</Stack>
				</Paper>
				<Stack direction="column" gap="10px">
					{
						tickets.map(value => (<TicketEntry ticket={value} key={value.id} />))
					}
				</Stack>
			</Stack>
		</Stack>
	)
}

function TicketEntry({ticket}: {ticket: Ticket}) {
	return (
		<ButtonBase to={`/ticket/${ticket.id}`} component={Link}>
			<Paper sx={{width: "100%", padding: "20px"}} >
				<Stack direction="row">
					<Typography sx={{width: "100%"}} variant="h5">{ticket.title}</Typography>
					<Typography>{ticket.status}</Typography>
				</Stack>
			</Paper>
		</ButtonBase>
	)
}