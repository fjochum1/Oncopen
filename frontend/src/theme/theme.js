import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { PanelContainerComponent } from './additions/layout/PanelContainer';

// import { mode } from "@chakra-ui/theme-tools";
const theme = extendTheme(
	{
		colors: {
			brand: {
				500: "#1DB954"
			},
		},
		components: {
			Checkbox: {
				baseStyle: {
					control: {
						iconColor: "rgba(99, 135, 118, 0.8)",
						_checked: {
							bg: "rgba(99, 135, 118, 0.8)",
							borderColor: "rgba(99, 135, 118, 0.8)",
							color: "white",
							_active: {
								bg: "rgba(99, 135, 118, 0.8)",
								borderColor: "rgba(99, 135, 118, 0.8)",
							}
						}
					}
			},
			},
			Radio: {
				baseStyle: {
					control: {
						borderColor: "rgba(99, 135, 118, 0.8)",
						//_hover: {
						//	borderColor: "rgba(99, 135, 118, 0.8)",
						//	color: "rgba(99, 135, 118, 0.8)",
						//	bg: "rgba(99, 135, 118, 0.8)"
						//},
						_focus: {
							borderColor: "rgba(99, 135, 118, 0.8)",
						},
						_checked: {
							//color: "white",
							bg: "rgba(99, 135, 118, 0.8)",
							borderColor: "rgba(99, 135, 118, 0.8)",
							_active: {
								bg: "rgba(99, 135, 118, 0.8)",
								borderColor: "rgba(99, 135, 118, 0.8)",
							}
						}
					}
				}
			}
		},
	},
	{ breakpoints }, // Breakpoints
	globalStyles,
	buttonStyles, // Button styles
	badgeStyles, // Badge styles
	linkStyles, // Link styles
	drawerStyles, // Sidebar variant for Chakra's drawer
	CardComponent, // Card component
	CardBodyComponent, // Card Body component
	CardHeaderComponent, // Card Header component
	MainPanelComponent, // Main Panel component
	PanelContentComponent, // Panel Content component
	PanelContainerComponent // Panel Container component
);
export default theme;
