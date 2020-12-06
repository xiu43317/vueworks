<template>
  <div class="container mt-4">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="準備要做的任務"
        v-model="newTodo"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTodo">
          新增
        </button>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{'active':visbility=='all'}" @click="visibility='all'" href="#/contactus">全部</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active': visibility == 'active'}" @click="visibility='active'" href="#/contactus">進行中</a>
          </li>
          <li class="nav-item" :class="{'active': visibility == 'completed'}" @click="visibility='completed'">
            <a class="nav-link" href="#/contactus">已完成</a>
          </li>
        </ul>
      </div>
      <ul class="list-group list-group-flush text-left">
        <li class="list-group-item" v-for="(item, index) in filterTodos" @dblclick="editTodo(item)">
          <div class="d-flex" v-if="item.id !== cacheTodo.id">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :id="item.id" v-model="item.completed"/>
              <label class="form-check-label" :class="{'completed': item.completed}" :for="item.id"
                >{{ item.title }}
              </label>
            </div>
            <button
              type="button"
              class="close ml-auto"
              aria-label="Close"
              @click="removeTodo(item)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="input-group mb-2">
          <input type="text" class="form-control" v-if="item.id === cacheTodo.id"
          v-model="cacheTitle" @keyup.esc="cancelEdit" @keyup.enter="doneEdit(item)" @blur="cancelEdit"/>
          </div>
        </li>
        <!-- <li class="list-group-item">
          <input type="text" class="form-control" />
        </li> -->
      </ul>
      <div class="card-footer d-flex justify-content-between">
        <span>還有{{undoneTodo.length}}筆任務未完成</span>
        <a href="#/contactus" @click="removeAll">清除所有任務</a>
      </div>
    </div>
  </div>
</template>
<script>
let todokey = 1;
export default {
  data() {
    return {
      visibility: 'all',
      newTodo: "",
      todos: [
        {
          key: 0,
          id: "123",
          title: "代辦事項1",
          completed: true,
        },
      ],
      cacheTodo: {},
      cacheTitle:'',
    };
  },
  methods: {
    addTodo: function () {
      var value = this.newTodo.trim();
      var timeStamp = Math.floor(Date.now());
      if (!value) {
        return;
      }
      this.todos.push({
        key: todokey,
        id: timeStamp,
        title: value,
        completed: false,
      });
      this.newTodo = "";
      todokey++;
    },
    removeTodo: function (todo) {
      var vm = this;
      var newIndex = vm.todos.findIndex(function (item, index) {
        return todo.id === item.id;
      });
      this.todos.splice(newIndex, 1);
    },
    editTodo: function (item) {
      console.log(item);
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function(){
      this.cacheTodo = {};
    },
    doneEdit: function(item){
      item.title = this.cacheTitle;
      this.cacheTitle = '';
      this.cacheTodo = {};
    },
    removeAll: function() {
      this.todos = [];
    }
  },
  computed: {
      filterTodos: function() {
          if(this.visibility == 'all'){
              return this.todos;
          }else if(this.visibility == 'active'){
              var newTodos = [];
              this.todos.forEach((item)=>{
                  if(!item.completed){
                      newTodos.push(item);
                  }
              })
              return newTodos;
          }else if(this.visibility == 'completed'){
              var newTodos = this.todos.filter((item)=>item.completed)
              return newTodos;
          }
      },
      undoneTodo: function() {
        return this.todos.filter(todo => todo.completed != true);
      }
  }
};
</script>
<style>
.completed {
  text-decoration: line-through;
}
</style>