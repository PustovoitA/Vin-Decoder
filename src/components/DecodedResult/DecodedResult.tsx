import styles from "./DecodedResult.module.css"

import Warning from "../../ui/Warning/Warning";
import Error from "../../ui/Error/Error";

import DecodeResultsStore from "../../Store/DecodeResultsStore"

import { InlineLoader } from "generative-loaders";
import "generative-loaders/styles.css";


const DecodedResult = () => {
    const data = DecodeResultsStore((state) => state.data);
    const error = DecodeResultsStore((state) => state.error);
    const warning = DecodeResultsStore((state) => state.warning);
    const isPanding = DecodeResultsStore((state) => state.isPending);

    return(<>
        <section className={styles.container}>
            <p className={styles.title}>Decoded result</p>
            { isPanding
            ? <InlineLoader variant="signal" size={24} />
            : data.length
            ? <ul className={styles.list}>
                {error.status 
                ? <Error message={error.message}/>
                : null}

                {warning.status 
                ? <Warning message={warning.message}/>
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