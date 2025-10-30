# 📁 File Manager (Node.js CLI Application)

A command-line **File Manager** built with **Node.js** that allows performing common file system operations, retrieving
OS information, calculating file hashes, and compressing/decompressing files using the Streams API — all without
external dependencies.

---

## 🚀 Features

* Works entirely via **CLI (Command Line Interface)**
* Supports **basic file operations** (create, copy, move, delete, rename)
* Uses **Streams API** for reading, writing, and transferring files
* Provides **system information** (CPU, OS, architecture, etc.)
* Calculates **file hashes** using SHA-256
* Supports **Brotli compression/decompression**
* Displays the **current working directory** after each command
* Handles **invalid input and errors** gracefully
* Prevents navigation above the **root directory**

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/file-manager.git
   ```

2. Checkout to the file manager branch:
    ```bash
   git checkout file-manager
   ```

3. Install dependencies (none required for this project):

   ```bash
   npm install
   ```
4. Run the program:

   ```bash
   npm run start -- --username=your_username
   ```

---

## 💬 Usage

After launching, you’ll see a greeting message:

```
Welcome to the File Manager, your_username!
You are currently in path_to_home_directory
```

Type commands directly in the terminal.
To exit the application, press **Ctrl + C** or type `.exit`.

On exit:

```
Thank you for using File Manager, your_username, goodbye!
```

---

## 📂 Commands

### 🔹 Navigation & Working Directory (NWD)

| Command                | Description                                                                                | Example     |
|------------------------|--------------------------------------------------------------------------------------------|-------------|
| `up`                   | Go one level up from the current directory                                                 | `up`        |
| `cd path_to_directory` | Change directory (relative or absolute path)                                               | `cd ./docs` |
| `ls`                   | List all files and folders in the current directory, sorted alphabetically (folders first) | `ls`        |

---

### 🔹 File Operations

| Command                                 | Description                                  | Example                   |
|-----------------------------------------|----------------------------------------------|---------------------------|
| `cat path_to_file`                      | Read file content (using Readable Stream)    | `cat ./notes.txt`         |
| `add new_file_name`                     | Create a new empty file                      | `add newFile.txt`         |
| `mkdir new_directory_name`              | Create a new folder in the current directory | `mkdir newFolder`         |
| `rn path_to_file new_filename`          | Rename file (keep content unchanged)         | `rn ./old.txt new.txt`    |
| `cp path_to_file path_to_new_directory` | Copy file (using Streams API)                | `cp ./file.txt ./backup`  |
| `mv path_to_file path_to_new_directory` | Move file (copy + delete original)           | `mv ./file.txt ./archive` |
| `rm path_to_file`                       | Delete a file                                | `rm ./temp.txt`           |

---

### 🔹 Operating System Information

| Command             | Description                                            |
|---------------------|--------------------------------------------------------|
| `os --EOL`          | Show system default End-Of-Line character              |
| `os --cpus`         | Display CPU information (model, clock rate, and count) |
| `os --homedir`      | Show user’s home directory                             |
| `os --username`     | Show system username                                   |
| `os --architecture` | Display CPU architecture (e.g., x64)                   |

---

### 🔹 Hash Calculation

| Command             | Description                                | Example           |
|---------------------|--------------------------------------------|-------------------|
| `hash path_to_file` | Compute SHA-256 hash of the specified file | `hash ./file.txt` |

---

### 🔹 Compression & Decompression (Brotli Algorithm)

| Command                                       | Description                         | Example                                           |
|-----------------------------------------------|-------------------------------------|---------------------------------------------------|
| `compress path_to_file path_to_destination`   | Compress a file using Brotli        | `compress ./notes.txt ./compressed`               |
| `decompress path_to_file path_to_destination` | Decompress a Brotli-compressed file | `decompress ./compressed/notes.txt.br ./restored` |

> ⚠️ The decompressed file must be identical to the original file before compression.

---

## 🧩 Error Handling

* **Invalid input:** Displays `Invalid input` and allows entering a new command.
* **Operation failed:** Displays `Operation failed` if something goes wrong (e.g., file not found).
* **Root protection:** You cannot go higher than the root directory.

---

## 📘 Technical Details

* **Node.js version:** 24.14.0 or higher
* **Dependencies:** None (uses built-in Node.js modules only)
* **Entry point:**

  ```bash
  npm run start -- --username=your_username
  ```

---

## 🧑‍💻 Example Session

```
$ npm run start -- --username=Alice
Welcome to the File Manager, Alice!
You are currently in C:\Users\Alice

ls
│ Name          │ Type     │
├───────────────────────────────
│ Documents     │ directory │
│ notes.txt     │ file      │
│ todo.txt      │ file      │

cd Documents
You are currently in C:\Users\Alice\Documents

cat todo.txt
1. Study Node.js
2. Complete File Manager task

.exit
Thank you for using File Manager, Alice, goodbye!
```

---

## 🧾 License

This project is created as part of the **RS School Node.js Course**.
Free to use for educational purposes.
