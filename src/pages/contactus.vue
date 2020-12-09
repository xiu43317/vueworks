<template>
  <div class="container mt-4">
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">待辦事項</span>
    </div>
    <input type="text" class="form-control" placeholder="準備要做的任務" v-model="newTodo">
    <div class="input-group-append">
      <button class="btn btn-primary" type="button" @click="actionAddTodo">新增</button>
    </div>
  </div>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="{'active':visibility == 'all'}" @click="visibility='all'" href="#">全部</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active':visbility == 'active'}" @click="visibility='active'" href="#">進行中</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{'active':visibility == 'completed'}" @click="visibility='completed'" href="#">已完成</a>
        </li>
      </ul>
    </div>
    <ul class="list-group list-group-flush text-left">
      <li class="list-group-item" v-for="(item,index) in filteredTodos" @dblclick="editTodo(item)" :key="index">
        <div class="d-flex"  v-if="item.key !== cacheTodo.key">
          <div class="form-check">
            <input type="checkbox" class="form-check-input"  v-model="item.completed">
            <label class="form-check-label" :class="{'completed':item.completed}">
              {{item.title}}
            </label>
          </div>
          <button type="button" class="close ml-auto" aria-label="Close" @click="deleteTodo(item.key)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <input type="text" class="form-control" v-if="item.key == cacheTodo.key" 
        v-model="cacheTodo.title" @keyup.esc="cancelEdit" @blur="cancelEdit" @keyup.enter="actionEditTodo">
      </li>
    </ul>
    <div class="card-footer d-flex justify-content-between">
      <span>還有{{undoList.length}}筆任務未完成</span>
      <a href="#" @click="removeAll">清除所有任務</a>
    </div>
  </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  data(){
    return {
      cacheTodo:{},
      visibility: 'all',
      newTodo: '',
    }
  },
  methods: { ...mapActions([
    'deleteTodo',
    'updateTodo',
    'removeAll',
  ]),
  actionAddTodo(){
    this.$store.dispatch('addTodo',this.newTodo);
    this.newTodo='';
  },
  editTodo(item){
    this.cacheTodo = item;
  },
  cancelEdit(){
    this.cacheTodo = {};
  },
  actionEditTodo(){
    this.$store.dispatch('updateTodo',this.cacheTodo);
    this.cacheTodo = {};
  }

  },
  computed: { ...mapGetters({
    todoList: 'getTodo',
    doneList: 'getDone',
    undoList: 'getUndo',
  }),
    filteredTodos() {
    if(this.visibility == 'all'){
      return this.todoList;
    }else if(this.visibility == 'active'){
      return this.undoList;
    }else if(this.visibility == 'completed'){
      return this.doneList;
    }
  }
  }
}
</script>
<style>
.completed {
  text-decoration: line-through;
}
</style>