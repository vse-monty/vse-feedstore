
function updateOrder ({ commit }, payload) {
    commit('updateOrder', payload);
}

function deleteOrder({ commit }, id){
    commit('deleteOrder', id)
}

export{
    updateOrder,
    deleteOrder,
}
