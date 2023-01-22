import { useState } from 'react';

interface ValidationErrors {
    [key: string]: string | string[];
}

export function useValidationErrors(): { errors: ValidationErrors, handleErrors: (error: any) => void } {
    const [errors, setErrors] = useState<ValidationErrors>({});

    function handleErrors(error: { graphQLErrors: Array<{ extensions: { validation: ValidationErrors } }> }) {
        // Initialize an empty object to store the validation errors
        let validationErrors: ValidationErrors = {}
        // Iterate over the array of graphQLErrors
        error.graphQLErrors.forEach(({ extensions }) => {
            // Check if there are validation errors.
            if (extensions && extensions.validation) {
                // Iterate over the entries of the validation object
                Object.entries(extensions.validation).forEach(([key, value]) => {
                    // Split the key by "." and get the second part, which is the field name
                    let field = key.split('.')[1];
                    if (Array.isArray(value)) {
                        // Iterate over the array of errors
                        value.map((error: string, index: number) => {
                            // Remove the "input." prefix from the error message
                            let message = error.replace("input.", "");
                            // Assign the error message to a property of the validationErrors object using the field name and index as the key
                            return validationErrors[field + index] = message.trim();
                        });
                    } else {
                        let message = value.replace("input.", "");
                        validationErrors[field] = message;
                    }
                });
            }
        });
        // Update the errors state with the validation errors
        setErrors(validationErrors);
    }

    return { errors, handleErrors };
}