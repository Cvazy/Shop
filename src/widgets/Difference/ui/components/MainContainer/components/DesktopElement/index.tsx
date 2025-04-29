interface IDesktopElementProps {
  name: string;
  value: string;
  isAIBlock?: boolean;
}

export const DesktopElement = ({
  name,
  value,
  isAIBlock = false,
}: IDesktopElementProps) => {
  return (
    <div className={"relative bg-[#0A0A0A] w-fit min-w-52"}>
      <div className={"absolute top-0 left-0"}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.102 3.94936C17.0614 3.98213 17.0107 4 16.9585 4L7.04146 4C6.98926 4 6.93863 3.98213 6.89799 3.94936L2.50415 0.406506C2.33629 0.27116 2.43199 1.69783e-07 2.64762 1.46895e-07L21.3524 -1.8386e-06C21.568 -1.86149e-06 21.6637 0.271158 21.4959 0.406504L17.102 3.94936Z"
            fill={isAIBlock ? "#F63737" : "white"}
            fillOpacity={isAIBlock ? "1.0" : "0.2"}
          />
          <path
            d="M3.94936 6.89799C3.98213 6.93863 4 6.98926 4 7.04146L4 16.9585C4 17.0107 3.98213 17.0614 3.94936 17.102L0.406505 21.4959C0.27116 21.6637 1.91773e-08 21.568 3.21019e-08 21.3524L1.15327e-06 2.64762C1.1662e-06 2.43199 0.271162 2.33629 0.406507 2.50415L3.94936 6.89799Z"
            fill={isAIBlock ? "#F63737" : "white"}
            fillOpacity={isAIBlock ? "1.0" : "0.2"}
          />
        </svg>
      </div>

      <div className={"px-5 py-3 w-full"}>
        <div className={"flex flex-col items-start gap-2 w-full"}>
          <p className={"text-[#6C6C6C] text-left text-sm !leading-[14px]"}>
            {name}
          </p>

          <div className={"w-9 h-px bg-[#3B3B3B]"}></div>

          <div
            dangerouslySetInnerHTML={{ __html: value }}
            className={"text-white text-left text-lg !leading-5"}
          />
        </div>
      </div>

      <div className={"absolute bottom-0 right-0"}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.89799 18.0506C4.93863 18.0179 4.98926 18 5.04146 18L14.9585 18C15.0107 18 15.0614 18.0179 15.102 18.0506L19.4959 21.5935C19.6637 21.7288 19.568 22 19.3524 22L0.647619 22C0.431995 22 0.336292 21.7288 0.504147 21.5935L4.89799 18.0506Z"
            fill={isAIBlock ? "#F63737" : "white"}
            fillOpacity={isAIBlock ? "1.0" : "0.2"}
          />
          <path
            d="M18.0506 15.102C18.0179 15.0614 18 15.0107 18 14.9585L18 5.04146C18 4.98926 18.0179 4.93863 18.0506 4.89799L21.5935 0.504147C21.7288 0.336293 22 0.431996 22 0.64762L22 19.3524C22 19.568 21.7288 19.6637 21.5935 19.4959L18.0506 15.102Z"
            fill={isAIBlock ? "#F63737" : "white"}
            fillOpacity={isAIBlock ? "1.0" : "0.2"}
          />
        </svg>
      </div>
    </div>
  );
};
