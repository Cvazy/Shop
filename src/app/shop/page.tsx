import { Metadata } from "next";
import { ProductsContainer } from "@/widgets";
import { ShopFilter } from "@/features";
import { ShopContent } from "@/app/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop",
};

const ShopPage = () => {
  return (
    <div className={"main-p w-full h-full"}>
      <div
        className={
          "flex justify-center px-7 w-full h-full sm:px-8 lg:px-10 xl:px-12"
        }
      >
        <div className={"max-w-limit py-8 w-full md:py-10 xl:py-14"}>
          <div
            className={
              "flex flex-col items-start gap-4 w-full lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8"
            }
          >
            <ShopContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
