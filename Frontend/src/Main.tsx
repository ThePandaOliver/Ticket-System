import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.less'
import {Layout} from "./Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TicketSite} from "./sites/ticket/TicketSite.tsx";
import {NoPage} from "./sites/NoPage.tsx";
import {TicketSelectionSite} from "./sites/ticket/TicketSelectionSite.tsx";
import {HomeSite} from "./sites/HomeSite.tsx";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
	  <BrowserRouter>
		  <Routes>
			  <Route path="/" element={<Layout />}>
				  <Route index element={<HomeSite />} />+
				  <Route path="/tickets" element={<TicketSelectionSite />} />
				  <Route path="/tickets/:ticketId" element={<TicketSite />} />
				  <Route path="*" element={<NoPage />} />
			  </Route>
		  </Routes>
	  </BrowserRouter>
  </StrictMode>,
)


export class Main {
	public static SITE_NAME = "Ticket System"

	public static makePageName(pageName: string) {
		return `${pageName} | ${this.SITE_NAME}`
	}
}