export function reducerForm(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.name]: action.value };
      break;

    default:
      break;
  }
}
