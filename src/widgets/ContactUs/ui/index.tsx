import { BlockWrapper, Subtitle } from "@/shared";
import { ContactForm } from "@/features";

export const ContactUs = () => {
  return (
    <BlockWrapper>
      <Subtitle text={"Contact Us"} />

      <ContactForm />
    </BlockWrapper>
  );
};
