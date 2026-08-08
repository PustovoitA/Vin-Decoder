import DecodeResultsStore from "../../Store/DecodeResultsStore"
import styles from "./DecodedResult.module.css"

const DecodedResult = () => {
    const data = DecodeResultsStore((state) => state.data);
    const error = DecodeResultsStore((state) => state.error);

    return(<>
        <section className={styles.container}>
            <p className={styles.title}>Decoded result</p>
            {error.status 
            ? <p>{error.message}</p>
            : data.length
            ? <ul className={styles.list}>
                {data.map(result => <li key={result.VariableId}>
                    <div className={styles.list_item}>
                        <p style={{
                            color: "var(--text-secondary)",
                            margin: 0
                            }}>{result.Variable}</p>
                        <p style={{
                            margin: 0
                        }}>{result.Value}</p>
                    </div>
                    <hr style={{backgroundColor:"var(--border)", border: "none", height: "1px"}} />
                </li>
                )}
            </ul>
            : <p>Please enter the VIN.</p>
            }
        </section>
    </>)
}
export default DecodedResult