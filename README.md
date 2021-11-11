
## Usage/Examples 
@Log

This annotation wrap method adding log function

```javascript
import { Log  } from "pl-decorator"

export class Test {

  
  public time:Date = null;

  constructor() {
    this.time=new Date()
  }

  @Log()
  getDate() {
    return this.time
  }
}
```

@TryCatch()

This annotation wrap method adding tye catch block and centralize all throws of exception in HandlerError

```javascript
    @Singleton
    export class MyErrorHandler implements ErrorHandle {
        constructor() {

        }
        handleError(error: Error, propertyKey: string) {
        console.log(`Exception from  method ${propertyKey}`);
        }
    }

    export class Test { 
        public time: string = "";
        constructor() { }

        @TryCatch(MyErrorHandler)
        throwExceptionTest(n) {
            throw new Error("a")
        }
    }
```
@Singleton

This annotation implement singleton pattern for class

```javascript
    @Singleton
    export class MyErrorHandler implements ErrorHandle {
        constructor() {

        }
        handleError(error: Error, propertyKey: string) {
        console.log(`Exception from  method ${propertyKey}`);
        }
    }

```
@FormatDate

This annotation is responsible for formatting date how we prefer

```javascript
    export class Test {
        @FormatDate("HH:mm:ss a")
        public time: Date = null;

        constructor() { this.time=new Date()}

        getTime() {
            return this.time;
        }
    }


```