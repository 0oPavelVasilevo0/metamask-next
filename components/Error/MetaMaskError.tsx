'use client'
import { Box, Typography } from '@mui/material'
import { useMetaMask } from '../../hooks/useMetaMask'
// import styles from './MetaMaskError.module.css'

export const MetaMaskError = () => {

    const { error, errorMessage, clearError } = useMetaMask()

    return (

        // <div className={styles.metaMaskError} style={
        //     error ? { backgroundColor: 'brown' } : {}
        // }>
        <>
            {error &&
                (
                    <Box sx={{
                        p: 2,
                        borderRadius: '0 0 6px 6px',
                        background: 'red'
                    }}
                        onClick={clearError}>
                        <Typography color={'white'} fontSize={16}>
                            <strong>Error:</strong> User rejected the request{errorMessage}
                        </Typography>
                    </Box>
                )
            }
        </>
        // </div>
    )
}