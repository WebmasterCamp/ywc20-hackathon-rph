import "./GradientCard.css";

interface GradientCardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const GradientCard = ({ title, description, children }: GradientCardProps) => {
    return (
        <div className="gradient-card">
            <img src="/story-thumbnail.jpg" alt="story-thumbnail" />
            <div className="gradient-card-content">
                <div className="text-[20px] mt-[16px] font-bold text-white">
                    {title}
                </div>
                {children}
                <div className="gradient-card-description text-white">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default GradientCard; 