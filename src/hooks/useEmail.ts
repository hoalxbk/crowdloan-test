import { useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import useFetch from './useFetch';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export type Account = {
  email: ''
}

export type AccountReturnType ={
  account: Account | undefined,
  loading: boolean
}

const useEmail = (payload: any): AccountReturnType => {
  const [fetchDone, setFetchDone] = useState<boolean>(false);
  const { loading, error, data }  = useFetch<any>(`/user/register-email`, false, payload);

  const account = useMemo(() => {
    if (data && !loading && !error && fetchDone)  {
      return {
        email: data.email
      }
    }

    return;
  }, [data, loading, error, fetchDone]);

  useEffect(() => {
    data && setFetchDone(true);
  }, [data]);

  return  {
    account,
    loading: !fetchDone
  }
}

export default useEmail;
