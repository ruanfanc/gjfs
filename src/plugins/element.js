import Vue from 'vue'
import { Button, Form, FormItem, Input ,Message, Container, Header, Aside, Main, Menu, Submenu,
 MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem, Card, Dialog,Row, Col,
 TimePicker,Option,Select,InputNumber,Checkbox,CheckboxGroup,Table,TableColumn,Tooltip
 ,Tabs,TabPane,Pagination,Carousel,CarouselItem,RadioGroup,Radio,MessageBox,Timeline,TimelineItem,Divider,Upload,Tag} from 'element-ui'

Vue.use(Upload)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(CarouselItem)
Vue.use(Carousel)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(TimePicker)
Vue.use(Option)
Vue.use(Select)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt