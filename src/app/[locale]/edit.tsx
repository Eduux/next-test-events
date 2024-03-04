import { useTranslations } from "next-intl";
import { PenIcon } from "lucide-react";
import Button from "@/components/Button";

import { IEvent } from "@/domain/event/types";

import { useEventsStore } from "@/store/Events";

interface IProps {
  id: IEvent["id"];
}

export default function Edit({ id }: IProps) {
  const t = useTranslations("List");

  const eventStore = useEventsStore();

  const editEvent = async () => {
    eventStore.setForEdit(eventStore.posts.find((post) => post.id === id)!);
  };

  return (
    <Button data-testid="edit-button" typeColor="green" onClick={editEvent}>
      <PenIcon size={18} className="mr-3" />
      {t("edit")}
    </Button>
  );
}
