export const SelectRow = () => {
  return (
    <div className={"p-2 w-full"}>
      <label className="checkbox-wrapper">
        <input type="checkbox" />
        <div className="checkmark">
          <svg stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="3"
              d="M20 6L9 17L4 12"
            ></path>
          </svg>
        </div>
        <span className="label">Neon Checkbox</span>
      </label>
    </div>
  );
};
