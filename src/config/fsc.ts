interface sfc {
  name: string;
  componentName: string;
  desc: string;
}

// 试验场配置
export const sfcConfigList: sfc[] = [
  {
    name: "地图实验",
    componentName: "aMap",
    desc: "使用typeScript重构地图、地图内部存在保存bounds机制、下转视角、回退视角"
  },
  {
    name: "树实验",
    componentName: "treeComponentTest",
    desc: "使用typeScript尝试封装自己的树、目前支持正选、反选、是否显示checkBox"
  },
  {
    name: "插槽实验",
    componentName: "slot",
    desc: "动态插槽、插槽返回值、具名插槽、匿名插槽、并实现自己的简单表格、支持所有的插槽选项"
  }
];
