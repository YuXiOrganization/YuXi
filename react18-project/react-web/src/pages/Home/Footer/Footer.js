import "./index.scss";
import { footerDataSource } from "@/assets/dataSource/dataSource";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultOpenKeys } from "@/store/modules/headerStore.js";
const FooterCard = ({ cardList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (item) => {
    if (!item.url) return;
    navigate(item.url);
    dispatch(setDefaultOpenKeys(item.url));
  };

  return (
    <div className="footer_list_card">
      <div className="list_card_title">{cardList.title}</div>
      {cardList.list.map((item, index) => {
        return (
          <div
            onClick={() => handleClick(item)}
            key={index}
            className="list_card_text"
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
const LinkBox = ({ linkList, isShow, onClick }) => {
  return (
    <div className="footer_link_add" onClick={onClick}>
      {linkList.imgUrl && (
        <img className="footer_link_img" alt="" src={linkList.imgUrl} />
      )}

      <span className={linkList.url ? "footer_link_text" : ""}>
        {linkList.text}
      </span>
      {isShow && <div className="footer_link_line">|</div>}
    </div>
  );
};
const Footer = () => {
  const openNewTab = (url) => {
    // console.log("url", url);
    if (!url) {
      return;
    }
    window.open(url, "_blank"); // 打开新标签页
    // 或者如果只是想在当前窗口打开新页面
    // navigate(url);
  };

  const { isMobile } = useSelector((state) => state.app);
  return (
    <div className="footer">
      <div className="footer_list">
        {footerDataSource.cardList.map((item, index) => {
          return <FooterCard key={index} cardList={item}></FooterCard>;
        })}
      </div>

      <div className="footer_link">
        {footerDataSource.linkList.map((item, index) => {
          return (
            <LinkBox
              onClick={() => openNewTab(item.url)}
              key={index}
              linkList={item}
              isShow={
                footerDataSource.linkList.length - 1 !== index && !isMobile
              }
            ></LinkBox>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
