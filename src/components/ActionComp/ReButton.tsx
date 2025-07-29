export type ReButtonProps = {
  style?: string;
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
};

function ReButton({
  style,
  type,
  name,
  disabled,
  children,
  onClick,
}: ReButtonProps) {
  return (
    <button
      className={style}
      type={type}
      name={name}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ReButton;
