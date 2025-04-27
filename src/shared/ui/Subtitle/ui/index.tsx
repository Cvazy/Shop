import FuzzyText from "@/components/FuzzyText/FuzzyText";

export const Subtitle = ({ text }: { text: string }) => {
  return (
    <h2>
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.4}>
        {text}
      </FuzzyText>
    </h2>
  );
};
