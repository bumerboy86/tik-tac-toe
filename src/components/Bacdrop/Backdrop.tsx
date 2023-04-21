import styles from './Backdrop.module.css';
import btnStyle from '../../App.module.css';

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
        <button onClick={() => props.fn()} className={btnStyle.btn}>Ok</button>
    </div>
    </>
  )
}
