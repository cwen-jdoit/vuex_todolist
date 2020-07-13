<template>
  <div id="app">
    <!-- 标题部分 -->
    <h1>ToDoList</h1>
    <!-- 输入框部分 -->
    <el-row class="add_text">
      <el-col :span="9" :offset="7">
        <div class="myinput">
          <input
            type="text"
            placeholder="请输入todo"
            :value="inputValue"
            @change="changeInput"
            @keyup.enter="todoAdd"
          />
        </div>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-plus mycursor" style="color:green;font-size:19px" @click="todoAdd"></i>
      </el-col>
    </el-row>
    <!-- 展示任务部分 -->
    <div class="add_todo">
      <el-row v-for="(item,index) in infolist" :key="index">
        <el-col :span="1" :offset="7">
          <el-switch
            v-model="item.completed"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchChange(item._id,item.completed)"
          ></el-switch>
        </el-col>
        <el-col :span="8">
          <label :class="item.completed ? 'already' : ''">{{item.title}}</label>
        </el-col>
        <el-col :span="1">
          <i
            class="el-icon-delete mycursor"
            style="color:red;font-size:19px"
            @click="deleteById(item._id)"
          ></i>
        </el-col>
      </el-row>
    </div>
    <!-- footer部分 -->
    <div class="todo_order">
      <el-row>
        <el-col :span="2" :offset="7" class="mystyle">
          <label>
            <strong>{{doneTodo}}</strong> nodone
          </label>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button
            size="mini"
            :type="viewKey === 'all' ? 'warning' : ''"
            icon="el-icon-coin"
            @click="changeList('all')"
          ></el-button>
          <el-button
            size="mini"
            :type="viewKey === 'done' ? 'success' : ''"
            icon="el-icon-check"
            @click="changeList('done')"
          ></el-button>
          <el-button
            size="mini"
            :type="viewKey === 'nodone' ? 'danger' : ''"
            icon="el-icon-close"
            @click="changeList('nodone')"
          ></el-button>
        </el-col>
        <el-col :span="1">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteDoneTodo">删除已完成</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//# 导入list数据
import { mapState } from 'vuex';
//# 导入发送请求的方法
import { mapActions } from 'vuex';
//# 导入getters
import { mapGetters } from 'vuex';
//# 向外暴露
export default {
  name: 'app',
  data() {
    return {};
  },
  created() {
    //# 获取任务列表
    this.getList();
  },
  methods: {
    //# 拿到vuex中发送请求的函数
    ...mapActions(['getList', 'addTodo']),
    //# 监听输入框改变事件
    changeInput(e) {
      this.$store.commit('setInputValue', e.target.value);
    },
    //# 监听添加按钮，完成添加任务
    todoAdd() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.error('请输入内容');
      }
      this.addTodo();
      this.$message.success('已成功添加新任务');
    },
    //# 监听删除按钮，完成删除功能
    async deleteById(id) {
      // 弹出确认框(返回值为promise对象，所以用async，await)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该任务, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err);
      // 如果确认删除，返回字符串，confirm；否则返回cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除');
      }
      this.$store.commit('deletemyTodo', id);
      this.$message.success('删除任务成功');
    },
    //# 监听修改任务状态
    switchChange(id, completed) {
      const params = {
        id,
        completed
      };
      this.$store.commit('modefyTodo', params);
      this.$message.success('状态修改成功');
    },
    //# 监听清空已完成任务按钮
    async deleteDoneTodo() {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该任务, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除');
      }
      this.$store.commit('removeDone');
      this.$message.success('删除了全部的已完成');
    },
    //# 监听按钮切换事件
    changeList(key) {
      this.$store.commit('changeLight', key);
    }
  },
  computed: {
    //# 把数据写入计算属性中
    ...mapState(['inputValue', 'viewKey']),
    //# 把getters修饰的数据写入计算属性
    ...mapGetters(['doneTodo', 'infolist'])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  margin-left: 550px;
  font-size: 100px;
  color: pink;
  text-shadow: 0 6px 6px red;
}
.el-input__inner {
  padding: 0;
}
.add_text input {
  width: 100%;
  font-size: 18px;
  padding-left: 9px;
  border: none;
  outline: none;
}
.add_todo {
  margin-top: 18px;
}
.myinput {
  border-bottom: 1px solid red;
}
.todo_order {
  margin-top: 18px;
}
.mystyle {
  font-size: 19px;
  color: red;
}
.mycursor {
  cursor: pointer;
}
.el-row {
  margin-top: 21px;
}
.already {
  color: #ccc;
  text-decoration: line-through;
}
</style>
