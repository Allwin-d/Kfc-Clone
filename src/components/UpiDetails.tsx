type UpiProps = {
  upi: {
    upidetail: string;
  };
  setUpi: React.Dispatch<
    React.SetStateAction<{
      upidetail: string;
    }>
  >;
};

const UpiDetails = ({ upi, setUpi }: UpiProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUpi((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col space-y-3">
      <p>UPI Detail</p>
      <input
        type="text"
        name="upidetail"
        placeholder="e.g., Kylian@ybl"
        value={upi.upidetail}
        onChange={handleChange}
        className="border-2 to-black pl-2 p-1"
      />
    </div>
  );
};

export default UpiDetails;
