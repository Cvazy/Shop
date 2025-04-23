import { Checkbox } from "@/shared";
import { ISegmentAndType } from "@/entities";

interface IFiltersMenuProps {
  segments: ISegmentAndType[] | undefined;
  types: ISegmentAndType[] | undefined;
  selectedSegments: Set<number>;
  selectedTypes: Set<number>;
  toggleFilter: (type: "type" | "segment", id: number) => void;
}

export const FiltersMenu = ({
  types,
  segments,
  selectedSegments,
  selectedTypes,
  toggleFilter,
}: IFiltersMenuProps) => {
  return (
    <div
      className={
        "flex flex-col gap-6 p-7 w-full max-lg:bg-gradient-to-tr max-lg:from-black max-lg:to-[#0a0a2e] max-lg:rounded-2xl lg:p-4"
      }
    >
      {segments && segments.length > 0 && (
        <div className={"flex flex-col items-start gap-3 w-full"}>
          <p className={"text-white text-sm lg:text-base text-left"}>Segment</p>

          <ul className={"flex flex-col items-start gap-1.5 w-full"}>
            {segments.map((segment) => (
              <li key={segment.id}>
                <Checkbox
                  label={segment.name}
                  checked={selectedSegments.has(segment.id)}
                  onChange={() => toggleFilter("segment", segment.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {types && types.length > 0 && (
        <div className={"flex flex-col items-start gap-3 w-full"}>
          <p className={"text-white text-sm lg:text-base text-left"}>Type</p>

          <ul className={"flex flex-col items-start gap-1.5 w-full"}>
            {types.map((type) => (
              <li key={type.id}>
                <Checkbox
                  label={type.name}
                  checked={selectedTypes.has(type.id)}
                  onChange={() => toggleFilter("type", type.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
