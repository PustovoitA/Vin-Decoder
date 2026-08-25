import styles from "./Warning.module.css"

interface Props { message: string}

const Warning = ({message}:Props) => {
    return(<>
        <div className={styles.warning_block}>
            <span className={styles.warning_block_title}>Warning <span className="material-symbols-outlined">warning</span></span>
            <p className={styles.warning_block_message}>{message}</p>
        </div>
    </>)
}
export default Warning