import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import useFetch from './useFetch';
import useTokenDetails, { TokenType } from './useTokenDetails';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export type PoolDetails = {
  id: number;
  website: string;
  amount: number;
  ethRate: number;
  method: string;
  type: string;
  tokenDetails: TokenType;
  title: string;
  buyLimit: number[],
  connectedAccountBuyLimit: number,
  poolAddress: string;
  joinTime: string;
  endJoinTime: string;
  startBuyTime: string;
  endBuyTime: string;
  releaseTime: string;
  purchasableCurrency: string;
  banner: string;
}

export type Pools = []

export type Pagination = {
  page: any,
  lastPage: any,
  perPage: any,
  total: any
}

export type PoolsReturnType ={
  pools: Pools | [],
  pagination: Pagination | undefined
  loading: boolean
}

const usePools = (): PoolsReturnType => {
  const [poolsDone, setPoolsDone] = useState<boolean>(false);
  const { loading, error, data }  = useFetch<any>(`/pools?limit=100`);
  const { data: connectedAccountTier } = useTypedSelector(state => state.userTier);

  const pools = useMemo(() => {
    if (data && !loading && !error && poolsDone)  {
      const result = data.data.map((p: any) => {

        return {
          ...p,
          // token_images: `${BASE_URL}/image/${p.token_images}`,
          // banner: `${BASE_URL}/image/${p.banner}`,
          decimals: (p.campaign_hash == null || p.campaign_hash == '' || p.campaign_hash == 'TBD') ? 18 : p.decimals,
          campaign_hash: (p.campaign_hash == null || p.campaign_hash == '' || p.campaign_hash == 'TBD') ? 'Token contract not available yet.' : p.campaign_hash
        }
      })
      return result
    }

    return;
  }, [data, loading, error, poolsDone, connectedAccountTier]);

  const pagination = useMemo(() => {
    if (data && !loading && !error && poolsDone)  {
      return {
        page: data.page,
        lastPage: data.lastPage,
        perPage: data.perPage,
        total: data.total
      }
    }

    return;
  }, [data, loading, error, poolsDone, connectedAccountTier]);

  useEffect(() => {
    data && setPoolsDone(true)
  }, [data])

  return  {
    pools,
    pagination,
    loading: !poolsDone
  }
}

export default usePools;
