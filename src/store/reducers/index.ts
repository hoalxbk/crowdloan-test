import { combineReducers } from 'redux';
import {
  campaignsReducer,
  campaignCreateReducer,
  campaignDetailReducer,
  campaignICORegisterReducer,
  campaignAffiliateCreateReducer,
  campaignErc20RateSetReducer,
  campaignLatestReducer,
  campaignEditReducer,
  campaignStatusToggleReducer,
  campaignRefundTokensReducer,
  campaignProcessingReducer,
  campaignLatestActiveReducer
} from './campaign'
import { transactionCampaignReducer } from './transaction'
import { affiliateCampaignReducer, affiliateLinkGenerateReducer } from './affiliate'
import { getTokensReducer, createTokenReducer } from './token'
import { alertReducer } from './alert'
import userReducer, { userConnectReducer, userRegisterReducer, investorReducer, investorRegisterReducer, userProfileReducer, userProfileUpdateReducer } from './user';
import { buyTokenReducer, buyTokenPurchasableReducer } from './buy-token';
import {claimTokenReducer,claimTokenClaimableReducer, stakedTokensClaimReducer } from "./claim-token"
import { usdtAllowanceReducer } from './usdt-allowance';
import { usdtApproveReducer } from './usdt-approve';
import { settingDetailReducer } from './setting-detail';
import { settingFeeRateReducer } from './setting-fee-rate';
import { settingRevenueAddressReducer } from './setting-revenue-address';
import { settingDeactivateReducer } from './setting-deactivate';
import { settingOwnerReducer } from './setting-owner';
import { balanceReducer } from './balance';
import { usdtDetailReducer } from './usdt-detail';
import { appNetworkReducer, connectorReducer } from './appNetwork';
import { walletReducer } from './wallet';
import { 
  getTiersReducer,
  getUserTierReducer,
  depositReducer,
  withdrawReducer,
  getUserInfoReducer,
  withdrawFeeReducer,
  withdrawPercentReducer,
  ratesReducer
} from './sota-tiers'
import { getAllowanceReducer, approveReducer } from './sota-token';
import { messageReducer } from './message';

const rootReducer = combineReducers({
  user: userReducer,
  investor: investorReducer,
  investorRegister: investorRegisterReducer,
  userConnect: userConnectReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  campaigns: campaignsReducer,
  campaignProcessing: campaignProcessingReducer,
  campaignCreate: campaignCreateReducer,
  campaignEdit: campaignEditReducer,
  campaignDetail: campaignDetailReducer,
  campaignICORegister: campaignICORegisterReducer,
  campaignAffiliateCreate: campaignAffiliateCreateReducer,
  campaignErc20RateSet: campaignErc20RateSetReducer,
  campaignLatest: campaignLatestReducer,
  campaignLatestActive: campaignLatestActiveReducer,
  campaignStatusToggle: campaignStatusToggleReducer,
  campaignRefundTokens: campaignRefundTokensReducer,
  transactionCampaign: transactionCampaignReducer,
  affiliateCampaign: affiliateCampaignReducer,
  affiliateLinkGenerate: affiliateLinkGenerateReducer,
  buyToken: buyTokenReducer,
  buyTokenPurchasable: buyTokenPurchasableReducer,
  claimToken: claimTokenReducer,
  stakedToken: stakedTokensClaimReducer,
  usdtAllowance: usdtAllowanceReducer,
  usdtApprove: usdtApproveReducer,
  settingDetail: settingDetailReducer,
  settingFeeRate: settingFeeRateReducer,
  settingRevenueAddress: settingRevenueAddressReducer,
  settingOwner: settingOwnerReducer,
  settingDeactivate: settingDeactivateReducer,
  tokensByUser:  getTokensReducer,
  tokenCreateByUser: createTokenReducer,
  balance: balanceReducer,
  usdtDetail: usdtDetailReducer,
  alert: alertReducer,
  appNetwork: appNetworkReducer,
  connector: connectorReducer,
  wallet: walletReducer,
  tiers: getTiersReducer,
  userTier: getUserTierReducer,
  deposit: depositReducer,
  withdraw: withdrawReducer,
  userInfo: getUserInfoReducer,
  allowance: getAllowanceReducer,
  approve: approveReducer,
  withdrawFee: withdrawFeeReducer,
  withdrawPercent: withdrawPercentReducer,
  rates: ratesReducer,
  messages: messageReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
