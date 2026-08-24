import { useMemo } from "react";
import { useVariablesList } from "../../hooks/useVariablesList";
import styles from "./Variables.module.css"
import type { VariavlesListResults } from "../../types/VariablesListResponse";
import DOMPurify from 'dompurify';

const Variables = () => {
    const {data} = useVariablesList();

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
            {[...variablesByGroup.entries()].map(([groupName, variable]) => (
                <div key={groupName}>
                    <h2>{groupName}</h2>
                    <div>
                        {variable.map((el) => (
                            <li key={el.ID}>
                                <div>
                                    <div>
                                        <span>{el.Name}</span>
                                        <span>#{el.ID}</span>
                                    </div>
                                    <div>{el.DataType}</div>
                                </div>
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el.Description) }} />
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    </>)
}
export default Variables