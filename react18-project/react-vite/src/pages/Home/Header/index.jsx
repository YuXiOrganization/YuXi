import "./index.scss";
import { MenuOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { setDefaultOpenKeys } from "@/store/modules/appStore";
import { headerDataSource } from "@/assets/dataSource/appDataSource";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobile, defaultOpenKeys } = useSelector((state) => state.app);
  const [menuItems, setMenuItems] = useState([]);

  const handleClick = useCallback(
    (e, shouldClose) => {
      navigate(e.key);
      dispatch(setDefaultOpenKeys(e.key));
      if (shouldClose) {
        setOpen(false);
      }
    },
    [navigate, dispatch]
  );

  useEffect(() => {
    const updatedMenuItems = headerDataSource.items.map((item) => {
      if (!isMobile && item.children) {
        return {
          ...item,
          label: (
            <span>
              {item.label} <DownOutlined />
            </span>
          ),
        };
      }
      return item;
    });
    setMenuItems(updatedMenuItems);
  }, [isMobile]);

  const MobileMenu = () => (
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
        <img
          alt="Logo"
          className="header_ico_img"
          src={headerDataSource.headerImg}
        />
        <div className="header_ico_text">{headerDataSource.title}</div>
        {!isMobile && (
          <Menu
            onClick={(e) => handleClick(e, false)}
            selectedKeys={[defaultOpenKeys]}
            mode="horizontal"
            items={menuItems}
          />
        )}
      </div>
      {isMobile && <MobileMenu />}
    </div>
  );
};

export default Header;
