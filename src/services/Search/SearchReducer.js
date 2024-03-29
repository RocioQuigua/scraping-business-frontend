import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  history: [],
  filterValues: [],
  publications: undefined,
  publicationsCache: [],
  publicationsFilter: undefined,
  filters: undefined,
  modalSearchReport: undefined,
  pageGlobal: 1,
  loading: {
    createSearch: false,
  },
  error: {
    createSearch: undefined,
  },
  success: {
    createSearch: undefined,
  },
};

const reducer = handleActions(
  {
    SEARCH: {
      GET_HISTORY: (state) => ({ ...state }),
      GET_HISTORY_RESPONSE: (state, { payload: { history } }) => ({
        ...state,
        history,
      }),

      CREATE_SEARCH: (state) => ({ ...state }),
      CREATE_SEARCH_RESPONSE: (
        state,
        { payload: { publications, filters, page } }
      ) => {
        const publicationsCache = state.publicationsCache;

        if (publications.length > 0) {
          publicationsCache[page - 1] = {
            publications,
            filters,
          };
        }

        return {
          ...state,
          publications,
          filters,
          publicationsCache,
          pageGlobal: publications.length > 0 ? page: state.pageGlobal,
        };
      },

      CLEAR_FILTERS: (state) => ({
        ...state,
        filterValues: [],
        publicationsFilter: undefined,
      }),

      CLEAR_ALL: (state) => ({
        ...state, ...INITIAL_STATE
      }),

      FILTER_RESULTS: (state, { payload: { type, values } }) => {
        let newFilters = state.filterValues;
        let isExist = newFilters.findIndex((item) => item.type === type);

        if (isExist !== -1) {
          if (values.length === 0) {
            newFilters = newFilters.filter((item) => item.type !== type);
          } else {
            newFilters[isExist] = { ...newFilters[isExist], values };
          }
        } else {
          newFilters.push({ type, values });
        }

        return {
          ...state,
          filterValues: newFilters,
        };
      },
      FILTER_RESULTS_RESPONSE: (state, { payload: { publications } }) => ({
        ...state,
        publicationsFilter: publications,
      }),

      SET_ERROR: (state, { payload: { keyState, error } }) => ({
        ...state,
        error: { ...state.error, [keyState]: error },
      }),
      SET_SUCCESS: (state, { payload: { keyState, newValue } }) => ({
        ...state,
        success: { ...state.success, [keyState]: newValue },
      }),
      SET_LOADING: (state, { payload: { keyLoading, newValue } }) => ({
        ...state,
        loading: { ...state.loading, [keyLoading]: newValue },
      }),
      SET_STATE: (state, { payload: { keyState, newValue } }) => ({
        ...state,
        [keyState]: newValue,
      }),
    },
  },
  INITIAL_STATE
);

export default reducer;
