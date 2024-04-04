'use client'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { IThemeContext, IThemeMode } from '../theme/types';
import { MdAutoMode } from 'react-icons/md';
import { BsEmojiSunglasses, BsEmojiSunglassesFill } from 'react-icons/bs';
import { FaRegLightbulb } from 'react-icons/fa';


export default function ToggleColorModeButton() {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const { themeMode, switchThemeMode } = useContext(ThemeContext) as IThemeContext
    const handleOpen = () => {
        setOpenMenu(true);
    }
    const handleClose = () => {
        setOpenMenu(false);
    }

    const handleSwitchTheme = (mode: IThemeMode) => {
        switchThemeMode(mode)
        handleClose
    }

    return (
        <>
            <Tooltip title='theme mode' arrow>
                <IconButton
                    onClick={handleOpen}
                    aria-label="fingerprint"
                    ref={buttonRef}
                    size='small'
                    color='primary'
                >
                    {themeMode === IThemeMode.LIGHT ? <BsEmojiSunglasses /> : themeMode === IThemeMode.DARK ? <FaRegLightbulb /> : <MdAutoMode />}
                </IconButton >
            </Tooltip>
            <Menu
                open={openMenu}
                anchorEl={buttonRef.current}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Tooltip title='light' placement="left" arrow>
                    <MenuItem
                        onClick={() => { handleSwitchTheme(IThemeMode.LIGHT) }}
                        selected={themeMode === IThemeMode.LIGHT}
                    >
                        < BsEmojiSunglasses />
                    </MenuItem >
                </Tooltip>
                <Tooltip title='dark' placement="left" arrow>
                    <MenuItem
                        onClick={() => { handleSwitchTheme(IThemeMode.DARK) }}
                        selected={themeMode === IThemeMode.DARK}
                    >
                        <FaRegLightbulb />
                    </MenuItem >
                </Tooltip>
                <Tooltip title='auto' placement="left" arrow>
                    <MenuItem
                        onClick={() => { handleSwitchTheme(IThemeMode.SYSTEM) }}
                        selected={themeMode === IThemeMode.SYSTEM}
                    >
                        <MdAutoMode />
                    </MenuItem >
                </Tooltip>
            </Menu >
        </>
    )
}
