import styles from "./From.module.css"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useDecodeVin } from "../../hooks/useDecodeVin";
import { useEffect } from "react";

import RecentSelectStore from "../../Store/RecentSelectStore";
import RecentStore from "../../Store/RecentStore";
import DecodeResultsStore from "../../Store/DecodeResultsStore";


interface InputType {
    code: string
}

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{1,17}$/i;

const Form = () => {
    // form setup
    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm<InputType>(
        {
            mode:"onChange",
            defaultValues:{code:""}
        }
    );

    //seting selected value
    const selectedValue = RecentSelectStore((state) => state.selectedValue);
    useEffect(()=>{
        setValue("code", selectedValue);
    }, [selectedValue]);

    //stors and custom hook functions
    const {mutate, isPending} = useDecodeVin();
    const setDecodeResults = DecodeResultsStore((state) => state.setDecodeResults);
    const setError = DecodeResultsStore((state) => state.setError);
    const setWarning = DecodeResultsStore((state) => state.setWarning);
    const setIsPanding = DecodeResultsStore((state) => state.setIsPanding);
    const recentSetValue = RecentStore((state) => state.setRecent);

    //seting panding state
    useEffect(()=>{
        setIsPanding(isPending)
    },[isPending]);

    //request and response processing with useMutation(TanStack Query)
    const onSubmit:SubmitHandler<InputType> = (data) => {
        const upperData = data.code.toUpperCase()
        mutate(upperData, {
            onSuccess: (response) => {
                setError(false,"")

                const errorField = response.Results.find(el => el.Variable === "Error Code");
                const errorCode = errorField ? Number(errorField.Value) : null;

                if (errorCode !== 0 && errorCode !== null) {
                    const errorTextField = response.Results.find(el => el.Variable === "Error Text");
                    setWarning(true, errorTextField?.Value ?? "VIN decoded with warnings");
                } else {
                    setWarning(false, "");
                }

                setDecodeResults(response.Results);
                recentSetValue(upperData);
                reset();
            },
            onError: (error) => {
                setError(true,`something is wrong: ${error.message}`);
            }
        })
    }

    return(<>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
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