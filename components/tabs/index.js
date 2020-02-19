// components/tabs/tabs.js
Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabsChange(e){
      let index = e.currentTarget.dataset;
      this.triggerEvent("tabsChange",index)
    }
  }
})
