"use client";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEffect } from "react";

import api from "@/utils/axios";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { IEvent } from "@/domain/event/types";

import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Info from "@/components/Info";
import LoadingComponent from "@/components/Loading";

import { wiwdowGoTop } from "@/utils/util";

import { useEventsStore } from "@/store/Events";

interface IFields extends IEvent {}

export default function AddOrEditEvent() {
  const t = useTranslations("Form");

  const eventStore = useEventsStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    reset,
    clearErrors,
    setValue,
    watch,
  } = useForm<IFields>();

  const mustEditThisEvent = eventStore.postToEdit;

  const setEdit = () => {
    if (!!mustEditThisEvent) {
      wiwdowGoTop();
      reset();
      Object.entries(mustEditThisEvent).forEach(([name, value]) => {
        setValue(name as keyof IEvent, value);
      });
    }
  };

  const cancelEdit = () => {
    eventStore.setForEdit(null);
    reset();
  };

  const onSubmit: SubmitHandler<IFields> = async (formState) => {
    clearErrors();
    try {
      if (!!mustEditThisEvent) {
        const response = await api.put(`/api/`, {
          ...formState,
          id: mustEditThisEvent.id,
        });

        eventStore.edit(response.data as IEvent);
      } else {
        const response = await api.post(`/api/`, formState);
        eventStore.add(response.data as IEvent);

        reset();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errors = err?.response?.data?.errors;

        if (errors instanceof Array) {
          errors.forEach((err: ZodError) => {
            setError("root", { message: err.message });
          });
        } else {
          setError("root", { message: "Error on create event." });
        }
      }
    }
  };

  watch(() => {
    reset({}, { keepValues: true });
  });

  useEffect(() => {
    setEdit();
  }, [mustEditThisEvent]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-gray-200 p-4 md:p-6 text-center mt-6 md:mt-0 rounded"
    >
      <p className="mb-6 text-lg font-semibold text-black">
        {!!mustEditThisEvent ? t("edit") : t("add")}
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <Input
            label={t("name")}
            data-testid="name-field"
            placeholder={t("name")}
            name="name"
            error={!!errors.name}
            disabled={isSubmitting}
            register={register}
            validationSchema={{
              required: true,
            }}
          />
        </div>

        <div>
          <Input
            label={t("date")}
            data-testid="date-field"
            placeholder={t("date")}
            type="date"
            name="date"
            error={!!errors.date}
            disabled={isSubmitting}
            register={register}
            validationSchema={{
              required: true,
            }}
          />
        </div>

        <div>
          <TextArea
            label={t("description")}
            data-testid="description-field"
            placeholder={t("description")}
            name="description"
            disabled={isSubmitting}
            error={!!errors.description}
            register={register}
            validationSchema={{
              required: true,
              minLength: {
                value: 15,
                message: t("descriptionLength"),
              },
            }}
          />
        </div>
      </div>
      {!!errors && (
        <div className="space-y-2 mb-4">
          {!!errors.root && (
            <Info
              type="error"
              message={errors.root?.message!}
              data-testid="error-name"
            />
          )}
          {!!errors.name && (
            <Info
              type="error"
              message={t("nameRequired")}
              data-testid="error-name"
            />
          )}
          {!!errors.date && (
            <Info
              type="error"
              message={t("dateRequired")}
              data-testid="error-comment"
            />
          )}
          {!!errors.description && (
            <Info
              type="error"
              message={errors.description.message || t("descriptionRequired")}
              data-testid="error-comment"
            />
          )}
        </div>
      )}

      {isSubmitSuccessful && (
        <div className="mb-4">
          <Info
            type="success"
            data-testid="success-form"
            message={
              !!mustEditThisEvent ? t("successEdited") : t("successCreate")
            }
          />
        </div>
      )}

      <div className="flex items-center justify-center">
        {isSubmitting ? (
          <LoadingComponent />
        ) : (
          <>
            {!!mustEditThisEvent && (
              <Button type="button" typeColor="red" onClick={cancelEdit}>
                {t("cancel")}
              </Button>
            )}
            <Button type="submit" data-testid="submit-button">
              {!!mustEditThisEvent ? t("edit") : t("add")}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
