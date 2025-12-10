// src/hooks/useFormWithValidation.js
import { useCallback, useState } from "react";

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, errors, isValid, handleChange, resetForm };
}

// // ========================================validadod ===================

// // ULTIMAS ATUALIZAÇÕES FICOU PERFEITO (SÓ FALTA OS LOADING)
// // src/hooks/useFormWithValidation.js
// import { useCallback, useState } from "react";

// export default function useFormWithValidation(initialValues = {}) {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setValues((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
//     setIsValid(e.target.closest("form").checkValidity());
//   };

//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsValid = false) => {
//       setValues(newValues);
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     []
//   );

//   return { values, errors, isValid, handleChange, resetForm };
// }


// import { useState, useCallback } from "react";

// export default function useFormValidator(initialValues = {}, validators = {}) {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   // Atualiza campos
//   const handleChange = useCallback(
//     (e) => {
//       const { name, value, validity, validationMessage } = e.target;

//       setValues((prev) => ({ ...prev, [name]: value }));

//       let error = "";

//       // Validação personalizada (ex: URL é imagem?)
//       if (validators[name]) {
//         error = validators[name](value);
//       } else if (!validity.valid) {
//         error = validationMessage;
//       }

//       setErrors((prev) => ({ ...prev, [name]: error }));

//       // formulário válido?
//       setIsValid(
//         e.target.form.checkValidity() &&
//           Object.values({ ...errors, [name]: error }).every((msg) => msg === "")
//       );
//     },
//     [errors, validators]
//   );

//   // Reset do form quando popup abre
//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsValid = false) => {
//       setValues(newValues);
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     []
//   );

//   return {
//     values,
//     errors,
//     isValid,
//     handleChange,
//     resetForm,
//   };
// }
