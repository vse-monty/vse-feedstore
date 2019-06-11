
export function updateOrder (state, payload) {
    
    Object.assign(state.orders[payload.id], payload.updates);
}
