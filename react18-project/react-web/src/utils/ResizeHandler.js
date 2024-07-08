import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setIsMobile } from "@/store/modules/appStore";
const ResizeHandler = ({ breakpoint = 1024 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      // console.log("执行", window.innerWidth, breakpoint);
      dispatch(setIsMobile(window.innerWidth < breakpoint));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ensure state is set on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, breakpoint]);

  return null;
};

export default ResizeHandler;
