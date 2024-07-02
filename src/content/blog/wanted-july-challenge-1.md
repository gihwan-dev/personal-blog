---
author: Gihwan-dev
pubDatetime: 2024-07-01T11:05:28.776Z
title: Web API 총 정리 해보기!
slug: web-api-total-summary
featured: true
draft: false
tags:
  - development
  - web
  - cheatsheet
description: 갑자기 궁금해진 Web API에 대해서 총 정리 해봤습니다!
---

각 세부 사항에 대해 깊게 다루진 않았습니다. 다만 이러한 API 가 있다 라는걸 인덱싱 해둘 용도로 정리했습니다. 추후 사용하게 된다면 깊게 공부해 적용하는 방식이 효율적이라 생각했습니다. 간단하게 이런게 있구나 하고 봐주시면 감사하겠습니다! What(무엇인지), When(언제 사용할 수 있는지) 를 중심으로 요약했습니다.

## Table of contents

## Specifications

### Attribution Reporting API (experiment)

#### What?

**Attribution Reporting API**는 *전환*을 측정할 수 있게 해준다. 예를들어 내 웹사이트에 광고가 있다고 하자. 유저가 이 광고를 클릭해 판매자의 사이트에서 구매를 진행했다. 이 경우에 광고를 클릭해 판매자 사이트로 이동된 *전환*을 리포팅 한다. 이때 써드 파티 트래킹 쿠키를 사용하지 않는다.

> 써드 파티 트래킹 쿠키는 사용자가 방문한 웹사이트가 아닌 다른 도메인에서 발행한 쿠키다. 주로 광고나 분석 목적으로 사용자의 온라인 활동을 추적하고, 사용자 정보를 수집하여 타겟 광고를 제공하는 데 사용된다.

#### When?

얼마나 많은 유저가 광고를 보고 구매까지 이어졌는지를 측정하는데 사용할 수 있습니다.

### Audio Output Devices API (experiment)

#### What?

**Audio Output Devices API**는 웹앱이 유저에게 어떤 스피커를 통해 오디오를 출력할 것 인지 물어볼 수 있도록 해준다.

#### When?

**What**에 설명된 대로 어떤 스피커를 통해 출력할지 물어볼 때 사용할 수 있습니다.

### Background Fetch API (experiment)

#### What?

소프트웨어, 영화와 같이 용량이 커 다운로드에 오랜 시간이 걸리는 것들의 다운로드를 관리할 수 있는 메서드를 제공해준다.

#### When?

유저가 큰 용량의 파일을 다운로드할 때 연결을 유지하기 위해 다운로드가 완료될 때 까지 페이지에 머물러야 하는 불편함이 있다. `fetch`를 백그라운드에서 수행하도록 해 페이지를 이탈하더라도 다운로드가 중단되지 않으며, 다운로드 상태를 확인하거나 다운로드를 취소할 수 있는 메서드를 제공한다.

> **Background Synchronization API** 를 사용해 유저가 연결될 때 까지 다운로드를 연기할 수 있지만 이는 긴 시간 작업이 소요되는 다운로드와 같은 곳에서는 사용할 수 없다고 한다.

### Badging API

#### What?

document 나 application 에 Badge 를 설정할 수 있는 메서드를 제공한다. 앱 아이콘에 뱃지를 통해 새로운 메시지가 도착했다는 것을 알려주는 형태로 많이 사용된다.

#### When?

- 브라우저 탭에 나타나는 페이지 아이콘에 뱃지를 설정하고 싶은 경우
- 설치된 웹앱의 아이콘에 뱃지를 설정하고 싶은 경우

### Beacon API

#### What?

**Beacon API** 는 응답을 기대하지 않는 비동기의 논-블로킹 요청을 보낼 때 사용된다. 브라우저는 이 요청이 페이지가 언로드 되기 전에 초기화 및 완료되도록 한다.

#### When?

클라이언트 사이드에서 발생한 이벤트나, 서버로 전송되는 세션에 대한 *analytics*를 전송하는데 사용할 수 있다. `XMLHttpRequest`를 사용하면 페이지가 언로드될 때 요청도 취소된다. `Beacon API` 를 사용하면 이러한 경우에도 요청이 완료 되도록 보장할 수 있다.

### Background Synchronization API

#### What?

웹앱에서 어떤 작업을 연기할 수 있도록 해준다. 연기된 작업은 유저의 네트워크가 연결되면 `Service Worker` 에서 재개된다.

#### When?

예를 들어 이메일 전송 앱에서 유저가 네트워크에 연결되어 있지 않더라도 이메일을 작성하고 보낼 수 있도록 할 수 있다.

### Barcode Detection API (experiment)

#### What?

이미지의 바코드를 인식할 수 있게 해준다.

#### When?

바코드를 인식해야할 필요가 있을 때 사용할 수 있다.

### Web Bluetooth API (experiment)

#### What?

블루투스 연결을 할 수 있도록 해준다.

#### When?

블루투스 연결이 필요할 때 사용할 수 있다.

### Background Tasks API

#### What?

작업을 `queue`에 넣고 유휴시간에 실행할 수 있도록 해준다.
