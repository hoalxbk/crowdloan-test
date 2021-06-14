import useStyles from './style';
import { BeatLoader } from 'react-spinners';

const Button = (props: any) => {
  const {
    className = '',
    buttonType = '',
    label = '',
    loading = false,
    ...remainProps
  } = props;

  const classes = useStyles();
  const mainClass = classes.button;

  return (
    <button
      className={`${mainClass} ${className} ${mainClass}--${buttonType}`}
      {...remainProps}
      disabled={loading}
    >
      {loading ? (
        <span className={`${mainClass}__loading`}>
          <BeatLoader color={'white'} size={10} />
        </span>
      ) : `${label}`
      }
    </button>
  );
};

export default Button;
