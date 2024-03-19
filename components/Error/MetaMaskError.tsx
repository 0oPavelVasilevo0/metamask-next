'use client'
import { Box } from '@mui/material'
import { useMetaMask } from '../../hooks/useMetaMask'
// import styles from './MetaMaskError.module.css'

export const MetaMaskError = () => {

    const { error, errorMessage, clearError } = useMetaMask()

    return (

        // <div className={styles.metaMaskError} style={
        //     error ? { backgroundColor: 'brown' } : {}
        // }>
        <>
            {/* {error &&
                ( */}
                    {/* <Box sx={{m: 2}} onClick={clearError}> */}
                <Box sx={{ m: 2 }} onClick={clearError}>
                        <strong>Error:</strong> {errorMessage}
                    </Box>
                {/* )
            } */}
        </>
        // </div>
    )
}