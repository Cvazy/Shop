export interface IComparisons {
  id: number | string;
  title: string;
  photo_for_difference: string;
  exclusivity: string;
  delivery: string;
  time_frame: string;
}

export interface ITransformComparisonsElement {
  name: string;
  value: string;
}

export interface ITransformComparisons {
  id: number | string;
  title: string;
  photo_for_difference: string;
  elements: ITransformComparisonsElement[];
}
