import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import './styles/MobileDrawer.css'

export default function MobileDrawer() {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 290 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="drawer-mobile-container">
                <div className="drawer-mobile-top">
                    <div className="drawer-mobile-top-button">
                        <span className="material-icons">clear</span>
                    </div>
                    <div className="drawer-mobile-top-options">
                        <div className="drawer-mobile-top-options-item">LOGIN</div>
                        <div className="drawer-mobile-top-options-item">MY ACCOUNT</div>
                        <div className="drawer-mobile-top-options-item">MY ORDERS</div>
                    </div>
                </div>
                <div className="drawer-mobile-bottom">
                    <div className="drawer-mobile-bottom-title">Edu's Coffee</div>
                    <div className="drawer-mobile-bottom-options">
                        <div className="drawer-mobile-bottom-options-item">
                            <div className="drawer-mobile-bottom-options-icon">
                                <img src={whatsapp_icon} alt="" />
                            </div>
                            <div className="drawer-mobile-bottom-options-info">55 48 90000 0000</div>
                        </div>
                        <div className="drawer-mobile-bottom-options-item">
                            <div className="drawer-mobile-bottom-options-icon">
                                <span className="material-icons">call</span>
                            </div>
                            <div className="drawer-mobile-bottom-options-info">55 48 90000 0000</div>
                        </div>
                        <div className="drawer-mobile-bottom-options-item">
                            <div className="drawer-mobile-bottom-options-icon">
                                <span className="material-icons">mail_outline</span>
                            </div>
                            <div className="drawer-mobile-bottom-options-info">help@mail.com</div>
                        </div>
                        <div className="drawer-mobile-bottom-options-item">
                            <div className="drawer-mobile-bottom-options-icon">
                                <span className="material-icons">local_see</span>
                            </div>
                            <div className="drawer-mobile-bottom-options-info">@instagram</div>
                        </div>
                        <div className="drawer-mobile-bottom-options-item">
                            <div className="drawer-mobile-bottom-options-icon">
                                <span className="material-icons">location_on</span>
                            </div>
                            <div className="drawer-mobile-bottom-options-info">Rodovia José Carlos Daux, 4150, São Paulo - SP</div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );

  return (
        <div className="drawer-mobile-main-container">
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)} className="drawer-mobile-main-container-button">
                    <span className="material-icons">menu</span>
                </Button>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
