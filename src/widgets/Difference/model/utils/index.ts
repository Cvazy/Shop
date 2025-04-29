import { IComparisons, ITransformComparisons } from "@/entities";

export const transformData = (data: IComparisons[]) => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    photo_for_difference: item.time_frame,
    elements: Object.entries(item)
      .filter(
        ([key]) => key !== "id" && key !== "title" && key !== "time_frame",
      )
      .map(([key, value]) => ({
        name: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        value: value,
      })),
  })) as ITransformComparisons[];
};
