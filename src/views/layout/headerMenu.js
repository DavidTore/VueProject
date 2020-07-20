export default {
  name: 'header-menu',
  props: {
    menu: {
      type: Array,
      default: []
    },
    activeIndex: String
  },
  methods: {
    selectHandler(key, keyPath) {
      this.$emit('select', { key, keyPath });
    }
  },
  render(h) {
    const getChildrenContent = res => {
      return res.map(item =>
        item.children
          ? h(
              'el-submenu',
              {
                attrs: {
                  index: item.index,
                  'show-timeout': 10,
                  'hide-timeout': 10
                }
              },
              [
                h(
                  'template',
                  {
                    slot: 'title'
                  },
                  item.label
                ),
                ...getChildrenContent(item.children)
              ]
            )
          : h(
              'el-menu-item',
              {
                attrs: {
                  index: item.index,
                  disabled: item.disabled
                }
              },
              item.label
            )
      );
    };
    return h(
      'el-menu',
      {
        class: {
          'self-elementui-menu': true
        },
        attrs: {
          'default-active': this.activeIndex,
          mode: 'horizontal'
        },
        on: {
          select: this.selectHandler
        }
      },
      getChildrenContent(this.menu)
    );
  }
};
