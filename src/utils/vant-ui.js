// 这个模块只做vant组件注册
import Vue from 'vue'
import {
  Button,
  Cell,
  CellGroup,
  Field,
  Form,
  List,
  NavBar,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Toast,
  Grid,
  GridItem,
  Image as VanImage,
  PullRefresh,
  Popup,
  Icon,
  Lazyload,
  ActionSheet,
  Search,
  Loading,
  Divider, Tag, Row, Col, Dialog, DatetimePicker, Uploader
} from 'vant'
Vue
  .use(Button)
  .use(NavBar)
  .use(Field)
  .use(CellGroup)
  .use(Form)
  .use(Toast) // 引入Toast组件后，会自动在Vue的prototype上挂载$toast方法，便于在组件内调用
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tabs)
  .use(Tab)
  .use(List)
  .use(Cell)
  .use(Grid)
  .use(GridItem)
  .use(VanImage)
  .use(PullRefresh)
  .use(Popup)
  .use(Icon)
  .use(Lazyload)
  .use(ActionSheet)
  .use(Search)
  .use(Loading)
  .use(Divider)
  .use(Tag)
  .use(Row)
  .use(Col)
  .use(Dialog)
  .use(DatetimePicker)
  .use(Uploader)
