import { Trash } from "lucide-react";
import Button from "@/components/Button";

import api from "@/utils/axios";

import { useTranslations } from "next-intl";
import { IEvent } from "@/domain/event/types";
import { useEventsStore } from "@/store/Events";
import { useState } from "react";
import LoadingComponent from "@/components/Loading";

interface IProps {
  id: IEvent["id"];
}

export default function Delete({ id }: IProps) {
  const t = useTranslations("List");

  const eventStore = useEventsStore();

  const [loading, setLoading] = useState(false);

  const deleteEvent = async () => {
    setLoading(true);
    try {
      if (id === eventStore.postToEdit?.id) {
        eventStore.setForEdit(null);
      }

      await api.delete(`/api/`, {
        data: { id },
      });

      eventStore.delete(id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button data-testid="delete-button" typeColor="red" onClick={deleteEvent}>
      <>
        {loading ? (
          <div className="mr-3">
            <LoadingComponent color="white" size={18} />
          </div>
        ) : (
          <Trash size={18} className="mr-3" />
        )}
      </>
      {t("delete")}
    </Button>
  );
}
