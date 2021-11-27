/* eslint-disable */
import networkConfig from '../config/networkConfig'

const rightNetworks = networkConfig.rightNetworks

export const getAccount = () =>
  new Promise(async resolve => {
    await web3.eth.getAccounts((err, accounts) => {
      if (err) {
        resolve(false)
      } else {
        resolve(accounts[0])
      }
    })
  })

export const getNetwork = async () => {
  return new Promise(async resolve => {
    const networkId = window.web3.eth.currentProvider.isMetaMask? window.web3.eth.currentProvider.networkVersion : window.web3.eth.currentProvider.networkId
    if (!networkId) {
      setTimeout(() => {
        return resolve(getNetwork())
      }, 2000)
    } else {
      return resolve(networkId)
    }
  })
}

export const getNetworkOldVersion = async () =>
  new Promise(resolve => {
    if (web3.version.getNetwork) {
      web3.version.getNetwork((err, chainId) => {
        if (!err) {
          resolve(chainId)
        } else {
          resolve(false)
        }
      })
    } else {
      web3.eth.getChainId((err, chainId) => {
        if (!err) {
          resolve(chainId)
        } else {
          resolve(false)
        }
      })
    }
  })

export const enableAccount = async () => {
  let account = null
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    account = accounts[0]
  } catch (error) {
    console.log('error on connecting account', error)
  }
  return account
}

export const isRightNetwork = (networkId) => {
  return rightNetworks.includes(parseInt(networkId))
}
