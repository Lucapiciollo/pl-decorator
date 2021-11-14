
# Welcome to pl-core-utils-library!

pl-decorator is a collection of decorator that support developer to develop solutions in low time expend

----------------

## Installation

Install pl-decorator with npm

```
  npm install pl-decorator
```
----------------
## Features
In this version, there are very utility for decorate class, properties, attribute of class and other

Decorator Class:
- @Singleton()
- @Injectable()

Decorator method:
- @Log(mode: "log" | "debug" | "info" | "warn" = "log")
- @TryCatch(errorHandle: new () => ErrorHandle)
- @Delay(milliseconds)

Decorator for attribute class:
- @FormatDate(format: string = "DD/MM/yyyy HH:mm:ss", localeId = "it")
- @FormatNumber(format: string | string[] = FORMAT_NUMBER.IT, options?: Intl.NumberFormatOptions)
- @Inject(type:Class)

----------------
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
----------------
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
----------------
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
----------------
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
----------------
@FormatNumber

This annotation is responsible for formatting number how we prefer, by currency or other, for example

```javascript
    export class Test {
        @FormatNumber(FORMAT_NUMBER.DE, {
            style: 'currency',
            currency: 'GBP'
        })
        public value= 123234345334454;

        constructor() {  }

        getValue() {
            return this.value;
        }
    }
```
When we print value of variable, it's formatted with DE, and GBP currency.. this is optional, in casi default is IT

----------------

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
----------------
----------------

@Injectable
@Inject

This annotation is responsible for scedue execution function, it's run at time in input

```javascript
    @Injectable
    export class Test {
        public time: Date = null;
        constructor() { this.time=new Date()}
        getTime() {
            return this.time;
        }
    }

    @Injectable
    export class Test2 {
        @Inject(Test1) test1:Test1;
        console.log(this.test1.time);
        public time: Date = null;
        constructor() { this.time=new Date()}
        getTime() {
            return this.time;
        }
    }

    export class main {
        @Inject(Test1) test1:Test1;
        @Inject(Test2) test2:Test2;
        
        console.log(this.test2.time);
        console.log(this.test1.time);

        //in this case, test1 will be created at runtime with injection system because test1 is marked Inject(..) in Test2 class
        console.log(this.test2.test1.time);
    }

```
All properties marked with @Inject(...) are created automatically and wil be in singleton mode

----------------
## Authors

- @l.piciollo

