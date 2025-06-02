import SearchInput from "../SearchInput/SearchInput";
import "./GhostNearMeSearchCard.css";
const GhostNearMeSearchCard = () => {
  return (
    <div className="ghost-near-me-search-card flex justify-center items-center">
      <div className="py-[78px] w-[80%]">
        <div className="text-[32px] font-bold text-white text-center mb-[24px]">
          ค้นหาผีใกล้ฉัน
        </div>
        <SearchInput />
      </div>
    </div>
  );
};

export default GhostNearMeSearchCard;
