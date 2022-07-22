import { addDays } from "date-fns";
import * as yup from "yup";

export const RentRequestValidationSchema = yup.object({
    startDate: yup.date().min(addDays(new Date(), -1)).required(),
    endDate: yup.date().min(yup.ref("startDate")).required(),
});