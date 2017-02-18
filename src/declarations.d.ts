declare module "heapdump" {
  function writeSnapshot(filename?: string, callback?: (err?: Error, filename?: string) => void ) : void;
}

declare module "*.geojson" {
  const value: any;
  export default value;
}
