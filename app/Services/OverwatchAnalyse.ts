// import Database from '@ioc:Adonis/Lucid/Database'

class OverwatchAnalyse {
  public async processAndStoreDataFromJSON(jsonData: any) {

    console.info(jsonData)
    const jsontest = JSON.parse(JSON.parse(jsonData))
    // const flattenedData = this.flattenObject(jsonData)
    console.log(jsontest)
  }


  public flattenObject(obj: any, prefix = ''): { [key: string]: any } {
    const flattened: { [key: string]: any } = {};

    function recurse(current: any, pre = '') {
      for (const key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
          const value = current[key];
          const newKey = pre + (pre.length ? '.' : '') + key;
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            recurse(value, newKey);
          } else {
            flattened[newKey] = value;
          }
        }
      }
    }

    recurse(obj);
    return flattened;
  }
}

export default new OverwatchAnalyse();
