import { useForm, type SubmitHandler } from "react-hook-form"
import styles from "./From.module.css"
import { useEffect } from "react";
import RecentSelectStore from "../../Store/RecentSelectStore";
import { useDecodeVin } from "../../hooks/useDecodeVin";
import DecodeResultsStore from "../../Store/DecodeResultsStore";
import RecentStore from "../../Store/RecentStore";

interface InputType {
    code: string
}

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{1,17}$/i;

const Form = () => {
    const resentSetValue = RecentStore((state) => state.setRecent);
    const {register, handleSubmit, formState: {errors}, setValue, watch, reset} = useForm<InputType>(
        {
            mode:"onChange",
            defaultValues:{code:""}
        }
    );

    const code = watch("code")
    const selectedValue = RecentSelectStore((state) => state.selectedValue);
    useEffect(()=>{
        setValue("code", selectedValue);
    }, [selectedValue]);

    const {mutate, isPending} = useDecodeVin();
    const setDecodeResults = DecodeResultsStore((state) => state.setDecodeResults);
    const setError = DecodeResultsStore((state) => state.setError);
    const setIsPanding = DecodeResultsStore((state) => state.setIsPanding)

    useEffect(()=>{
        setIsPanding(isPending)
    },[isPending])

    const onSubmit:SubmitHandler<InputType> = (data) => {
        const upperData = data.code.toUpperCase()
        mutate(upperData, {
            onSuccess: (response) => {
                const errorField = response.Results.find(el => el.Variable === "Error Code");
                const errorCode = errorField ? Number(errorField.Value) : null;

                if (errorCode !== 0 && errorCode !== null) {
                    const errorTextField = response.Results.find(el => el.Variable === "Error Text");
                    setError(true, errorTextField?.Value ?? "VIN decoded with warnings");
                } else {
                    setError(false, "");
                }

                setDecodeResults(response.Results);
                resentSetValue(upperData);
                reset();
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return(<>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
            value={code}
            className={styles.input}
            placeholder="1FTFW1CT5DFC10312" 
            type="text"
            {...register("code", {
                required: "The field cannot be empty",
                maxLength: {
                    value: 17,
                    message: "Enter up to 17 characters, letters and digits only"
                },
                pattern: {
                    value: VIN_REGEX,
                    message: "Enter up to 17 characters, letters and digits only"
                }
            })} />
            <button className={styles.submit_button} type="submit" disabled={isPending}>Decode</button>
            {errors.code?.message &&
            (<span className={styles.error_massage}>
                {errors.code.message}
            </span>)}
        </form>
    </>)
}

export default Form