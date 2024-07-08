const FeatureFourth = ({ cardList, getApp }) => {
  //   console.log("cardList", cardList);
  const FourthCard = ({ cardList, isShow }) => {
    return (
      <>
        <div className="fourth_box_card">
          <img className="box_card_img" alt="" src={cardList.url} />
          <div className="box_card_title">{cardList.title}</div>
          <span>{cardList.text01}</span>
          <span>{cardList.text02}</span>
          <span>{cardList.text03}</span>
          <span>{cardList.text04}</span>
        </div>
        {isShow && (
          <img className="fourth_box_img" alt="" src={cardList.url}></img>
        )}
      </>
    );
  };

  return (
    <div className="home_page_fourth">
      <div className="page_fourth_title">合作模式</div>
      {!getApp.isMobile && (
        <div className="page_fourth_box">
          {cardList.map((item, index) => {
            //   console.log("index", index, cardList.length);
            return (
              <FourthCard
                key={index}
                cardList={item}
                isShow={cardList.length - 1 !== index}
              ></FourthCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeatureFourth;
