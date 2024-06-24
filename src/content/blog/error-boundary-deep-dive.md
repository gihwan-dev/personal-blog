---
author: Gihwan-dev
pubDatetime: 2024-06-24T04:43:18.010Z
title: ErrorBoundary 가 비동기, 이벤트 핸들러에서 에러를 잡지 못하는 이유(작성중)
slug: deep-dive-into-pnpm
featured: true
draft: false
tags:
  - study
  - deep-dive
  - pnpm
description: 에러바운더리가 비동기, 이벤트 핸들러에서 에러를 잡지 못하는 이유에 대해 deep dive 해보았습니다.
---

## Table of contents

## ErrorBoundary 란?

`ErrorBoundary` 는 리액트에서 컴포넌트의 렌더링 과정 중 발생한 에러를 잡아 `fallback`을 보여주는 고차 컴포넌트다. 그런데 이 `ErrorBoundary` 에서는 비동기 함수나, 이벤트 핸들러에서 발생한 에러를 잡지 못한다. 그 이유에 대해서 깊게 탐색해 보기로 했다.

## ErrorBoundary 내부

`ErrorBoundary`의 내부를 살펴보자. 다음과 같은 형태로 되어있다:

```tsx
class ErrorBoundary extends Components {
  // -- 생략 --

  // 하위 구성요소의 렌더링 중 에러가 발생하면 호출되는 메서드
  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error };
  }

  resetErrorBoundary(...args: any[]) {
    const { error } = this.state;

    if (error !== null) {
      this.props.onReset?.({
        args,
        reason: "imperative-api",
      });

      this.setState(initialState);
    }
  }

  // 하위 구성 요소의 렌더링 과정 중 에러가 발생하게 되면 이 메서드가 호출됨.
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    const { didCatch } = this.state;
    const { resetKeys } = this.props;

    if (
      didCatch &&
      prevState.error !== null &&
      hasArrayChanged(prevProps.resetKeys, resetKeys)
    ) {
      this.props.onReset?.({
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys",
      });

      this.setState(initialState);
    }
  }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } =
      this.props;
    const { didCatch, error } = this.state;

    let childToRender = children;

    if (didCatch) {
      const props: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (typeof fallbackRender === "function") {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else if (fallback === null || isValidElement(fallback)) {
        childToRender = fallback;
      } else {
        if (isDevelopment) {
          console.error(
            "react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"
          );
        }

        throw error;
      }
    }

    return childToRender;
  }

  // -- 생략 --
}
```

위 처럼 컴포넌트를 렌더링 하는 과정에서 에러가 발생하면 `componentDidCatch` 와 `getDerivedStateFromError` 를 호출한다. `componentDidCatch` 가 호출되면 `this.state.onError` 메서드가 실행되고 `getDerivedStateFromError` 는 `didCatch`, `error` 상태를 업데이트 한다.

여전히 왜 비동기 함수, 이벤트 핸들러에서 발생하는 에러를 잡지 못하는지 이해가 가지 않는다. 리액트에서 렌더링 과정 중에 어떻게 에러를 포착하고 처리하는지 자세히 알아보자.

## ReactFiberWorkLoop

`ReactFiberWorkLoop` 내부에는 렌더링을 실행하는 두 가지 함수가 있다.

- `renderRootSync`: 동기적으로 렌더링을 실행하는 함수다.
- `renderRootConcurrent`: 비 동기적으로 렌더링을 실행한다.

이 두 함수 에서 살펴볼 두 가지 함수가 있다.

- `handleThrow`: `try catch` 내부에서 실행된다.
- `throwAndUnwindWorkLoop`: 루프 내에서 렌더링 과정 중에 실행된다.

그럼 이 두 함수에 대해 더 자세히 알아보겠다.

### throwAndUnwindWorkLoop

이 함수를 먼저 살펴봐야 `handleThrow` 함수를 이해할 수 있다. 이 함수의 동작에 대해서 설명해 보겠다:

#### 1.`resetSuspendedWorkLoopOnUnwind`을 호출한다

`resetContextDependencies`: 를 호출해 `currentlyRenderingFiber`, `lastContextDependency`, `lastFullyObservedContext` 라는 전역 변수를 `null` 값으로 초기화한다.

- `currentlyRenderingFiber`: 현재 렌더링을 진행하고 있는 전역 변수 값이다. 이전 값이 저장되어 있으므로 이를 `null` 값으로 초기화한다.
- `lastContextDependency`: 현재의 컴포넌트 노드가 마지막으로 의존하고 있는 컨텍스트의 의존성에 대한 값을 저장하는 전역 변수다. 마지막으로 의존하는 값인 이유는 **효율성**을 위해서다. 리액트에서는 컴포넌트의 컨텍스트 의존성을 연결 리스트로 관리한다. 새로운 컨텍스트 의존성에 대한 추가가 간편하고 끝에서 역추적하며 의존하는 컨텍스트에 변경을 확인할 수 있다. 그렇기에 마지막으로 의존하는 값만 있으면 의존하는 모든 컨텍스트의 의존성을 확인할 수 있다.
- `lastFullyObservedContext`: 마지막으로 완전히 관찰한 컨텍스트를 의미한다.
  여기서도 "마지막" 인 이유는 링크드 리스트 형식이기 때문이다. 역추적하며 컨텍스트의 값을 가져오기 위함이다.

### handleThrow

이 함수에서 하는 예외적인 에러 처리를 제외하고 보편적인 경우의 에러 처리를 살펴보자. 시그니처에서 알 수 있듯이 에러를 다루거나 `throw` 하는 함수다. 다음 코드를 보자:

```tsx
const isWakeable =
  thrownValue !== null &&
  typeof thrownValue === "object" &&
  typeof thrownValue.then === "function";

workInProgressSuspendedReason = isWakeable
  ? // A wakeable object was thrown by a legacy Suspense implementation.
    // This has slightly different behavior than suspending with `use`.
    SuspendedOnDeprecatedThrowPromise
  : // This is a regular error. If something earlier in the component already
    // suspended, we must clear the thenable state to unblock the work loop.
    SuspendedOnError;
```

`thrownValue` 가 `Promise`를 반환하는 객체인지 확인해서
