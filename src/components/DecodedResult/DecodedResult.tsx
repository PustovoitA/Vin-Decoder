import styles from "./DecodedResult.module.css"

const DecodedResult = () => {
    return(<>
        <section className={styles.container}>
            <p className={styles.title}>Decoded result</p>
            <ul className={styles.list}>
                <li className={styles.list_item}>
                    <p style={{
                        color: "var(--text-secondary)",
                        margin: 0
                        }}>key</p>
                    <p style={{
                        margin: 0
                    }}>value</p>
                </li>
                <hr style={{backgroundColor:"var(--border)", border: "none", height: "1px"}} />
            </ul>
        </section>
    </>)
}
export default DecodedResult