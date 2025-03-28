# Git tutorial

Dưới đây là hướng dẫn sử dụng Git trên cả **Windows 11** và **Ubuntu 24.10**. Những phần khác nhau giữa hai hệ điều hành sẽ được phân tách rõ ràng.  

---

## **1. Cài đặt Git**  

### **Windows 11**  
- Tải Git từ trang chính thức: [https://git-scm.com/downloads](https://git-scm.com/downloads).  
- Cài đặt bằng file `.exe`, chọn tùy chọn mặc định.  
- Kiểm tra cài đặt:  
  ```sh
  git --version
  ```

### **Ubuntu 24.10**  

- Cài đặt qua **APT**:  
  ```sh
  sudo apt update
  sudo apt install git
  ```
- Kiểm tra phiên bản:  
  ```sh
  git --version
  ```

---

## **2. Cấu hình Git lần đầu**  

Áp dụng cho cả Windows và Ubuntu:  

```sh
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
git config --list  # Kiểm tra cấu hình
```

---

## **3. Clone Repository**  

### **3.1. Clone bằng HTTP**  

(Áp dụng cho cả Windows & Ubuntu)  

```sh
git clone https://github.com/user/repo.git
```

💡 **Lưu ý:** HTTP yêu cầu nhập username & password mỗi lần push.

### **3.2. Clone bằng SSH**  

- **Windows 11**: Cần cài OpenSSH nếu chưa có (mặc định có sẵn trên Windows 11).  

- **Ubuntu 24.10**: Mặc định hỗ trợ SSH.  

Clone bằng SSH:  

```sh
git clone git@github.com:user/repo.git
```

### **3.3. Clone bằng GitHub CLI**  

Yêu cầu **GitHub CLI** ([Tải tại đây](https://cli.github.com/)).  

Cài đặt trên **Windows**:  
```sh
winget install GitHub.cli
```

Cài đặt trên **Ubuntu**:  
```sh
sudo apt install gh
```

Sau đó, đăng nhập GitHub:  
```sh
gh auth login
```

Clone repo:  
```sh
gh repo clone user/repo
```

---

## **4. Tạo Repository mới**  

### **4.1. Tạo repo trên máy cục bộ**  
```sh
mkdir my_project && cd my_project
git init
```

### **4.2. Tạo repo trên GitHub bằng CLI**  
```sh
gh repo create my_project --public
```

- Mặc định, Git có thể tạo nhánh chính là **`master`** hoặc **`main`**, tùy vào phiên bản Git. Nếu muốn đảm bảo nhánh chính là `main`, làm như sau:  

### **4.3. Khi tạo repo mới**  

```sh
git init -b main
```
- Lệnh này khởi tạo repo với **nhánh chính là `main`** ngay từ đầu.  

### **4.4. Đổi nhánh chính sang `main` (nếu đã có `master`)**  

- Nếu repo đã tồn tại với nhánh chính là `master`, đổi sang `main` bằng:  

```sh
git branch -m master main  # Đổi tên nhánh master -> main
git push -u origin main  # Đẩy nhánh main lên remote
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main  # Đặt main làm nhánh mặc định
```

- Rồi vào GitHub, vào **Settings → Branches → Default branch**, đổi sang `main` và xóa `master` nếu cần.  

- Sau khi đổi, nhánh chính của repo sẽ là **`main`** thay vì `master`.

---

## **5. Liên kết repo với GitHub qua SSH**  

### **5.1. Tạo SSH Key**  

Áp dụng cho cả **Windows & Ubuntu**:  

```sh
ssh-keygen -t rsa -b 4096 -C "email@example.com"
```

💡 **Lưu ý:** Nhấn **Enter** để lưu key tại `~/.ssh/id_rsa`.

### **5.2. Thêm SSH Key vào SSH Agent**  

#### **Windows 11**:  

##### **1️⃣ Bật SSH Agent**  

Mở **PowerShell (Admin)** và chạy:  
```powershell
Get-Service ssh-agent  # Kiểm tra SSH Agent có đang chạy không
Start-Service ssh-agent  # Bật SSH Agent nếu đang tắt
Set-Service -Name ssh-agent -StartupType Automatic  # Cho phép tự động khởi động cùng hệ thống
```

##### **2️⃣ Thêm SSH Key vào SSH Agent**  
```powershell
ssh-add $env:USERPROFILE\.ssh\id_rsa
```
Kiểm tra lại:  
```powershell
ssh-add -l
```

#### **Ubuntu 24.10**:  

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

### **5.3. Thêm SSH Key vào GitHub**  
- Copy SSH key:  
  ```sh
  cat ~/.ssh/id_rsa.pub
  ```
- Truy cập [https://github.com/settings/keys](https://github.com/settings/keys), chọn **New SSH Key**, đặt tên và dán SSH Key vào.

### **5.4. Kiểm tra kết nối SSH**  
```sh
ssh -T git@github.com
```

Nếu thành công, bạn sẽ thấy:  
```
Hi username! You've successfully authenticated...
```

### **5.5. Liên kết repo với GitHub qua SSH**  
```sh
git remote add origin git@github.com:user/repo.git
git push -u origin main
```

---

💡 **Tóm tắt khác biệt Windows & Ubuntu**  

| **Tính năng**         | **Windows 11**                                  | **Ubuntu 24.10**                               |
|----------------------|---------------------------------|----------------------------------|
| Cài Git            | Tải `.exe` từ website | `sudo apt install git` |
| Cài GitHub CLI     | `winget install GitHub.cli` | `sudo apt install gh` |
| SSH mặc định       | Cần kiểm tra OpenSSH (`ssh -V`) | Đã tích hợp sẵn |
| Khởi động SSH agent | `eval $(ssh-agent -s)` | `eval "$(ssh-agent -s)"` |

---

## **6. Các thao tác cơ bản với Git**  

### **6.1. Kiểm tra trạng thái**  
```sh
git status
```

### **6.2. Thêm file vào staging area**  
```sh
git add file.txt  # Thêm một file
git add .         # Thêm tất cả file
```

### **6.3. Commit thay đổi**  
```sh
git commit -m "Mô tả thay đổi"
```

### **6.4. Xem lịch sử commit**  
```sh
git log --oneline
```

### **6.5. Push code lên GitHub**  
Nếu repo đã được liên kết:  
```sh
git push origin main
```

Nếu chưa có remote:  
```sh
git remote add origin https://github.com/user/repo.git
git branch -M main
git push -u origin main
```

### **6.6. Pull code mới nhất từ GitHub**  
```sh
git pull origin main
```

### **6.7. Tạo và chuyển branch**  
```sh
git branch feature_branch       # Tạo branch mới
git checkout feature_branch     # Chuyển sang branch mới
git switch feature_branch       # Lệnh thay thế checkout (Git 2.23+)
```

### **6.8. Hợp nhất branch (merge)**  
```sh
git checkout main
git merge feature_branch
```

## 7. Branch

### Xem danh sách branch

```sh
git branch
```

- Branch hiện tại sẽ có dấu `*` trước tên.
- Thêm `-a` để xem cả branch từ remote:
  ```sh
  git branch -a
  ```

### Tạo branch mới

```sh
git branch <tên_branch>
```

Ví dụ:

```sh
git branch feature-login
```

Tạo branch tên `feature-login` nhưng **chưa chuyển sang branch đó**.

### Chuyển sang branch khác

```sh
git checkout <tên_branch>
```

Hoặc (cách mới, Git 2.23+):

```sh
git switch <tên_branch>
```

Ví dụ:

```sh
git checkout feature-login
```

Chuyển sang branch `feature-login`.

### Tạo và chuyển ngay sang branch mới

```sh
git checkout -b <tên_branch>
```

Hoặc:

```sh
git switch -c <tên_branch>
```

Ví dụ:

```sh
git checkout -b feature-search
```

Tạo và chuyển ngay sang branch `feature-search`.

### Đổi tên branch

#### Đổi tên branch hiện tại

```sh
git branch -m <tên_mới>
```

#### Đổi tên branch khác

```sh
git branch -m <tên_cũ> <tên_mới>
```

Ví dụ:

```sh
git branch -m old-branch new-branch
```

### Xóa branch

#### Xóa branch local

```sh
git branch -d <tên_branch>
```

Nếu branch **chưa merge**, dùng `-D` để xóa mạnh:

```sh
git branch -D <tên_branch>
```

#### Xóa branch trên remote

```sh
git push origin --delete <tên_branch>
```

Hoặc:

```sh
git push origin :<tên_branch>
```

Ví dụ:

```sh
git push origin --delete feature-login
```

### Merge branch (Gộp nhánh)

```sh
git checkout main  # Chuyển về branch chính
git merge <tên_branch>  # Gộp branch vào main
```

Ví dụ:

```sh
git merge feature-search
```

Gộp branch `feature-search` vào `main`.

Nếu có xung đột (conflict), Git sẽ báo lỗi và bạn cần chỉnh sửa file thủ công trước khi tiếp tục.

### Xóa tất cả branch đã merge (Dọn dẹp branch)

```sh
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

Lệnh này xóa tất cả branch **đã merge vào main**.

### Tóm tắt nhanh

| Lệnh                                    | Chức năng                          |
| --------------------------------------- | ---------------------------------- |
| `git branch`                            | Xem danh sách branch               |
| `git branch -a`                         | Xem tất cả branch (local + remote) |
| `git branch <tên_branch>`               | Tạo branch mới                     |
| `git checkout <tên_branch>`             | Chuyển sang branch khác            |
| `git checkout -b <tên_branch>`          | Tạo và chuyển luôn sang branch mới |
| `git branch -m <tên_mới>`               | Đổi tên branch hiện tại            |
| `git branch -d <tên_branch>`            | Xóa branch local (đã merge)        |
| `git push origin --delete <tên_branch>` | Xóa branch trên remote             |
| `git merge <tên_branch>`                | Gộp branch vào branch hiện tại     |

