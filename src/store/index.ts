import * as vuex from "vuex";

type StoreData = {
    userName: string;
    token: string;
};

export default vuex.createStore<StoreData>({
    state: {
        userName: "",
        token: "",
    },
    mutations: {
        SET_NAME(state, payload) {
            state.userName = payload;
        },
    },
    actions: {
        fetchName(ctx) {
            ctx.commit("SET_NAME", "Mino");
        },
    },
});
