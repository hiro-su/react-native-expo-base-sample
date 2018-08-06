import Master from '../models/Master';

export default function master(state = new Master(), action) {
  switch( action.type ){
    case 'REQUEST_PROCESS':
      return state.set('isProcessing', true);
    case 'COMPLETE_PROCESS':
      return state.set('isProcessing', false);
    default:
      return state;
  }
}