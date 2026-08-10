import DecodeResultsStore from "../../Store/DecodeResultsStore"
import styles from "./DecodedResult.module.css"

import { InlineLoader } from "generative-loaders";
import "generative-loaders/styles.css";


const DecodedResult = () => {
    const data = DecodeResultsStore((state) => state.data);
    const error = DecodeResultsStore((state) => state.error);
    const isPanding = DecodeResultsStore((state) => state.isPending);

    return(<>
        <section className={styles.container}>
            <p className={styles.title}>Decoded result</p>
            { isPanding
            ? <InlineLoader variant="signal" size={24} />
            : data.length
            ? <ul className={styles.list}>
                {error.status 
                ? <div className={styles.warning_block}>
                    <span className={styles.warning_block_title}>Warning <span className="material-symbols-outlined">warning</span></span>
                    <p className={styles.warning_block_message}>{error.message}</p>
                </div>
                : null}
                {data.map(result => <li key={`${result.VariableId}-${result.Value}`}>
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