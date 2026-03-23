import fs from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    // check if the test database exists and delete it before each test run

    if (fs.existsSync(join(__dirname, '..', 'test.sqlite'))) {
      await rm(join(__dirname, '..', 'test.sqlite'));
    }
  } catch (error) {
    console.error('Error deleting test database:', error);
  }
});
