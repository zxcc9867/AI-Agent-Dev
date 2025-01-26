import "./View.css";
import { getEmotionImage } from "../util/get-emtion-images";
import { emotionList } from "../util/constants";
const View = ({ emotionId, content }) => {
  console.log(`emotionId: ${emotionId}`);

  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );
  return (
    <div className="View">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)}></img>
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section"></section>
      <h4>오늘의 일기</h4>
      <div className="content_wrapper">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default View;
