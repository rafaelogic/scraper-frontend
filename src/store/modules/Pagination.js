export const namespaced = true;

export const state = {
    totalPages: 0, 
    total:0, 
    perPage: 0, 
    currentPage: 0,
    hasMorePages: true,
}

export const getters = {
    totalPages: (state) => state.totalPages,
    total: (state) => state.total,
    perPage: (state) => state.perPage,
    currentPage: (state) => state.currentPage,
    hasMorePages: (state) => state.hasMorePages,
}

export const mutations = {
    SET_PAGINATION_META(state, payload) {
        state.totalPages = payload.last_page;
        state.total = payload.total;
        state.perPage = payload.per_page;
        state.currentPage = payload.current_page;
        state.hasMorePages = payload.current_page < payload.last_page;
    },
    SET_TOTAL_PAGES(state, totalPages) {
        state.totalPages = totalPages;
    },
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_PER_PAGE(state, perPage) {
        state.perPage = perPage;
    },
    SET_CURRENT_PAGE(state, currentPage) {
        state.currentPage = currentPage;
    },
    SET_HAS_MORE_PAGES(state, hasMorePages) {
        state.hasMorePages = hasMorePages;
    },
}

export const actions = {
    updateCurrentPage({ commit }, currentPage) {
        commit('SET_CURRENT_PAGE', currentPage);
    }
}