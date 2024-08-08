import img001 from "@/assets/images/public/001.webp";

const headerDataSource = {
  title:"语汐",
  headerImg: img001,
  items: [
    {
      label: "首页",
      key: "/app1",
    },
    {
      label: "Demo",
      key: "/app1/demo",
    },
    {
      label: "Demo1",
      key: "/app1/demo1",
    },
    // {
    //   label: "关于我们",
    //   key: "/app1/SubMenusecond",
    //   children: [
    //     {
    //       label: "关于我们",
    //       key: "/app1/AboutUs",
    //     },
    //     {
    //       label: "新闻动态",
    //       key: "/app1/NewsDynamic",
    //     },
    //   ],
    // },
  ],
};

export { headerDataSource };
