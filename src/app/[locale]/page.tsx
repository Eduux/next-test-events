"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import api from "@/utils/axios";

import LoadingComponent from "@/components/Loading";

import ListEvents from "./listEvents";
import AddEvent from "./addOrEditEvent";

import { IEvent } from "@/domain/event/types";

import { useEventsStore } from "@/store/Events";

export default function Home() {
  const t = useTranslations("Index");

  const eventStore = useEventsStore();

  const [loading, setIsLoading] = useState(true);

  const getAllEvents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/");

      eventStore.load(response.data as IEvent[]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <main>
      <div>
        <h1 className="text-2xl">{t("title")}</h1>

        <>
          {!loading ? (
            <>
              <div className="my-4">
                <AddEvent />
              </div>

              {eventStore.posts?.length && !loading ? (
                <ListEvents />
              ) : (
                <p>No events registered!</p>
              )}
            </>
          ) : (
            <div className="mt-8">
              <LoadingComponent color="white" size={50} />
            </div>
          )}
        </>
      </div>
    </main>
  );
}
