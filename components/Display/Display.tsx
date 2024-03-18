// 'use client'

// import { useMetaMask } from '../../hooks/useMetaMask'
// import { formatChainAsNum } from '../../utils'
// import styles from './Display.module.css'

// export const Display = () => {

//   const { wallet } = useMetaMask()

//   return (
//     <div className={styles.display_container}>
//       <div className={styles.display}>
//         {wallet.accounts.length > 0 &&
//           <>
//             <div>
//               Wallet Accounts:
//               <div className='accounts'>
//                 {wallet.accounts[0]}
//               </div>
//             </div>
//             <div>
//               Wallet Balance:
//               <div className='balance'>
//                 {wallet.balance}
//               </div>
//             </div>
//             <div>Hex ChainId: {wallet.chainId}</div>
//             <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
//           </>
//         }
//       </div>
//     </div>
//   )
// }

'use client'

import { useMetaMask } from '../../hooks/useMetaMask'
import { formatChainAsNum } from '../../utils'
import styles from './Display.module.css'

export const Display = () => {

  const { wallet } = useMetaMask()

  return (
    <div className={styles.display_container}>
      <div className={styles.display}>
        {wallet.accounts.length > 0 &&
          <>
            <div className={styles.accounts_container}>
              <div className={styles.wallet}>
               Wallet Accounts:
               </div>
              <div className='accounts'>
                {wallet.accounts[0]}
              </div>
            </div>
            <div>
              Ethereum Balance:
              <div className='balance'>
                {wallet.ethBalance}
              </div>
            </div>
            <div>
              BNB Balance:
              <div className='balance'>
                {wallet.bscBalance}
              </div>
            </div>
            <div>Ethereum Hex ChainId: {wallet.ethChainId}</div>
            <div>Ethereum Numeric ChainId: {formatChainAsNum(wallet.ethChainId)}</div>
            <div>BNB Hex ChainId: {wallet.bscChainId}</div>
            <div>BNB Numeric ChainId: {formatChainAsNum(wallet.bscChainId)}</div>
          </>
        }
      </div>
    </div>
  )
}