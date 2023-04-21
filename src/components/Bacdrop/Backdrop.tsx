import styles from './Backdrop.module.css';
import { ButtonCustom } from '../UI/ButtonCustom/ButtonCustom';
import { EButton } from '../../enums/EButton';

type textBackdrop = {
    data: string,
    fn: Function,
}

export const Backdrop = (props: textBackdrop) => {
  return (
    <>
    <div className={styles.backdrop}></div>
    <div className={styles.myAlert}>
        <p className={styles.myAlert_text}>{props.data}</p>
        <ButtonCustom fn={() => props.fn()} name='ok' type={EButton.normal}/>
    </div>
    </>
  )
}
