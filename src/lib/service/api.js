import axios, { AxiosRequestConfig, Method } from 'axios';
import { Config } from '../system';

/**
 * Get User claims from their tzprofile
 */
 const GetUserClaims = async (walletAddr) => {
  return await axios.post('https://indexer.tzprofiles.com/v1/graphql', {
    query: `query MyQuery { tzprofiles_by_pk(account: \"${walletAddr}\") { valid_claims } }`,
    variables: null,
    operationName: 'MyQuery',
  })
}

/**
 * Get User Metadata
 */
export const GetUserMetadata = async (walletAddr) => {
  let tzktData = await axios.get(
    `https://api.tzkt.io/v1/accounts/${walletAddr}/metadata`
  )

  let tzpData = {}
  try {
    let claims = await GetUserClaims(walletAddr)
    if (claims.data.data.tzprofiles_by_pk !== null)
      for (const claim of claims.data.data.tzprofiles_by_pk.valid_claims) {
        let claimJSON = JSON.parse(claim[1])
        if (claimJSON.type.includes('TwitterVerification')) {
          if (!tzktData.data || !tzktData.data.twitter ) {
            tzpData['twitter'] = claimJSON.evidence.handle
          }
        } else if (claimJSON.type.includes('BasicProfile')) {
          if (claimJSON.credentialSubject.alias !== "" && !(tzktData.data && tzktData.data.alias))
            tzpData['alias'] = claimJSON.credentialSubject.alias
          tzpData['tzprofile'] = walletAddr
        }
      }
  } catch (e) {
    console.error(e, e.stack);
  }

  if (tzktData.data !== '') {
    tzktData.data = { ...tzpData, ...tzktData.data }
  } else if (tzpData) {
    tzktData.data = tzpData
  }
  return tzktData
}