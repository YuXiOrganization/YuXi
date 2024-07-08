import { Carousel } from "antd";
// import imgs001 from "../../assets/images/homePage/001.webp";
const CustomCarousel = ({ urls }) => {
  const contentStyle = {
    maxWidth: "calc(100% )",
    maxheight: "100%",
    // width: "100%",
    // height: "700px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const CarouselImg = ({ url }) => {
    return (
      <div>
        <img alt="" style={contentStyle} src={url} />
      </div>
    );
  };
  return (
    <Carousel autoplay>
      {urls.map((item, index) => (
        <CarouselImg key={index} url={item}></CarouselImg>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
