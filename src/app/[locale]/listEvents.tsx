"use client";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEventsStore } from "@/store/Events";

import Edit from "./edit";
import Delete from "./delete";
import Button from "@/components/Button";

import { formatDate } from "@/utils/util";
import { useState } from "react";

export default function ListEvents() {
  const t = useTranslations("List");

  const [seeEventDetails, setEventDetails] = useState<string | null>(null);

  const eventStore = useEventsStore();

  const toogleDetails = (id: string) => {
    setEventDetails((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {eventStore.posts?.map((event) => (
        <div
          key={event.id}
          data-testid={`event-${event.name}`}
          className="border-2 p-4 md:p-6 space-y-3"
        >
          <div className="space-y-2">
            <div>
              <p>
                <strong>{t("name")}</strong>
              </p>
              <p className="line-clamp-1 mt-1">{event.name}</p>
            </div>
            {seeEventDetails === event.id && (
              <>
                <div>
                  <p>
                    <strong>{t("description")}</strong>
                  </p>
                  <p className="whitespace-pre  mt-1">{event.description}</p>
                </div>
                <div>
                  <p>
                    <strong>{t("date")}</strong>
                  </p>
                  <p className="mt-1">{formatDate(event.date)}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => toogleDetails(event.id)}>
              <Eye className="mr-3" size={18} />
              {seeEventDetails === event.id
                ? t("closeDetails")
                : t("seeDetails")}
            </Button>
            <Edit id={event.id} />
            <Delete id={event.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
