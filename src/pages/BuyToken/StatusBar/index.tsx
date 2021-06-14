import React from 'react';
import { PoolStatus, poolStatus } from '../../../utils/getPoolStatus';
import useStyles from './style';

type StatusBarProps = {
  currentStatus?: poolStatus | undefined
}

const StatusBar: React.FC<StatusBarProps> = ({ currentStatus }: StatusBarProps) => {
  const styles = useStyles();

  const statusBarSteps: { color: string, label: poolStatus }[] = [
    {
      color: '#9E63FF',
      label: PoolStatus.TBA 
    },
    {
      color: '#6398FF',
      label: PoolStatus.Upcoming 
    },
    {
      color: '#12A064',
      label: PoolStatus.Joining
    },
    {
      color: '#FFDE30',
      label: PoolStatus.Progress
    },
    {
      color: 'deeppink',
      label: PoolStatus.Filled
    },
    {
      color: '#D01F36',
      label: PoolStatus.Closed
    },
    {
      color: '#FF9330',
      label: PoolStatus.Claimable
    }
  ]

  return (
    <div className={styles.statusBar}>
        {
          statusBarSteps.map(step => (
            <span className={styles.statusBarStatus}>
              <span 
                className={`${styles.statusBarLine} ${step.label === currentStatus ? `${styles.statusBarActive}`: ''}`}
                style={{ backgroundColor: `${step.color}`, opacity: `${step.label === currentStatus ? '1': '0.4'}` }}
              >
              </span>
              <strong className={styles.statusBarText} style={{ color: `${step.label === currentStatus ? 'white': 'rgba(255, 255, 255, 0.4)'}` }}>
                {step.label}
              </strong>
            </span>
          ))
        }
    </div>
  )
}

export default StatusBar;
