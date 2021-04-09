import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { fromEvent, Observable } from "rxjs";

export const Part02 = () => {
  const [log, setLog]: any = useState([]);

  let bar = Observable.create((observer: any) => {
    console.log("Hello");
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(() => {
      observer.next(300);
    }, 1000);
  });

  const onClick = () => {
    bar.subscribe((x: any) => console.log(x));
  };

  return (
    <div>
      <h5>Return multiple values from Observables in RxJS</h5>
      <Button onClick={onClick}>Open console and click this</Button>
      <ListGroup>
        {log.map((l: any) => (
          <ListGroupItem>{l}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export const Part03 = () => {
  const [log, setLog]: any = useState([]);

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    console.log("Hello");
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(() => {
      observer.next(300);
    }, 1000);
  });

  // Generator (PULL)
  function* baz() {
    console.log("Hello");
    yield 42;
    yield 100;
    yield 200;
  }

  const onClick = () => {
    // Generator consumer determines when values are sent.
    let iterator = baz();
    console.log(iterator.next().value);
    console.log(iterator.next().value);
    console.log(iterator.next().value);
  };

  return (
    <div>
      <h5>Push Values from Observables in RxJS</h5>
      <Button onClick={onClick}>Click</Button>
      <ListGroup>
        {log.map((l: any) => (
          <ListGroupItem>{l}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export const Part04 = () => {
  const title = "Throw Errors with RxJS Observables";
  const [log, setLog]: any = useState([]);

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    try {
      console.log("Hello");
      observer.next(42);
      observer.next(100);
      observer.next("error incoming");
      observer.error(new Error("bad"));
      setTimeout(() => {
        observer.next(300);
      }, 1000);
    } catch (err) {
      observer.error(err);
    }
  });

  const onClick = () => {
    bar.subscribe(
      (x: any) => {
        console.log(x);
      },
      (err: any) => {
        console.error("Something went wrong: " + err);
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Click</Button>
      <ListGroup>
        {log.map((l: any) => (
          <ListGroupItem>{l}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export const Part05 = () => {
  const title = "Perform an Action on Completion with RxJS Observables";
  const [log, setLog]: any = useState([]);

  // Observable (PUSH)
  let bar = Observable.create((observer: any) => {
    try {
      console.log("Hello");
      observer.next(42);
      observer.next(100);
      setTimeout(() => {
        observer.next(300);
        observer.complete();
      }, 1000);
    } catch (err) {
      observer.error(err);
    }
  });

  const onClick = () => {
    bar.subscribe(
      (x: any) => {
        console.log(x);
      },
      (err: any) => {
        console.error("Something went wrong: " + err);
      },
      () => {
        // complete handler.
        console.log("done");
      }
    );
  };

  return (
    <div>
      <h5>{title}</h5>
      <Button onClick={onClick}>Click</Button>
      <ListGroup>
        {log.map((l: any) => (
          <ListGroupItem>{l}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
