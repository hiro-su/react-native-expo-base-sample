import { Record } from 'immutable';

const MasterRecord = Record({
  isProcessing: false,
});

export default class Master extends MasterRecord {
  getUserInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        console.warn('okokokokokoko');
      } catch (error) {
        reject(error);
      }
    });
  }
}