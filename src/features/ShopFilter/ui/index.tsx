"use client";

import LiquidChrome from "@/components/LiquidChrome/LiquidChrome";
import { Checkbox, InputWithLabel } from "@/shared";
import { IFiltersResponse } from "@/entities";
import { ChangeEvent, useState } from "react";

interface IShopFilterProps {
  filtersData: IFiltersResponse | undefined;
  selectedSegments: Set<number>;
  selectedTypes: Set<number>;
  toggleFilter: (type: "type" | "segment", id: number) => void;
  onSearchChange: (value: string) => void;
}

export const ShopFilter = ({
  filtersData,
  selectedSegments,
  selectedTypes,
  toggleFilter,
  onSearchChange,
}: IShopFilterProps) => {
  const { types, segments } = filtersData || {};
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setInputValue(value);
    onSearchChange(value);
  };

  return (
    <div
      className={
        "w-full h-20 relative rounded-xl lg:h-fit lg:col-span-1 lg:rounded-2xl"
      }
    >
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={1}
        amplitude={0.6}
        className={
          "hidden rounded-xl opacity-20 absolute inset-0 lg:block lg:rounded-2xl"
        }
      />

      <div className={"relative z-10 w-full h-full"}>
        <div className={"flex flex-col gap-6 p-4 w-full"}>
          <InputWithLabel value={inputValue} onChange={handleInputChange} />

          {segments && segments.length > 0 && (
            <div className={"flex flex-col items-start gap-3 w-full"}>
              <p className={"text-white text-sm lg:text-base text-left"}>
                Segment
              </p>

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
              <p className={"text-white text-sm lg:text-base text-left"}>
                Type
              </p>

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
      </div>
    </div>
  );
};
