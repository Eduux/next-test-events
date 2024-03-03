export const formatDate = (date: string) => {
  const getDate = new Date(date);

  getDate.setDate(getDate.getDate() + 1);

  return new Intl.DateTimeFormat("en-Us", {
    dateStyle: "medium",
  }).format(getDate);
};

export const wiwdowGoTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
