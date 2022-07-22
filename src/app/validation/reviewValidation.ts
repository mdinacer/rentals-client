
import * as yup from "yup";

export const reviewValidationSchema = yup.object({
    body: yup.string(),
    rating: yup.number().min(0).max(10).default(0).required("This field is required"),

});