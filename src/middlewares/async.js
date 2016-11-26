import humps from 'humps';

export default function ({dispatch}) {
  return next => action => {
    // If action does not have payload or, the payload does not have
    // a .then property, we don't care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then((response) => {
        // create a new action with the old type, but
        // replace the promise with the response date
        const newAction = { ...action, payload: humps.camelizeKeys(response) };

        dispatch(newAction);
      });

    // pass cancel ajax request object
    if (action.payload && action.payload.then && action.cancel) {
      return next(action);
    }
  };
}
