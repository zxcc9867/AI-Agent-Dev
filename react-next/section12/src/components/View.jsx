import './View.css' 
import { useParams } from 'react-router-dom';
import EmotionItem from './EmotionItem';
import { getEmotionImage } from '../util/get-emtion-images';
import { emotionList } from '../util/constants';
const View = ({emotionId,content})=>{
    const parmas = useParams();
    const emotionItem = emotionList.find((item) => String(item.emotionId) === String(parmas.id))
    console.log(parmas)
    return (
      <div className="View">
        <section className="img_section">
          <h4>오늘의 감정</h4>
          <div
            className={`emotion_img_wrapper emotion_img_wrapper_${emotionItem.emotionId}`}
          >
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
}

export default View;