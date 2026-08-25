import styles from "./Variables.module.css"

import Error from "../../ui/Error/Error";

import { useMemo } from "react";
import { useVariablesList } from "../../hooks/useVariablesList";

import type { VariavlesListResults } from "../../types/VariablesListResponse";

import { InlineLoader } from "generative-loaders";
import "generative-loaders/styles.css";

import DOMPurify from 'dompurify';

const Variables = () => {
    const {data, isError, isLoading} = useVariablesList();

    const variablesByGroup = useMemo( () => {
        const results = data?.Results
        const groupNames = new Set<string>();
        const variablesByGroup = new Map<string, VariavlesListResults[]>();

        for(let i = 0; results?.length! > i; i++){
            groupNames.add(results![i].GroupName);

            if(variablesByGroup.has(results![i].GroupName)){
                variablesByGroup.get(results![i].GroupName)?.push(results![i]);
            }else{
                variablesByGroup.set(results![i].GroupName, [results![i]]);
            }
        }

        return variablesByGroup
    }, [data]);

    return (<>
        <section className={styles.container}>
            <h1 className={styles.head}>Variables</h1>
            {isError
            ? <Error message="Something was wrong, try later"/>
            : isLoading
            ? <InlineLoader variant="signal" size={24} />
            :   [...variablesByGroup.entries()].map(([groupName, variable]) => (
                    <div key={groupName} className={styles.group}>
                        <h2 className={styles.groupTitle}>{groupName}</h2>
                        <ul className={styles.list}>
                            {variable.map((el) => (
                                <li key={el.ID} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardTitleRow}>
                                            <span className={styles.cardName}>{el.Name}</span>
                                            <span className={styles.cardId}>#{el.ID}</span>
                                        </div>
                                        <span className={`${styles.badge} ${styles[el.DataType]}`}>
                                            {el.DataType}
                                        </span>
                                    </div>
                                    <div
                                        className={styles.description}
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el.Description) }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </section>
    </>)
}
export default Variables