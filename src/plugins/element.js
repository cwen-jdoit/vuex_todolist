import Vue from 'vue'
import { Button, Input, Row, Col, Switch, Message, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm