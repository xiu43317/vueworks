const types = {
    CREATE_TODO: 'todo/CREATE_TODO',
    REMOVEALL_TODO: 'todo/REMOVEALL_TODO',
    DELETE_TODO: 'todo/DELETE_TODO',
    UPDATE_TODO: 'todo/UPDATE_TODO',
    CHANGE_SUBPAGE: 'todo/CHANGE_SUBPAGE',
  }

  const state = {
    visibility: 'all',
    todos: [
        {
            key: 0,
            title: "代辦事項1",
            completed: true,
          },
    ]
  }

  const getters = {
      getTodo (state) {
          return state.todos;
      },
      getDone (state) {
          return state.todos.filter( item => item.completed === true);
      },
      getUndo (state) {
          return state.todos.filter( item => !item.completed);
      },
      getPage (state) {
          return state.visibility;
      }
  }

  const actions = {
    addTodo ({ commit }, newTodo) {
      commit(types.CREATE_TODO, newTodo);
    },
    removeAll ({ commit }) {
      commit(types.REMOVEALL_TODO);
    },
    deleteTodo ({ commit }, key) {
      commit(types.DELETE_TODO, key);
    },
    updateTodo ({ commit }, obj) {
      commit(types.UPDATE_TODO, obj);
    },
    changeSubPage( {commit},showPage){
        commit(types.CHANGE_SUBPAGE,showPage)
    },
  }

  // 流水 key
let todoKey = state.todos.length;

const mutations = {
    //新增
    [types.CREATE_TODO](state, newTodo){
        var value = newTodo.trim();
        if(!value){
            return
        }
        state.todos.push({
            key: todoKey,
            title: newTodo,
            completed: false,
        });
        todoKey++;
    },
    //刪除
    [types.DELETE_TODO](state,key){
        state.todos.forEach((item,index) => {
            if(item.key === key){
                state.todos.splice(index,1);
            }
        });
    },
    //更新
    [types.UPDATE_TODO](state,obj){
        state.todos.forEach((item,index) =>{
            if(parseInt(item.key) === parseInt(obj.cacheKey)){
                item.title = obj.cacheTitle;
            }
        });
    },
    //刪除全部
    [types.REMOVEALL_TODO](state){
        state.todos = [];
    },
    // 顯示第幾頁
    [types.CHANGE_SUBPAGE](state,showPage){
        state.visibility = showPage;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
  }