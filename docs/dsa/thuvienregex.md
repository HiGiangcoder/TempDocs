# Thư viện Regex

## **Thư Viện Regular Expression (Regex) - Hướng Dẫn Chi Tiết**

### **1. Giới Thiệu Về Regular Expression (Regex)**

**Regular Expression (Regex)** là một công cụ mạnh mẽ để **tìm kiếm, so khớp và thao tác văn bản** dựa trên các **mẫu (pattern)**. Regex được sử dụng rộng rãi trong:

- **Xử lý chuỗi** (tìm kiếm, thay thế, trích xuất dữ liệu).

- **Kiểm tra tính hợp lệ (Validation)** (email, số điện thoại, mật khẩu).

- **Phân tích dữ liệu** (log, file cấu hình, CSV/JSON).

- **Lập trình** (hỗ trợ trong C++, Python, JavaScript, Java, v.v.).

---

### **2. Cú Pháp Regex Cơ Bản**
#### **2.1. Các Ký Tự Đặc Biệt**

| Ký tự | Ý nghĩa |
|--------|---------|
| `.` | Khớp bất kỳ ký tự nào (trừ `\n`) |
| `^` | Bắt đầu chuỗi |
| `$` | Kết thúc chuỗi |
| `*` | Lặp 0 hoặc nhiều lần |
| `+` | Lặp 1 hoặc nhiều lần |
| `?` | Lặp 0 hoặc 1 lần |
| `{n}` | Lặp đúng `n` lần |
| `{n,m}` | Lặp từ `n` đến `m` lần |
| `[...]` | Khớp bất kỳ ký tự trong ngoặc |
| `[^...]` | Khớp ký tự **không** có trong ngoặc |
| `\d` | Số (`[0-9]`) |
| `\D` | Không phải số |
| `\w` | Chữ cái, số hoặc `_` (`[a-zA-Z0-9_]`) |
| `\W` | Không phải `\w` |
| `\s` | Khoảng trắng (space, tab, `\n`) |
| `\S` | Không phải khoảng trắng |
| `\b` | Ranh giới từ |
| `\B` | Không phải ranh giới từ |

#### **2.2. Nhóm (Groups)**

| Pattern | Ý nghĩa |
|---------|---------|
| `(abc)` | Nhóm `abc` |
| `(a|b)` | Khớp `a` hoặc `b` |
| `(?:abc)` | Nhóm không ghi nhớ |

---

## **3. Ví Dụ Thực Tế**
### **3.1. Kiểm Tra Email**

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```
- **Giải thích**:

  - `^[a-zA-Z0-9._%+-]+`: Phần trước `@` (có thể chứa chữ, số, `.`, `_`, `%`, `+`, `-`).

  - `@[a-zA-Z0-9.-]+`: Tên miền (ví dụ: `gmail`, `yahoo`).

  - `\.[a-zA-Z]{2,}$`: Tên miền cấp cao (`.com`, `.net`).


### **3.2. Kiểm Tra Số Điện Thoại (Việt Nam)**

```regex
^(0|\+84)(3|5|7|8|9)[0-9]{8}$
```
- **Giải thích**:

  - `(0|\+84)`: Mã quốc gia (`0` hoặc `+84`).

  - `(3|5|7|8|9)`: Nhà mạng (Viettel, Mobifone, Vinaphone, v.v.).

  - `[0-9]{8}`: 8 chữ số tiếp theo.

### **3.3. Tìm Ngày Tháng (DD/MM/YYYY)**

```regex
^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\d{2}$
```
- **Giải thích**:

  - `(0[1-9]|[12][0-9]|3[01])`: Ngày từ `01` đến `31`.

  - `/(0[1-9]|1[0-2])/`: Tháng từ `01` đến `12`.

  - `/(19|20)\d{2}$`: Năm từ `1900` đến `2099`.

---

## **4. Regex Trong C++**

C++ sử dụng thư viện `<regex>` (C++11 trở lên).

### **4.1. Kiểm Tra Email**

```cpp
#include <iostream>
#include <regex>
#include <string>

int main() {
    std::string email = "example@gmail.com";
    std::regex pattern(R"([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})");

    if (std::regex_match(email, pattern)) {
        std::cout << "Email hợp lệ!" << std::endl;
    } else {
        std::cout << "Email không hợp lệ!" << std::endl;
    }

    return 0;
}
```

### **4.2. Tìm Số Điện Thoại Trong Chuỗi**

```cpp
#include <iostream>
#include <regex>
#include <string>

int main() {
    std::string text = "Liên hệ: 0912345678 hoặc 0987654321";
    std::regex phone_pattern(R"((0|\+84)(3|5|7|8|9)[0-9]{8})");

    auto begin = std::sregex_iterator(text.begin(), text.end(), phone_pattern);
    auto end = std::sregex_iterator();

    for (std::sregex_iterator i = begin; i != end; ++i) {
        std::smatch match = *i;
        std::cout << "Số điện thoại: " << match.str() << std::endl;
    }

    return 0;
}
```

---

## **5. Regex Trong Python**

Python sử dụng module `re`.

### **5.1. Kiểm Tra Email**
```python
import re

email = "example@gmail.com"
pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

if re.match(pattern, email):
    print("Email hợp lệ!")
else:
    print("Email không hợp lệ!")
```

### **5.2. Trích Xuất Số Điện Thoại**

```python
import re

text = "Liên hệ: 0912345678 hoặc 0987654321"
pattern = r"(0|\+84)(3|5|7|8|9)[0-9]{8}"

phones = re.findall(pattern, text)
print("Số điện thoại tìm thấy:", phones)  # [('0', '9', '12345678'), ('0', '9', '87654321')]
```

### **5.3. Thay Thế Văn Bản**
```python
import re

text = "Ngày 12/05/2023 và 30/11/2024"
new_text = re.sub(r"(\d{2})/(\d{2})/(\d{4})", r"\2-\1-\3", text)
print(new_text)  # "Ngày 05-12-2023 và 11-30-2024"
```

---

## **6. Công Cụ Hỗ Trợ Regex**

- **[Regex101](https://regex101.com/)** → Kiểm tra & giải thích regex.

- **[RegExr](https://regexr.com/)** → Học và test regex trực quan.

- **[Debuggex](https://www.debuggex.com/)** → Visualize regex bằng sơ đồ.

---

## **7. Kết Luận**

- **Regex cực kỳ hữu ích** trong xử lý văn bản và kiểm tra dữ liệu.

- **C++ dùng `<regex>`**, **Python dùng `re`** → Dễ dàng tích hợp.

- **Luyện tập thường xuyên** để thành thạo!