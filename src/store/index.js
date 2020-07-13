import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        inputValue: '',
        viewKey: 'all'
    },
    mutations: {
        //# 切记只有mutations里面的函数才有权限修改state的数据
        // 初始化数据
        initList(state, list) {
            state.list = list
        },
        // 给inputValue赋值
        setInputValue(state, val) {
            state.inputValue = val
        },
        // 增加任务，并清空输入框
        addmyTodo(state, task) {
            state.list.push(task)
            state.inputValue = ''
        },
        // 删除任务
        deletemyTodo(state, id) {
            const index = state.list.findIndex(item => item._id === id)
            if (index !== -1) {
                state.list.splice(index, 1)
            }
        },
        // 修改完成状态
        modefyTodo(state, params) {
            const index = state.list.findIndex(item => item._id === params.id)
            if (index !== -1) {
                state.list[index].completed = params.completed
            }
        },
        // 清空已完成任务
        removeDone(state) {
            state.list = state.list.filter(item => item.completed === false)
        },
        // 按钮切换为viewKey赋值，切换高亮
        changeLight(state, key) {
            state.viewKey = key
        }
    },
    actions: {
        //# 获取todo列表
        async getList(context) {
            const { data: res } = await axios.get('/todolist');
            //# 只有mutations内的函数才可操作数据，所以此处调用函数赋值
            context.commit('initList', res);
        },
        //# 发送添加任务请求
        async addTodo(context) {
            const { data: res } = await axios.post('/addtodo', {
                title: context.state.inputValue
            });
            context.commit('addmyTodo', res)
        }
    },
    getters: {
        //# 返回未完成任务数
        doneTodo(state) {
            return state.list.filter(item => item.completed === false).length
        },
        //# 返回全部任务
        infolist(state) {
            if (state.viewKey === 'all') {
                return state.list
            } else if (state.viewKey === 'done') {
                return state.list.filter(item => item.completed === true)
            } else if (state.viewKey === 'nodone') {
                return state.list.filter(item => item.completed === false)
            }
        }
    }
})