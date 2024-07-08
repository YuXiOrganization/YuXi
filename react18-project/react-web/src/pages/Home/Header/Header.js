import "./index.scss";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setDefaultOpenKeys } from "@/store/modules/headerStore";
import { headerDataSource } from "@/assets/dataSource/dataSource";
import img001 from "@/assets/images/public/favicon.webp";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { defaultOpenKeys } = useSelector((state) => state.header);
  const { isMobile } = useSelector((state) => state.app);

  const handleClick = (e, shouldClose) => {
    navigate(e.key);
    dispatch(setDefaultOpenKeys(e.key));
    if (shouldClose) {
      setOpen(false);
    }
  };

  const MobileTable = ({ handleClick }) => (
    <>
      {open && (
        <div className="header_btn_table">
          <Menu
            onClick={(e) => handleClick(e, true)}
            selectedKeys={[defaultOpenKeys]}
            mode="inline"
            items={headerDataSource.items}
          />
        </div>
      )}
      <div className="header_btn">
        {open ? (
          <CloseOutlined
            onClick={() => setOpen(!open)}
            className="header_btn_icon"
          />
        ) : (
          <MenuOutlined
            onClick={() => setOpen(!open)}
            className="header_btn_icon"
          />
        )}
      </div>
    </>
  );

  return (
    <div className="header">
      <div className="header_ico">
        <img alt="Logo" className="header_ico_img" src={img001} />
        <div className="header_ico_text">真商助手</div>
        {!isMobile && (
          <Menu
            onClick={(e) => handleClick(e, false)}
            selectedKeys={[defaultOpenKeys]}
            mode="horizontal"
            items={headerDataSource.items}
          />
        )}
      </div>

      {isMobile && <MobileTable handleClick={handleClick} />}
    </div>
  );
};

export default Header;
