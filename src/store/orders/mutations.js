import Vue from 'vue'

function updateOrder (state, payload) {
    
    Object.assign(state.orders[payload.id], payload.updates);
}

function deleteOrder (state, id) {
    Vue.delete(state.orders, id)
}

export{
    updateOrder,
    deleteOrder,
}