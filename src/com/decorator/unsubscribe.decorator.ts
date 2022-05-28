/**
 * @author luca.piciollo
 * @email lucapiciollo@gmail.com
 * @create date 2022-05-28 13:08:52
 * @modify date 2022-05-28 13:08:52
 * @desc [unsubscribe decorator for kill all observable objec at onDestroy class]
 */

 
export const Unsubscribe = (ignore = []): ClassDecorator => {
  return (constructor: any) => {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        ///@ts-ignore
        if (!ignore.includes(prop)) {
          if (property && (typeof property.unsubscribe === "function")) {
            try {
              console.info(`%c PLUnsubscribe -  Class:   ${constructor.name} unsubscriber: ${prop} `, `color: green `);
              property.unsubscribe();
            } catch (error) {
              console.error(`%c PLUnsubscribe -  Class:  ${constructor.name}  unsubscriber: ${prop} ERROR: `, `color: red `, error || "");
            }
          }
        }
        console.info(`%c PLUnsubscribe -  Class:   ${constructor.name} unsubscriber IGNORED: ${prop} `, `color: blue `);
      }
      if (original) original.apply(this); 
    };
  
  }
}
  /****************************************************************************************************************** */