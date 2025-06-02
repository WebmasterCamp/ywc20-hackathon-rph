import MainCardBase from "../MainCardBase/MainCardBase";
import SearchInput from "../SearchInput/SearchInput";
import "./GhostNearMeSearchCard.css";

interface GhostNearMeSearchCardProps {
  onSearch: (query: string) => void;
}

const GhostNearMeSearchCard = ({ onSearch }: GhostNearMeSearchCardProps) => {
  return (
    <MainCardBase>
      <div className="text-[32px] font-bold text-white text-center mb-[24px]">
          ค้นหาผีใกล้ฉัน
        </div>
        <SearchInput onSearch={onSearch} />
    </MainCardBase>
  );
};

export default GhostNearMeSearchCard;
