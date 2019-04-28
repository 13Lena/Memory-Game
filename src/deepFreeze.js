export function deepFreeze(object) {

    // Retrieve the property names defined on object
    var propNames = Object.getOwnPropertyNames(object);
  
    // Freeze properties before freezing self
    
    for (let name of propNames) {
      let value = object[name];
  
      if (typeof value === "object")
        deepFreeze(value);
    }
  
    return Object.freeze(object);
  }
  