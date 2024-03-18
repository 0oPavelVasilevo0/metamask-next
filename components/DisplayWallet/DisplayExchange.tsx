'use client'
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import SelectMoney from '../Select/SelectMoney';
import { RiExchangeLine } from 'react-icons/ri';
import MoneyButtons from '../Buttons/MoneyButtons';

export default function DisplayExchange() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
      <Box sx={{
          display: isSmallScreen ? 'flex' : 'grid',
          flexDirection: isSmallScreen ? 'column' : undefined,
          gridTemplateColumns: isSmallScreen ? undefined : '34ch 8ch 34ch',
          justifyContent: isSmallScreen ? 'flex-start' : 'space-between',
      }}
      >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <MoneyButtons />
              <SelectMoney />
              <Button sx={{ m: 2, width: '100px' }} variant='outlined'>Exchenge</Button>
          </Box>
          <Box sx={{ m: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignContent: 'center' }}>
              <RiExchangeLine style={{ width: '68', height: 'auto' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <MoneyButtons />
              <SelectMoney />
          </Box>
      </Box>
  )
}
