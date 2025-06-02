import MainCardBase from "../MainCardBase/MainCardBase";
import SearchInput from "../SearchInput/SearchInput";
import "./GhostNearMeSearchCard.css";
const GhostNearMeSearchCard = () => {
  return (
    <MainCardBase>
      <div className="text-[32px] font-bold text-white text-center mb-[24px]">
          ค้นหาผีใกล้ฉัน
        </div>
        <SearchInput />
    </MainCardBase>
  );
};

export default GhostNearMeSearchCard;
