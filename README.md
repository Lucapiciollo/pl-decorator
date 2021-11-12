
# Welcome to pl-core-utils-library!

pl-decorator is a collection of decorator that support developer to develop solutions in low time expend
## Installation

Install pl-decorator with npm

```
  npm install pl-decorator
```
    
## Features
In this version, there are very utility for decorate class, properties, attribute of class and other

Decorator Class:
- @Singleton()

Decorator method:
- @Log(mode: "log" | "debug" | "info" | "warn" = "log")
- @TryCatch(errorHandle: new () => ErrorHandle)
- @Delay(milliseconds)

Decorator for attribute class:
- @FormatDate(format: string = "DD/MM/yyyy HH:mm:ss", localeId = "it")


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

@Delay

This annotation is responsible for scedue execution function, it's run at time in input

```javascript
    export class Test {
       
        public time: Date = null;

        constructor() { this.time=new Date()}

        @Delay(5000)
        getTime() {
            return this.time;
        }
    }
```
for call method getTime(), is necessary run with await declaration,

    public async method() {
        let t1 = new Test();
        let response = await t1.getTime();
        console.log(response);
    }

## Authors

- @l.piciollo

