import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './style'

type IButton = {
  text: string;
  icon?: any;
  to: string;
  spacing?: number;
  className?: string;
  onClick?: any,
}

const ButtonLink: React.FC<IButton> = (props: IButton) => {
  const { text, icon, spacing = 10, to, className = '', onClick } = props;
  const classes = useStyles({
    spacing
  });

  const cssClass = className || classes.button;

  return (
    <Link
      className={cssClass}
      {...( onClick && { onClick })}
      to={to}
    >
      <p className={classes.buttonContent}>
          {
            icon && <img src={`/images/${icon}`} width={20} />
          }
          <span className={classes.buttonText}>{text}</span>
      </p>
    </Link>
  )
}

export default ButtonLink;
