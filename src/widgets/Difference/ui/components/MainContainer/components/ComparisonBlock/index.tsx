import styles from "./ComparisonBlock.module.css";

import { CSSProperties, Fragment } from "react";
import {
  ITransformComparisons,
  ITransformComparisonsElement,
} from "@/entities";

interface IComparisonBlock {
  isAIBlock: boolean;
  data: ITransformComparisons;
  style?: CSSProperties;
}

export const ComparisonBlock = ({
  data,
  isAIBlock,
  style,
}: IComparisonBlock) => {
  let elements: ITransformComparisonsElement[] = [];

  if (data) {
    elements = data.elements;
  }

  return (
    <div
      className={`flex flex-col items-center ${isAIBlock ? "lg:items-end" : "lg:items-start"} gap-10 w-full lg:max-w-[300px]`}
    >
      <div
        style={style || {}}
        className={`flex flex-col items-center ${isAIBlock ? "lg:items-end" : "lg:items-start"} gap-5 w-full`}
      >
        {elements &&
          elements.map(({ name, value }, index) => (
            <Fragment key={name}>
              <div
                className={`flex flex-col items-center ${isAIBlock ? "lg:items-end" : "lg:items-start"} w-full`}
              >
                <p
                  className={`text-center ${isAIBlock ? "lg:text-end" : "lg:text-start"} text-[15px] text-gray`}
                >
                  {name}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: value }}
                  className={`flex justify-center text-center ${isAIBlock ? "lg:justify-end lg:text-end" : "lg:justify-start lg:text-start"} w-full ${styles.DescriptionBlock}`}
                />
              </div>

              {index !== elements.length - 1 && (
                <div className={"w-10 h-px bg-gray"}></div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
