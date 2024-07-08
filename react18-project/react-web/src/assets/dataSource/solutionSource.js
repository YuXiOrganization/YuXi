import img001 from "@/assets/images/solution/001.webp";
import img002 from "@/assets/images/solution/002.webp";
import img003 from "@/assets/images/solution/003.webp";

import img004 from "@/assets/images/solution/004.webp";
import img005 from "@/assets/images/solution/005.webp";
import img006 from "@/assets/images/solution/006.webp";

import img007 from "@/assets/images/solution/007.webp";
import img008 from "@/assets/images/solution/008.webp";
import img009 from "@/assets/images/solution/009.webp";
import img010 from "@/assets/images/solution/010.webp";

//零售
const solutionSource = {
  cardList1: {
    carouselList: [img007],
    painPoints: [
      {
        url: img001,
        title: "低利润、高成本",
        text: "传统商超的薄利多销模式被线上零售堵截，薄利依然存在，多销难以实现。成本增加、客流堵截，使得传统商超利润被摊薄，营收增长遇瓶颈",
      },
      {
        url: img002,
        title: "数字化水平低",
        text: "传统商超缺乏数字化工具，难以将顾客消费行为进行数据化，从而无法精准地调整SKU",
      },
      {
        url: img003,
        title: "用户粘性、复购率低",
        text: "传统商超的会员积分制吸引力低，因此客户粘性低、复购率低",
      },
    ],
    programme: [
      {
        title: "商品品类优化",
        list: ["千点千面商品规划", "商品销售表现优化", "大数据推荐、淘汰"],
      },
      {
        title: "经营状况诊断",
        list: ["总部、门店报告", "KPI分析、专题诊断", "经营状况智能监控"],
      },
      {
        title: "现场AI管理",
        list: ["销售异常智能处理", "临期商品管理"],
      },
      {
        title: "智能供应链",
        list: ["订货周期配货周期", "补货时间、数量"],
      },
    ],
  },
  //餐饮
  cardList2: {
    carouselList: [img008],
    painPoints: [
      {
        url: img004,
        title: "点餐速度慢",
        text: "高峰时期点餐速度慢，排队现象严重导致翻台率低，甚至出现逃单现象",
      },
      {
        url: img001,
        title: "人员成本居高不下",
        text: "餐饮行业人工成本高，人员流动大。高峰时段人员不足，点餐结账耗时多，容易跑单、漏单",
      },
      {
        url: img005,
        title: "连锁商户对账难",
        text: "会员充值后可以在品牌内跨店使用。分店有独立对账的需求，连锁总店统一对账压力较大",
      },
      {
        url: img006,
        title: "营销方式单一",
        text: "行业同质化严重，门店客流和复购率依赖营销。行业内现有营销渠道单一，营销工具粗放",
      },
    ],
    programme: [
      {
        title: "扫码点餐",
        list: [
          "1、扫码自助点餐",
          "2、订单同步后台",
          "3、扫码加菜",
          "4、扫码确认支付",
        ],
      },
      {
        title: "连锁商户对账",
        list: ["APP对账", "PC端对账", "小程序对账"],
      },
      {
        title: "营销活动",
        list: ["多种营销活动，促进转化与留存"],
      },
      {
        title: "更多详情",
        list: ["更多更全解决方案..."],
      },
    ],
  },
  //酒店
  cardList3: {
    carouselList: [img009],
    painPoints: [
      {
        url: img004,
        title: "入住流程长",
        text: "入店交押金、离店退押金依赖前台完成，离店/住店高峰期等候时间长",
      },
      {
        url: img001,
        title: "押金管理难",
        text: "频繁的押金收款/退回、预留押金退款导致财务记账难度大",
      },
      {
        url: img003,
        title: "复购难度大",
        text: "传统模式下客户离店即服务结束，客户来源太过依赖OTA订单和客户体验后主动选择，没有有效的营销手段来留住客户",
      },
      {
        url: img006,
        title: "营销方式少",
        text: "规模较小的酒店仅能提供住宿服务和简单的日用品，营收方式单一",
      },
    ],
    programme: [
      {
        title: "预授权",
        list: ["1、预定房间", "2、支付房费", "3、入住房间", "4、离店查房"],
      },
      {
        title: "营销活动",
        list: ["多种营销活动，促进转化与留存"],
      },
      {
        title: "更多详情",
        list: ["更多更全解决方案..."],
      },
    ],
  },
  //娱乐
  cardList4: {
    carouselList: [img010],
    painPoints: [
      {
        url: img004,
        title: "点单支付效率低",
        text: "服务人员不足，出现“私收”“跑单”“飞单”等问题",
      },
      {
        url: img002,
        title: "大额交易频繁受阻",
        text: "娱乐场所客单价高，“超限额”现象时常出现",
      },
      {
        url: img003,
        title: "连锁、加盟店难以打通",
        text: "连锁、加盟店铺会员消费核销困难",
      },
    ],
    programme: [
      {
        title: "点收一体化",
        list: [
          "1、服务员移动设备下单并结账",
          "2、吧台开始备货",
          "3、送至客人包厢",
        ],
      },
      {
        title: "连锁门店会员",
        list: ["实现会员任意分店都可消费"],
      },
      {
        title: "收款额度",
        list: ["基础额度，高效提额"],
      },
      {
        title: "更多详情",
        list: ["更多更全解决方案..."],
      },
    ],
  },
};
export default solutionSource;
