import {Fragment, StrictMode} from "react"
import { createRoot } from "react-dom/client"
import "./index.less"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TicketOverviewPage from "./pages/ticketOverview/TicketOverviewPage.tsx";
import Layout from "./Layout.tsx";
import TicketPage from "./pages/ticket/TicketPage.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme( {
	colorSchemes: {
		dark: {
			palette: {
			}
		}
	},
	components: {
		MuiPaper: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				rounded: {
					borderRadius: "5px",
				}
			}
		},

		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: "white"
				}
			}
		}
	}
})

root.render(
  <StrictMode>
	  <ThemeProvider theme={theme}>
		  <CssBaseline />
		  <BrowserRouter>
			  <Routes>
				  <Route path="/" element={<Layout />}>
					  <Route index element={<Fragment />} />
					  <Route path="/ticket" element={<TicketOverviewPage />} />
					  <Route path="/ticket/:id" element={<TicketPage />} />
				  </Route>
			  </Routes>
		  </BrowserRouter>
	  </ThemeProvider>
  </StrictMode>
)


export class Main {
	public static SITE_NAME = "Ticket System"

	public static makePageName(pageName: string) {
		return `${pageName} | ${this.SITE_NAME}`
	}
}