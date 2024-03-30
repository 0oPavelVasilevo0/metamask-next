'use client'
import { Box, Typography } from '@mui/material'
import { useMetaMask } from '../../hooks/useMetaMask'
// import styles from './MetaMaskError.module.css'

export const MetaMaskError = () => {

    const { error, errorMessage, hasProvider, wallet, clearError } = useMetaMask()

    return (

        // <div className={styles.metaMaskError} style={
        //     error ? { backgroundColor: 'brown' } : {}
        // }>
        <>
            {error &&
                (
                    <Box sx={{
                        m: 2,
                        mt: 0,
                        p: 2,
                        borderRadius: 1,
                        background: (hasProvider && wallet.accounts.length > 0) ? 'red' : 'none',
                    }}
                        onClick={clearError}>
                        <Typography color={(hasProvider && wallet.accounts.length > 0) ? 'white' : 'red'} textAlign={'center'} fontSize={16}>
                            <strong>Error:</strong> User rejected the request{errorMessage}
                        </Typography>
                    </Box>
                )
            }
        </>
        // </div>
    )
}

// export const MetaMaskError = () => {

//     const { error, errorMessage, clearError } = useMetaMask()

//     return (

//         <div className={styles.metaMaskError} style={
//             error ? { backgroundColor: 'brown' } : {}
//         }>
//             {error && (
//                 <div onClick={clearError}>
//                     <strong>Error:</strong> {errorMessage}
//                 </div>
//             )
//             }
//         </div>
//     )
// }