import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useMetaMask } from '@/hooks/useMetaMask';
import { formatAddress } from '@/utils';

export default function PopoverWallet() {
    const { wallet } = useMetaMask()
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState: any) => (
                <div>
                    <Button variant="contained" color='info' {...bindTrigger(popupState)}>
                        Metamask Wallet
                    </Button>
                    <Popover sx={{ textAlign: 'end' }}
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{wallet.accounts[0]}</Typography>
                        {/* <Button variant="outlined"> */}
                        <Typography sx={{ p: 2 }}>
                            <a
                                // className="text_link"
                                href={`https://etherscan.io/address/${wallet}`}
                                target="_blank"
                                data-tooltip="Open in Block Explorer" rel="noreferrer"
                            >
                                {/* {formatAddress(wallet.accounts[0])} */}
                                Go to etherscan
                            </a>
                        </Typography>
                        {/* </Button> */}
                        <Typography sx={{ p: 2 }}>ETH: {wallet.ethBalance}</Typography>
                        <Typography sx={{ p: 2 }}>BTC: {wallet.bscBalance}</Typography>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}