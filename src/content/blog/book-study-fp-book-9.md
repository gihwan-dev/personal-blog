---
author: Gihwan-dev
pubDatetime: 2024-05-23T13:38:02.293Z
title: bookSailor | 귀에 쏙쏙 들어오는 함수형 프로그래밍 Chapter9
slug: bookSailor-fp-chapter9
featured: false
draft: false
tags:
  - bookSailor
  - fp
  - study
description: 현재 진행중인 귀에 쏙쏙 들어오는 함수형 프로그래밍 북 스터디 Chapter9 요약본입니다.
---

## Table of contents

## 패턴 2: 추상화 벽

"추상화 벽"은 세부 구현을 감춘 함수로 이루어진 계층이다. 추상화 벽에 있는 함수를 사용할 때는 구현을 전혀 몰라도 함수를 쓸 수 있다.

## 사용 이유

1. 쉽게 구현을 바꾸기 위해
2. 모드를 읽고 쓰기 쉽게 만들기 위해
3. 팀 간에 조율해야 할 것을 줄이기 위해
4. 주어진 문제에 집중하기 위해

함수의 코드 줄 수는 중요하지 않다. 중요한 것은 적절한 구체화 수준과 일반화가 되어 있는지다.

## 패턴3: 작은 인터페이스

새로운 코드를 추가할 위치에 관한 것.

인터페이스를 최소화 화면 하위 계층에 불필요한 기능이 쓸데없이 커지는 것을 막을 수 있다. 함수에 맞는 계층이 어디인지 찾는 감각을 기르는게 중요하다.

## 패턴4: 편리한 계층

코드와 그 코드가 속한 추상화 계층은 작업할 때 편리해야 한다.

## 그래프로 알 수 있는 정보

그래프 가장 위에 있는 코드가 가장 고치기 쉽다. 아래에 있는 코드는 해당 코드를 통해 너무 많은 코드를 만들었기 때문이다.

아래에 있는 코드는 테스트가 중요하다. 변경 가능성이 적고 상위 계층에서 많이 의존한다. 변경될 확률이 적어 오래 가는 테스트를 작성할 수 있다.
