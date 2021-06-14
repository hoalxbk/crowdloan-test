import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {debounce} from 'lodash';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import useStyles from './style';
import useCommonStyle from '../../styles/CommonStyle';
import {convertFromWei, getContractInstance, getContractInstanceWeb3, getPoolContract} from '../../services/web3';
import POOL_ABI from '../../abi/Pool.json';
import Pool from './Pool';
import withWidth, {isWidthDown, isWidthUp} from '@material-ui/core/withWidth';
import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';

import Pagination from '@material-ui/lab/Pagination';
import {getPoolStatusByPoolDetail} from "../../utils/getPoolStatusByPoolDetail";
import {NETWORK_AVAILABLE, NFT_PLUS_AMOUNT_PRODUCTION} from "../../constants";
import BigNumber from 'bignumber.js';
import {getProgressWithPools} from "../../utils/campaign";

const iconSearch = 'images/icons/search.svg';

const Pools = (props: any) => {
  const styles = useStyles();
  const commonStyle = useCommonStyle();
  const { data: appChain } = useSelector((state: any) => state.appNetwork);
  const { data: connector } = useSelector((state: any) => state.connector);

  const [tabActive, setTabActive] = useState(1);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pools, setPools] = useState([]);

  const { connectedAccount } = useAuth();

  const getPoolsPrefixUri = () => {
    let uri = '/pools'
    if (tabActive === 1) {
      return uri;
    }

    if (tabActive === 2) {
      return `${uri}/top-pools`;
    }

    if (tabActive === 3) {
      return `${uri}/user/${connectedAccount}/joined-pools`;
    }
  }

  const { data: poolsList, loading: loadingGetPool } = useFetch<any>(
    `${getPoolsPrefixUri()}?page=${currentPage}&limit=10&title=${input}`
  );

  console.log('poolsList: ', poolsList);

  const handleInputChange = debounce((e: any) => {
    Promise.resolve().then(() => {
      setInput(e.target.value);
      setCurrentPage(1);
    });
  }, 500);

  // const getTokenSold = async (pool: any) => {
  //   let result = '0';
  //   try {
  //     const networkAvailable = pool.network_available || pool.networkAvailable;
  //     const poolHash = pool.campaign_hash || pool.campaignHash;
  //     const contract = getPoolContract({ networkAvailable, poolHash });
  //     if (contract) {
  //       result = await contract.methods.tokenSold().call();
  //       result = convertFromWei(result.toString());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return result;
  // }

  useEffect(() => {
    const manipulatePoolsData = async () => {
      setTotalPage(poolsList.lastPage);
      setCurrentPage(poolsList.page);

      let listData = poolsList.data;
      let poolWithStatus = [];
      for (let i = 0; i < listData.length; i++) {
        const pool = listData[i];
        const status = await getPoolStatusByPoolDetail(pool, 0);
        console.log('Pool STATUS:', status);

        poolWithStatus.push({
          ...pool,
          status,
        });
      }

      poolsList.data = poolWithStatus;
      listData = poolWithStatus;

      // if(!appChain || !connector) return;

      // await Promise.all(listData.map(async (pool: any) => {
      //   if (pool.is_deploy === 0) return;
      //   const tokenSold = await getTokenSold(pool);
      //   pool.tokenSold = tokenSold;
      // }));

      setPools(listData);
    };

    poolsList && poolsList.data && manipulatePoolsData();
  }, [poolsList, appChain, connector]);

  const handleChangeTab = (tab: number) => {
    setTabActive(tab);
  }

  return (
    <DefaultLayout>
      <div className={styles.poolsContainer}>
        <div className={styles.tabs}>
          <span
            className={styles.btnTab + (tabActive === 1 ? ' active ' : ' ') + commonStyle.nnb1418d}
            onClick={() => handleChangeTab(1)}
          >All Pools</span>
          <span
            className={styles.btnTab + (tabActive === 2 ? ' active ' : ' ') + commonStyle.nnb1418d}
            onClick={() => handleChangeTab(2)}
          >Top Pools</span>
          <span
            className={styles.btnTab + (tabActive === 3 ? ' active ' : ' ') + commonStyle.nnb1418d}
            onClick={() => handleChangeTab(3)}
          >Pools Joined</span>
        </div>
        <div className={styles.tabContent}>
          <h2>List Pools</h2>
          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search by Pool name"
              className={commonStyle.nnn1424h}
              onChange={handleInputChange}
            />
            <img src={iconSearch}/>
          </div>
          <table style={{ width: '100%' }} className={styles.listPools}>
            <thead className={styles.poolsHead}>
              {isWidthUp('md', props.width) && <tr>
                <th style={{minWidth: '240px', width: '24%'}}>Pool Name</th>
                <th style={{minWidth: '120px', width: '12%'}}>Ratio</th>
                <th style={{minWidth: '120px', width: '12%'}}>Access</th>
                <th style={{minWidth: '400px', width: '40%'}}>Progress</th>
                <th style={{minWidth: '120px', width: '12%'}}>Status</th>
              </tr>}
              {isWidthDown('sm', props.width) && <tr>
                <th style={{minWidth: '150px', width: '50%'}}>Pool Name</th>
                <th style={{minWidth: '90px', width: '30%'}}>Progress</th>
                <th style={{minWidth: '60px', width: '20%'}}>Status</th>
              </tr>}
            </thead>
            <tbody className={styles.poolsBody + (pools.length <= 0 ? ' loading' : '')}>
              {pools.length > 0 && pools.map((pool: any, index: number) => {
                return <tr key={index}><Pool pool={pool}/></tr>
              })}
              {/* {pools.length <= 0 && <tr className="loading"><td><CircularProgress size={80} /></td></tr>} */}
            </tbody>
            <tfoot>
            </tfoot>
          </table>
          <div className={styles.pagination}>
            {
              totalPage > 1 && <Pagination
                count={totalPage}
                color="primary"
                style={{ marginTop: 30 }} className={styles.pagination}
                onChange={(e: any, value: any) => {
                  if (!loadingGetPool) {
                    setCurrentPage(value)
                  }
                }}
                page={currentPage}
              />
            }
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withWidth()(withRouter(Pools));
