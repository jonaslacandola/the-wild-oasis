import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const { id: editID, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editID);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isUpdating;
  const { errors } = formState;

  function onSubmit(data) {
    const imageURL =
      typeof data.imageURL === "string" ? data.imageURL : data.imageURL[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, imageURL }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, imageURL },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label={"Cabin name"}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "this field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="imageURL"
          accept="image/*"
          disabled={isWorking}
          {...register("imageURL", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
