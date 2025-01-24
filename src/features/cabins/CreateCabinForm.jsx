import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

//eslint-disable-next-line
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
//eslint-disable-next-line
function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log(data);
    isEditSession
      ? editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: () => {
              reset();
              closeModal;
            },
          }
        )
      : createCabin(
          { ...data, image: image },
          {
            onSuccess: () => {
              reset();
              closeModal?.();
            },
          }
        );
  }

  function onError(errors) {
    console.log(errors);
  }
  if (isWorking) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This Field is Required" })}
        />
      </FormRow>

      <FormRow label="MaxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This Field is Required",
            validate: (value) => {
              value > getValues().regularPrice ||
                "Discount should be less than regular price";
              console.log(value);
            },
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This Field is Required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow2>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            closeModal?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add Cabin"}
        </Button>
      </FormRow2>
    </Form>
  );
}
CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // Define other properties inside the editValues object as needed
    name: PropTypes.string,
    location: PropTypes.string,
    capacity: PropTypes.number,
  }),
};

// CreateCabinForm.defaultProps = {
//   cabinToEdit: {
//     id: null,
//     name: "",
//     location: "",
//     capacity: 0,
//   },
// };
export default CreateCabinForm;
