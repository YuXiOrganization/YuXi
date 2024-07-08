const FeatureFifth = ({ newsImg, cardList, getApp }) => {
  const FifthCard = ({ cardList }) => {
    return (
      <div className="box_card_news">
        <div className="card_news_title">{cardList.title}</div>
        <div className="card_news_time">{cardList.time}</div>
      </div>
    );
  };
  return (
    <div className="home_page_fifth">
      <div className="page_fifth_title">新闻动态</div>
      {!getApp.isMobile && (
        <div className="page_fifth_box">
          <div className="fifth_box_card">
            {cardList.map((item, index) => {
              return <FifthCard key={index} cardList={item}></FifthCard>;
            })}
            <div className="box_card_line"></div>
            <div className="box_card_more">{`了解更多资讯 >`}</div>
          </div>
          <img className="fifth_box_img" alt="" src={newsImg} />
        </div>
      )}
    </div>
  );
};

export default FeatureFifth;
