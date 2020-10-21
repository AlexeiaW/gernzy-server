import { transform } from "@/utils/orders";

export function cleanupData(data: any) {
  const omitTypename = (key: string, value: string) =>
    key === "__typename" ? undefined : value;
  const newPayload = JSON.parse(JSON.stringify(data), omitTypename);

  return newPayload;
}

/**
 *  tableColums: [],
 *  originalArray: [],
 *  mutatedArray: []
 */
export function filterArray(tableColums: any, originalArray: any[]): any[] {
  /**
   * I have an original array (originalArray) and another array (mutatedArray) , the originalArray array will never be
   * changed, only the selected values from the settings panel will be used to filter data from the original originalArray array
   * back into the mutatedArray array and then appear in the ui to the user.
   *
   * The originalArray array will keep all the data from graphql query that returns the order attributes. The mutatedArray will change
   * each time the user selects more columns or removes columns from the setttings tab. Each column value is a property in the poduct
   * object. So for each order object in the originalArray array we filter out only the desired keys from the objects and clone them
   * into the mutatedArray array.
   */

  const mutatedArray = originalArray.map(function (order: any) {
    return Object.keys(order)
      .filter((k) => tableColums.includes(k))
      .map((k) => Object.assign({}, { [k]: transform(order[k]) }))
      .reduce((res, o) => Object.assign(res, o), {});
  });

  return mutatedArray;
}
