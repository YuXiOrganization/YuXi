// import { DownOutlined } from "@ant-design/icons";
// import imgs01 from "../images/homePage/bg-block.png";
import img001 from "@/assets/images/homePage/001.webp";

import img003 from "@/assets/images/homePage/003.webp";
import img004 from "@/assets/images/homePage/004.webp";
import img005 from "@/assets/images/homePage/005.webp";

import img007 from "@/assets/images/homePage/007.webp";
import img008 from "@/assets/images/homePage/008.webp";
import img009 from "@/assets/images/homePage/009.webp";
import img010 from "@/assets/images/homePage/010.webp";

import img011 from "@/assets/images/homePage/011.webp";
import img012 from "@/assets/images/homePage/012.webp";
import img013 from "@/assets/images/homePage/013.webp";

import img014 from "@/assets/images/homePage/014.webp";
import img015 from "@/assets/images/homePage/015.webp";
const carouselDataSource = {
  urls: [img001],
};
const firstDataSource = {
  cardList: [
    {
      title: "聚合支付",
      text: "聚生意聚合支付平台，实现支付通道、支付方式、支付场景、商户类型、调用方式的多种模式，深度赋能商户＆企业数字化升级",
      url: img003,
    },
    {
      title: "行业解决方案",
      text: "以支付为切入点，打通线下各行各业数字化能力，在零售、餐饮、酒店、娱乐等领域，打造一站式行业数字化解决方案",
      url: img005,
    },
    {
      title: "我们的优势",
      text: "支持多家支付通道入网，多种收银产品可选，专业的售前/售后服务团队",
      url: img004,
    },
  ],
};
const thirdDataSource = {
  cardList: [
    {
      id: 1,
      title: "零售行业",
      text: "解决行业痛点，提供解决方案",
      url: img007,
      optionList: [
        "商品品类辅助优化",
        "经营状况诊断",
        "智能供应链",
        "现场AI管理",
      ],
    },
    {
      id: 2,
      title: "餐饮行业",
      text: "解决行业痛点，提供解决方案",
      url: img008,
      optionList: ["顾客自助点餐、支付 拷贝", "多种营销方式", "连锁商户对账"],
    },
    {
      id: 3,
      title: "酒店行业",
      text: "解决行业痛点，提供解决方案",
      url: img009,
      optionList: ["缩短入住流程", "减轻财务压力", "多种营销方式"],
    },
    {
      id: 4,
      title: "KTV、酒吧、娱乐行业",
      text: "解决行业痛点，提供解决方案",
      url: img010,
      optionList: ["点收一体化", "多种收银方式", "多种营销方式"],
    },
  ],
};
const fourthDataSource = {
  cardList: [
    {
      url: img011,
      title: "现有平台",
      text01: "已经有支付聚合平台",
      text02: "提供商户进件小程序+数据接口",
      text03: "提供一对一客服售后服务",
    },
    {
      url: img012,
      title: "直营团队",
      text01: "有直营业务员团队",
      text02: "提供业务员数据报表",
      text03: "提供一对一客服售后服务",
    },
    {
      url: img013,
      title: "支付对接",
      text01: "需要实现发起支付的功能",
      text02: "提供发起支付接口+数据接口",
      text03: "提供一对一客服售后服务",
    },
  ],
};

const fifthDataSource = {
  newsImg: img014,
  cardList: [
    {
      title: "真商助手实现查看业绩、提现...",
      time: "2024-05-26 14:11:16",
    },
    {
      title: "真商助手实现多渠道入网，商户有更多的选择",
      time: "2024-03-25 15:10:12",
    },
    {
      title: "真商助手助手上线，入网功能已开放",
      time: "2024-01-17 14:12:12",
    },
  ],
};
const headerDataSource = {
  items: [
    {
      label: "首页",
      key: "/app1",
      // icon: <MailOutlined />,
    },

    {
      label: "行业解决方案",
      key: "/app1/SubMenu",
      // icon: <DownOutlined />,
      children: [
        {
          label: "零售行业",
          key: "/app1/Solution/1",
        },
        {
          label: "餐饮行业",
          key: "/app1/Solution/2",
        },
        {
          label: "酒店行业",
          key: "/app1/Solution/3",
        },
        {
          label: "娱乐行业",
          key: "/app1/Solution/4",
        },
      ],
    },
    {
      label: "聚生意聚合支付",
      key: "/app1/PolymerizePay",
      // icon: <MailOutlined />,
    },
    {
      label: "关于我们",
      key: "/app1/SubMenusecond",
      // icon: <DownOutlined />,
      children: [
        {
          label: "关于我们",
          key: "/app1/AboutUs",
        },
        {
          label: "新闻动态",
          key: "/app1/NewsDynamic",
        },
      ],
    },
  ],
};
const footerDataSource = {
  cardList: [
    {
      title: "真商助手",
      list: [
        {
          name: "客服电话：15251891190",
          url: "",
        },
        {
          name: "地址：无锡市梁溪区圆融发展中心1005",
          url: "",
        },
      ],
    },
    {
      title: "聚生意聚合支付",
      list: [
        {
          name: "聚生意聚合支付",
          url: "/app1/PolymerizePay",
        },
      ],
    },
    {
      title: "行业解决方案",
      list: [
        {
          name: "零售行业",
          url: "/app1/Solution/1",
        },
        {
          name: "餐饮行业",
          url: "/app1/Solution/2",
        },
        {
          name: "酒店行业",
          url: "/app1/Solution/3",
        },
        {
          name: "KTV、酒吧、娱乐行业",
          url: "/app1/Solution/4",
        },
      ],
    },
    {
      title: "关于我们",
      list: [
        {
          name: "联系我们",
          url: "/app1/AboutUs",
        },
      ],
    },
  ],
  linkList: [
    {
      text: "© Copyright Lichu 2023-2024",
    },
    {
      text: "苏ICP备2024059264号-1",
      url: "https://beian.cac.gov.cn/?spm=5176.28103460.0.0.67583da23SKqam#/index",
    },
    {
      text: "苏公网安备32021302001559号",
      url: "https://beian.mps.gov.cn/#/query/webSearch",
      imgUrl: img015,
    },
  ],
};

export {
  firstDataSource,
  footerDataSource,
  thirdDataSource,
  fourthDataSource,
  fifthDataSource,
  carouselDataSource,
  headerDataSource
};
