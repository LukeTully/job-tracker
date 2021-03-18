import * as localForage from 'localforage';
import {
  generateIndex, 
} from '../utilities';

import {
  error, 
} from '../services/errors';

export async function create(key = null, value) {
  let index = key;
  if (key === null) {
    index = generateIndex(value.title, value.company);
    value['index'] = index;
  }
  await localForage.setItem(index, value);
}
export async function remove(key) {
  await localForage.removeItem(key);
}
export async function update(key, newValue) {
  try {
    const item = await localForage.getItem(key);
    if (item === null) {
      throw new Error('Item was not in the database');
    }
    remove(key);
    const newKey = generateIndex(newValue.title, newValue.company);
    newValue['index'] = newKey;
    await create(newKey, newValue);
  } catch (err) {
    error(err);
  }
}
export async function all() {
  const jobs = [];
  await localForage.iterate(val => {
    jobs.push(val);
  });
  return jobs;
}
export async function read(id) {
  return localForage.getItem(id);
}
