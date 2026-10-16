import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import useCreateLawFirm from "~/hooks/useCreateLawFirm";
import type { CreateLawFirmRequest } from "~/types/law-firm-types";

const validationSchema = yup.object({
  name: yup.string().label("Name").trim().required().min(1).max(50),
  address: yup.string().label("Address").trim().required().min(1).max(100),
  phoneNumber: yup.string().label("Phone number").trim().required(),
  email: yup.string().label("Email").trim().required().email(),
});

const fields: { name: keyof CreateLawFirmRequest; label: string; type?: string }[] = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address" },
  { name: "phoneNumber", label: "Phone number", type: "tel" },
  { name: "email", label: "Email", type: "email" },
];

export default function CreateLawFirmForm() {
  const { createLawFirmAsync, isSubmitting } = useCreateLawFirm();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: CreateLawFirmRequest) => {
      await createLawFirmAsync(values);
      form.resetForm();
    },
  });

  return (
    <section id="add-firm" className="card" aria-labelledby="add-title">
      <h2 id="add-title">Add a law firm</h2>
      <p className="muted small">Checked in the browser with Formik and Yup, then sent to the API.</p>
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="form-grid">
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              size="small"
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={form.values[field.name]}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched[field.name] && Boolean(form.errors[field.name])}
              helperText={form.touched[field.name] && form.errors[field.name]}
              disabled={isSubmitting}
            />
          ))}
        </div>
        <Button color="primary" variant="contained" type="submit" disabled={isSubmitting} disableElevation>
          {isSubmitting ? "Adding..." : "Add law firm"}
        </Button>
      </form>
    </section>
  );
}
