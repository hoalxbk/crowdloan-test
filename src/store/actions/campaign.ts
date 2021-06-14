import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import BigNumber from 'bignumber.js';

import { convertDateTimeToUnix, convertUnixTimeToDateTime } from '../../utils/convertDate';
import { campaignActions } from '../constants/campaign';
import { alertActions } from '../constants/alert';
import { BaseRequest } from '../../request/Request';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import campaignABI from '../../abi/Campaign.json';
import erc20ABI from '../../abi/Erc20.json';
import ethLinkABI from '../../abi/Ethlink.json';
import { getContractInstance, getWeb3Instance } from '../../services/web3';
import { getAffiliateByCampaign } from './affiliate';
import { isReferral, isOwnerOfReferral } from '../../utils/affiliateCampaign';
import { getDigitsAfterDecimals } from '../../utils/formatNumber';
import { TokenType } from '../../utils/token';
import {adminRoute} from "../../utils";
const queryString = require('query-string');
const ETH_LINK_DEFAULT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_ETHLINK_ADDRESS || "";
const USDT_LINK_DEFAULT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_USDT_ADDRESS || "";

type campaignCreateProps = {
  title: string;
  token: string;
  startTime: Date;
  finishTime: Date;
  releaseTime: Date;
  addressReceiver: string;
  affiliate: string;
  tokenByETH: string;
  tokenInfo: TokenType | null
}

type campaignAffiliateCreateProps = {
  name: string;
  commission: number;
}

export const getCampaigns = (currentPage: number = 1, query: string = '', startTime: string, finishTime: string, filter: boolean = false) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    const baseRequest = new BaseRequest();
    const loginUser = getState().user.data.wallet_address;

    dispatch({ type: campaignActions.CAMPAIGNS_REQUEST });

    let url = `/campaigns`; //page=${currentPage}&title=${query}&start_time=${startTime}&finish_time=${finishTime}
    const queryParams = {
      page: currentPage,
      title: query,
      start_time: startTime,
      finish_time: finishTime,
      registed_by: null,
    };
    if (filter) {
      queryParams.registed_by = loginUser;
    }
    url += '?' + queryString.stringify(queryParams);

    try {
      const response = await baseRequest.get(url) as any;
      const resObject = await response.json();

      if (resObject.status === 200) {
        const { total, page, lastPage, data } = resObject.data;

        dispatch({
          type: campaignActions.CAMPAIGNS_SUCCESS,
          payload: {
            total,
            page,
            lastPage,
            data
          }
        })
      }
    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGNS_FAIL,
        payload: err.message
      })
    }
  }
}


export const getCampaignDetailHttp = (transactionHash: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const baseRequest = new BaseRequest();

    dispatch({ type: campaignActions.CAMPAIGN_DETAIL_HTTP_REQUEST });

    let url = `/campaigns/${transactionHash}`;

    try {
      const response = await baseRequest.get(url) as any;
      const resObject = await response.json();

      if (resObject.status === 200) {
        const { is_pause: isProcessing } = resObject.data;

        dispatch({
          type: campaignActions.CAMPAIGN_DETAIL_HTTP_SUCCESS,
          payload: {
            isProcessing,
            ...resObject.data
          }
        })
      }
    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_DETAIL_HTTP_FAIL,
        payload: false
      })
    }
  }
}

export const getLatestCampaign = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const baseRequest = new BaseRequest();

    dispatch({ type: campaignActions.CAMPAIGN_LATEST_GET_REQUEST });

    try {
      const response = await baseRequest.get('/campaign-new') as any;
      const resObject = await response.json();

      if (resObject.status === 200) {
        const { campaign_hash, decimals } = resObject.data;
        // Init ERC20 Contract By Token Address get from Campaign Contract
        const campaignContract = getContractInstance(campaignABI, campaign_hash);

        if (campaignContract) {
          let tokenSold = campaignContract.methods.tokenSold().call();
          const token = campaignContract.methods.token().call();
          const tokenClaimedPromise = campaignContract.methods.tokenClaimed().call();

          const campaignDetail = await Promise.all([token, tokenSold, tokenClaimedPromise]);

          const erc20Contract = getContractInstance(erc20ABI, campaignDetail[0]);

          tokenSold = new BigNumber(campaignDetail[1]).dividedBy(Math.pow(10, decimals)).toFixed();
          const balance = await erc20Contract?.methods.balanceOf(campaign_hash).call();
          const tokenLeft = new BigNumber(balance).dividedBy(Math.pow(10, decimals)).minus(tokenSold).toFixed();
          const tokenClaimed = new BigNumber(campaignDetail[2]).dividedBy(Math.pow(10, decimals)).toFixed();

         dispatch({
           type: campaignActions.CAMPAIGN_LATEST_GET_SUCCESS,
           payload: {
             ...resObject.data,
             tokenLeft,
             tokenClaimed,
             // totalTokens: new BigNumber(tokenLeft).plus(tokenSold).toFixed(),
             totalTokens: new BigNumber(tokenLeft).plus(tokenSold).toFixed(),
             tokenSold
           }
         })
        }

      }
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: campaignActions.CAMPAIGN_LATEST_GET_FAIL,
        payload: err.message
      })
    }
  }
}

export const getLatestActiveCampaign = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const baseRequest = new BaseRequest();

    dispatch({ type: campaignActions.CAMPAIGN_LATEST_ACTIVE_GET_REQUEST });

    try {
      const response = await baseRequest.get('/campaign-latest-active', true) as any;
      const resObject = await response.json();

      if (resObject.status === 200) {
        const { campaign_hash, decimals } = resObject.data;
        // Init ERC20 Contract By Token Address get from Campaign Contract
        const campaignContract = getContractInstance(campaignABI, campaign_hash);

        if (campaignContract) {
          let tokenSold = campaignContract.methods.tokenSold().call();
          const token = campaignContract.methods.token().call();

          const campaignDetail = await Promise.all([token, tokenSold]);

          const erc20Contract = getContractInstance(erc20ABI, campaignDetail[0]);

          const balance = await erc20Contract?.methods.balanceOf(campaign_hash).call();
          const tokenLeft = new BigNumber(balance).dividedBy(Math.pow(10, decimals)).toFixed();

          tokenSold = new BigNumber(campaignDetail[1]).dividedBy(Math.pow(10, decimals)).toFixed();

          dispatch({
            type: campaignActions.CAMPAIGN_LATEST_ACTIVE_GET_SUCCESS,
            payload: {
              ...resObject.data,
              tokenLeft,
              totalTokens: new BigNumber(tokenLeft).plus(tokenSold).toFixed(),
              tokenSold
            }
          })
        }

      }
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: campaignActions.CAMPAIGN_LATEST_ACTIVE_GET_FAIL,
        payload: err.message
      })
    }
  }
}

export const getCampaignDetail = (id: string, isInvestor: boolean = false) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: campaignActions.CAMPAIGN_DETAIL_REQUEST });

    try {
      const { wallet_address: loginUser } = getState().user.data;
      const { wallet_address: loginInvestor } = getState().investor.data;

      const web3Instance = getWeb3Instance();
      const campaignContract = getContractInstance(campaignABI, id);

      if (web3Instance && campaignContract) {
        // Check if this campaign is owned by this account
        const campaignOwner = await campaignContract.methods.owner().call();
        let isCampaignOwner = false;

        if (!isInvestor) {
          isCampaignOwner = campaignOwner.toLowerCase() === loginUser.toLowerCase();
        } else {
          isCampaignOwner = campaignOwner.toLowerCase() === loginInvestor.toLowerCase();
        }

        const title = campaignContract.methods.name().call();

        // Get All information of selected campaign
        const fundingWallet = campaignContract.methods.fundingWallet().call();
        const tokenSold = campaignContract.methods.tokenSold().call();
        const weiRaised = campaignContract.methods.weiRaised().call();
        const startTime = campaignContract.methods.openTime().call();
        const closeTime = campaignContract.methods.closeTime().call();
        const token = campaignContract.methods.token().call();
        const owner = campaignContract.methods.owner().call();
        const isSuspend = campaignContract.methods.paused().call();
        const etherRate = campaignContract.methods.getEtherConversionRate().call();
        const etherConversionRateDecimals = campaignContract.methods.getEtherConversionRateDecimals().call();
        const ethLink = "0x00";
        const erc20ConversionRate = campaignContract.methods.getErc20TokenConversionRate(USDT_LINK_DEFAULT_ADDRESS).call();
        const releaseTime = campaignContract.methods.releaseTime().call();
        const isClaimable = campaignContract.methods.isClaimable().call();
        const claimableTokens = campaignContract.methods.getClaimableTokens(isInvestor ? loginInvestor: loginUser).call();
        const tokenClaimed = campaignContract.methods.tokenClaimed().call();

        const campaignDetail = await Promise.all([
          title, tokenSold, weiRaised,
          ethLink, etherRate, startTime,
          closeTime, fundingWallet, token,
          owner, erc20ConversionRate, isSuspend,
          etherConversionRateDecimals, isClaimable, claimableTokens,
          releaseTime, tokenClaimed,
        ]);

        console.log('tokenClaimed=======>', campaignDetail[16]);

        // Init ERC20 Contract By Token Address get from Campaign Contract
        const erc20Contract = getContractInstance(erc20ABI, campaignDetail[8]);
        const usdtContract = getContractInstance(erc20ABI, USDT_LINK_DEFAULT_ADDRESS);

        if (erc20Contract && usdtContract) {
          const tokenName = erc20Contract.methods.name().call();
          const tokenSymbol = erc20Contract.methods.symbol().call();
          const tokenDecimals = erc20Contract.methods.decimals().call();
          const totalTokens = erc20Contract.methods.balanceOf(id).call();

          const tokenDetail = await Promise.all([tokenName, tokenSymbol, tokenDecimals, totalTokens]);
          const affiliate = await isReferral(campaignDetail[3], campaignDetail[8], id);
          let isOwnerReferral = false;

          if (Number(campaignDetail[3] != 0)) {
            isOwnerReferral = await isOwnerOfReferral(campaignDetail[3], campaignDetail[8], !isInvestor ? loginUser: loginInvestor) as boolean;
          }

          const claimableTokens = new BigNumber(campaignDetail[14]).dividedBy(Math.pow(10, tokenDetail[2])).toFixed();
          const tokenSold = new BigNumber(campaignDetail[1]).dividedBy(Math.pow(10, tokenDetail[2]));
          const tokenLeft = new BigNumber(tokenDetail[3]).dividedBy(Math.pow(10, tokenDetail[2])).minus(tokenSold);

          const usdtDecimal = await usdtContract.methods.decimals().call();
          const erc20ConversionRate = new BigNumber(campaignDetail[10]).dividedBy(Math.pow(10, (18 - Number(usdtDecimal)))).toFixed();
          const unixCloseTime = convertUnixTimeToDateTime(campaignDetail[6]);
          const tokenClaimed = new BigNumber(campaignDetail[16]).dividedBy(Math.pow(10, tokenDetail[2]));
          const refundable = isCampaignOwner && (new BigNumber(tokenLeft).plus(tokenClaimed)).gt(0) && (new Date(unixCloseTime) < new Date());

          console.log('tokenLeft', tokenLeft.toFixed());
          // console.log('(new BigNumber(tokenLeft).plus(tokenClaimed)).gt(0)', (new BigNumber(tokenLeft).plus(tokenClaimed)).toFixed());

          dispatch({
            type: campaignActions.CAMPAIGN_DETAIL_SUCCESS,
            payload: {
              title: campaignDetail[0],
              tokenSold: tokenSold.toFixed(),
              tokenLeft: tokenLeft.toFixed(),
              ethRaised: web3Instance.utils.fromWei(campaignDetail[2], 'ether'),
              totalTokens: tokenSold.plus(tokenLeft).toFixed(),
              affiliate,
              ethLink: campaignDetail[3],
              ethRate: new BigNumber(campaignDetail[4]).dividedBy(Math.pow(10, campaignDetail[12])).multipliedBy(Math.pow(10, 18 - tokenDetail[2])).toFixed(),
              startTime: campaignDetail[5],
              closeTime: campaignDetail[6],
              tokenName: tokenDetail[0],
              tokenSymbol: tokenDetail[1],
              tokenDecimals: tokenDetail[2],
              fundingWallet: campaignDetail[7],
              tokenAddress: campaignDetail[8],
              owner: campaignDetail[9],
              erc20ConversionRate,
              transactionHash: id,
              isCampaignOwner,
              isOwnerReferral,
              isSuspend: campaignDetail[11],
              isClaimable: campaignDetail[13],
              claimableTokens,
              releaseTime: campaignDetail[15],
              refundable,
              tokenClaimed,
              etherConversionRateDecimals: campaignDetail[12],
            }
          })
        }

      }
    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_DETAIL_FAIL,
        payload: err.message
      });
    }
  }
}

export const registerICOCampaign = (website: string, history: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_REGISTER_ICO_REQUEST });

      const { campaignDetail, user } = getState();
      const { transactionHash, tokenAddress } = campaignDetail.data;

      const ethLinkContract = getContractInstance(ethLinkABI, ETH_LINK_DEFAULT_ADDRESS);

      if (ethLinkContract) {
        const icoCampaignWithToken = await ethLinkContract.methods.tokens(tokenAddress).call();
        const { icoCampaign } = icoCampaignWithToken;

        if (Number(icoCampaign) !== 0 && (icoCampaign.toLowerCase() !== transactionHash.toLowerCase())) {
          await ethLinkContract.methods.setIcoCampaign(tokenAddress, transactionHash).send({
            from: user.data.wallet_address
          });
        } else {
          await ethLinkContract.methods.registerICO(tokenAddress, website, transactionHash).send({
            from: user.data.wallet_address
          });
        }

        dispatch({ type: campaignActions.CAMPAIGN_REGISTER_ICO_SUCCESS });

        dispatch(getCampaignDetail(transactionHash));

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Register ICO Campaign Successful'
        })

      }

    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_REGISTER_ICO_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const setUSDTRate = (rate: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_ERC20_RATE_REQUEST });

      const { data } = getState().campaignDetail;
      const loginUser = getState().user.data.wallet_address;

      if (data) {
        const { transactionHash } = data;
        const campaignContract = getContractInstance(campaignABI, transactionHash);
        const usdtContract = getContractInstance(erc20ABI, USDT_LINK_DEFAULT_ADDRESS);

        if (usdtContract && campaignContract) {

          const usdtDecimal = await usdtContract.methods.decimals().call();

          const erc20ConversionRate = Number(rate) * Math.pow(10, (18 - Number(usdtDecimal)));

          await campaignContract.methods.setErc20TokenConversionRate(USDT_LINK_DEFAULT_ADDRESS, erc20ConversionRate).send({
            from: loginUser
          });

          dispatch({
            type: campaignActions.CAMPAIGN_ERC20_RATE_SUCCESS
          });

          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: "Set ERC20 Rate Successful!"
          });

          dispatch(getCampaignDetail(transactionHash));
        };
      }
    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_ERC20_RATE_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const createAffiliateCampaign = (campaign: campaignAffiliateCreateProps, history: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_AFFILIATE_CREATE_REQUEST });

      const ethLinkContract = getContractInstance(ethLinkABI, ETH_LINK_DEFAULT_ADDRESS);

      if (ethLinkContract) {
        const { name, commission } = campaign;
        const { tokenAddress } = getState().campaignDetail.data;
        const loginUser = getState().user.data.wallet_address;

        await ethLinkContract.methods.createCampaign(name, tokenAddress, commission).send({
          from: loginUser
        });

        dispatch({ type: campaignActions.CAMPAIGN_AFFILIATE_CREATE_SUCCESS });

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Create Campaign Successful'
        });

        dispatch(getAffiliateByCampaign());
      }
    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_AFFILIATE_CREATE_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const createCampaign = (campaign: campaignCreateProps, history: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.MY_CAMPAIGN_CREATE_REQUEST });

      const baseRequest = new BaseRequest();
      const factorySmartContract = getContractInstance(campaignFactoryABI, process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "");

      const { title, affiliate, startTime, finishTime, releaseTime, token, addressReceiver, tokenByETH, tokenInfo } = campaign;
      const releaseTimeUnix = +convertDateTimeToUnix(releaseTime);
      const startTimeUnix = +convertDateTimeToUnix(startTime);
      const finishTimeUnix = +convertDateTimeToUnix(finishTime);

      const durationTime = finishTimeUnix - startTimeUnix;

      const tokenByETHActualRate = new BigNumber(tokenByETH).multipliedBy(Math.pow(10, tokenInfo?.decimals || 0)).dividedBy(Math.pow(10, 18));
      const tokenByEthDecimals = getDigitsAfterDecimals(tokenByETHActualRate.toString());
      const tokenByEthSendToBlock = tokenByETHActualRate.multipliedBy(Math.pow(10, tokenByEthDecimals)).toString();

      if (factorySmartContract) {
        let createdCampaign;

        if (affiliate === 'yes')  {
          createdCampaign = factorySmartContract.methods.registerCampaignWithEthLink(title, token, durationTime, startTimeUnix, tokenByEthSendToBlock, tokenByEthDecimals, addressReceiver, ETH_LINK_DEFAULT_ADDRESS).send({
            from: getState().user.data.wallet_address
          });
        } else {
          createdCampaign = factorySmartContract.methods.registerCampaign(title, token, durationTime, startTimeUnix, releaseTimeUnix, tokenByEthSendToBlock, tokenByEthDecimals, addressReceiver).send({
            from: getState().user.data.wallet_address
          });
        }

        if (createdCampaign) {
          await createdCampaign
          .on('transactionHash', async (transactionHash: string) => {
            const loginUser = getState().user.data.wallet_address;

            const isAffiliate = affiliate === 'yes'? 1: 0;

            if (tokenInfo) {
              const { name, symbol, decimals } = tokenInfo;
              await baseRequest.post('/campaign-create', {
                title,
                affiliate: isAffiliate,
                start_time: startTimeUnix,
                finish_time: finishTimeUnix,
                addressReceiver,
                tokenByETH,
                owner: loginUser,
                token,
                name,
                symbol,
                decimals,
                transactionHash
              });
            }

            dispatch({ type: campaignActions.MY_CAMPAIGN_CREATE_SUCCESS });

            history.push(adminRoute('/campaigns'));

            dispatch({ type: alertActions.SUCCESS_MESSAGE, payload: 'Create Campaign Successful!'});
          })
        }
      }
    } catch (err) {
      dispatch({
        type: campaignActions.MY_CAMPAIGN_CREATE_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const toggleCampaignStatus = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_STATUS_TOGGLE_REQUEST });

      const { campaignDetail, user } = getState();
      const { transactionHash, isSuspend } = campaignDetail.data;

      const campaignContract = getContractInstance(campaignABI, transactionHash);

      if (campaignContract) {
        isSuspend ? await campaignContract.methods.unpause().send({
          from: user.data.wallet_address
        }): await campaignContract.methods.pause().send({
          from: user.data.wallet_address
        })

        dispatch({ type: campaignActions.CAMPAIGN_STATUS_TOGGLE_SUCCESS });

        if (isSuspend) {
          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: 'Active Campaign Successful!'
          })
        } else {
          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: 'Suspend Campaign Successful!'
          })
        }

        dispatch(getCampaignDetail(transactionHash));
      }

    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_STATUS_TOGGLE_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const editCampaignWithProp = (prop: string, value: string, handleEditSuccess: () => void) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_EDIT_REQUEST });

      const { campaignDetail, user } = getState();
      const { transactionHash, etherConversionRateDecimals } = campaignDetail.data;

      const campaignContract = getContractInstance(campaignABI, transactionHash);
        const usdtContract = getContractInstance(erc20ABI, USDT_LINK_DEFAULT_ADDRESS);

      if (campaignContract && usdtContract) {
        switch (prop) {
          case 'affiliate': {
            if (value === 'yes') {
              await campaignContract.methods.setEthLinkAddress(ETH_LINK_DEFAULT_ADDRESS).send({
                from: user.data.wallet_address
              });
            } else {
              await campaignContract.methods.setEthLinkAddress("0x0000000000000000000000000000000000000000").send({
                from: user.data.wallet_address
              });
            }

            break;
          }

          case 'USDT': {
            const usdtDecimal = await usdtContract.methods.decimals().call();
            const erc20ConversionRate = new BigNumber(value).multipliedBy(Math.pow(10, (18 - Number(usdtDecimal))));

            await campaignContract.methods.setErc20TokenConversionRate(USDT_LINK_DEFAULT_ADDRESS, erc20ConversionRate.toString()).send({
              from: user.data.wallet_address
            });

            break;
          }

          case 'ETH': {
            const etherDecimals = getDigitsAfterDecimals(value.toString());
            console.log(etherDecimals);
            console.log('new BigNumber(value).multipliedBy(Math.pow(10, etherDecimals)',
              new BigNumber(value).multipliedBy(Math.pow(10, etherDecimals)).toString()
              );

            await campaignContract.methods.setEtherConversionRateAndDecimals(new BigNumber(value).multipliedBy(Math.pow(10, etherDecimals)).toString(), etherDecimals).send({
              from: user.data.wallet_address
            });


            break;
          }

          case 'start time': {
            const unixTime = convertDateTimeToUnix(value);

            await campaignContract.methods.setOpenTime(unixTime).send({
              from: user.data.wallet_address
            });

            break;
          }

          case 'finish time': {
            const unixTime = convertDateTimeToUnix(value);

            await campaignContract.methods.setCloseTime(unixTime).send({
              from: user.data.wallet_address
            });

            break;
          }

          case 'release time': {
            const unixTime = convertDateTimeToUnix(value);

            await campaignContract.methods.setReleaseTime(unixTime).send({
              from: user.data.wallet_address
            });

            break;
          }
        }

        dispatch({ type: campaignActions.CAMPAIGN_EDIT_SUCCESS });

        handleEditSuccess();

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Update Campaign Successful!'
        });

        dispatch(getCampaignDetail(transactionHash));
      }

    } catch (err) {
      handleEditSuccess();

      dispatch({
        type: campaignActions.CAMPAIGN_EDIT_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const refundTokensForIcoOwner = (receiverAddress: string, amount: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: campaignActions.CAMPAIGN_TOKENS_REFUND_REQUEST });

      const { campaignDetail, user } = getState();
      const { transactionHash, tokenDecimals } = campaignDetail.data;

      const campaignContract = getContractInstance(campaignABI, transactionHash);

      const withDrawAmount = new BigNumber(amount).multipliedBy(Math.pow(10, tokenDecimals)).toString();

      if (campaignContract) {
        // await campaignContract.methods.refundTokenForIcoOwner(receiverAddress, withDrawAmount.toString()).send({
        await campaignContract.methods.refundTokenForIcoOwner(receiverAddress).send({
          from: user.data.wallet_address
        });

        dispatch({ type: campaignActions.CAMPAIGN_TOKENS_REFUND_SUCCESS });

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Refund Tokens Successful!'
        });

        dispatch(getCampaignDetail(transactionHash));
      }

    } catch (err) {
      dispatch({
        type: campaignActions.CAMPAIGN_TOKENS_REFUND_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}
