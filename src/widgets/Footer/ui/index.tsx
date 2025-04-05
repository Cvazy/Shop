import ScrollVelocity from "@/components/ScrollVelocity/ScrollVelocity";
import Lanyard from "@/components/Lanyard/Lanyard";

export const Footer = () => {
  return (
    <div className={"min-h-dvh w-full bg-background h-max relative z-10"}>
      <div className={"flex flex-col items-center gap-10 w-full h-full"}>
        <div className={"py-8 w-full md:py-10 xl:py-12"}>
          <ScrollVelocity
            texts={["AlcoShop"]}
            className="custom-scroll-text text-foreground mr-10"
          />
        </div>
      </div>

      <div className={"w-full h-full grayscale"}>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/*<div className={"flex-grow px-4 w-full"}>*/}
      {/*  <footer className={"max-w-limit w-full"}></footer>*/}
      {/*</div>*/}
    </div>
  );
};
