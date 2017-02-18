import { writeSnapshot } from 'heapdump';
import * as fs from 'fs';
import * as path from 'path';

const geo_filename = '../admin_level_2.geojson';

function loadFileAsString(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), { encoding: 'utf-8' }, (err, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function loadFileAsBuffer(filename: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), (err, data: Buffer) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function dumpHeap(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    writeSnapshot(`${filename}.heapsnapshot`, (err, filename) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Dumpped', filename);
      resolve(filename);
    });
  });
}

let world_json;

loadFileAsString(geo_filename)
  .then(data => { 
    world_json = JSON.parse(data);
  })
  .then(() => dumpHeap('world_json_node_7.5'));
