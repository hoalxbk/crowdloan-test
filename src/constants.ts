export const TRANSACTION_ERROR = 'Transaction failed. Please check blockchain to know more error.';
export const API_URL_PREFIX = 'user';
export const ADMIN_URL_PREFIX = 'dashboard';
export const IMAGE_URL_PREFIX = 'image';
export const MAX_BUY_CAMPAIGN = 1000;
export const WHITELIST_LINK = 'https://forms.gle/HiQkhaRM8mujeryq8';
export const INSTRUCTION_WHITELIST_LINK = 'https://medium.com/polkafoundry/nftify-whitelist-on-red-kite-launchpad-on-june-4-2021-26cd4b8ebc8d';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const NFT_PLUS_AMOUNT_PRODUCTION = process.env.NFT_PLUS_AMOUNT_PRODUCTION || '272000';
export const POOL_STATUS = {
  TBA: 0,
  UPCOMING: 1,
  JOINING: 2,
  IN_PROGRESS: 3,
  FILLED: 4,
  CLOSED: 5,
  CLAIMABLE: 6
}

export const NETWORK = {
  ETHEREUM: 'eth',
  BSC: 'bsc'
}

export const ACCEPT_CURRENCY = {
  ETH: 'eth',
  USDT: 'usdt',
  USDC: 'usdc',
};

export const BUY_TYPE = {
  WHITELIST_LOTTERY: 'whitelist',
  FCFS: 'fcfs',
};

export const POOL_TYPE = {
  SWAP: 'swap',
  CLAIMABLE: 'claimable',
};

export const PUBLIC_WINNER_STATUS = {
  PUBLIC: 1,
  PRIVATE: 0,
};
export const POOL_IS_PRIVATE = {
  PUBLIC: 0,
  PRIVATE: 1,
};

export const PICK_WINNER_RULE = {
  RULE_NORMAL: 'rule-normal',
  RULE_WITH_WEIGHT_RATE: 'rule-with-weight-rate',
};

export const USER_STATUS = {
  UNVERIFIED: 0,
  ACTIVE: 1,
  BLOCKED: 2,
  DELETED: 3
}

export const CONVERSION_RATE = [
  {
    name: 'PKF-ETH LP',
    rate: 150,
    symbol: 'LP-PKF',
    address: process.env.REACT_APP_UNI_LP,
    key: 'UPKF',
    keyMainnet: 'UNI-V2'
  },
  {
    name: 'Staked sPKF',
    rate: 1,
    symbol: 'sPKF',
    address: process.env.REACT_APP_MANTRA_LP,
    key: 'sPKF',
    keyMainnet: 'sPKF'
  },
  // {
  //   name: 'NFT',
  //   rate: 100
  // },
]

export const TIERS = [
  {
    name: '-',
    icon: '/images/icons/rocket.svg',
    bg: '/images/icons/red-kite-bg.png',
    bgColor: '#8D8DCC',
  },
  {
    name: 'Dove',
    bg: '/images/icons/hawk-bg.png',
    bgColor: '#5252AD',
    icon: '/images/icons/bronze-medal.svg'
  },
  {
    name: 'Hawk',
    bg: '/images/icons/falcon-bg.png',
    bgColor: '#3F3FA3',
    icon: '/images/icons/silver-medal.svg'
  },
  {
    name: 'Eagle',
    bg: '/images/icons/eagle-bg.png',
    bgColor: '#1B1BA3',
    icon: '/images/icons/golden-medal.svg'
  },
  {
    name: 'Phoenix',
    bg: '/images/icons/phoenix-bg.png',
    bgColor: '',
    icon: '/images/icons/diamond.svg'
  }
];

export const TIER_LEVELS = {
  NONE: 0,
  DOVE: 1,
  HAWK: 2,
  EAGLE: 3,
  PHOENIX: 4,
};

export const KYC_STATUS = {
  INCOMPLETE: 0, // Blockpass verifications pending
  APPROVED: 1, // profile has been approved by Merchant
  RESUBMIT: 2, // Merchant has rejected one or more attributes
  WAITING: 3, // Merchant's review pending
  INREVIEW: 4, // in review by Merchant
};

export const GAS_LIMIT_CONFIGS = {
  APPROVE: '80000',  // 46483
  DEPOSIT: '250000',  // 195057
  CLAIM: '120000', // 81901
  APPROVE_SOTA_TOKEN: '200000',
  STAKE_SOTA_TIERS: '120000', // 79021
  UNSTAKE_SOTA_TIERS: '100000', // 72527
};

export const NETWORK_AVAILABLE = {
  ETH: 'eth',
  BSC: 'bsc',
};

export const ETHERSCAN_BASE_URL: any = {
  '1': 'https://etherscan.io',
  '4': 'https://rinkeby.etherscan.io',
  '5': 'https://goerli.etherscan.io',
  '97': 'https://testnet.bscscan.com',
};
