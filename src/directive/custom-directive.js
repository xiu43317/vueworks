import Vue from 'vue'
import store from '../store'

function togglePassword(val) {
    return val ? 'text' : 'password';
}

Vue.directive('toggle-password',{
    bind(el,binding){
        el.type = togglePassword( binding.value );      
    },
    update(el,binding) {
        el.type = togglePassword( binding.value ); 
    }
});