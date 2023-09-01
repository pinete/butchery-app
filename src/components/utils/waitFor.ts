export function waitFor(conditionFunction:any) {
  //let resolve:any=undefined
  const poll = (resolve:any) => {
    if(conditionFunction()) resolve();
    else setTimeout((_:any) => poll(resolve), 400);
  }

  return new Promise(poll);
}