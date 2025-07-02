const Footer = () => {
  const KfcIndia = [
    "KFC india",
    "About Kfc",
    "Careers",
    "Our Golden Past",
    "Responsible",
    "Disclosure",
  ];
  const Legal = [
    "Legal",
    "Terms and",
    "Conditions",
    "Privacy Policy",
    "Disclaimer",
    "Caution Notice",
  ];
  const KfcFood = [
    "Kfc Food",
    "Menu",
    "Order Bookings",
    "Gift Card",
    "Nutrition &",
    "Allergen",
  ];
  const Support = [
    "Support",
    "Get Help",
    "Contact Us",
    "Kfc FeedBack",
    "Privacy Policy",
  ];
  const AppLink = [
    "https://images.ctfassets.net/wtodlh47qxpt/6BdZsyjLn64c06uCIE73d1/fb530f5d5231533b049463f6c7e8a2b1/google_play.svg?h=90&w=266&fm=webp&fit=fill",
    "https://images.ctfassets.net/wtodlh47qxpt/em3mcMuAdXWlgucSJiTbS/d3ae7e51ed101d829e459355e255c47f/apple.svg?h=90&w=266&fm=webp&fit=fill",
  ];

  return (
    <div className="flex flex-row bg-black/85 text-white p-5 w-full items-center justify-center gap-12">
      <img
        src="https://images.ctfassets.net/wtodlh47qxpt/25FSYFuEtGct8NSrtpKe6d/b602f6fe0bf294e6a6dff5d7648bf594/KFC_Logo.svg?h=120&w=120&fm=webp&fit=fill"
        alt="Kfc Logo"
        className="w-20 h-20"
      ></img>
      <div className="flex flex-col gap-1">
        {KfcIndia.map((item) => {
          return <h2 className="cursor-pointer">{item}</h2>;
        })}
      </div>
      <div className="flex flex-col gap-1">
        {Legal.map((item) => {
          return <h2 className="cursor-pointer">{item}</h2>;
        })}
      </div>
      <div className="flex flex-col gap-1">
        {KfcFood.map((item) => {
          return <h2 className="cursor-pointer">{item}</h2>;
        })}
      </div>
      <div className="flex flex-col gap-1">
        {Support.map((item) => {
          return <h2 className="cursor-pointer">{item}</h2>;
        })}
      </div>
      <div className="flex flex-row gap-1">
        <img
          src="https://images.ctfassets.net/wtodlh47qxpt/6qgKpWUOIsrIiazhk3cdmF/d60b4c20be69bab1f939bf33348b67e9/Find_KFC.svg?h=15&w=11&fm=webp&fit=fill"
          alt="location-icon"
        ></img>
        <h2 className="underline cursor-pointer">Find a KFC </h2>
      </div>
      <div className="flex flex-col gap-4">
        {AppLink.map((item) => {
          return (
            <img
              src={item}
              alt="app-link"
              className="cursor-pointer gap-4 w-50 h-10"
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
