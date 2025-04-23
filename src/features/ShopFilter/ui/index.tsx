"use client";

import LiquidChrome from "@/components/LiquidChrome/LiquidChrome";
import { FilterToggleIcon, InputWithLabel } from "@/shared";
import { IFiltersResponse } from "@/entities";
import { ChangeEvent, useState, useEffect } from "react";
import { FiltersMenu } from "@/features";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setInputValue(value);
    onSearchChange(value);
  };

  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  return (
    <div
      className={
        "w-full h-auto min-h-20 relative rounded-xl lg:h-fit lg:col-span-1 lg:rounded-2xl"
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
        <div className={"flex flex-col gap-6 p-4 w-full lg:flex-col"}>
          <div className="flex items-center justify-between gap-5 w-full">
            <InputWithLabel value={inputValue} onChange={handleInputChange} />

            <button
              onClick={toggleFilters}
              className="lg:hidden flex items-center justify-center"
              aria-label={isFiltersOpen ? "Close filters" : "Open filters"}
            >
              <FilterToggleIcon isOpen={isFiltersOpen} />
            </button>
          </div>

          <AnimatePresence>
            {(isFiltersOpen || isDesktop) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="overflow-hidden absolute top-20 left-0 right-0 z-20 lg:h-auto lg:opacity-100 lg:static"
              >
                <FiltersMenu
                  types={types}
                  segments={segments}
                  selectedSegments={selectedSegments}
                  toggleFilter={toggleFilter}
                  selectedTypes={selectedTypes}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
