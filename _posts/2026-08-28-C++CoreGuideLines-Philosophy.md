
---

title: C++ Core GuideLines-Philosophy

date: 2026-08-28 12:11:00 +09:00

author: bjkim

categories: [C++ Core GuideLines]

tags: [C++, C++ Core GuideLines]

description: "C++ Core Guidelines 중 Philosophy 섹션을 한글로 정리."

hidden: false

---

C++ Core GuideLines - Philosophy

> :bulb: *해당 문서는 [C++ Core GuideLines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)의 개인적인 이해를 돕기위해 만든 문서입니다.*
> 
> *오류 지적은 언제든 환영입니다. 읽어주셔서 감사합니다* :relaxed:

<br><br><br>

---

## 목차

[[#P.1 코드의 목적을 온전히 코드로만 설명할 수 있게 하세요.]]
- [[#되도록 주석이 필요없는 코드를 작성하세요.]]
- [[#표준 라이브러리를 적극 활용하세요.]]
- [[#의미있는 타입을 사용하세요.]]

[[#P.2 코드를 ISO 표준 C++ 코드로 작성할 수 있도록 하세요.]]

[[#P.3 코드의 동작에 대한 의사를 명확히 표현하세요.]]

[[#P.4 정적 타입 안전성을 최대한 확보하세요.]]

[[#P.5 런타임 시간 검사 대신 컴파일 시간 검사를 선호하세요.]]

[[#P.6 컴파일 시간에 검사하지 못한 내용은 런타임에 검사하세요.]]

[[#P.7 런타임 오류를 조기에 확인할 수 있게 하세요.]]
- [[#인지할 수 없는 문제가 발생하지 않도록 하세요.]]
- [[#같은 값을 반복해서 검사하지 말고, 한 번 타입이 검증되었다면 해당 타입을 참조하세요.]]
- [[#과도한 검사는 쓸데없이 많은 비용을 발생시키거나, 클래스를 사용할 수 없게 만들 수 있습니다.]]

[[#P.8 어떠한 자원이든 누수되는걸 방지하세요.]]

[[#P.9 시간과 공간을 낭비하지 마세요.]]
- [[#증가 전 값이 필요할 경우에만 후위 증감 연산자를 사용하세요.]]

[[#P.10 반드시 불변 데이터를 먼저 사용하세요.]]

[[#P.11 복잡한 구조는 캡슐화 할 수 있도록 하세요.]]

[[#P.12 필요에 따라 보조 도구를 적극적으로 활용하세요.]]

---

<br><br><br>

<br>

## P.1 코드의 목적을 온전히 코드로만 설명할 수 있게 하세요.

---

### 되도록 주석이 필요없는 코드를 작성하세요.

컴파일러가 주석을 읽지 않는다는건 아주 당연한 사실이지만, 그보다 더 중요한건 사람도 안 읽는다는 거에요.

```cpp
// #1
class Date {
public:
    Month month() const;  // do
    // ...
};

// #2
class Date {
public:
    // month() is get function to acquire Month.
    int month();          // don't
    // ...
};
```

`#1`의 경우에는 해당 멤버 함수가 어떠한 멤버 변수도 변경하지 않는 const 함수이자, Month를 반환받는다는 것을 바로 알 수 있어요.

하지만 `#2`의 경우에는 해당 함수의 기능을 정확히 알아내기 위해서는 주석을 참고해야 합니다. 자칫 사용자가 해당 함수를 오해하고 잘못된 방향으로 사용하게 될 수 있어요.

<br><br>

### 표준 라이브러리를 적극 활용하세요.

```cpp
const auto it = std::find(values.begin(), values.end(), target);
```

직접 범위에 대한 탐색을 구현하는 것 보다, 이미 잘 구현된 C++ 라이브러리를 활용하세요.
대체로 현대의 소프트웨어를 구현할 때 중요한건 해당 기능이 *`어떻게 구현되었는지(how)`* 가 아닌, *`무엇을 하는지(what)`*입니다.

<br><br>

### 의미있는 타입을 사용하세요.

```cpp
struct BaudRate {
    int value;
};

void configureUart(BaudRate rate);
```

함수를 호출 할 때, `configureUart(115200)` 보다 `configureUart(BaudRate{115200})`으로 표기될 수 있도록 하세요. 이는 코드의 의미를 좀 더 명확하게 알 수 있도록 해줍니다.

<br><br><br><br><br><br>

## P.2 코드를 ISO 표준 C++ 코드로 작성할 수 있도록 하세요.

---

당연하지만, 해당 문서는 ISO 표준을 준수하는 코드에 대해 언급하고 있습니다.
하지만 플랫폼마다 지원하는 특수한 *확장 기능*을 사용해야 하는 경우가 있어요.

이럴 경우, 되도록 이 확장 기능을 캡슐화해서, 다른 플랫폼에서는 호출될 수 없도록 하세요.

> *예를 들어, 해당 기능에 대한 포괄적인 정의를 인터페이스로 만들고, 각 플랫폼에서 해당 기능을 Implement할 수 있도록 하세요.*

표준 C++ 언어, 혹은 표준 라이브러리의 사용이 제한되어야 할 경우가 있습니다.

일례로, 항공기 제어 소프트웨어 같은 Real-time이 *반드시* 보장되어야하는 산업의 경우에는 동적 메모리 할당을 피해야해요. 이런 경우에는 해당 환경에 맞게 지침을 수정해도 좋습니다.

> *heap 할당기는 빈 공간을 찾고, 공간을 할당하고, 부분적으로 메모리를 사용하기 때문에(메모리 단편화) 특정한 동작이 특정 시간 내에 끝날 것을 보장해주지 않아요*

<br><br><br><br><br><br>

## P.3 코드의 동작에 대한 의사를 명확히 표현하세요.

---

```cpp
std::size_t i = 0;
while (i < v.size()) {
    // ... do something with v[i] ...
}
```

while문의 외부를 확인했을 때, 이 코드가 단순히 요소를 순회하는 것인지, 요소를 수정하기 위한 것인지 명확하게 드러나 있지 않습니다.

또한 인덱스 i가 while문의 외부에서 선언되었는데, 이 역시 의도된 것인지 명확하게 드러나 있지 않아요.

```cpp
for (const auto& x : v) { /* do something with the value of x */ }
```

정확히 어떤 기능을 수행하게 될지는 내용을 보아야 하겠지만 `x`는 `v`의 요소임을 명확하게 하고 있고, `x`의 자료형이 const_reference 기반으로 동작하고 있으므로 해당 함수는 *`내부 요소를 수정하지 않을 것임`*을 알 수 있게 작성되었어요.

반면, 수정이 필요한 경우에는 아래처럼 작성할 수 있습니다.

```cpp
for (auto& x : v) { /* modify x */ }
```

<br>

현재 프로젝트가 해당 지침을 넘어 더 좋은 방향의 의사 표현 패턴을 구현할 수 있다면, 그렇게 하세요.

예를 들어, Qt 프레임워크에서는 해당 라이브러리를 사용하는 객체들에 부모를 설정해 자동으로 힙이 정리될 수 있도록 돕고,

```cpp
class Foo : public QObject {
public:
    Foo(QObject* _parent = nullptr)
        : QObject(_parent)
    {}
    //...
}


Foo foo = new Foo(this);
```

`COW(Copy-On-Write)`를 지원하여 리스트가 불필요하게 복사되는 것을 막고 있어요.

```cpp
QList<QString> list1;
QList<QString> list2 = list1;
// list1 and list2 refer same region.
```

<br><br><br><br><br><br>

## P.4 정적 타입 안전성을 최대한 확보하세요.

---

당연히, 예상할 수 없는 오류를 피하기 위해서는, 컴파일러가 컴파일 시간에 정적으로 타입에 대한 안전성을 확보할 수 있게 해주어야 합니다.

하지만 현실적으로 쉽지 않습니다.

- ### Union

```cpp
union SensorValue {
    int raw;
    float voltage;
};

SensorValue value;
value.raw = 0x3F800000;

float v = value.voltage; // Type reinterpretation. UB.
```

- ### Cast

```cpp
std::uint32_t raw = 0x3F800000;
float value = *reinterpret_cast<float*>(&raw);
```

- ### 배열 감쇠(Array Decay)

```cpp
void transmit(const std::byte* data);

std::byte frame[64];
transmit(frame);
```

> *배열을 함수에 전달하면, 대부분의 경우에는 배열의 첫 요소를 가리키는 포인터로 변환되고, `크기 정보`를 잃어버리게 돼요. 이를 `배열 감쇠`라고 부릅니다.*

- ### 범위 오류

```cpp
std::array<int, 4> samples{};
samples[4] = 1;
```

- ### 축소 변환

```cpp
std::uint32_t measured = 100000;
std::uint16_t stored = measured;
```

<br><br>

위 방식의 대안으로 아래 방법들을 추천합니다.

```cpp
#include <variant>

using SensorValue = std::variant<std::int32_t, float>;

SensorValue value = 23.5F;

if (const auto* voltage = std::get_if<float>(&value)) {
    processVoltage(*voltage);
}
```

(C++ 17 이상) `std::variant`는 타입 안전 union을 나타냅니다.
variant는 union과 거의 흡사하게 동작하지만, 현재 활성화된 타입이 어떤 타입인지까지 함께 저장해요.

`std::get_if`는 variant를 통해 저장된 타입이 올바르게 해석될 수 있으면 그 값을 가리키는 포인터를 돌려주고, 아니면 널 포인터를 돌려줍니다.

```cpp
template <typename T>
T clampToRange(T value, T min, T max)
{
    return std::clamp(value, min, max);
}
```

Casting은 컴파일러가 추론한 타입을 무시하라는 의도가 되기 쉽습니다.
대신 템플릿을 사용하면 컴파일러가 연산이 올바르게 사용되었는지 컴파일 시간에 확인하기 좋아질 수 있어요.

만약 불가피하게 런타임 캐스팅이 필요하다면, C스타일 캐스팅 대신 의도가 분명한 아래 캐스팅을 골라 사용합니다.

- `static_cast` : 값을 다른 타입으로 명시적 변환합니다.

- `const_cast` : 원본이 non-const인데 API 경로 중 const 포인터로만 보이게 된 경우 const를 제거해 수정할 수 있어요.

- `reinterpret_cast` : 값 변환 대신, 주소나 비트 타입을 다른 타입으로 간주하게 해요.

```cpp
#include <span>

void parseFrame(std::span<const std::byte> frame)
{
    if (frame.size() < 4) {
        return;
    }

    const auto command = frame[1];
}
```

```cpp
std::array<std::byte, 64> rxBuffer{};
parseFrame(rxBuffer);
```

`std::span`은 연속된 컨테이너의 연속된 부분을 참조합니다.
포인터와 길이를 하나로 묶어 배열 감쇠를 방지해줍니다.

단, `operator[]`는 별도의 검사 과정이 없으므로 여전히 범위를 벗어난 접근에는 취약할 수 있으니, 항상 길이를 체크하는 습관을 들이도록 하세요.

```cpp
std::uint32_t rawLength = 1000;
// std::uint16_t length{rawLength};  // Rejected.
```

만약 축소 변환에 대한 일말의 여지조차 없애야 한다면, 중괄호 초기화를 사용해 컴파일 시간에 검증하는 방법을 우선 고려해보세요.

```cpp
#include <gsl/narrow>

std::uint32_t payloadLength = readLength();
const auto length = gsl::narrow<std::uint16_t>(payloadLength);      //#1
const auto length = gsl::narrow_cast<std::uint16_t>(payloadLength); //#2
```

하지만 축소변환이 반드시 필요한 경우도 있습니다.

이 경우, `gsl::narrow`를 사용해보는걸 검토해보세요.
변환 과정에서 손실이 발생했는지 확인하고, 값 손실이 발생하지 않았다면 그대로 변환하고 그렇지 않다면 예외를 발생시킵니다.

> :bulb: *C++ Core GuideLines에서는 가이드라인 준수를 위해 GSL이라는 헤더를 제공하고 있습니다. 이후 GSL 부문에서 따로 다룰 예정이지만, [GSL 깃허브 페이지](https://github.com/microsoft/GSL/tree/main)를확인해보세요.*

`gsl::narrow_cast`는 `std::static_cast`와 그 기능이 동일합니다.

이미 해당 형 변환이 검증을 마쳤으니, 걱정말고 축소 변환을 진행해도 괜찮다는 의도를 표현할 수 있어요.

<br><br><br><br><br><br>

## P.5 런타임 시간 검사 대신 컴파일 시간 검사를 선호하세요.

---

```cpp
using Int = /* An integer type */

int bits = 0;
for (Int i = 1; i; i <<= 1)
    ++bits;
if (bits < 32)
    cerr << "Int too small\n";
```

i의 크기가 4바이트 이상인지 런타임 시간을 통해 체크하는 코드에요.
i가 *`signed int`* 로 정의된 경우, 최상위 부호비트가 1이 되었을 때의 동작이 정의되지 않았기 때문에 예상하지 못한 동작이 발생할 수 있어요.

```cpp
static_assert(sizeof(Int) >= 4);
```

이 경우, `static_cast`를 통해 컴파일 시간에 크기를 체크할 수 있어요.
<br>

```cpp
void read(int* p, int n);

int a[100];
read(a, 1000);
```

read()를 호출할 때 배열 감쇠가 발생하며 실제 크기를 벗어나는 인수를 제공할 수 있어요.

```cpp
void read(std::span<int> r);

int a[100];
read(a);
```

이 경우, 대신 span을 제공할 수 있는지 검토해보세요.
컴파일러가 크기 정보를 제공받을 수 있기 때문에 호출부 실수가 줄고, 정적 분석에서 오류를 잡아낼 수 있는 확률이 커져요.

*`컴파일 시간에 잘 처리할 수 있는 내용을 런타임 시간에 처리하도록 미루지 마세요.`*
<br><br><br><br><br><br>

## P.6 컴파일 시간에 검사하지 못한 내용은 런타임에 검사하세요.

---

P.5에서 확인할 수 있듯이 프로그래머는 컴파일 시간에 검사할 수 있는 코드를 작성해야 하지만, 그러지 못할 경우 최대한 런타임에 검사할 수 있는 코드를 작성해야 해요.

```cpp
extern void f(int* p); 

void g(int n) { 
    f(new int[n]); 
}
```

여기서 `f()`는 실제로는 다른 오브젝트 파일에 컴파일 될 가능성도 있고, 추후에 별도 라이브러리를 통해 동적으로 로드될 가능성이 있습니다.
또, 인수로 전달되는 배열역시 동적으로 생성되고 있어 검사를 아주 어렵게 만들어요.
추가적으로 생성된 `int[n]`을 누가 `delete`할 것인가에 대한 문제도 발생합니다. 
<br>

```cpp
extern void f2(int* p, int n); 

void g2(int n) {
    f2(new int[n], n);
}
```

물론 크기정보를 함께 넘길 수도 있습니다.
다만 호출부에서 크기 정보에 대해 오타가 발생하면 이는 그대로 치명적인 오류로 이어질 수 있습니다.
<br>

```cpp
extern void f3(unique_ptr<int[]>, int n); 

void g3(int n) {
    f3(make_unique<int[]>(n), m);
}
```

이건 어떨까요?
원시 포인터 대신 RAII를 활용함으로서 `f3()`가 종료될 때 메모리가 해제되도록 수정했어요.
하지만 이 역시 크기 정보를 의도적으로 전달해주어야 하고, 만약 `unique_prt`의 표준 라이브러리 구현 방식이 동일하지 못할 경우 문제가 발생할 여지가 있습니다.

요소 수정이 필요할 경우, `vector<>&`를 전달하는 방식을 고려해보세요.
만약 요소 수정이 필요하지 않다면, 여전히 `span<>`을 전달하는 방식 또한 고려해보세요.
<br><br><br><br><br><br>

## P.7 런타임 오류를 조기에 확인할 수 있게 하세요.

---

### 인지할 수 없는 문제가 발생하지 않도록 하세요.

```cpp
void increment1(int* p, int n) { 
    for (int i = 0; i < n; ++i) ++p[i]; 
} 

void use1(int m) {
    const int n = 10;
    int a[n] = {}; 
    // ... 
    increment1(a, m); 
    // ... 
}
```

여기서 매개변수 `m`은 10보다 큰 수를 입력받게 되었을 때 오류가 발생할 수 있습니다.
문제는 실제로 a[10]에 접근하기 전까지는 해당 오류를 확인하기 힘들다는거에요.

```cpp
void increment2(span<int> p) {
    for (int& x : p) ++x; 
} 

void use2(int m) {
    //const int n = 10;
    int a[n] = {}; 
    // ... 
    increment2(a); 
    // ... 
}
```

`span<>`을 넘겨주면 배열의 크기를 벗어난 접근을 방어할 수 있습니다.
<br><br>

### 같은 값을 반복해서 검사하지 말고, 한 번 타입이 검증되었다면 해당 타입을 참조하세요.

```cpp
Date read_date(istream& is);
Date extract_date(const string& s);

void user1(const string& date) { 
    auto d = extract_date(date); 
    // ... 
}

void user2() {
    Date d = read_date(cin); 
    // ... 
    user1(d.to_string()); 
    // ... 
}
```

Date d는 `read_date()`에서 *이미 검증된 값*임에도 불구하고, `user1()`내부의 `extract_date()`로 한 번 더 검사를 거치고 있어요.
또한,  `const string&`-> `Date`로 이미 변환한 값인데 해당 값을 다시 `to_string()`으로 원시 문자열로 변경하고 있습니다.
<br>
이미 타입 안정성이 확인되었다면 해당 타입을 바로 받아 사용하는 것이 좋습니다.
해당 값을 `const Date&`로 전달해보는걸 고려해보세요.
<br><br>

### 과도한 검사는 쓸데없이 많은 비용을 발생시키거나, 클래스를 사용할 수 없게 만들 수 있습니다.

```cpp
class Jet { // Physics says: e * e < x * x + y * y + z * z 
    float x; 
    float y; 
    float z; 
    float e; 
public: 
    Jet(float x, float y, float z, float e) 
        : x(x), y(y), z(z), e(e) 
    { 
        // Should I check here that the values are physically meaningful? 
    } 

    float m() const { 
        // Should I handle the degenerate case here?
        return sqrt(x * x + y * y + z * z - e * e); 
    }
};
```

[Jet 공식](https://en.wikipedia.org/wiki/Jet_(mathematics))은 수학 공식입니다.
이론적으로는 이미 증명된 수학 공식이기 때문에 생성자에서 별도의 검사가 필요하지 않을 것 같습니다.
하지만 현실에서는 x, y, z, e가 이론 값이 아닌 입자 검출기에서 나온 *오차*를 가진 값일 수 있어요.

그럼 생성자에서 검사를 거치는 것이 맞지 않나? 싶지만, 역설적으로 오차 때문에 생성자가 동작하지 못하고 과도한 비용만 발생시킬 수 있습니다.

이럴 경우, 조건에 대한 검사 책임을 생성자에 두지 않고, 필요할 때만 `m()`을 통해 검사하는게 더 나을 수 있습니다.
<br><br><br><br><br><br>

## P.8 어떠한 자원이든 누수되는걸 방지하세요.

---

```cpp
void f(const char* name)
{
    FILE* input = fopen(name, "r");
    // ...
    if (something) return;
    // ...
    fclose(input);
}
```

`something == true`가 성립할 경우,  핸들이 닫히지 않고 File leak로 이어질 수 있습니다.

대신 RAII 패턴을 도입하는걸 고려해보세요.

```cpp
void f(const char* name)
{
    ifstream input {name};
    // ...
    if (something) return;
    // ...
}
```

`정리되지 않은 것`보다 더 중요한건 `더 이상 정리할 수 없는 것`입니다.
위 예시 처럼 `FILE*`포인터를 잃어버릴 경우 말이에요.

물론, 자원에 대한 생명 주기를 길게 가져간 뒤에(재사용 등의 사유로 인해) 프로그램 종료 시 모두 정리하도록 할 수도 있어요.

하지만 대부분의 경우에는 자원을 정리하는 추상화에 의존하는게 더 안전합니다.

> *해당 문서에서는 메모리 누수 및 타입 안전성을 확보할 수 있는 프로파일을 제공하고 있어요.
> 해당 [섹션](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#pro-profiles)을 확인해보세요.*

<br><br><br><br><br><br>

## P.9 시간과 공간을 낭비하지 마세요.

---

```cpp
struct X {
    char ch;
    int i;
    string s;
    char ch2;

    X& operator=(const X& a);
    X(const X&);
};

X waste(const char* p)
{
    if (!p) throw Nullptr_error{};
    int n = strlen(p);
    auto buf = new char[n];
    if (!buf) throw Allocation_error{};
    for (int i = 0; i < n; ++i) buf[i] = p[i];
    // ... manipulate buffer ...
    X x;
    x.ch = 'a';
    x.s = string(n);    // give x.s space for *p
    for (gsl::index i = 0; i < x.s.size(); ++i) x.s[i] = buf[i];  // copy buf into x.s
    delete[] buf;
    return x;
}

void driver()
{
    X x = waste("Typical argument");
    // ...
}
```

`X`의 레이아웃 자체가 padding으로 인해 공간 낭비를 초래하고,
`buf`를 불필요하게 선언하여 성능을 저하시킵니다.
또한 당연하게도 불필요한 복사 연산은 메모리 공간을 새로 할당하고 값을 대입시키는 과정에 있어 연산 속도를 저하시킬 수 있어요.

<br>

```c
void lower(zstring s)
{
    for (int i = 0; i < strlen(s); ++i) s[i] = tolower(s[i]);
}
```

`i < strlen()`은 조건문을 순회할 때 마다 길이 정보를 다시 평가합니다.

경우에 따라 다르겠지만, `tolower()`함수는 길이 정보에 영향을 주지 않을 것이므로 길이 정보를 캐싱하는 것이 더 효율적입니다.

<br><br>

### 증가 전 값이 필요할 경우에만 후위 증감 연산자를 사용하세요.

---

일반적으로 기본 정수 타입 형태에서는 컴파일러가 대게 최적화 할 수 있으므로 어떤 방식을 사용하여도 괜찮습니다.

```cpp
int i = 0;
++i;
i++;
```

하지만 사용자 정의 타입에서 해당 연산자가 오버로딩 되었을 경우,

```cpp
class Counter {
public:
    Counter& operator++()  // prefix ++x
    {
        ++value_;
        return *this;
    }

    Counter operator++(int)  // postfix x++
    {
        Counter old = *this;
        ++(*this);
        return old;
    }

private:
    int value_{};
};
```

후위 연산자는 `old`라는 새로운 반환값을 만들어냄으로, 해당 값을 사용하지 않을 경우 약간의 낭비가 발생합니다.
물론 해당 문제가 성능에 큰 영향을 주지 않을 가능성이 큽니다. 다만 분리하여 적용할 경우, 코드의 의도를 더욱 명확하게 할 수 있어요.
<br><br><br><br><br><br>
## P.10 반드시 불변 데이터를 먼저 사용하세요.
---
거의 모든 상황에서 `immutable`한 데이터를 먼저 사용하는걸 고려해야해요.
`immutable`한 데이터는 `mutable`한 데이터보다 훨씬 예측가능하고, 경쟁 조건(Race-condition)이 발생하지 않습니다.
> *[상수와 불변성](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#s-const) 섹션을 참고해보세요.*
<br><br><br><br><br><br>
## P.11 복잡한 구조는 캡슐화 할 수 있도록 하세요.
---
```cpp
int sz = 100; 
int* p = (int*) malloc(sizeof(int) * sz); 
int count = 0; 
// ... 
for (;;) { 
	// ... read an int into x, exit loop if end of file is reached ... 
	// ... check that x is valid ... 
	if (count == sz) p = (int*) realloc(p, sizeof(int) * sz * 2); 
	p[count++] = x; 
	// ... 
}
```
해당 코드는 당연히 동작하겠지만, 코드를 장황하고 한 번에 이해하기 힘들게 만들며, 실수가 발생할 수 있습니다.
예를 들어, `capacity`가 한계에 도달했을 경우 메모리를 확장하는 부분을 깜빡할 수 있어요.

```cpp
vector<int> v; v.reserve(100); 
// ... 
for (int x; cin >> x; ) { 
	// ... check that x is valid ... 
	v.push_back(x); 
}
```
대신 `vector`를 사용할 수 있습니다.

> *`std`와 `gsl`라이브러리를 사용하면, 우리보다 훨씬 전문적인 사람들이 구현해놓은 복잡한 저수준의 코드를 더욱 간단하게 사용할 수 있습니다. 이 말은 다시 말해서, 대부분의 경우 저수준의 코드를 직접 구현하는 대신 표준화된 라이브러리를 사용해 고수준의 설계를 달성할 수 있어야 한다는 의미에요. 우리(이 글을 읽는 여러분)에게 필요한것은 `what`이지 `how`가 아닙니다.*

<br><br><br><br><br><br>

## P.12 필요에 따라 보조 도구를 적극적으로 활용하세요.
---
사람보다 기계가 잘 해낼 수 있는 것들이 훨씬 많습니다.
기계는 지루하고 반복적인 작업에 지치거나, 싫증을 내지 않아요.
- [정적 분석 도구](https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis)
- [동시성 도구](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rconc-tools)
- [테스트 도구](https://github.com/isocpp/CppCoreGuidelines/tree/master)

등을 적극적으로 도입해보는걸 검토해보세요.
