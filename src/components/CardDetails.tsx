type CardProps = {
  card: {
    cardname: string;
    cardnumber: string;
    monthyear: string;
    cvv: string;
  };
  setCard: React.Dispatch<
    React.SetStateAction<{
      cardname: string;
      cardnumber: string;
      monthyear: string;
      cvv: string;
    }>
  >;
};

const CardDetails = ({ card, setCard }: CardProps) => {
    
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col space-y-3">
      <p>Card Details</p>
      <p>Card Name:</p>
      <input
        type="text"
        name="cardname"
        value={card.cardname}
        onChange={handleChange}
        className="border-2 black pl-2 focus:outline-none p-1"
      />
      <p>Card Number:</p>
      <input
        type="text"
        name="cardnumber"
        value={card.cardnumber}
        onChange={handleChange}
        className="border-2 black pl-2 focus:outline-none p-1"
      />
      <input
        type="text"
        name="monthyear"
        placeholder="MM/YY"
        value={card.monthyear}
        onChange={handleChange}
        className="border-2 to-black pl-2 focus:outline-none p-1"
      />
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={card.cvv}
        onChange={handleChange}
        className="border-2 to-black pl-2 focus:outline-none p-1"
      />
    </div>
  );
};

export default CardDetails;
