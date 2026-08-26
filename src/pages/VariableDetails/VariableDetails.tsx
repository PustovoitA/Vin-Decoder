import styles from "./VariableDetails.module.css"

import Error from "../../ui/Error/Error";

import { useNavigate, useParams } from "react-router-dom"
import { useVariablesList } from "../../hooks/useVariablesList";

import { InlineLoader } from "generative-loaders";
import "generative-loaders/styles.css";

import DOMPurify from 'dompurify';


const VariableDetails = () => {
    const { variableId } = useParams<{ variableId: string }>();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useVariablesList();

    const variable = data?.Results.find(v => v.ID === Number(variableId));
    const related = data?.Results.filter(
        v => v.GroupName === variable?.GroupName && v.ID !== variable?.ID
    ) ?? [];

    if (isLoading) return <InlineLoader variant="signal" size={24} />;
    if (isError) return <Error message="Error"/>;
    if (!variable) return <p>Variable not found.</p>;

    return (<>
        <section className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.back}>
                ← Назад к списку
            </button>

            <p className={styles.groupLabel}>{variable.GroupName ?? 'Other'}</p>

            <div className={styles.titleRow}>
                <h1 className={styles.title}>{variable.Name}</h1>
                <span className={`${styles.badge} ${styles[variable.DataType]}`}>
                    {variable.DataType}
                </span>
            </div>

            <p className={styles.id}>ID #{variable.ID}</p>

            <div className={styles.descriptionBlock}>
                <p className={styles.descriptionLabel}>Description</p>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(variable.Description) }} />
            </div>

            {related.length > 0 && (
                <>
                    <p className={styles.relatedLabel}>
                        Другие переменные группы {variable.GroupName}
                    </p>
                    <div className={styles.relatedList}>
                        {related.map(v => (
                            <div
                                key={v.ID}
                                className={styles.relatedItem}
                                onClick={() => navigate(`/Variables/${v.ID}`)}
                            >
                                <span>{v.Name}</span>
                                <span className={`${styles.badge} ${styles[v.DataType]}`}>{v.DataType}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    </>)
}
export default VariableDetails