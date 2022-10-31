export const routeReducer = (state, { type, payload }) => {
  const updateRoutes = (state, payload) => {
    const oldRoutes = state.routes.filter((route) => route.id !== payload.id);
    return [payload, ...oldRoutes];
  };

  switch (type) {
    case "STORE_ROUTES":
      return {...state, routes: payload?.routes}
    case "ADD_ROUTE":
      return { ...state, routes: [...state.routes, payload] };

    case "UPDATE_ROUTE":
      return {
        ...state,
        routes: state.routes.find(route => route.id === payload.id)
          ? updateRoutes(state, payload)
          : state.routes.concat(payload),
      };

    case "DELETE_ROUTE":
      return {
        ...state,
        routes: state.routes.filter((route) => route.id !== payload.id),
      };

    default:
      return state;
  }
};
