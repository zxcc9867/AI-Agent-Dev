import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emtion-images";


const EmotionItem = ({ emotionId, emotionName,isSelected, onClick }) => {
  return (
    <div onClick={onClick}
    className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}`: ""}`}>
      <img className="emotion_img" src={getEmotionImage(emotionId)}></img>
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};
export default EmotionItem;
