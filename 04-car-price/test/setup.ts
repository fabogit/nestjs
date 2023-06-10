import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    console.log(
      `Removing test db at: ${join(__dirname, '../db/', 'test.sqlite')}`,
    );
    await rm(join(__dirname, '../db/', 'test.sqlite'));
  } catch (error) {
    console.log('Test db does not exist');
    // console.log(error);
  }
});
