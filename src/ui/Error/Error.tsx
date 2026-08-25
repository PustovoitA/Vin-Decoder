import styles from "./Error.module.css"

interface Props {message: string}

const Error = ({message}:Props) => {
    return(<>
        <div className={styles.error_block}>
            <span className={styles.error_block_title}>Error <span className="material-symbols-outlined">error</span></span>
            <p className={styles.error_block_message}>{message}</p>
        </div>
    </>)
}
export default Error